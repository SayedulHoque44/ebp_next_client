import React from "react";
// import { IconUse } from "../UI/IconUse";
import { mediaProvider } from "@/constants/mediaProvider";
import Image from "next/image";

/**
 * Custom Play Button Overlay Component
 * Reusable play button overlay with responsive sizing for video thumbnails
 *
 * @param {Object} props
 * @param {Function} props.onClick - Click handler function
 * @param {string} props.className - Additional CSS classes for the container
 * @param {string} props.ariaLabel - Accessibility label (default: "Play video")
 */
const CustomPlayButton = ({
  onClick,
  className = "",
  ariaLabel = "Play video",
}: {
  onClick: () => void;
  className?: string;
  ariaLabel?: string;
}) => {
  return (
    <div
      className={`absolute inset-0 bg-black/30 rounded-2xl flex justify-center items-center transition-opacity group-hover:bg-black/40 ${className}`}
    >
      {/* Outer ring - responsive sizing */}
      <div className="bg-white/50 p-3 sm:p-4 md:p-5 lg:p-6 rounded-full transition-transform group-hover:scale-110">
        {/* Inner circle - responsive sizing */}
        <div className="bg-white p-2.5 sm:p-3 md:p-4 lg:p-5 rounded-full">
          {/* Play icon - responsive sizing */}
          <Image
            src={mediaProvider.play}
            width={100}
            height={100}
            className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-7 lg:w-7"
            alt="Play icon"
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
};

/**
 * Video Thumbnail with Custom Play Button Component
 * Complete thumbnail wrapper with play button overlay
 *
 * @param {Object} props
 * @param {string} props.coverUrl - Thumbnail image URL
 * @param {Function} props.onPlayClick - Click handler for play button
 * @param {string} props.className - Additional CSS classes for the container
 * @param {string} props.alt - Alt text for the thumbnail image
 */
export const VideoThumbnailWithPlayButton = ({
  coverUrl,
  onPlayClick,
  className = "",
  alt = "Video thumbnail",
}: {
  coverUrl: string;
  onPlayClick: () => void;
  className?: string;
  alt?: string;
}) => {
  return (
    <div
      className={`w-full relative rounded-2xl overflow-hidden bg-black flex justify-center items-center cursor-pointer group ${className}`}
      onClick={onPlayClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onPlayClick();
        }
      }}
      aria-label="Play video"
    >
      {/* Custom Play Button Overlay */}
      <CustomPlayButton onClick={onPlayClick} />

      {/* Cover image */}
      <Image
        src={coverUrl}
        width={100}
        height={100}
        className="w-full h-auto"
        alt={alt}
        loading="lazy"
      />
    </div>
  );
};

export default CustomPlayButton;
