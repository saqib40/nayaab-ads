import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Img,
  staticFile,
} from "remotion";
import { loadFont as loadPoppins } from "@remotion/google-fonts/Poppins";
import { NAYAAB_THEME } from "./Theme";

const poppinsFont = loadPoppins("normal", {
  weights: ["500"],
  subsets: ["latin"],
});

// Reusable word wrapper that animates its width, margin, opacity, and scale
const WordWrapper: React.FC<{
  text: string;
  startFrame: number;
  fullWidth: number;
  marginRight: number;
  frame: number;
  fps: number;
}> = ({ text, startFrame, fullWidth, marginRight, frame, fps }) => {
  const isStarted = frame >= startFrame;
  const wordSpring = spring({
    frame: frame - startFrame,
    fps,
    config: NAYAAB_THEME.springs.staccatoPop,
  });

  const width = isStarted ? interpolate(wordSpring, [0, 1], [0, fullWidth]) : 0;
  const opacity = isStarted ? interpolate(wordSpring, [0, 0.4], [0, 1], { extrapolateRight: "clamp" }) : 0;
  const scale = isStarted ? interpolate(wordSpring, [0, 1], [0.65, 1]) : 0;
  const currentMargin = isStarted ? interpolate(wordSpring, [0, 1], [0, marginRight]) : 0;

  return (
    <div
      style={{
        width: "auto",
        maxWidth: `${width}px`,
        marginRight: `${currentMargin}px`,
        opacity,
        transform: `scale(${scale})`,
        transformOrigin: "left center",
        overflow: "hidden",
        display: "inline-block",
        whiteSpace: "nowrap",
        flexShrink: 0,
      }}
    >
      {text}
    </div>
  );
};

export const TaiyaariScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Window entry pop starting at frame 0
  const windowSpring = spring({
    frame,
    fps,
    config: NAYAAB_THEME.springs.staccatoPop,
  });
  const windowScale = windowSpring;
  const windowOpacity = interpolate(windowSpring, [0, 0.4], [0, 1], {
    extrapolateRight: "clamp",
  });

  const isPhrase1 = frame < 24;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: NAYAAB_THEME.colors.brandRed, // #EF4444
        overflow: "hidden",
      }}
    >
      {/* Left side: macOS Browser Media Player Window */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "32%",
          transform: `translate(-50%, -50%) scale(${windowScale})`,
          opacity: windowOpacity,
          width: "440px",
          height: "580px",
          borderRadius: "24px",
          border: "2.5px solid #000000",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          backgroundColor: "#FFFFFF",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* macOS Browser Header */}
        <div
          style={{
            height: "40px",
            backgroundColor: "#F3F4F6",
            borderBottom: "2px solid #000000",
            display: "flex",
            alignItems: "center",
            paddingLeft: "16px",
            gap: "8px",
          }}
        >
          {/* macOS window control buttons */}
          <div style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#FF5F56", border: "0.5px solid rgba(0,0,0,0.1)" }} />
          <div style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#FFBD2E", border: "0.5px solid rgba(0,0,0,0.1)" }} />
          <div style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#27C93F", border: "0.5px solid rgba(0,0,0,0.1)" }} />
        </div>

        {/* Video Player Canvas Viewport */}
        <div
          style={{
            flex: 1,
            backgroundColor: "#1F2937",
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          {/* Grayscale background and image representing the update-meme */}
          <Img
            src={staticFile("update-meme.jpg")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />


        </div>
      </div>

      {/* Right side: Bracketed dynamic reveal text */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "72%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "row",
          alignItems: "baseline",
          fontFamily: poppinsFont.fontFamily,
          fontSize: "92px",
          fontWeight: 500,
          color: "#000000",
          letterSpacing: "-0.04em",
          whiteSpace: "nowrap",
          userSelect: "none",
        }}
      >
        <span style={{ marginRight: "16px" }}>[</span>
        {isPhrase1 ? (
          <>
            <WordWrapper text="nayaab" startFrame={0} fullWidth={340} marginRight={16} frame={frame} fps={fps} />
            <WordWrapper text="just" startFrame={12} fullWidth={200} marginRight={0} frame={frame} fps={fps} />
          </>
        ) : (
          <>
            <WordWrapper text="got" startFrame={24} fullWidth={180} marginRight={16} frame={frame} fps={fps} />
            <WordWrapper text="new" startFrame={32} fullWidth={200} marginRight={16} frame={frame} fps={fps} />
            <WordWrapper text="update" startFrame={40} fullWidth={320} marginRight={0} frame={frame} fps={fps} />
          </>
        )}
        <span style={{ marginLeft: "16px" }}>]</span>
      </div>
    </AbsoluteFill>
  );
};

export default TaiyaariScene;
