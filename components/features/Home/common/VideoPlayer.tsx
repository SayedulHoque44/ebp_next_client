import { MediaPlayer, MediaProvider } from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import React, { useState, useRef, useCallback, useEffect } from "react";
import { VideoThumbnailWithPlayButton } from "@/components/shared/CustomPlayButton";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
/**
 * Master Video Player Component
 * A highly flexible and reusable video player with customizable features
 *
 * @example
 * // Basic usage with custom play button
 * <VideoPlayer
 *   videoLink="https://example.com/video.mp4"
 *   coverUrl="https://example.com/thumbnail.jpg"
 *   title="My Video"
 * />
 *
 * @example
 * // With event callbacks
 * <VideoPlayer
 *   videoLink="https://example.com/video.mp4"
 *   coverUrl="https://example.com/thumbnail.jpg"
 *   onPlay={(event, state) => //console.log('Playing:', state.isPlaying)}
 *   onPause={(event, state) => //console.log('Paused:', state)}
 *   onEnded={(event, state) => //console.log('Video ended')}
 * />
 *
 * @example
 * // Use Vidstack's default poster (no custom play button)
 * <VideoPlayer
 *   videoLink="https://example.com/video.mp4"
 *   coverUrl="https://example.com/thumbnail.jpg"
 *   showCustomPlayButton={false}
 * />
 *
 * @example
 * // With custom styling and player ref
 * const playerRef = useRef();
 * <VideoPlayer
 *   videoLink="https://example.com/video.mp4"
 *   playerRef={playerRef}
 *   wrapperClassName="my-custom-class"
 *   playerProps={{ preload: "metadata" }}
 * />
 *
 * @param {Object} props
 * @param {string} props.videoLink - Video source URL (required)
 * @param {string} props.coverUrl - Optional custom thumbnail/cover image URL
 * @param {string} props.title - Video title
 * @param {boolean} props.showCustomPlayButton - Show custom play button overlay (default: true if coverUrl provided)
 * @param {boolean} props.autoPlay - Auto-play video on load (default: false)
 * @param {Function} props.onPlay - Callback when video starts playing (event, playerState)
 * @param {Function} props.onPause - Callback when video is paused (event, playerState)
 * @param {Function} props.onEnded - Callback when video ends (event, playerState)
 * @param {Function} props.onTimeUpdate - Callback on time update (event, playerState)
 * @param {Function} props.onLoadedData - Callback when video data is loaded (event, playerState)
 * @param {Function} props.onError - Callback on player error (event, playerState)
 * @param {string} props.wrapperClassName - Additional CSS classes for wrapper div
 * @param {Object} props.playerProps - Additional props to pass to MediaPlayer
 * @param {React.Ref} props.playerRef - Ref to access MediaPlayer instance
 * @param {React.ReactNode} props.children - Custom children to render inside MediaPlayer (replaces DefaultVideoLayout)
 * @param {boolean} props.pauseOnScrollOut - Pause video when it scrolls out of view (default: true)
 */
