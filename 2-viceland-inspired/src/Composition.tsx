import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
} from "remotion";
import { vicelandTheme } from "./theme";

// Helper to apply random character drops or glitches to mimic raw printing / tape errors
const getGlitchedText = (
  text: string,
  rowIndex: number,
  frame: number,
  totalFrames: number
) => {
  // Always glitch the last row (index 8) to match the reference: "HI  -HOP IN THE HOLY LAND"
  if (rowIndex === 8 && frame > 12) {
    return "HI  -HOP IN THE HOLY LAND";
  }

  // Periodic random glitched character dropouts on other rows for visual interest
  if (frame > 20 && frame < totalFrames - 15) {
    // Generate a pseudo-random trigger based on frame and row index
    const trigger = Math.sin(frame * 0.4 + rowIndex * 2) * 10;
    if (trigger > 8.8) {
      // Replace some character with space
      const chars = text.split("");
      const idxToReplace = Math.floor(Math.abs(Math.sin(rowIndex)) * text.length) % text.length;
      if (chars[idxToReplace] !== " ") {
        chars[idxToReplace] = " ";
        return chars.join("");
      }
    }
  }

  return text;
};

export const MyComposition: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Dynamic Background and Text colors based on frame phase
  // Phase 1: Intro violent cuts / flashing (0s to 0.6s)
  // Phase 2: Brutalist repeating block layout (0.6s to 3.8s)
  // Phase 3: High contrast color inversion and neon flash (3.8s to end)
  const isIntro = frame < 18;
  const isOutro = frame >= durationInFrames - 30;

  const getColors = () => {
    if (isIntro) {
      // Fast hard flashing every 3 frames
      const flash = Math.floor(frame / 3) % 2 === 0;
      return {
        background: flash ? vicelandTheme.colors.background : "#ECECEC",
        text: flash ? vicelandTheme.colors.textPrimary : "#111111",
        accent: vicelandTheme.colors.rawYellow,
      };
    }

    if (isOutro) {
      // Fast hard flashing between raw colors and black
      const flashIdx = Math.floor((frame - (durationInFrames - 30)) / 4) % 3;
      if (flashIdx === 0) {
        return {
          background: vicelandTheme.colors.background,
          text: vicelandTheme.colors.textPrimary,
          accent: vicelandTheme.colors.rawYellow,
        };
      } else if (flashIdx === 1) {
        return {
          background: vicelandTheme.colors.rawYellow,
          text: vicelandTheme.colors.inverseText,
          accent: vicelandTheme.colors.inverseText,
        };
      } else {
        return {
          background: vicelandTheme.colors.rawRed,
          text: vicelandTheme.colors.textPrimary,
          accent: vicelandTheme.colors.textPrimary,
        };
      }
    }

    // Main section: Light paper background with heavy dark ink typography
    return {
      background: "#ECECEC",
      text: "#111111",
      accent: vicelandTheme.colors.background,
    };
  };

  const { background, text, accent } = getColors();

  // Row layout configuration (9 rows)
  const rowCount = 9;
  const rawText = "HIP-HOP IN THE HOLY LAND";

  // Dynamic horizontal offsets for the rows
  const getRowStyle = (index: number): React.CSSProperties => {
    if (isIntro) {
      // Rapid step-like entries
      const opacity = frame > index * 1.5 ? 1 : 0;
      const xOffset = frame > index * 1.5 ? 0 : (index % 2 === 0 ? -100 : 100);
      return {
        opacity,
        transform: `translateX(${xOffset}px)`,
        transition: vicelandTheme.transitions.hardCut,
      };
    }

    if (isOutro) {
      // Extreme chaotic shifts in the outro
      const outroFrame = frame - (durationInFrames - 30);
      const direction = index % 2 === 0 ? 1 : -1;
      const xOffset = interpolate(
        outroFrame,
        [0, 30],
        [0, direction * 400],
        {
          easing: Easing.bezier(0.85, 0, 0.15, 1),
          extrapolateRight: "clamp",
        }
      );
      return {
        transform: `translateX(${xOffset}px)`,
      };
    }

    // Main Phase: Smooth, constant kinetic creep with occasional mechanical snaps
    const direction = index % 2 === 0 ? -1 : 1;
    
    // Constant slow linear crawl
    const baseCrawl = interpolate(
      frame,
      [18, durationInFrames - 30],
      [0, direction * 80],
      { extrapolateRight: "clamp" }
    );

    // Mechanical micro-snaps at specific music beats (e.g. frame 45, 75)
    let snapOffset = 0;
    if (frame > 45) {
      snapOffset += interpolate(frame, [45, 49], [0, direction * 20], {
        easing: Easing.bezier(0.16, 1, 0.3, 1),
        extrapolateRight: "clamp",
      });
    }
    if (frame > 75) {
      snapOffset += interpolate(frame, [75, 79], [0, direction * -30], {
        easing: Easing.bezier(0.16, 1, 0.3, 1),
        extrapolateRight: "clamp",
      });
    }

    return {
      transform: `translateX(${baseCrawl + snapOffset}px)`,
    };
  };

  return (
    <AbsoluteFill
      style={{
        backgroundColor: background,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        padding: "20px 0",
      }}
    >
      {/* Brutalist structural side borders that flash on beats */}
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 30,
          width: "2px",
          backgroundColor: text,
          opacity: frame % 15 < 3 ? 0.8 : 0.2,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 30,
          width: "2px",
          backgroundColor: text,
          opacity: frame % 15 < 3 ? 0.8 : 0.2,
        }}
      />

      {/* Main stacked typography content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "80%",
          width: "120%", // wider than container to prevent empty gaps on slide
          textAlign: "center",
        }}
      >
        {Array.from({ length: rowCount }).map((_, idx) => {
          const glitchedText = getGlitchedText(
            rawText,
            idx,
            frame,
            durationInFrames
          );
          const rowStyle = getRowStyle(idx);

          return (
            <div
              key={idx}
              style={{
                fontFamily: vicelandTheme.fonts.heading,
                fontSize: "6.2vw", // Dynamic viewport width sizing for maximum screen coverage
                fontWeight: vicelandTheme.fontWeights.black as any,
                color: text,
                letterSpacing: vicelandTheme.letterSpacings.tighter,
                lineHeight: vicelandTheme.lineHeights.none,
                textTransform: "uppercase",
                whiteSpace: "nowrap",
                willChange: "transform",
                ...rowStyle,
              }}
            >
              {glitchedText}
            </div>
          );
        })}
      </div>

      {/* Brutalist status tag indicating composition metadata */}
      <div
        style={{
          position: "absolute",
          bottom: 25,
          left: 45,
          fontFamily: vicelandTheme.fonts.mono,
          fontSize: vicelandTheme.fontSizes.xs,
          color: text,
          opacity: 0.7,
          textTransform: "uppercase",
          letterSpacing: vicelandTheme.letterSpacings.wide,
        }}
      >
        VICELAND // FRAME {String(frame).padStart(3, "0")} / {durationInFrames}
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 25,
          right: 45,
          fontFamily: vicelandTheme.fonts.mono,
          fontSize: vicelandTheme.fontSizes.xs,
          opacity: 0.7,
          textTransform: "uppercase",
          letterSpacing: vicelandTheme.letterSpacings.wide,
          backgroundColor: frame % 30 < 15 ? accent : "transparent",
          padding: "2px 6px",
          color: frame % 30 < 15 ? background : text,
        }}
      >
        REC ● 30FPS
      </div>
    </AbsoluteFill>
  );
};
