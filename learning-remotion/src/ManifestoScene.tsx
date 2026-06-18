import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { NAYAAB_THEME } from "./Theme";
import { loadFont as loadEBGaramond } from "@remotion/google-fonts/EBGaramond";

const ebGaramond = loadEBGaramond("normal", {
  weights: ["400"],
  subsets: ["latin"],
});

export interface ManifestoSceneProps {
  scribbleType?: number;
}

// 5 distinct scribble coordinate paths & colors mapped to a 1920x1080 viewport
const SCRIBBLE_PRESETS = [
  {
    // 0. Blue Jagged Scribble
    color: "#1E86FF",
    path: "M 500,250 L 1400,200 L 400,800 L 1500,750 L 600,900 L 1300,350 L 500,600 L 1500,450",
  },
  {
    // 1. Pink Looping Scribble
    color: "#E03E93",
    path: "M 960,540 C 600,200 400,800 960,850 C 1400,900 1500,300 960,300 C 500,300 600,900 1100,750 C 1500,600 1300,200 800,400 C 400,600 800,900 1200,600",
  },
  {
    // 2. Green Infinity/Double-loop Scribble
    color: "#00B54B",
    path: "M 960,540 C 500,200 300,800 960,700 C 1620,600 1420,250 960,540 C 400,850 800,900 1200,700 C 1600,500 1300,200 700,300 C 300,400 600,800 960,540",
  },
  {
    // 3. Orange Spiral/Coil Scribble
    color: "#FFA000",
    path: "M 960,540 Q 1100,400 1200,540 T 960,680 T 720,540 T 960,360 T 1360,540 T 960,800 T 500,540 T 960,200",
  },
  {
    // 4. Purple Starburst/Cross-Scratch Scribble
    color: "#8C52FF",
    path: "M 400,200 L 1500,880 M 1500,200 L 400,880 M 960,100 L 960,980 M 200,540 L 1720,540 M 350,700 L 1570,380 M 350,380 L 1570,700",
  },
];

