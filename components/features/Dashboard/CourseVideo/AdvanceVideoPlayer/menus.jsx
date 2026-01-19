import { useState } from "react";

import {
  Menu,
  Tooltip,
  useAudioOptions,
  useCaptionOptions,
  usePlaybackRateOptions,
  useVideoQualityOptions,
} from "@vidstack/react";
import {
  CaretLeft,
  CaretRight,
  Check,
  ClosedCaptioning,
  Gauge,
  GearSix,
  MusicNoteSimple,
  PlayPause,
  SkipForward,
  Sliders,
} from "@phosphor-icons/react/dist/ssr";

import { buttonClass, tooltipClass } from "./buttons";
import styles from "./menu.module.css";
import { useStore } from "zustand";
import { useSettings } from "../../../../zustand/store";
// import { useSettings } from "@/zustand/store";

export const menuClass =
  "animate-out fade-out slide-out-to-bottom-2 data-[open]:animate-in data-[open]:fade-in data-[open]:slide-in-from-bottom-4 flex h-[var(--menu-height)] max-h-[400px] min-w-[260px] flex-col overflow-y-auto overscroll-y-contain rounded-md border border-white/10 bg-black/95 p-2.5 font-sans text-[15px] font-medium outline-none backdrop-blur-sm transition-[height] duration-300 will-change-[height] data-[resizing]:overflow-hidden z-50";

export const submenuClass =
  "hidden w-full flex-col items-start justify-center outline-none data-[keyboard]:mt-[3px] data-[open]:inline-block";

const submenuClassName =
    "hidden w-full flex-col items-start justify-center outline-none data-[keyboard]:mt-[3px] data-[open]:inline-block",
  radioClassName =
    "ring-sky-400 group relative flex w-full cursor-pointer select-none items-center justify-start rounded-sm p-2.5 outline-none data-[hocus]:bg-white/10 data-[focus]:ring-[3px]",
  radioIconClassName = "h-4 w-4 text-white group-data-[checked]:hidden",
  radioSelectedIconClassName =
    "text-white hidden h-4 w-4 group-data-[checked]:block";

export function Settings({ placement, tooltipPlacement, iconProps = {} }) {
  return (
    <Menu.Root className="parent z-50">
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <Menu.Button className={buttonClass}>
            <GearSix
              weight="fill"
              className="transform transition-transform duration-200 ease-out group-data-[open]:rotate-90"
              {...iconProps}
            />
          </Menu.Button>
        </Tooltip.Trigger>
        <Tooltip.Content className={tooltipClass} placement={tooltipPlacement}>
          Settings
        </Tooltip.Content>
      </Tooltip.Root>
      <Menu.Content className={menuClass} placement={placement}>
        <AutoPlay />
        <AutoNext />
        <AutoSkip />
        <CaptionSubmenu />
        <SpeedSubmenu />
        <AudioSubmenu />
        <VideoQualitySubmenu />
      </Menu.Content>
    </Menu.Root>
  );
}

function CaptionSubmenu() {
  const options = useCaptionOptions(),
    hint = options.selectedTrack?.label ?? "Off";
  return (
    <Menu.Root>
      <SubmenuButton
        label="Captions"
        hint={hint}
        disabled={options.disabled}
        icon={() => (
          <ClosedCaptioning weight="fill" size={14} className="text-white" />
        )}
      />
      <Menu.Content className={submenuClassName}>
        <Menu.RadioGroup
          className="w-full flex flex-col"
          value={options.selectedValue}
        >
          {options.map(({ label, value, select }) => (
            <Menu.Radio
              className={radioClassName}
              value={value}
              onSelect={select}
              key={value}
            >
              <Check
                className={
                  radioIconClassName +
                  " group-data-[checked]:hidden invisible mr-1"
                }
              />
              <Check className={radioSelectedIconClassName + " mr-1"} />
              {label}
            </Menu.Radio>
          ))}
        </Menu.RadioGroup>
      </Menu.Content>
    </Menu.Root>
  );
}

