"use client";
import captionStyles from "./captions.module.css";
import styles from "./video-controlls.module.css";

import {
  Captions,
  ChapterTitle,
  Controls,
  Gesture,
  SeekButton,
  Spinner,
  TimeSlider,
  Title,
  VolumeSlider,
} from "@vidstack/react";
import { TbRewindBackward10, TbRewindForward10 } from "react-icons/tb";

import * as Buttons from "./buttons";
import * as Menus from "./menus";
import * as Sliders from "./sliders";
import { TimeGroup } from "./time-group";
import React from "react";

export function VideoLayout({ thumbnails }: { thumbnails: any }) {
  return (
    <>
      <Gesture
        className={styles.gesture}
        event="pointerup"
        action="toggle:paused"
      />
      <Gesture
        className={styles.gesture}
        event="dblpointerup"
        action="toggle:fullscreen"
      />
      <Gesture
        className={styles.gesture}
        event="pointerup"
        action="toggle:controls"
      />
      <Gesture
        className={styles.gesture}
        event="dblpointerup"
        action="seek:-10"
      />
      <Gesture
        className={styles.gesture}
        event="dblpointerup"
        action="seek:10"
      />
      {/* LOADING */}
      <div className="pointer-events-none absolute inset-0 z-[100] flex h-full w-full items-center justify-center">
        <Spinner.Root
          className="text-white opacity-0 transition-opacity duration-200 ease-linear media-buffering:animate-spin media-buffering:opacity-100"
          size={88}
        >
          <Spinner.Track className="opacity-25" width={8} />
          <Spinner.TrackFill className="opacity-75" width={8} />
        </Spinner.Root>
      </div>
      <Captions
        className={`${captionStyles.captions} media-preview:opacity-0 media-controls:bottom-[85px] media-captions:opacity-100 absolute inset-0 bottom-2 z-10 select-none break-words opacity-0 transition-[opacity,bottom] duration-300 bg-red-500`}
      />
      <Controls.Root
        className={`${styles.controls} media-controls:opacity-100 absolute inset-0 z-10 flex h-full w-full flex-col bg-gradient-to-t from-black/10 to-transparent opacity-0 transition-opacity`}
      >
        <Controls.Group className="flex justify-between items-center w-full px-1 pt-1">
          <div className="flex sm:hidden items-center justify-between w-full">
            {/* <Buttons.ChromeCast tooltipPlacement='top'/> */}
            <div className="flex-1"></div>
            <div className="flex sm:hidden items-center">
              {/* {subtitles?.length > 0 && (
                <Buttons.Caption tooltipPlacement="top" />
              )} */}
              <Menus.Settings
                placement="top end"
                tooltipPlacement="top"
                iconProps={{ size: 24 }}
              />
              {/* <Buttons.Mute offset={10} tooltipPlacement="bottom" /> */}
            </div>
          </div>
        </Controls.Group>
        {/* Mobile Playbtn */}
        <Controls.Group
          className={`duration-200 ease-out flex sm:hidden gap-5 items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20`}
        >
          <div className="sm:hidden backdrop-blur-lg shadow bg-black/65 rounded-full">
            <SeekButton
              className="ring-sky-400 relative inline-flex h-7 w-7 md:h-10 md:w-10 cursor-pointer items-center justify-center rounded-full outline-none ring-inset hover:bg-white/20 data-[focus]:ring-4 aria-hidden:hidden bg-P-primary"
              seconds={-10}
            >
              <TbRewindBackward10 className="text-white w-4 h-4 md:w-6 md:h-6" />
              {/* <Rewind className="text-white w-4 h-4 md:w-6 md:h-6" /> */}
            </SeekButton>
          </div>

          <div className="sm:hidden backdrop-blur-lg shadow bg-black/65 rounded-full">
            <Buttons.MobilePlayButton tooltipPlacement="top center" />
          </div>
          <div className="sm:hidden backdrop-blur-lg shadow bg-black/65 rounded-full">
            <SeekButton
              className="ring-sky-400 relative inline-flex h-7 w-7 md:h-10 md:w-10 cursor-pointer items-center justify-center rounded-full outline-none ring-inset hover:bg-white/20 data-[focus]:ring-4 aria-hidden:hidden bg-P-primary"
              seconds={10}
            >
              {/* <FastForward className="text-white w-4 h-4 md:w-6 md:h-6" /> */}
              <TbRewindForward10 className="text-white w-4 h-4 md:w-6 md:h-6" />
            </SeekButton>
          </div>
        </Controls.Group>

        {/* Desktop Playbtn */}
        <Controls.Group
          className={`hidden media-paused:opacity-100 media-paused:scale-100 backdrop-blur-lg scale-[150%] opacity-0 duration-200 ease-out sm:flex shadow bg-black/65 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
        >
          <Buttons.DesktopPlayButton tooltipPlacement="top center" />
        </Controls.Group>

        {/* Desktop Display */}
        <div className={styles.spacer} />
        <Controls.Group className={`${styles.controlsGroup}`}>
          <TimeSlider.Root className="group relative mx-[7.5px] inline-flex h-7 md:h-10 w-full cursor-pointer touch-none select-none items-center outline-none aria-hidden:hidden">
            <TimeSlider.Chapters className="relative flex h-full w-full items-center rounded-[1px]">
              {(cues, forwardRef) =>
                cues.map((cue) => (
                  <div
                    className="last-child:mr-0 relative mr-0.5 flex h-full w-full items-center rounded-[1px]"
                    style={{ contain: "layout style" }}
                    key={cue.startTime}
                    ref={forwardRef}
                  >
                    <TimeSlider.Track className="relative ring-sky-400 z-0 h-[5px] w-full rounded-sm bg-white/30 group-data-[focus]:ring-[3px]">
                      <TimeSlider.TrackFill className="bg-red-600 absolute h-full w-[var(--chapter-fill)] rounded-sm will-change-[width] z-[11]" />
                      <TimeSlider.Progress className="absolute z-10 h-full w-[var(--chapter-progress)] rounded-sm bg-white/50 will-change-[width]" />
                    </TimeSlider.Track>
                  </div>
                ))
              }
            </TimeSlider.Chapters>

            <TimeSlider.Preview
              className="flex flex-col items-center opacity-0 transition-opacity duration-200 data-[visible]:opacity-100 pointer-events-none"
              noClamp
            >
              <TimeSlider.ChapterTitle className="text-sm" />
              <TimeSlider.Thumbnail.Root
                className="block h-[var(--thumbnail-height)] max-h-[160px] min-h-[80px] w-[var(--thumbnail-width)] min-w-[120px] max-w-[180px] overflow-hidden border border-white bg-black"
                src={thumbnails}
              >
                <TimeSlider.Thumbnail.Img />
              </TimeSlider.Thumbnail.Root>
              <TimeSlider.Value className="rounded-sm bg-black px-2 py-px text-[13px] font-medium text-white" />
            </TimeSlider.Preview>

            <TimeSlider.Thumb className="absolute left-[var(--slider-fill)] top-1/2 z-20 h-[15px] w-[15px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#cacaca] bg-white opacity-0 ring-white/40 transition-opacity group-data-[active]:opacity-100 group-data-[dragging]:ring-4 will-change-[left]" />
          </TimeSlider.Root>
        </Controls.Group>
        <Controls.Group className={`${styles.controlsGroup} pb-[10px]`}>
          <Buttons.Play tooltipPlacement="top start" />
          <Buttons.Mute tooltipPlacement="top" />
          <VolumeSlider.Root className="group relative mx-[7.5px] inline-flex h-7 md:h-10 w-full max-w-[80px] cursor-pointer touch-none select-none items-center outline-none aria-hidden:hidden">
            <VolumeSlider.Track className="relative ring-sky-400 z-0 h-[5px] w-full rounded-sm bg-white/30 group-data-[focus]:ring-[3px]">
              <VolumeSlider.TrackFill className="bg-white absolute h-full w-[var(--slider-fill)] rounded-sm will-change-[width]" />
            </VolumeSlider.Track>

            <VolumeSlider.Preview
              className="flex flex-col items-center opacity-0 transition-opacity duration-200 data-[visible]:opacity-100 pointer-events-none"
              noClamp
            >
              <VolumeSlider.Value className="rounded-sm bg-black px-2 py-px text-[13px] font-medium text-white" />
            </VolumeSlider.Preview>

            <VolumeSlider.Thumb className="absolute left-[var(--slider-fill)] top-1/2 z-20 h-[15px] w-[15px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#cacaca] bg-white opacity-0 ring-white/40 transition-opacity group-data-[active]:opacity-100 group-data-[dragging]:ring-4 will-change-[left]" />
          </VolumeSlider.Root>
          <TimeGroup />
          <span className="inline-block flex-1 overflow-hidden text-ellipsis whitespace-nowrap px-2 text-sm font-medium text-white/70">
            <span className="mr-1">|</span>
            <ChapterTitle />
            <Title />
          </span>
          <div className="flex-1" />
          {/* Next prev */}
          {/* <Buttons.NextBtn /> */}
          <SeekButton
            className="ring-sky-400 relative inline-flex h-7 w-7 md:h-10 md:w-10 cursor-pointer items-center justify-center rounded-md outline-none ring-inset hover:bg-white/20 data-[focus]:ring-4 aria-hidden:hidden"
            seconds={-10}
          >
            <TbRewindBackward10 className="text-white w-4 h-4 md:w-6 md:h-6" />
            {/* <Rewind className="text-white w-4 h-4 md:w-6 md:h-6" /> */}
          </SeekButton>
          <SeekButton
            className="ring-sky-400 relative inline-flex h-7 w-7 md:h-10 md:w-10 cursor-pointer items-center justify-center rounded-md outline-none ring-inset hover:bg-white/20 data-[focus]:ring-4 aria-hidden:hidden"
            seconds={10}
          >
            {/* <FastForward className="text-white w-4 h-4 md:w-6 md:h-6" /> */}
            <TbRewindForward10 className="text-white w-4 h-4 md:w-6 md:h-6" />
          </SeekButton>
          <Buttons.Caption tooltipPlacement="top" />
          <Menus.Settings
            placement="top end"
            tooltipPlacement="top"
            iconProps={{ size: 20, color: "white" }}
          />
          <Buttons.PIP
            tooltipPlacement="top"
            iconProps={{ size: 20, color: "white" }}
          />
          <Buttons.Fullscreen
            tooltipPlacement="top end"
            iconProps={{ size: 20, color: "white" }}
          />
        </Controls.Group>

        {/* mobile controls */}
        <Controls.Group className="flex sm:hidden w-full items-center px-[10px] z-20 mb-[-5px]">
          <div className="w-full flex items-center justify-between z-20">
            <TimeGroup />
            <div className="flex">
              <Buttons.PIP
                tooltipPlacement="top"
                iconProps={{ size: 24, color: "white" }}
              />
              <Buttons.Fullscreen
                tooltipPlacement="top end"
                iconProps={{ size: 24, color: "white" }}
              />
            </div>
          </div>
        </Controls.Group>
        <Controls.Group className="flex sm:hidden w-full items-center px-1 pb-1 z-20 mb-[10px] ">
          <Sliders.Time thumbnails={thumbnails} />
        </Controls.Group>
      </Controls.Root>
    </>
  );
}