export const ManifestoScene: React.FC<ManifestoSceneProps> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Show scribble only starting at frame 30 (when all words are fully rendered)
  const showScribble = frame >= 30;

  // Cycle scribble color & coordinate shape every 3 frames starting at frame 30
  const scribbleIndex = showScribble
    ? Math.floor((frame - 30) / 3) % SCRIBBLE_PRESETS.length
    : 0;
  const preset = SCRIBBLE_PRESETS[scribbleIndex];

  // 1. The Staggered Word Entry Timings
  // Word 1: “Create (starts at frame 0)
  const w1Spring = spring({
    frame: frame,
    fps,
    config: NAYAAB_THEME.springs.staccatoPop,
  });
  const w1Scale = frame >= 0 ? w1Spring : 0;
  const w1Opacity = frame >= 0 ? interpolate(w1Spring, [0, 0.4], [0, 1], { extrapolateRight: "clamp" }) : 0;

  // Word 2: what (starts at frame 6)
  const w2Spring = spring({
    frame: frame - 6,
    fps,
    config: NAYAAB_THEME.springs.staccatoPop,
  });
  const w2Scale = frame >= 6 ? w2Spring : 0;
  const w2Opacity = frame >= 6 ? interpolate(w2Spring, [0, 0.4], [0, 1], { extrapolateRight: "clamp" }) : 0;

  // Word 3: you (starts at frame 12)
  const w3Spring = spring({
    frame: frame - 12,
    fps,
    config: NAYAAB_THEME.springs.staccatoPop,
  });
  const w3Scale = frame >= 12 ? w3Spring : 0;
  const w3Opacity = frame >= 12 ? interpolate(w3Spring, [0, 0.4], [0, 1], { extrapolateRight: "clamp" }) : 0;

  // Word 4: wish (starts at frame 18)
  const w4Spring = spring({
    frame: frame - 18,
    fps,
    config: NAYAAB_THEME.springs.staccatoPop,
  });
  const w4Scale = frame >= 18 ? w4Spring : 0;
  const w4Opacity = frame >= 18 ? interpolate(w4Spring, [0, 0.4], [0, 1], { extrapolateRight: "clamp" }) : 0;

  // Word 5: existed” (starts at frame 24)
  const w5Spring = spring({
    frame: frame - 24,
    fps,
    config: NAYAAB_THEME.springs.staccatoPop,
  });
  const w5Scale = frame >= 24 ? w5Spring : 0;
  const w5Opacity = frame >= 24 ? interpolate(w5Spring, [0, 0.4], [0, 1], { extrapolateRight: "clamp" }) : 0;

  // 2. Wiggling outline noise seed: updates every 3 frames
  const seed = Math.floor(frame / 3);

  // Common typography styles using EB Garamond for that tactile, human look
  const textStyle: React.CSSProperties = {
    fontFamily: ebGaramond.fontFamily,
    color: "#000000",
    fontSize: "92px",
    fontWeight: 400,
    display: "inline-block",
    letterSpacing: "0.22em", // Wide tracking/letter-spacing to match the reference
    filter: "url(#ink-bleed-filter)", // Tactile ink-bleed effect
  };

  return (
    <AbsoluteFill
      className="flex flex-row justify-center items-center overflow-hidden"
      style={{ backgroundColor: "#FFFFFF", position: "relative" }}
    >
      {/* Permanent SVG Filters Definitions */}
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <defs>
          <filter id="ink-bleed-filter" x="-20%" y="-20%" width="140%" height="140%">
            {/* Medium-high frequency fractal noise for organic bleed bumps */}
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.035"
              numOctaves="4"
              seed={seed}
              result="noise"
            />
            {/* Displace the text contours to create a wobbly, imperfect outline */}
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="11" // Pronounced scale for visible tactile imperfections
              xChannelSelector="R"
              yChannelSelector="G"
              result="distorted"
            />
            {/* Smooth blur + contrast to mimic wet ink bleed spreading into paper fibers */}
            <feGaussianBlur in="distorted" stdDeviation="1.5" result="blurred" />
            <feColorMatrix
              in="blurred"
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 24 -11"
            />
          </filter>
        </defs>
      </svg>

      {/* Crayon Textured Scribble Background */}
      {showScribble && (
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <svg style={{ position: "absolute", width: 0, height: 0 }}>
            <defs>
              <filter id="scribble-crayon" x="-10%" y="-10%" width="120%" height="120%">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.035"
                  numOctaves="3"
                  seed={seed}
                  result="noise"
                />
                <feDisplacementMap
                  in="SourceGraphic"
                  in2="noise"
                  scale="14" // Controls stroke edge wiggling roughness
                  xChannelSelector="R"
                  yChannelSelector="G"
                />
              </filter>
            </defs>
          </svg>

          <svg
            viewBox="0 0 1920 1080"
            style={{
              width: "100%",
              height: "100%",
              filter: "url(#scribble-crayon)",
            }}
          >
            <path
              d={preset.path}
              fill="none"
              stroke={preset.color}
              strokeWidth="36" // Thick, crayon-like stroke width
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}

      {/* Centered Typography sentence */}
      <div
        className="flex flex-row items-baseline select-none"
        style={{
          position: "relative",
          zIndex: 1,
          gap: "100px", // Extremely wide spacing between words to match reference
        }}
      >
        {/* Word 1: “Create */}
        <span
          style={{
            ...textStyle,
            transform: `scale(${w1Scale})`,
            opacity: w1Opacity,
          }}
        >
          “Create
        </span>

        {/* Word 2: what */}
        <span
          style={{
            ...textStyle,
            transform: `scale(${w2Scale})`,
            opacity: w2Opacity,
          }}
        >
          what
        </span>

        {/* Word 3: you */}
        <span
          style={{
            ...textStyle,
            transform: `scale(${w3Scale})`,
            opacity: w3Opacity,
          }}
        >
          you
        </span>

        {/* Word 4: wish */}
        <span
          style={{
            ...textStyle,
            transform: `scale(${w4Scale})`,
            opacity: w4Opacity,
          }}
        >
          wish
        </span>

        {/* Word 5: existed” */}
        <span
          style={{
            ...textStyle,
            transform: `scale(${w5Scale})`,
            opacity: w5Opacity,
          }}
        >
          existed”
        </span>
      </div>
    </AbsoluteFill>
  );
};

export default ManifestoScene;