function AutoPlay() {
  const [options, setOptions] = useState([
    {
      label: "On",
      value: true,
      selected: false,
    },
    {
      label: "Off",
      value: false,
      selected: true,
    },
  ]);

  const settings = useStore(useSettings, (state) => state.settings);

  return (
    <Menu.Root>
      <SubmenuButton
        label="Autoplay Video"
        hint={
          settings?.autoplay !== undefined
            ? options.find((option) => option.value === settings?.autoplay)
                ?.label
            : options.find((option) => option.selected)?.label
        }
        icon={() => (
          <PlayPause weight="fill" size={14} className="text-white" />
        )}
      />
      <Menu.Content className={styles.submenu}>
        <Menu.RadioGroup
          className={styles.radioGroup}
          value={
            settings?.autoplay !== undefined
              ? settings?.autoplay.toString()
              : "true"
          }
          onChange={(value) => {
            const boolValue = value === "true"; // Parse string to boolean
            setOptions((options) =>
              options.map((option) =>
                option.value === boolValue
                  ? { ...option, selected: true }
                  : { ...option, selected: false }
              )
            );
            useSettings.setState({
              settings: {
                ...useSettings.getState().settings,
                autoplay: boolValue,
              },
            });
          }}
        >
          {options.map((option) => (
            <Menu.Radio
              className={radioClassName}
              value={option.value.toString()}
              key={option.label}
            >
              <Check
                className={
                  radioIconClassName +
                  " group-data-[checked]:hidden invisible mr-1"
                }
              />
              <Check className={radioSelectedIconClassName + " mr-1"} />
              {option.label}
            </Menu.Radio>
          ))}
        </Menu.RadioGroup>
      </Menu.Content>
    </Menu.Root>
  );
}

function AutoNext() {
  const [options, setOptions] = useState([
    {
      label: "On",
      value: true,
      selected: false,
    },
    {
      label: "Off",
      value: false,
      selected: true,
    },
  ]);

  const settings = useStore(useSettings, (state) => state.settings);

  return (
    <Menu.Root>
      <SubmenuButton
        label="Autoplay Next"
        hint={
          settings?.autonext !== undefined
            ? options.find((option) => option.value === settings?.autonext)
                ?.label
            : options.find((option) => option.selected)?.label
        }
        icon={() => (
          <SkipForward weight="fill" size={14} className="text-white" />
        )}
      />
      <Menu.Content className={styles.submenu}>
        <Menu.RadioGroup
          className={styles.radioGroup}
          value={
            settings?.autonext !== undefined
              ? settings?.autonext.toString()
              : "true"
          }
          onChange={(value) => {
            const boolValue = value === "true"; // Parse string to boolean
            setOptions((options) =>
              options.map((option) =>
                option.value === boolValue
                  ? { ...option, selected: true }
                  : { ...option, selected: false }
              )
            );
            useSettings.setState({
              settings: {
                ...useSettings.getState().settings,
                autonext: boolValue,
              },
            });
          }}
        >
          {options.map((option) => (
            <Menu.Radio
              className={radioClassName}
              value={option.value.toString()}
              key={option.label}
            >
              <Check
                className={
                  radioIconClassName +
                  " group-data-[checked]:hidden invisible mr-1"
                }
              />
              <Check className={radioSelectedIconClassName + " mr-1"} />
              {option.label}
            </Menu.Radio>
          ))}
        </Menu.RadioGroup>
      </Menu.Content>
    </Menu.Root>
  );
}

function AutoSkip() {
  const [options, setOptions] = useState([
    {
      label: "On",
      value: true,
      selected: false,
    },
    {
      label: "Off",
      value: false,
      selected: true,
    },
  ]);

  const settings = useStore(useSettings, (state) => state.settings);

  return (
    <Menu.Root>
      <SubmenuButton
        label="AutoSkip"
        hint={
          settings?.autoskip !== undefined
            ? options.find((option) => option.value === settings?.autoskip)
                ?.label
            : options.find((option) => option.selected)?.label
        }
        icon={() => (
          <SkipForward weight="fill" size={14} className="text-white" />
        )}
      />
      <Menu.Content className={styles.submenu}>
        <Menu.RadioGroup
          className={styles.radioGroup}
          value={
            settings?.autoskip !== undefined
              ? settings?.autoskip.toString()
              : "true"
          }
          onChange={(value) => {
            const boolValue = value === "true"; // Parse string to boolean
            setOptions((options) =>
              options.map((option) =>
                option.value === boolValue
                  ? { ...option, selected: true }
                  : { ...option, selected: false }
              )
            );
            useSettings.setState({
              settings: {
                ...useSettings.getState().settings,
                autoskip: boolValue,
              },
            });
          }}
        >
          {options.map((option) => (
            <Menu.Radio
              className={radioClassName}
              value={option.value.toString()}
              key={option.label}
            >
              <Check
                className={
                  radioIconClassName +
                  " group-data-[checked]:hidden invisible mr-1"
                }
              />
              <Check className={radioSelectedIconClassName + " mr-1"} />
              {option.label}
            </Menu.Radio>
          ))}
        </Menu.RadioGroup>
      </Menu.Content>
    </Menu.Root>
  );
}

