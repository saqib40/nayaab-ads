import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { NAYAAB_THEME } from "./Theme";

export const ArthouseScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Brick-red background color from reference screenshots
  const brickRed = "#C22F15";
  const textColor = "#FFFFFF";

  // 1. Timings & Animation calculations for the final state (frame >= 27)
  // Words "an" and "arthouse" snap in at frame 27
  const finalSpring = spring({
    frame: frame - 27,
    fps,
    config: NAYAAB_THEME.springs.staccatoPop,
  });
  const anScale = frame >= 27 ? finalSpring : 0;
  const anOpacity = frame >= 27 ? interpolate(finalSpring, [0, 0.4], [0, 1], { extrapolateRight: "clamp" }) : 0;
  const arthouseScale = frame >= 27 ? finalSpring : 0;
  const arthouseOpacity = frame >= 27 ? interpolate(finalSpring, [0, 0.4], [0, 1], { extrapolateRight: "clamp" }) : 0;

  // Word 3: "unbound" snaps in at frame 37
  const unboundSpring = spring({
    frame: frame - 37,
    fps,
    config: NAYAAB_THEME.springs.staccatoPop,
  });
  const unboundScale = frame >= 37 ? unboundSpring : 0;
  const unboundOpacity = frame >= 37 ? interpolate(unboundSpring, [0, 0.4], [0, 1], { extrapolateRight: "clamp" }) : 0;

  // Word 4: "by" snaps in at frame 47
  const bySpring = spring({
    frame: frame - 47,
    fps,
    config: NAYAAB_THEME.springs.staccatoPop,
  });
  const byScale = frame >= 47 ? bySpring : 0;
  const byOpacity = frame >= 47 ? interpolate(bySpring, [0, 0.4], [0, 1], { extrapolateRight: "clamp" }) : 0;

  // 2. Cycling column of words timings (forms, labels, niches)
  // The column snaps in starting at frame 55
  const formsSpring = spring({
    frame: frame - 55,
    fps,
    config: NAYAAB_THEME.springs.staccatoPop,
  });
  const formsScale = frame >= 55 ? formsSpring : 0;

  const labelsSpring = spring({
    frame: frame - 56,
    fps,
    config: NAYAAB_THEME.springs.staccatoPop,
  });
  const labelsScale = frame >= 56 ? labelsSpring : 0;

  const nichesSpring = spring({
    frame: frame - 57,
    fps,
    config: NAYAAB_THEME.springs.staccatoPop,
  });
  const nichesScale = frame >= 57 ? nichesSpring : 0;

  // Determine which item in the column is actively highlighted (bright white vs muted opacity)
  const formsActive = frame >= 55 && frame < 67;
  const labelsActive = frame >= 67 && frame < 79;
  const nichesActive = frame >= 79;

  const formsOpacity = frame >= 55
    ? (formsActive ? 1.0 : 0.3) * interpolate(formsSpring, [0, 0.4], [0, 1], { extrapolateRight: "clamp" })
    : 0;

  const labelsOpacity = frame >= 56
    ? (labelsActive ? 1.0 : 0.3) * interpolate(labelsSpring, [0, 0.4], [0, 1], { extrapolateRight: "clamp" })
    : 0;

  const nichesOpacity = frame >= 57
    ? (nichesActive ? 1.0 : 0.3) * interpolate(nichesSpring, [0, 0.4], [0, 1], { extrapolateRight: "clamp" })
    : 0;

  const clipPercent = interpolate(formsSpring, [0, 1], [100, -5], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Scroll animation 1 (from trends to hype): starts at frame 67
  const scroll1Spring = spring({
    frame: frame - 67,
    fps,
    config: NAYAAB_THEME.springs.smoothSlide,
  });

  // Scroll animation 2 (from hype to niches): starts at frame 79
  const scroll2Spring = spring({
    frame: frame - 79,
    fps,
    config: NAYAAB_THEME.springs.smoothSlide,
  });

  // Interpolated index representing the scroll state (0 -> 1 -> 2)
  const activeIndex =
    interpolate(scroll1Spring, [0, 1], [0, 1], { extrapolateRight: "clamp" }) +
    interpolate(scroll2Spring, [0, 1], [0, 1], { extrapolateRight: "clamp" });

  const lineSpacing = 120; // baseline-to-baseline vertical distance in pixels
  const translateY = (1 - activeIndex) * lineSpacing;

  return (
    <AbsoluteFill
      className="flex flex-col justify-center items-center text-center overflow-hidden"
      style={{
        backgroundColor: brickRed,
        // Programmatic grid tiled overlay representing square brick tiles
        backgroundImage: `
          linear-gradient(rgba(0, 0, 0, 0.15) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 0, 0, 0.15) 1px, transparent 1px)
        `,
        backgroundSize: "120px 120px",
      }}
    >
      {/* STATE 1: Frames 0 to 14 - Serif Lowercase "an arthouse" */}
      {frame < 15 && (
        <div
          style={{
            fontFamily: '"Times New Roman", Times, Baskerville, Georgia, serif',
            fontSize: "92px",
            fontWeight: 400,
            color: textColor,
          }}
        >
          a reality
        </div>
      )}

      {/* STATE 2: Frames 15 to 26 - Sans-Serif Intermediate Uppercase wide tracking flash */}
      {frame >= 15 && frame < 27 && (
        <div
          style={{
            fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
            fontSize: "92px",
            color: textColor,
            display: "flex",
            flexDirection: "row",
            alignItems: "baseline",
            gap: "24px",
          }}
        >
          <span style={{ fontWeight: 300 }}>a</span>
          <span
            style={{
              fontWeight: 400,
              textTransform: "uppercase",
              letterSpacing: "0.25em",
            }}
          >
            REALITY
          </span>
        </div>
      )}

      {/* STATE 3: Frames 27 to 90 - Sans-serif layout with staggered reveals and cycling text column */}
      {frame >= 27 && (
        <div
          className="flex flex-row items-baseline gap-x-12 select-none"
          style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
        >
          {/* Word 1: an */}
          <span
            style={{
              fontSize: "92px",
              fontWeight: 300,
              color: textColor,
              transform: `scale(${anScale})`,
              opacity: anOpacity,
              display: "inline-block",
            }}
          >
            a
          </span>

          {/* Word 2: arthouse (bold) */}
          <span
            style={{
              fontSize: "92px",
              fontWeight: 800,
              color: textColor,
              transform: `scale(${arthouseScale})`,
              opacity: arthouseOpacity,
              display: "inline-block",
            }}
          >
            reality
          </span>

          {/* Word 3: unbound */}
          {frame >= 37 && (
            <span
              style={{
                display: "inline-block",
                overflow: "hidden",
                whiteSpace: "nowrap",
                fontSize: "92px",
                fontWeight: 300,
                color: textColor,
                transform: `scale(${unboundScale})`,
                opacity: unboundOpacity,
                maxWidth: interpolate(unboundSpring, [0, 1], [0, 450], { extrapolateRight: "clamp" }),
              }}
            >
              outside
            </span>
          )}

          {/* Word 4: by */}
          {frame >= 47 && (
            <span
              style={{
                display: "inline-block",
                overflow: "hidden",
                whiteSpace: "nowrap",
                fontSize: "92px",
                fontWeight: 300,
                color: textColor,
                transform: `scale(${byScale})`,
                opacity: byOpacity,
                maxWidth: interpolate(bySpring, [0, 1], [0, 150], { extrapolateRight: "clamp" }),
              }}
            >
              of
            </span>
          )}

          {/* Word 5: Cycling vertical column (forms, labels, niches) aligned next to "by" */}
          {frame >= 55 && (
            <span
              style={{
                display: "inline-flex",
                position: "relative",
                alignItems: "baseline",
                overflow: "visible",
                maxWidth: interpolate(formsSpring, [0, 1], [0, 500], { extrapolateRight: "clamp" }),
                clipPath: `inset(-200px ${clipPercent}% -200px 0px)`,
              }}
            >
              {/* Spacer based on "niches" width at fontWeight 800 to prevent layout shifts and clipping */}
              <span style={{ fontSize: "92px", fontWeight: 800, opacity: 0, pointerEvents: "none" }}>
                cliches
              </span>

              {/* Absolute overlay containing the three stacked words */}
              <span
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  display: "inline-block",
                  whiteSpace: "nowrap",
                  transform: `translateY(${translateY}px)`,
                }}
              >
                {/* trends (above) */}
                <span
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    transform: `translateY(${-lineSpacing}px) scale(${formsScale})`,
                    transformOrigin: "left center",
                    fontSize: "92px",
                    fontWeight: formsActive ? 800 : 300,
                    opacity: formsOpacity,
                    color: textColor,
                    lineHeight: "1.1",
                  }}
                >
                  trends
                </span>

                {/* hype (middle, baseline-aligned) */}
                <span
                  style={{
                    display: "inline-block",
                    fontSize: "92px",
                    fontWeight: labelsActive ? 800 : 300,
                    opacity: labelsOpacity,
                    color: textColor,
                    transform: `scale(${labelsScale})`,
                    transformOrigin: "left center",
                    lineHeight: "1.1",
                  }}
                >
                  hype
                </span>

                {/* niches (below) */}
                <span
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    transform: `translateY(${lineSpacing}px) scale(${nichesScale})`,
                    transformOrigin: "left center",
                    fontSize: "92px",
                    fontWeight: nichesActive ? 800 : 300,
                    opacity: nichesOpacity,
                    color: textColor,
                    lineHeight: "1.1",
                  }}
                >
                  niches
                </span>
              </span>
            </span>
          )}
        </div>
      )}
    </AbsoluteFill>
  );
};
export default ArthouseScene;
