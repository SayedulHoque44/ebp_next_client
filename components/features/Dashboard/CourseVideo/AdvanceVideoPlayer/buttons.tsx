"use client";
import React from "react";
import {
  ArrowCounterClockwise,
  ArrowsIn,
  ArrowsOut,
  ClosedCaptioning,
  CornersIn,
  CornersOut,
  Pause,
  PictureInPicture,
  Play as PlayB,
  Rectangle,
  SkipBack,
  SkipForward,
  SpeakerSimpleHigh,
  SpeakerSimpleLow,
  SpeakerSimpleX,
} from "@phosphor-icons/react/dist/ssr";
import {
  CaptionButton,
  FullscreenButton,
  isTrackCaptionKind,
  MuteButton,
  PIPButton,
  PlayButton,
  Tooltip,
  useMediaState,
} from "@vidstack/react";
import { NextIcon } from "@vidstack/react/icons";

export const buttonClass =
  "group ring-media-focus relative inline-flex h-7 w-7 md:h-10 md:w-10 w-auto mx-1 cursor-pointer items-center justify-center rounded-md outline-none ring-inset hover:bg-white/20 data-[focus]:ring-4";

export const tooltipClass =
  "animate-out fade-out slide-out-to-bottom-2 data-[visible]:animate-in data-[visible]:fade-in data-[visible]:slide-in-from-bottom-4 z-10 rounded-sm bg-black/90 px-2 py-0.5 text-sm font-medium text-white parent-data-[open]:hidden";

export function Play({ tooltipPlacement }: { tooltipPlacement: string }) {
  const isPaused = useMediaState("paused");
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <PlayButton className={buttonClass}>
          {isPaused ? (
            <PlayB weight="fill" className="text-white w-4 h-4 md:w-6 md:h-6" />
          ) : (
            <Pause weight="fill" className="text-white w-4 h-4 md:w-6 md:h-6" />
          )}
        </PlayButton>
      </Tooltip.Trigger>
      <Tooltip.Content className={tooltipClass} placement={tooltipPlacement as any}>
        {isPaused ? "Play" : "Pause"}
      </Tooltip.Content>
    </Tooltip.Root>
  );
}

export function DesktopPlayButton({ tooltipPlacement }: { tooltipPlacement: string }) {
  const isPaused = useMediaState("paused"),
    ended = useMediaState("ended"),
    isPlaying = useMediaState("playing");
  return (
    <PlayButton
      className={`group ring-media-focus relative inline-flex h-16 w-16 media-paused:cursor-pointer cursor-default items-center justify-center rounded-full outline-none`}
    >
      {ended ? (
        <ArrowCounterClockwise className="w-6 h-6" />
      ) : isPaused ? (
        <PlayB className="w-6 h-6" weight="fill" />
      ) : isPlaying ? (
        <Pause className="w-6 h-6" weight="fill" />
      ) : (
        <Pause className="w-6 h-6" weight="fill" />
      )}
    </PlayButton>
  );
}

export function MobilePlayButton({ tooltipPlacement }: { tooltipPlacement: string }) {
  const isPaused = useMediaState("paused"),
    ended = useMediaState("ended");
  return (
    <PlayButton
      className={` group ring-media-focus relative inline-flex h-12 w-12 cursor-pointer items-center justify-center rounded-full outline-none bg-P-primary`}
    >
      {ended ? (
        <ArrowCounterClockwise className="w-4 h-4" />
      ) : isPaused ? (
        <PlayB className="w-4 h-4" weight="fill" />
      ) : (
        <Pause className="w-4 h-4" weight="fill" />
      )}
    </PlayButton>
  );
}

export function Mute({ tooltipPlacement }: { tooltipPlacement: string }) {
  const volume = useMediaState("volume"),
    isMuted = useMediaState("muted");
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <MuteButton className={buttonClass}>
          {isMuted || volume == 0 ? (
            <SpeakerSimpleX
              weight="fill"
              className="text-white w-4 h-4 md:w-6 md:h-6"
            />
          ) : volume < 0.5 ? (
            <SpeakerSimpleLow
              weight="fill"
              className="text-white w-4 h-4 md:w-6 md:h-6"
            />
          ) : (
            <SpeakerSimpleHigh
              weight="fill"
              className="text-white w-4 h-4 md:w-6 md:h-6"
            />
          )}
        </MuteButton>
      </Tooltip.Trigger>
      <Tooltip.Content className={tooltipClass} placement={tooltipPlacement as any}>
        {isMuted ? "Unmute" : "Mute"}
      </Tooltip.Content>
    </Tooltip.Root>
  );
}

