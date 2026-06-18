import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Img,
  staticFile,
  Easing,
} from "remotion";
import { loadFont as loadPoppins } from "@remotion/google-fonts/Poppins";
import { NAYAAB_THEME } from "./Theme";

const poppinsFont = loadPoppins("normal", {
  weights: ["300", "400", "600"],
  subsets: ["latin"],
});

export const EverythingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1. Timings & Animation Calculations (Left Column / Text)
  // Word 1: "we" snaps in at frame 0
  const w1Spring = spring({
    frame: frame,
    fps,
    config: NAYAAB_THEME.springs.staccatoPop,
  });
  const w1Scale = frame >= 0 ? w1Spring : 0;
  const w1Opacity = frame >= 0 ? interpolate(w1Spring, [0, 0.4], [0, 1], { extrapolateRight: "clamp" }) : 0;

  // Word 2: "do" snaps in at frame 7
  const w2Spring = spring({
    frame: frame - 7,
    fps,
    config: NAYAAB_THEME.springs.staccatoPop,
  });
  const w2Scale = frame >= 7 ? w2Spring : 0;
  const w2Opacity = frame >= 7 ? interpolate(w2Spring, [0, 0.4], [0, 1], { extrapolateRight: "clamp" }) : 0;

  // Word 3: "everything." snaps in at frame 15
  const w3Spring = spring({
    frame: frame - 15,
    fps,
    config: NAYAAB_THEME.springs.staccatoPop,
  });
  const w3Scale = frame >= 15 ? w3Spring : 0;
  const w3Opacity = frame >= 15 ? interpolate(w3Spring, [0, 0.4], [0, 1], { extrapolateRight: "clamp" }) : 0;

  // 2. Timings & Animation Calculations (Right Column / Card)
  // Card enters at frame 25
  const cardEnterSpring = spring({
    frame: frame - 25,
    fps,
    config: NAYAAB_THEME.springs.staccatoPop,
  });
  const rightSideScale = frame >= 25 ? cardEnterSpring : 0;
  const rightSideOpacity = frame >= 25 ? interpolate(cardEnterSpring, [0, 0.4], [0, 1], { extrapolateRight: "clamp" }) : 0;

  // Card width expands horizontally starting at frame 35
  const cardExpandSpring = spring({
    frame: frame - 35,
    fps,
    config: NAYAAB_THEME.springs.smoothSlide,
  });

  const baseWidth = interpolate(cardEnterSpring, [0, 1], [0, 200], { extrapolateRight: "clamp" });
  const expandedWidth = interpolate(cardExpandSpring, [0, 1], [0, 280], { extrapolateRight: "clamp" });
  const currentCardWidth = baseWidth + expandedWidth;

  const baseHeight = interpolate(cardEnterSpring, [0, 1], [0, 300], { extrapolateRight: "clamp" });
  const expandedHeight = interpolate(cardExpandSpring, [0, 1], [0, 280], { extrapolateRight: "clamp" });
  const currentCardHeight = baseHeight + expandedHeight;

  const gap = interpolate(cardEnterSpring, [0, 1], [0, 80], { extrapolateRight: "clamp" });

  // Swaps at frames 48 (to stitch1.jpg) and 60 (to stitch2.jpg)
  const swap1Spring = spring({
    frame: frame - 48,
    fps,
    config: NAYAAB_THEME.springs.staccatoPop,
  });
  const swap2Spring = spring({
    frame: frame - 60,
    fps,
    config: NAYAAB_THEME.springs.staccatoPop,
  });

  const imageScale = frame >= 60
    ? interpolate(swap2Spring, [0, 1], [0.92, 1.0], { extrapolateRight: "clamp" })
    : frame >= 48
      ? interpolate(swap1Spring, [0, 1], [0.92, 1.0], { extrapolateRight: "clamp" })
      : 1.0;

  // Slide down transition at the end (from frame 75 to 89)
  const translateY = interpolate(frame, [75, 89], [0, 1080], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.33, 1, 0.68, 1), // smooth cubic easeOut
  });

  return (
    <AbsoluteFill
      className="overflow-hidden flex flex-row items-center justify-center select-none"
      style={{
        backgroundColor: "#FFFFFF",
        // Programmatic light blue graph-paper grid overlay
        backgroundImage: `
          linear-gradient(rgba(191, 219, 254, 0.45) 1px, transparent 1px),
          linear-gradient(90deg, rgba(191, 219, 254, 0.45) 1px, transparent 1px)
        `,
        backgroundSize: "100px 100px",
        gap: `${gap}px`,
        transform: `translateY(${translateY}px)`,
      }}
    >
      {/* Left Column: Text */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "baseline",
          gap: "24px",
          fontFamily: NAYAAB_THEME.fonts.sansBold,
          fontSize: "92px",
          fontWeight: 700,
          color: "#000000",
          letterSpacing: "-0.04em",
          whiteSpace: "nowrap",
        }}
      >
        <span style={{ transform: `scale(${w1Scale})`, opacity: w1Opacity, display: "inline-block" }}>
          you
        </span>
        <span style={{ transform: `scale(${w2Scale})`, opacity: w2Opacity, display: "inline-block" }}>
          do
        </span>
        <span style={{ transform: `scale(${w3Scale})`, opacity: w3Opacity, display: "inline-block" }}>
          everything.
        </span>
      </div>

      {/* Right Column: Card and Subtitle */}
      {frame >= 25 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            transform: `scale(${rightSideScale})`,
            opacity: rightSideOpacity,
            width: `${currentCardWidth}px`,
            overflow: "visible",
          }}
        >
          {/* Card */}
          <div
            style={{
              width: "100%",
              height: `${currentCardHeight}px`,
              borderRadius: "36px",
              overflow: "hidden",
              border: "2.5px solid #000000",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.08)",
              backgroundColor: "#F8FAFC",
              transform: `scale(${imageScale})`,
              transformOrigin: "center center",
              position: "relative",
            }}
          >
            {frame < 48 && (
              <Img
                src={staticFile("s0.jpg")}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "480px",
                  height: "580px",
                  objectFit: "cover",
                }}
              />
            )}
            {frame >= 48 && frame < 60 && (
              <Img
                src={staticFile("s1.jpg")}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "480px",
                  height: "580px",
                  objectFit: "cover",
                }}
              />
            )}
            {frame >= 60 && (
              <Img
                src={staticFile("s2.jpg")}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "480px",
                  height: "580px",
                  objectFit: "cover",
                }}
              />
            )}
          </div>

          {/* Subtitle text below the image */}
          <div
            style={{
              fontFamily: poppinsFont.fontFamily,
              fontSize: "36px",
              fontWeight: 400,
              color: "#000000",
              marginTop: "24px",
              textTransform: "lowercase",
              whiteSpace: "nowrap",
            }}
          >
            [that you want to do]
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
export default EverythingScene;


