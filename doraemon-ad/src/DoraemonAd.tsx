import React from "react";
import {
  AbsoluteFill,
  Easing,
  Freeze,
  interpolate,
  OffthreadVideo,
  Series,
  staticFile,
  useCurrentFrame,
} from "remotion";
import {
  BoldHeadline,
  SteppedPhrases,
  SteppedSpacedLine,
  VICELAND_BG,
  VICELAND_BLACK,
  VICELAND_FONT,
} from "./components/VicelandTypography";
import {
  StarkCard,
} from "./components/VicelandFrame";

export const TOTAL_AD_FRAMES = 560; // 23.33 seconds @ 24 fps
export const AD_FPS = 24;
export const AD_WIDTH = 1280;
export const AD_HEIGHT = 720;

export const DoraemonAd: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: VICELAND_BG,
        scale: 1.001,
      }}
    >
      <Series>
        {/* ------------------------------------------------------------------ */}
        {/* BEAT 1 (0 - 48 frames | 2.0s): THIS IS GINNY                       */}
        {/* FROZEN on Frame 0 (Extreme close-up deadpan face)                  */}
        {/* Words snap in on the left while his face stays completely still     */}
        {/* ------------------------------------------------------------------ */}
        <Series.Sequence durationInFrames={48}>
          <AbsoluteFill>
            <Freeze frame={0}>
              <OffthreadVideo
                src={staticFile("video.mp4")}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Freeze>
            <div
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 72,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <SteppedPhrases
                phrases={[
                  { text: "THIS", atFrame: 4 },
                  { text: "IS", atFrame: 18 },
                  { text: "GINNY", atFrame: 32 },
                ]}
                fontSize={88}
                lineHeight={0.92}
                letterSpacing="-0.02em"
                color="#FFFFFF"
                style={{
                  textShadow:
                    "0 4px 24px rgba(0,0,0,0.7), 0 2px 4px rgba(0,0,0,0.9)",
                }}
              />
            </div>
          </AbsoluteFill>
        </Series.Sequence>

        {/* ------------------------------------------------------------------ */}
        {/* BEAT 2 & 3 (232 frames | 9.67s): GINNY'S FULL VIDEO STORY          */}
        {/* UNFREEZES FROM FRAME 0! Camera naturally zooms out smoothly        */}
        {/* No jump cut, no glitch, perfectly fluid motion                     */}
        {/* ------------------------------------------------------------------ */}
        <Series.Sequence durationInFrames={232}>
          <GinnyVideoStory />
        </Series.Sequence>

        {/* ------------------------------------------------------------------ */}
        {/* BEAT 4 (72 frames | 3.0s): CI IS STUPID                            */}
        {/* Stark full-screen editorial card (Ref Image 2)                     */}
        {/* ------------------------------------------------------------------ */}
        <Series.Sequence durationInFrames={72}>
          <Beat4StarkCard />
        </Series.Sequence>

        {/* ------------------------------------------------------------------ */}
        {/* BEAT 5 (72 frames | 3.0s): DORAEMON TESTS MATTER                   */}
        {/* Brand claim card                                                  */}
        {/* ------------------------------------------------------------------ */}
        <Series.Sequence durationInFrames={72}>
          <Beat5StarkCard />
        </Series.Sequence>

        {/* ------------------------------------------------------------------ */}
        {/* BEAT 6 (64 frames | 2.67s): PUNCHLINE                              */}
        {/* "STOP WAITING ON BUILDS TO LIVE YOUR TERRIBLE LIFE" (No footer)    */}
        {/* ------------------------------------------------------------------ */}
        <Series.Sequence durationInFrames={64}>
          <Beat6OutroCard />
        </Series.Sequence>

        {/* ------------------------------------------------------------------ */}
        {/* BEAT 7 (72 frames | 3.0s): FINAL URL CARD                          */}
        {/* "doraemon.tech in middle by itself"                                */}
        {/* ------------------------------------------------------------------ */}
        <Series.Sequence durationInFrames={72}>
          <Beat7FinalUrlCard />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};