const VideoPlayer = ({
  videoLink,
  coverUrl,
  title = "Latest Video",
  showCustomPlayButton = undefined, // undefined means auto-detect based on coverUrl
  autoPlay = false,
  onPlay,
  onPause,
  onEnded,
  onTimeUpdate,
  onLoadedData,
  onError,
  wrapperClassName = "",
  playerProps = {},
  playerRef: externalPlayerRef,
  children,
  pauseOnScrollOut = true,
}: any) => {
  const [showThumbnail, setShowThumbnail] = useState(true);
  const [shouldAutoPlayAfterThumbnail, setShouldAutoPlayAfterThumbnail] =
    useState(false);
  const [playerState, setPlayerState] = useState({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 1,
    muted: false,
  });

  const internalPlayerRef = useRef(null);
  const playerRef = externalPlayerRef || internalPlayerRef;
  const containerRef = useRef(null);

  // Auto-detect if we should show custom play button
  const shouldShowCustomPlayButton =
    showCustomPlayButton !== undefined
      ? showCustomPlayButton
      : Boolean(coverUrl);

  // Handle play click from thumbnail
  const handleThumbnailPlayClick = useCallback(() => {
    setShowThumbnail(false);
    setShouldAutoPlayAfterThumbnail(true);
  }, []);

  // Event handlers with callbacks
  const handlePlay = useCallback(
    (event: any) => {
      const newState = {
        ...playerState,
        isPlaying: true,
      };
      setPlayerState(newState);
      if (showThumbnail) setShowThumbnail(false);
      onPlay?.(event, newState);
    },
    [playerState, onPlay, showThumbnail]
  );

  const handlePause = useCallback(
    (event: any) => {
      const newState = {
        ...playerState,
        isPlaying: false,
      };
      setPlayerState(newState);
      onPause?.(event, newState);
    },
    [playerState, onPause]
  );

  const handleEnded = useCallback(
    (event: any) => {
      const newState = {
        ...playerState,
        isPlaying: false,
      };
      setPlayerState(newState);
      onEnded?.(event, newState);
    },
    [playerState, onEnded]
  );

  const handleTimeUpdate = useCallback(
    (event: any) => {
      if (event.target) {
        const newState = {
          ...playerState,
          currentTime: event.target.currentTime || 0,
          duration: event.target.duration || 0,
        };
        setPlayerState(newState);
        onTimeUpdate?.(event, newState);
      }
    },
    [playerState, onTimeUpdate]
  );

  const handleLoadedData = useCallback(
    (event: any) => {
      if (event.target) {
        const newState = {
          ...playerState,
          duration: event.target.duration || 0,
        };
        setPlayerState(newState);
        onLoadedData?.(event, newState);
      }
    },
    [playerState, onLoadedData]
  );

  const handleError = useCallback(
    (event: any) => {
      onError?.(event, playerState);
    },
    [onError, playerState]
  );

  // Intersection Observer to pause video when it scrolls out of view
  useEffect(() => {
    if (!pauseOnScrollOut || !containerRef.current) return;
    // Don't observe if we're still showing the thumbnail
    if (shouldShowCustomPlayButton && showThumbnail) return;

    const container: any = containerRef.current;

    const findAndPauseVideo = () => {
      // Find video element directly in the container (MediaPlayer renders video inside)
      const allVideos = container.querySelectorAll("video");
      for (const video of allVideos) {
        if (!video.paused) {
          video.pause();
          return true;
        }
      }

      // Also check if playerRef has a DOM element property (some refs expose it)
      if (playerRef.current) {
        // Check if it's a DOM element
        if (playerRef.current instanceof HTMLElement) {
          const videosInElement = playerRef.current.querySelectorAll("video");
          for (const video of videosInElement) {
            if (!video.paused) {
              video.pause();
              return true;
            }
          }
        }
        // Check if Vidstack exposes the media element
        else if (
          playerRef.current.media &&
          playerRef.current.media instanceof HTMLVideoElement
        ) {
          if (!playerRef.current.media.paused) {
            playerRef.current.media.pause();
            return true;
          }
        }
        // Try accessing through shadowRoot if exists
        else if (playerRef.current.shadowRoot) {
          const shadowVideos =
            playerRef.current.shadowRoot.querySelectorAll("video");
          for (const video of shadowVideos) {
            if (!video.paused) {
              video.pause();
              return true;
            }
          }
        }
      }

      return false;
    };

    const checkVisibility = () => {
      const rect = container.getBoundingClientRect();
      const isVisible =
        rect.top < window.innerHeight &&
        rect.bottom > 0 &&
        rect.left < window.innerWidth &&
        rect.right > 0;

      if (!isVisible) {
        findAndPauseVideo();
      }
    };

    const observer = new IntersectionObserver(
      (entries: any) => {
        entries.forEach((entry: any) => {
          if (!entry.isIntersecting) {
            // Use requestAnimationFrame for smoother execution
            requestAnimationFrame(() => {
              findAndPauseVideo();
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
    const handleScroll = (): void => {
      checkVisibility();
    };

    // Throttle scroll events
    let scrollTimeout: any;
    const throttledScrollHandler = (): void => {
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
  }, [pauseOnScrollOut, playerRef, shouldShowCustomPlayButton, showThumbnail]);

  // Default wrapper classes
  const defaultWrapperClasses = "border-2 border-purple-600 p-2 rounded-2xl";
  const wrapperClasses = wrapperClassName
    ? `${defaultWrapperClasses} ${wrapperClassName}`
    : defaultWrapperClasses;

  // If no cover URL and custom play button is not explicitly requested, show player directly
  if (!coverUrl && !shouldShowCustomPlayButton) {
    return (
      <div ref={containerRef} className={wrapperClasses}>
        <div className="relative">
          <MediaPlayer
            ref={playerRef}
            autoPlay={autoPlay}
            viewType="video"
            streamType="on-demand"
            logLevel="warn"
            playsInline
            title={title}
            src={videoLink}
            onPlay={handlePlay}
            onPause={handlePause}
            onEnded={handleEnded}
            onTimeUpdate={handleTimeUpdate}
            onLoadedData={handleLoadedData}
            onError={handleError}
            {...playerProps}
          >
            <MediaProvider />
            {children || <DefaultVideoLayout icons={defaultLayoutIcons} />}
          </MediaPlayer>
        </div>
      </div>
    );
  }

  // Render with custom thumbnail overlay if needed
  return (
    <div ref={containerRef} className={wrapperClasses}>
      <div className="relative">
        {shouldShowCustomPlayButton && showThumbnail && coverUrl ? (
          <VideoThumbnailWithPlayButton
            coverUrl={coverUrl}
            onPlayClick={handleThumbnailPlayClick}
          />
        ) : (
          <MediaPlayer
            ref={playerRef}
            autoPlay={autoPlay || shouldAutoPlayAfterThumbnail}
            viewType="video"
            streamType="on-demand"
            logLevel="warn"
            playsInline
            title={title}
            src={videoLink}
            poster={coverUrl}
            onPlay={handlePlay}
            onPause={handlePause}
            onEnded={handleEnded}
            onTimeUpdate={handleTimeUpdate}
            onLoadedData={handleLoadedData}
            onError={handleError}
            {...playerProps}
          >
            <MediaProvider />
            {children || <DefaultVideoLayout icons={defaultLayoutIcons} />}
          </MediaPlayer>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;
