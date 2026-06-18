import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { NAYAAB_THEME } from "./Theme";

export const LekinScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Snappy staccato pop animation starting at frame 0
  const popSpring = spring({
    frame: frame,
    fps,
    config: NAYAAB_THEME.springs.staccatoPop,
  });

  const scale = popSpring;
  const opacity = interpolate(popSpring, [0, 0.4], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: NAYAAB_THEME.colors.brandRed, // #EF4444
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          fontFamily: NAYAAB_THEME.fonts.sansBold, // Inter, system-ui, sans-serif
          fontSize: "120px",
          fontWeight: 700, // Bold
          color: "#000000",
          transform: `scale(${scale})`,
          opacity: opacity,
          display: "inline-block",
          textAlign: "center",
          userSelect: "none",
          letterSpacing: "-0.04em",
        }}
      >
        lekin....
      </div>
    </AbsoluteFill>
  );
};

export default LekinScene;
