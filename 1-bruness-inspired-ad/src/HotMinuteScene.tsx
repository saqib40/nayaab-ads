import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont as loadPoppins } from "@remotion/google-fonts/Poppins";
import { NAYAAB_THEME } from "./Theme";

const poppinsFont = loadPoppins("normal", {
  weights: ["800"],
  subsets: ["latin"],
});

export const HotMinuteScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const words = [
    { text: "you", startFrame: 0 },
    { text: "haven't", startFrame: 6 },
    { text: "posted", startFrame: 12 },
    { text: "in", startFrame: 18 },
    { text: "a", startFrame: 24 },
    { text: "long", startFrame: 30 },
    { text: "time.", startFrame: 36 },
  ];

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
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "baseline",
          gap: "20px", // Clean spacing between words
          fontFamily: poppinsFont.fontFamily,
          fontSize: "92px",
          fontWeight: 800, // Extra-bold weight from visual reference
          color: "#000000",
          letterSpacing: "-0.04em", // Tight letter spacing
          width: "90%",
          textAlign: "center",
          userSelect: "none",
        }}
      >
        {words.map((word, index) => {
          const wordSpring = spring({
            frame: frame - word.startFrame,
            fps,
            config: NAYAAB_THEME.springs.staccatoPop,
          });

          // Layout preservation: keep elements in flow, animate scale and opacity
          const scale = frame >= word.startFrame ? wordSpring : 0;
          const opacity = frame >= word.startFrame
            ? interpolate(wordSpring, [0, 0.4], [0, 1], { extrapolateRight: "clamp" })
            : 0;

          return (
            <span
              key={index}
              style={{
                display: "inline-block",
                transform: `scale(${scale})`,
                opacity: opacity,
                transformOrigin: "center center",
              }}
            >
              {word.text}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

export default HotMinuteScene;