/**
 * Continuous video playback starting from frame 0.
 * Smoothly shrinks and glides the video container from full-bleed
 * into the right-hand card, revealing the bone-white background
 * and left-hand text naturally.
 */
const GinnyVideoStory: React.FC = () => {
  const frame = useCurrentFrame();

  // 1. Beat 2 Headline: Stepped reveal, then smooth fade-out BEFORE shrink begins
  const beat2TextOpacity = interpolate(frame, [60, 72], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 2. Video container geometry: Smoothly shrinks & slides from full-bleed to right 51%
  const shrinkProgress = interpolate(frame, [74, 108], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const videoLeft = interpolate(shrinkProgress, [0, 1], [0, 570]);
  const videoTop = interpolate(shrinkProgress, [0, 1], [0, 48]);
  const videoWidth = interpolate(shrinkProgress, [0, 1], [1280, 650]);
  const videoHeight = interpolate(shrinkProgress, [0, 1], [720, 624]);
  const shadowAlpha = interpolate(shrinkProgress, [0, 1], [0, 0.14]);

  // 3. Beat 3 Left side content
  const beat3Frame = frame - 108;
  const leftTextOpacity = interpolate(frame, [106, 114], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: VICELAND_BG }}>
      {/* Beat 2 Headline overlay during full-bleed zoom-out */}
      {frame < 74 && (
        <div
          style={{
            position: "absolute",
            top: 48,
            left: 64,
            right: 64,
            zIndex: 10,
            opacity: beat2TextOpacity,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div
              style={{
                fontFamily: VICELAND_FONT,
                fontWeight: 900,
                fontSize: 44,
                lineHeight: 1.05,
                letterSpacing: "-0.01em",
                color: "#FFFFFF",
                textTransform: "uppercase",
                textShadow:
                  "0 3px 18px rgba(0,0,0,0.8), 0 1px 3px rgba(0,0,0,0.9)",
              }}
            >
              WE MADE GINNY'S CI FINISH,
            </div>
            <div
              style={{
                fontFamily: VICELAND_FONT,
                fontWeight: 900,
                fontSize: 44,
                lineHeight: 1.05,
                letterSpacing: "-0.01em",
                color: "#FFFFFF",
                textTransform: "uppercase",
                textShadow:
                  "0 3px 18px rgba(0,0,0,0.8), 0 1px 3px rgba(0,0,0,0.9)",
                visibility: frame >= 36 ? "visible" : "hidden",
              }}
            >
              SO HE COULD MAKE HIS WIFE FINISH.
            </div>
          </div>
        </div>
      )}

      {/* Beat 3 Left-Hand Editorial Content */}
      {frame >= 106 && (
        <div
          style={{
            position: "absolute",
            left: 60,
            top: 48,
            width: 470,
            height: 624,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            opacity: leftTextOpacity,
            zIndex: 5,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <BoldHeadline
              lines={["HE HAS SIX", "KIDS NOW."]}
              fontSize={52}
              letterSpacing="-0.01em"
            />
            <div
              style={{
                width: 48,
                height: 6,
                backgroundColor: VICELAND_BLACK,
                visibility: beat3Frame >= 20 ? "visible" : "hidden",
              }}
            />
            <BoldHeadline
              lines={["HE HATES HIS LIFE,"]}
              fontSize={36}
              letterSpacing="-0.01em"
              color="#333333"
              style={{
                visibility: beat3Frame >= 28 ? "visible" : "hidden",
              }}
            />
            <BoldHeadline
              lines={["BUT HIS BUILD TIMES", "ARE INCREDIBLE."]}
              fontSize={36}
              letterSpacing="-0.01em"
              color="#111111"
              style={{
                visibility: beat3Frame >= 44 ? "visible" : "hidden",
              }}
            />
          </div>
        </div>
      )}

      {/* Continuously Mounted Video Container that morphs from full screen to right split */}
      <div
        style={{
          position: "absolute",
          left: videoLeft,
          top: videoTop,
          width: videoWidth,
          height: videoHeight,
          overflow: "hidden",
          backgroundColor: "#000",
          boxShadow: `0 14px 40px rgba(0, 0, 0, ${shadowAlpha})`,
          zIndex: 2,
        }}
      >
        <OffthreadVideo
          src={staticFile("video.mp4")}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
    </AbsoluteFill>
  );
};

/**
 * Beat 4 Component: "CI IS INHERENTLY STUPID"
 */
const Beat4StarkCard: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <StarkCard>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 14,
          width: "100%",
        }}
      >
        <div
          style={{
            fontFamily: VICELAND_FONT,
            fontWeight: 900,
            fontSize: 88,
            letterSpacing: "0.26em",
            lineHeight: 0.95,
            color: VICELAND_BLACK,
            textTransform: "uppercase",
            visibility: frame >= 0 ? "visible" : "hidden",
          }}
        >
          C I &nbsp; I S
        </div>
        <div
          style={{
            fontFamily: VICELAND_FONT,
            fontWeight: 900,
            fontSize: 88,
            letterSpacing: "0.08em",
            lineHeight: 0.95,
            color: VICELAND_BLACK,
            textTransform: "uppercase",
            visibility: frame >= 20 ? "visible" : "hidden",
          }}
        >
          INHERENTLY
        </div>
        <div
          style={{
            fontFamily: VICELAND_FONT,
            fontWeight: 900,
            fontSize: 88,
            letterSpacing: "0.22em",
            lineHeight: 0.95,
            color: VICELAND_BLACK,
            textTransform: "uppercase",
            visibility: frame >= 40 ? "visible" : "hidden",
          }}
        >
          S T U P I D
        </div>
      </div>
    </StarkCard>
  );
};

