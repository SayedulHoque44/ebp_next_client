import React, { ReactNode } from "react";
import { SectionName, SECTION_STYLES } from "../config/sectionStyles";

interface SectionWrapperProps {
  sectionName: SectionName;
  children: ReactNode;
}

/**
 * SectionWrapper Component (Server Component)
 * 
 * Reusable wrapper for home page sections with:
 * - Consistent background gradients
 * - Decorative circles
 * 
 * This component is server-rendered for better performance.
 * For sections with waves, use SectionWithWave component instead.
 */
const SectionWrapper: React.FC<SectionWrapperProps> = ({
  sectionName,
  children,
}) => {
  const style = SECTION_STYLES[sectionName];

  if (!style) {
    console.warn(`Section style not found for: ${sectionName}`);
    return <div>{children}</div>;
  }

  return (
    <div
      className={`relative ${style.backgroundGradient} overflow-hidden`}
    >
      {/* Decorative Circles Overlay */}
      <div
        className="absolute inset-0"
        style={style.overlayOpacity ? { opacity: style.overlayOpacity } : undefined}
      >
        {style.decorativeCircles.map((circle, index) => {
          const positionClasses = Object.entries(circle.position)
            .map(([key, value]) => `${key}-${value}`)
            .join(" ");

          return (
            <div
              key={index}
              className={`absolute ${positionClasses} ${circle.size} ${circle.color} rounded-full ${
                circle.className || ""
              }`}
              style={{
                opacity: circle.opacity,
                ...circle.style,
              }}
            />
          );
        })}
      </div>

      {/* Content */}
      {children}
    </div>
  );
};

export default SectionWrapper;
