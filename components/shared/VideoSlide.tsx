"use client";
import React, { useCallback, memo, useState, useEffect, useRef } from "react";
import YouTube, { YouTubeEvent } from "react-youtube";
import { FaPlay, FaExternalLinkAlt, FaYoutube } from "react-icons/fa";
import { ISubContent } from "@/features/UniContent/interface/uniContent.interface";
import Image from "next/image";

// Extract YouTube video ID from URL
const getYouTubeId = (url: string): string | null => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

// Get YouTube thumbnail URL
const getYouTubeThumbnail = (url: string, quality: "default" | "medium" | "high" | "maxres" = "maxres"): string => {
  const videoId = getYouTubeId(url);
  if (!videoId) return "";
  return `https://img.youtube.com/vi/${videoId}/${quality}default.jpg`;
};

// YouTube Player Options
const YOUTUBE_PLAYER_OPTIONS = {
  height: "100%",
  width: "100%",
  playerVars: {
    autoplay: 1,
    modestbranding: 1,
    rel: 0,
  },
};

const VideoSlide = ({
  video,
  setVideoPlay,
}: {
  video: ISubContent;
  setVideoPlay?: (play: boolean) => void;
}) => {
  const { url, title, description } = video;
  const [showPlayer, setShowPlayer] = useState(false);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const youtubePlayerRef = useRef<any>(null);

  const videoId = getYouTubeId(url);
  const thumbnailUrl = getYouTubeThumbnail(url);

  // Handle YouTube player ready event
  const handleReady = useCallback((event: YouTubeEvent<any>) => {
    youtubePlayerRef.current = event.target;
    setIsPlayerReady(true);
  }, []);

  // Pause video when it scrolls out of view (optimized with throttling)
  useEffect(() => {
    if (!containerRef?.current || !isPlayerReady || !youtubePlayerRef.current || !showPlayer) {
      return;
    }

    const container = containerRef.current;
    let ticking = false;

    const pauseYouTubeVideo = () => {
      try {
        if (youtubePlayerRef.current) {
          const playerState = youtubePlayerRef.current.getPlayerState();
          if (playerState === 1) {
            youtubePlayerRef.current.pauseVideo();
          }
        }
      } catch (error) {
        // Silently handle errors
      }
    };

    const checkVisibility = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const rect = container.getBoundingClientRect();
          const isVisible =
            rect.top < window.innerHeight &&
            rect.bottom > 0 &&
            rect.left < window.innerWidth &&
            rect.right > 0;

          if (!isVisible) {
            pauseYouTubeVideo();
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    // Throttled scroll handler
    window.addEventListener("scroll", checkVisibility, { passive: true });
    window.addEventListener("resize", checkVisibility, { passive: true });

    return () => {
      window.removeEventListener("scroll", checkVisibility);
      window.removeEventListener("resize", checkVisibility);
    };
  }, [isPlayerReady, showPlayer]);

  const handlePlay = useCallback(() => {
    setShowPlayer(true);
    if (setVideoPlay) {
      setVideoPlay(true);
    }
  }, [setVideoPlay]);

  const handlePause = useCallback(() => {
    if (setVideoPlay) {
      setVideoPlay(false);
    }
  }, [setVideoPlay]);

  return (
    <div className="group overflow-hidden relative bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-purple-300">
      {/* Video Container */}
      <div className="relative w-full bg-gray-900 rounded-t-xl sm:rounded-t-2xl overflow-hidden aspect-video">
        {!showPlayer ? (
          // Thumbnail with Play Button - Always visible, lazy loaded
          <div className="relative w-full h-full cursor-pointer" onClick={handlePlay}>
            {thumbnailUrl ? (
              <Image
                src={thumbnailUrl}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900"></div>
            )}

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300"></div>

            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-red-600 rounded-full flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform duration-300 group-hover:bg-red-700">
                <FaPlay className="text-white text-2xl md:text-3xl ml-1" />
              </div>
            </div>

            {/* YouTube Badge */}
            <div className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1.5 rounded-lg flex items-center gap-2 text-xs font-bold shadow-lg">
              <FaYoutube className="text-sm" />
              <span>YouTube</span>
            </div>

            {/* Info Overlay */}
            <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded text-xs font-medium">
              Click to play
            </div>
          </div>
        ) : (
          // YouTube Player when playing - Only loads when clicked
          videoId && (
            <div ref={containerRef} className="absolute inset-0 w-full h-full">
              <div className="absolute inset-0 bg-black rounded-t-xl sm:rounded-t-2xl" />
              <YouTube
                className="absolute inset-0 rounded-t-xl sm:rounded-t-2xl"
                videoId={videoId}
                opts={YOUTUBE_PLAYER_OPTIONS}
                onReady={handleReady}
                onPause={handlePause}
              />
            </div>
          )
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 sm:p-5 md:p-6 space-y-3 bg-white">
        {/* Title */}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="block group/link"
        >
          <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 line-clamp-2 group-hover/link:text-purple-600 transition-colors duration-200 leading-tight">
            {title}
            <FaExternalLinkAlt className="inline-block ml-2 text-xs opacity-0 group-hover/link:opacity-100 transition-opacity duration-200" />
          </h3>
        </a>

        {/* Description */}
        {description && (
          <p className="text-sm sm:text-base text-gray-600 line-clamp-2 leading-relaxed">
            {description}
          </p>
        )}

        {/* Watch Link */}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-lg transition-all duration-200 group/watch shadow-md hover:shadow-lg"
        >
          <FaYoutube className="text-base" />
          <span>Watch on YouTube</span>
          <FaExternalLinkAlt className="text-xs group-hover/watch:translate-x-0.5 transition-transform duration-200" />
        </a>
      </div>
    </div>
  );
};

export default memo(VideoSlide);
