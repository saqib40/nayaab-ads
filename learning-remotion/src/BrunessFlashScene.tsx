import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
} from "remotion";
import { loadFont as loadAnton } from "@remotion/google-fonts/Anton";
import { NAYAAB_THEME } from "./Theme";

const antonFont = loadAnton();

export const BrunessFlashScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Frames 0 - 14: Solid red background
  if (frame < 15) {
    return (
      <AbsoluteFill
        style={{
          backgroundColor: NAYAAB_THEME.colors.brandRed, // #EF4444
        }}
      />
    );
  }

  // From frame 15 onwards: Solid black background with massive vertically-stretched BRUNESS text
  // Frames 15 - 29: Red text (#EF4444)
  // Frames 30 - 59: White text (#FFFFFF)
  const textColor = frame < 30 ? NAYAAB_THEME.colors.brandRed : "#FFFFFF";

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#000000",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          fontFamily: antonFont.fontFamily,
          fontSize: "300px",
          fontWeight: 900,
          color: textColor,
          textTransform: "uppercase",
          letterSpacing: "-0.01em", // tight kerning
          lineHeight: "0.85",
          transform: "scaleY(3.2)",
          transformOrigin: "center center",
          textAlign: "center",
          userSelect: "none",
          width: "100%",
        }}
      >
        NAYAAB
      </div>
    </AbsoluteFill>
  );
};

export default BrunessFlashScene;