export function Caption({ tooltipPlacement }: { tooltipPlacement: string }) {
  const track = useMediaState("textTrack"),
    isOn = track && isTrackCaptionKind(track);
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <CaptionButton className={buttonClass}>
          {isOn ? (
            <ClosedCaptioning
              weight="fill"
              className="text-white w-4 h-4 md:w-6 md:h-6"
            />
          ) : (
            <ClosedCaptioning className="text-white w-4 h-4 md:w-6 md:h-6" />
          )}
        </CaptionButton>
      </Tooltip.Trigger>
      <Tooltip.Content className={tooltipClass} placement={tooltipPlacement as any}>
        {isOn ? "Closed-Captions Off" : "Closed-Captions On"}
      </Tooltip.Content>
    </Tooltip.Root>
  );
}
export function NextBtn({ tooltipPlacement }: { tooltipPlacement: string }) {
  const track = useMediaState("textTrack"),
    isOn = track && isTrackCaptionKind(track);
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <CaptionButton className={buttonClass}>
          {isOn ? (
            <NextIcon
              height={16}
              width={16}
              color="white"
            />
          ) : (
            <NextIcon className="text-white w-4 h-4 md:w-6 md:h-6" />
          )}
        </CaptionButton>
      </Tooltip.Trigger>
      <Tooltip.Content className={tooltipClass} placement={tooltipPlacement as any}>
        {isOn ? "Closed-Captions Off" : "Closed-Captions On"}
      </Tooltip.Content>
    </Tooltip.Root>
  );
}

/** Previous / next lesson in the playlist. */
export function LessonNav({
  direction,
  tooltipPlacement,
  onClick,
  disabled,
}: {
  direction: "prev" | "next";
  tooltipPlacement: string;
  onClick?: () => void;
  disabled?: boolean;
}) {
  const isNext = direction === "next";
  const Icon = isNext ? SkipForward : SkipBack;
  const label = isNext ? "Next lesson" : "Previous lesson";
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <button
          type="button"
          onClick={onClick}
          disabled={disabled}
          aria-label={label}
          className={`${buttonClass} disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent`}
        >
          <Icon weight="fill" className="text-white w-4 h-4 md:w-5 md:h-5" />
        </button>
      </Tooltip.Trigger>
      <Tooltip.Content className={tooltipClass} placement={tooltipPlacement as any}>
        {label} ({isNext ? "Shift+N" : "Shift+P"})
      </Tooltip.Content>
    </Tooltip.Root>
  );
}

/** Theater mode toggle. Hidden in fullscreen, where it has no effect. */
export function Theater({
  tooltipPlacement,
  active,
  onClick,
}: {
  tooltipPlacement: string;
  active?: boolean;
  onClick?: () => void;
}) {
  const isFullscreen = useMediaState("fullscreen");
  if (isFullscreen) return null;
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <button
          type="button"
          onClick={onClick}
          aria-label={active ? "Exit theater mode" : "Theater mode"}
          aria-pressed={!!active}
          className={buttonClass}
        >
          <Rectangle
            weight={active ? "fill" : "regular"}
            size={22}
            color="white"
          />
        </button>
      </Tooltip.Trigger>
      <Tooltip.Content className={tooltipClass} placement={tooltipPlacement as any}>
        {active ? "Exit theater mode (T)" : "Theater mode (T)"}
      </Tooltip.Content>
    </Tooltip.Root>
  );
}

export function PIP({ tooltipPlacement, iconProps = {} }: { tooltipPlacement: string, iconProps: any }) {
  const isActive = useMediaState("pictureInPicture");
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <PIPButton className={buttonClass}>
          {isActive ? (
            <PictureInPicture weight="fill" {...iconProps} />
          ) : (
            <PictureInPicture {...iconProps} />
          )}
        </PIPButton>
      </Tooltip.Trigger>
      <Tooltip.Content className={tooltipClass} placement={tooltipPlacement as any}>
        {isActive ? "Exit PIP" : "Enter PIP"}
      </Tooltip.Content>
    </Tooltip.Root>
  );
}

export function Fullscreen({ tooltipPlacement, iconProps = {} }: { tooltipPlacement: string, iconProps: any }) {
  const isActive = useMediaState("fullscreen");
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <FullscreenButton className={buttonClass}>
          {isActive ? (
            <CornersIn {...iconProps} />
          ) : (
            <CornersOut {...iconProps} />
          )}
        </FullscreenButton>
      </Tooltip.Trigger>
      <Tooltip.Content className={tooltipClass} placement={tooltipPlacement as any}>
        {isActive ? "Exit Fullscreen" : "Enter Fullscreen"}
      </Tooltip.Content>
    </Tooltip.Root>
  );
}
