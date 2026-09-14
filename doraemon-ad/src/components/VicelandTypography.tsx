import React from "react";
import { useCurrentFrame } from "remotion";

export const VICELAND_BG = "#F3F3EF"; // Classic warm bone-white
export const VICELAND_BLACK = "#0D0D0D";
export const VICELAND_FONT =
  'Inter, "Helvetica Neue", -apple-system, BlinkMacSystemFont, Arial, sans-serif';

/**
 * Vertical letter-by-letter column running top-to-bottom (classic Viceland vertical editorial style)
 */
export const SteppedVerticalLetters: React.FC<{
  text: string;
  startFrame?: number;
  framesPerChar?: number;
  fontSize?: number;
  color?: string;
  style?: React.CSSProperties;
}> = ({
  text,
  startFrame = 4,
  framesPerChar = 3,
  fontSize = 44,
  color = "#FFFFFF",
  style,
}) => {
  const frame = useCurrentFrame();
  const chars = text.split("");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: VICELAND_FONT,
        fontWeight: 900,
        fontSize,
        color,
        lineHeight: 1.05,
        textTransform: "uppercase",
        textShadow: "0 4px 24px rgba(0,0,0,0.85), 0 1px 4px rgba(0,0,0,0.95)",
        ...style,
      }}
    >
      {chars.map((char, i) => {
        const charThreshold = startFrame + i * framesPerChar;
        const isVisible = frame >= charThreshold;

        if (char === " ") {
          return <div key={i} style={{ height: fontSize * 0.55 }} />;
        }

        return (
          <span
            key={i}
            style={{
              visibility: isVisible ? "visible" : "hidden",
              display: "block",
            }}
          >
            {char}
          </span>
        );
      })}
    </div>
  );
};

/**
 * Letter-by-letter reveal spanning edge to edge (horizontal)
 */
export const SteppedEdgeToEdgeLetters: React.FC<{
  text: string;
  startFrame?: number;
  framesPerChar?: number;
  fontSize?: number;
  color?: string;
  style?: React.CSSProperties;
}> = ({
  text,
  startFrame = 4,
  framesPerChar = 3,
  fontSize = 78,
  color = "#FFFFFF",
  style,
}) => {
  const frame = useCurrentFrame();
  const chars = text.split("");

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        fontFamily: VICELAND_FONT,
        fontWeight: 900,
        fontSize,
        color,
        lineHeight: 1,
        textTransform: "uppercase",
        textShadow: "0 4px 24px rgba(0,0,0,0.65), 0 1px 3px rgba(0,0,0,0.9)",
        ...style,
      }}
    >
      {chars.map((char, i) => {
        const charThreshold = startFrame + i * framesPerChar;
        const isVisible = frame >= charThreshold;

        return (
          <span
            key={i}
            style={{
              visibility: isVisible ? "visible" : "hidden",
            }}
          >
            {char === " " ? "\u00A0\u00A0" : char}
          </span>
        );
      })}
    </div>
  );
};

/**
 * Spaced headline with letters snapping in one by one
 */
export const SteppedSpacedLine: React.FC<{
  text: string;
  startFrame?: number;
  framesPerChar?: number;
  fontSize?: number;
  color?: string;
  letterSpacing?: string;
  style?: React.CSSProperties;
}> = ({
  text,
  startFrame = 0,
  framesPerChar = 2,
  fontSize = 72,
  color = VICELAND_BLACK,
  letterSpacing = "0.28em",
  style,
}) => {
  const frame = useCurrentFrame();
  const chars = text.split("");

  return (
    <div
      style={{
        fontFamily: VICELAND_FONT,
        fontWeight: 900,
        fontSize,
        color,
        letterSpacing,
        lineHeight: 1.05,
        textTransform: "uppercase",
        whiteSpace: "nowrap",
        ...style,
      }}
    >
      {chars.map((char, i) => {
        const charThreshold = startFrame + i * framesPerChar;
        const isVisible = frame >= charThreshold;

        return (
          <span
            key={i}
            style={{
              visibility: isVisible ? "visible" : "hidden",
            }}
          >
            {char}
          </span>
        );
      })}
    </div>
  );
};

/**
 * Phrase-level stepped headline
 */
export const SteppedPhrases: React.FC<{
  phrases: Array<{ text: string; atFrame: number }>;
  fontSize?: number;
  color?: string;
  align?: "left" | "center" | "right";
  letterSpacing?: string;
  lineHeight?: number;
  style?: React.CSSProperties;
}> = ({
  phrases,
  fontSize = 42,
  color = VICELAND_BLACK,
  align = "left",
  letterSpacing = "-0.01em",
  lineHeight = 1.05,
  style,
}) => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems:
          align === "center"
            ? "center"
            : align === "right"
              ? "flex-end"
              : "flex-start",
        textAlign: align,
        fontFamily: VICELAND_FONT,
        fontWeight: 900,
        fontSize,
        color,
        letterSpacing,
        lineHeight,
        textTransform: "uppercase",
        ...style,
      }}
    >
      {phrases.map((phrase, idx) => {
        const isVisible = frame >= phrase.atFrame;
        return (
          <div
            key={idx}
            style={{
              visibility: isVisible ? "visible" : "hidden",
            }}
          >
            {phrase.text}
          </div>
        );
      })}
    </div>
  );
};

/**
 * Multi-line headline with stable line layout
 */
export const BoldHeadline: React.FC<{
  lines: string[];
  fontSize?: number;
  color?: string;
  align?: "left" | "center" | "right";
  letterSpacing?: string;
  lineHeight?: number;
  style?: React.CSSProperties;
}> = ({
  lines,
  fontSize = 72,
  color = VICELAND_BLACK,
  align = "left",
  letterSpacing = "-0.01em",
  lineHeight = 0.95,
  style,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems:
          align === "center"
            ? "center"
            : align === "right"
              ? "flex-end"
              : "flex-start",
        textAlign: align,
        fontFamily: VICELAND_FONT,
        fontWeight: 900,
        fontSize,
        color,
        letterSpacing,
        lineHeight,
        textTransform: "uppercase",
        ...style,
      }}
    >
      {lines.map((line, idx) => (
        <div key={idx}>{line}</div>
      ))}
    </div>
  );
};
