import { Time } from "@vidstack/react";
import React from "react";

export function TimeGroup() {
  return (
    <div className="ml-1.5 flex items-center text-xs md:text-sm font-light tracking-wide text-white">
      <Time className="time " type="current" />
      <div className="mx-1 text-white/80">/</div>
      <Time className="time " type="duration" />
    </div>
  );
}