/**
 * Beat 5 Component: Doraemon Tests Matter
 */
const Beat5StarkCard: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <StarkCard>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 24,
          width: "100%",
        }}
      >
        <SteppedSpacedLine
          text="DORAEMON"
          startFrame={0}
          framesPerChar={2}
          fontSize={44}
          color="#666666"
          letterSpacing="0.32em"
        />
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div
            style={{
              fontFamily: VICELAND_FONT,
              fontWeight: 900,
              fontSize: 78,
              letterSpacing: "-0.02em",
              lineHeight: 0.95,
              color: VICELAND_BLACK,
              textTransform: "uppercase",
              visibility: frame >= 18 ? "visible" : "hidden",
            }}
          >
            RUNS ONLY
          </div>
          <div
            style={{
              fontFamily: VICELAND_FONT,
              fontWeight: 900,
              fontSize: 78,
              letterSpacing: "-0.02em",
              lineHeight: 0.95,
              color: VICELAND_BLACK,
              textTransform: "uppercase",
              visibility: frame >= 36 ? "visible" : "hidden",
            }}
          >
            THE TESTS THAT MATTER.
          </div>
        </div>
      </div>
    </StarkCard>
  );
};

/**
 * Beat 6 Component: Outro punchline without footer
 */
const Beat6OutroCard: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <StarkCard>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div
          style={{
            fontFamily: VICELAND_FONT,
            fontWeight: 900,
            fontSize: 76,
            letterSpacing: "-0.02em",
            lineHeight: 0.95,
            color: VICELAND_BLACK,
            textTransform: "uppercase",
            visibility: frame >= 0 ? "visible" : "hidden",
          }}
        >
          STOP WAITING ON BUILDS
        </div>
        <div
          style={{
            fontFamily: VICELAND_FONT,
            fontWeight: 900,
            fontSize: 52,
            lineHeight: 1.0,
            letterSpacing: "-0.01em",
            color: "#444444",
            textTransform: "uppercase",
            visibility: frame >= 20 ? "visible" : "hidden",
          }}
        >
          TO LIVE YOUR TERRIBLE LIFE.
        </div>
      </div>
    </StarkCard>
  );
};

/**
 * Beat 7 Component: Final CTA Card
 * "doraemon.tech in middle by itself"
 */
const Beat7FinalUrlCard: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: VICELAND_BG,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          fontFamily: VICELAND_FONT,
          fontWeight: 900,
          fontSize: 88,
          letterSpacing: "-0.03em",
          color: VICELAND_BLACK,
          lineHeight: 1,
        }}
      >
        doraemon.tech
      </div>
    </AbsoluteFill>
  );
};

