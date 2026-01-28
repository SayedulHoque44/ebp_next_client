"use client";
import React, { ReactNode } from "react";
import SectionWrapper from "./SectionWrapper";
import AnimatedWave from "./AnimateWave";
import { SectionName } from "../config/sectionStyles";
import { IWaveLayer } from "./AnimateWave";

interface SectionWithWaveProps {
  sectionName: SectionName;
  children: ReactNode;
  waveLayers: IWaveLayer[];
}

/**
 * SectionWithWave Component (Client Component)
 * 
 * Wrapper that combines server-rendered SectionWrapper with client-side AnimatedWave.
 * This allows the section background to be server-rendered while animations load on client.
 */
const SectionWithWave: React.FC<SectionWithWaveProps> = ({
  sectionName,
  children,
  waveLayers,
}) => {
  return (
    <SectionWrapper sectionName={sectionName}>
      {children}
      <AnimatedWave layers={waveLayers} />
    </SectionWrapper>
  );
};

export default SectionWithWave;