function SpeedSubmenu() {
  const options = usePlaybackRateOptions(),
    hint =
      options.selectedValue === "1" ? "Normal" : options.selectedValue + "x";
  return (
    <Menu.Root>
      <SubmenuButton
        label="Speed"
        hint={hint}
        disabled={options.disabled}
        icon={() => <Gauge size={14} className="text-white" />}
      />
      <Menu.Content className={submenuClassName}>
        <Menu.RadioGroup
          className="w-full flex flex-col"
          value={options.selectedValue}
        >
          {options.map(({ label, value, select }) => (
            <Menu.Radio
              className={radioClassName}
              value={value}
              onSelect={select}
              key={value}
            >
              <Check
                className={
                  radioIconClassName + " group-data-[checked]:hidden invisible"
                }
              />
              <Check className={radioSelectedIconClassName + " mr-1"} />
              {label}
            </Menu.Radio>
          ))}
        </Menu.RadioGroup>
      </Menu.Content>
    </Menu.Root>
  );
}

function AudioSubmenu() {
  const options = useAudioOptions(),
    hint = options.selectedTrack?.label ?? "Default";
  return (
    <Menu.Root>
      <SubmenuButton
        label="Audio"
        hint={hint}
        disabled={options.disabled}
        icon={() => (
          <MusicNoteSimple weight="fill" size={14} className="text-white" />
        )}
      />
      <Menu.Content className={submenuClass}>
        <Menu.RadioGroup
          className="w-full flex flex-col"
          value={options.selectedValue}
        >
          {options.map(({ label, value, select }) => (
            <Menu.Radio
              className={radioClassName}
              value={value}
              onSelect={select}
              key={value}
            >
              <Check
                className={
                  radioIconClassName + " group-data-[checked]:hidden invisible"
                }
              />
              <Check className={radioSelectedIconClassName + " mr-1"} />
              {label}
            </Menu.Radio>
          ))}
        </Menu.RadioGroup>
      </Menu.Content>
    </Menu.Root>
  );
}

function VideoQualitySubmenu() {
  const options = useVideoQualityOptions({ auto: true, sort: "descending" }),
    currentQualityHeight = options.selectedQuality?.height,
    hint =
      options.selectedValue !== "auto" && currentQualityHeight
        ? `${currentQualityHeight}p`
        : `Auto${currentQualityHeight ? ` (${currentQualityHeight}p)` : ""}`;
  return (
    <Menu.Root>
      <SubmenuButton
        label="Quality"
        hint={hint}
        disabled={options.disabled}
        icon={() => <Sliders size={14} className="text-white rotate-90" />}
      />
      <Menu.Content className={submenuClassName}>
        <Menu.RadioGroup
          className="w-full flex flex-col"
          value={options.selectedValue}
        >
          {options.map(({ label, value, select }) => (
            <Menu.Radio
              className={radioClassName}
              value={value}
              onSelect={select}
              key={value}
            >
              <Check
                className={
                  radioIconClassName + " group-data-[checked]:hidden invisible"
                }
              />
              <Check className={radioSelectedIconClassName + " mr-1"} />
              {label}
            </Menu.Radio>
          ))}
        </Menu.RadioGroup>
      </Menu.Content>
    </Menu.Root>
  );
}

function SubmenuButton({ label, hint, icon: Icon, disabled }) {
  return (
    <Menu.Button className={styles.submenuButton} disabled={disabled}>
      <CaretLeft className={styles.submenuCloseIcon} />
      <Icon className={styles.submenuIcon} />
      <span className={styles.submenuLabel}>{label}</span>
      <span className={styles.submenuHint}>{hint}</span>
      <CaretRight className={styles.submenuOpenIcon} />
    </Menu.Button>
  );
}
