"use client";
import React, { useState, useRef, useEffect } from "react";
import YouTube, { YouTubeEvent } from "react-youtube";
import { VideoThumbnailWithPlayButton } from "@/components/shared/CustomPlayButton";
import Image from "next/image";

// Constants
const DEFAULT_THUMBNAIL_URL =
  "https://d1vstek0gf8y4r.cloudfront.net/Ebp_Assets/১০ বছরের ড্রাইভিং অভিজ্ঞতা .png";

const YOUTUBE_PLAYER_OPTIONS = {
  height: "100%",
  width: "100%",
  playerVars: {
    autoplay: 1,
  },
};

/**
 * YouTube Video Player Component
 * Displays a YouTube video with optional custom cover image
 *
 * @param {Object} props
 * @param {string} props.coverUrl - Optional custom thumbnail/cover image URL
 * @param {string} props.YTId - YouTube video ID
 * @param {boolean} props.pauseOnScrollOut - Pause video when it scrolls out of view (default: true)
 */
const YTVideoPlayer = ({
  coverUrl,
  YTId,
  pauseOnScrollOut = true,
}: {
  coverUrl: string;
  YTId: string;
  pauseOnScrollOut?: boolean;
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  // If no cover URL provided, show video directly with default thumbnail as placeholder
  if (!coverUrl) {
    return (
      <div
        ref={containerRef}
        className="w-full relative rounded-2xl overflow-hidden"
      >
        <div className="absolute inset-0 bg-black rounded-2xl" />
        <Image
          src={DEFAULT_THUMBNAIL_URL}
          className="w-full opacity-0"
          alt="Thumbnail placeholder"
          aria-hidden="true"
        />
        <YouTubePlayer
          videoId={YTId}
          containerRef={containerRef as React.RefObject<HTMLDivElement>}
          pauseOnScrollOut={pauseOnScrollOut}
        />
      </div>
    );
  }

  // Render with custom cover and play button overlay
  return (
    <div
      ref={containerRef}
      className="border-2 border-purple-600 p-1 sm:p-2 rounded-2xl"
    >
      <div className="relative">
        {!isPlaying ? (
          <VideoThumbnailWithPlayButton
            coverUrl={coverUrl}
            onPlayClick={handlePlayClick}
          />
        ) : (
          <YouTubePlayer
            videoId={YTId}
            containerRef={containerRef as React.RefObject<HTMLDivElement>}
            pauseOnScrollOut={pauseOnScrollOut}
          />
        )}
      </div>
    </div>
  );
};

/**
 * YouTube Player Component
 * Renders the actual YouTube player when video is playing
 */
const YouTubePlayer = ({
  videoId,
  containerRef,
  pauseOnScrollOut = true,
}: {
  videoId: string;
  containerRef: React.RefObject<HTMLDivElement>;
  pauseOnScrollOut: boolean;
}) => {
  const youtubePlayerRef = useRef<HTMLElement>(null);
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  // Handle YouTube player ready event
  const handleReady = (event: YouTubeEvent<HTMLElement>) => {
    youtubePlayerRef.current = event.target;
    setIsPlayerReady(true);
  };

  // Intersection Observer to pause YouTube video when it scrolls out of view
  useEffect(() => {
    if (
      !pauseOnScrollOut ||
      !containerRef?.current ||
      !isPlayerReady ||
      !youtubePlayerRef.current
    )
      return;

    const container = containerRef.current;

    const pauseYouTubeVideo = () => {
      try {
        if (youtubePlayerRef.current) {
          // Get player state - 1 = playing, 2 = paused
          const playerState = (
            youtubePlayerRef.current as any
          ).getPlayerState();
          if (playerState === 1) {
            // Video is playing, pause it
            (youtubePlayerRef.current as any).pauseVideo();
          }
        }
      } catch (error) {
        // Silently handle errors (player might not be ready)
      }
    };

    const checkVisibility = () => {
      const rect = container.getBoundingClientRect();
      const isVisible =
        rect.top < window.innerHeight &&
        rect.bottom > 0 &&
        rect.left < window.innerWidth &&
        rect.right > 0;

      if (!isVisible) {
        pauseYouTubeVideo();
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            // Use requestAnimationFrame for smoother execution
            requestAnimationFrame(() => {
              pauseYouTubeVideo();
            });
          }
        });
      },
      {
        threshold: 0, // Trigger as soon as any part leaves viewport
        rootMargin: "0px",
      }
    );

    observer.observe(container);

    // Also add scroll listener as fallback
    const handleScroll = () => {
      checkVisibility();
    };

    // Throttle scroll events
    let scrollTimeout: number | null = null;
    const throttledScrollHandler = () => {
      if (scrollTimeout) {
        cancelAnimationFrame(scrollTimeout);
      }
      scrollTimeout = requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", throttledScrollHandler, {
      passive: true,
    });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", throttledScrollHandler);
      if (scrollTimeout) {
        cancelAnimationFrame(scrollTimeout);
      }
    };
  }, [pauseOnScrollOut, containerRef, isPlayerReady]);

  return (
    <div className="w-full relative rounded-2xl overflow-hidden">
      <div className="absolute inset-0 bg-black rounded-2xl" />
      <Image
        src={DEFAULT_THUMBNAIL_URL}
        width={100}
        height={100}
        className="w-full opacity-0"
        alt="Thumbnail placeholder"
        aria-hidden="true"
      />
      <YouTube
        className="absolute inset-0 rounded-2xl"
        videoId={videoId}
        opts={YOUTUBE_PLAYER_OPTIONS}
        onReady={handleReady}
      />
    </div>
  );
};

export default YTVideoPlayer;
