import React, { useCallback, memo } from "react";
import ReactPlayer from "react-player";
import { useIntersectionObserver } from "@uidotdev/usehooks";
import { FaPlay, FaExternalLinkAlt } from "react-icons/fa";
import { IYTVideo } from "@/features/YTVideo/interface/yTVideo.interface";
import { ISubContent } from "@/features/UniContent/interface/uniContent.interface";

const VideoSlide = ({
  video,
  setVideoPlay,
}: {
  video: ISubContent;
  setVideoPlay?: (play: boolean) => void;
}) => {
  const { url, title, description } = video;

  const [ref, entry] = useIntersectionObserver({
    threshold: 0.1,
    root: null,
    rootMargin: "50px",
  });

  const handlePlay = useCallback(() => {
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
    <div
      ref={ref}
      className="group overflow-hidden relative bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-primary-200"
    >
      {entry?.isIntersecting ? (
        <>
          {/* Video Container */}
          <div className="relative w-full bg-gray-900 rounded-t-xl sm:rounded-t-2xl overflow-hidden aspect-video">
            <ReactPlayer
              url={url}
              width="100%"
              height="100%"
              controls={true}
              loop={true}
              playing={false}
              light={false}
              pip={false}
              onPlay={handlePlay}
              onPause={handlePause}
              {...({
                config: {
                  youtube: {
                    modestbranding: 1,
                    rel: 0,
                  },
                },
              } as any)}
              className="absolute top-0 left-0"
            />

            {/* Play Indicator Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2">
                <FaPlay className="text-primary-600 text-sm" />
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-4 sm:p-5 md:p-6 space-y-3">
            {/* Title */}
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="block group/link"
            >
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 line-clamp-2 group-hover/link:text-primary-600 transition-colors duration-200 leading-tight">
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
              className="inline-flex items-center text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors duration-200 group/watch"
            >
              <span>Watch on YouTube</span>
              <FaExternalLinkAlt className="ml-1.5 text-xs group-hover/watch:translate-x-0.5 transition-transform duration-200" />
            </a>
          </div>
        </>
      ) : (
        // Loading Placeholder
        <div className="relative w-full bg-gray-100 rounded-t-xl sm:rounded-t-2xl overflow-hidden aspect-video animate-pulse">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
              <FaPlay className="text-gray-400 text-xl ml-1" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(VideoSlide);
