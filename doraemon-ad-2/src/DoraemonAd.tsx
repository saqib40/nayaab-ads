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

export const TOTAL_AD_FRAMES = 560;
export const AD_FPS = 24;
export const AD_WIDTH = 1280;
export const AD_HEIGHT = 720;

const BG = "#F3F3EF";
const BLACK = "#0D0D0D";
const FONT =
  'Inter, "Helvetica Neue", -apple-system, BlinkMacSystemFont, Arial, sans-serif';

const typeStyle: React.CSSProperties = {
  fontFamily: FONT,
  fontWeight: 900,
  textTransform: "uppercase",
};

const RevealLines: React.FC<{
  lines: Array<{text: string; at: number}>;
  fontSize: number;
  color?: string;
  gap?: number;
  style?: React.CSSProperties;
}> = ({lines, fontSize, color = BLACK, gap = 8, style}) => {
  const frame = useCurrentFrame();

  return (
    <div style={{display: "flex", flexDirection: "column", gap, ...style}}>
      {lines.map(({text, at}) => (
        <div
          key={text}
          style={{
            ...typeStyle,
            fontSize,
            color,
            lineHeight: 0.95,
            letterSpacing: "-0.02em",
            visibility: frame >= at ? "visible" : "hidden",
          }}
        >
          {text}
        </div>
      ))}
    </div>
  );
};

const StarkCard: React.FC<{children: React.ReactNode}> = ({children}) => (
  <AbsoluteFill
    style={{
      backgroundColor: BG,
      padding: "64px 80px",
      display: "flex",
      justifyContent: "center",
    }}
  >
    {children}
  </AbsoluteFill>
);

export const DoraemonAd: React.FC = () => {
  return (
    <AbsoluteFill style={{backgroundColor: BG, scale: 1.001}}>
      <Series>
        <Series.Sequence durationInFrames={48}>
          <Intro />
        </Series.Sequence>
        <Series.Sequence durationInFrames={232}>
          <AnkitStory />
        </Series.Sequence>
        <Series.Sequence durationInFrames={72}>
          <CiCard />
        </Series.Sequence>
        <Series.Sequence durationInFrames={72}>
          <DoraemonCard />
        </Series.Sequence>
        <Series.Sequence durationInFrames={64}>
          <PunchlineCard />
        </Series.Sequence>
        <Series.Sequence durationInFrames={72}>
          <FinalCard />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};

const Intro: React.FC = () => (
  <AbsoluteFill>
    <Freeze frame={0}>
      <OffthreadVideo
        src={staticFile("video-burger.mp4")}
        style={{width: "100%", height: "100%", objectFit: "cover"}}
      />
    </Freeze>
    <div
      style={{
        position: "absolute",
        inset: "0 auto 0 72px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <RevealLines
        lines={[
          {text: "THIS", at: 4},
          {text: "IS", at: 18},
          {text: "ANKIT", at: 32},
        ]}
        fontSize={88}
        color="#FFFFFF"
        style={{
          textShadow: "0 4px 24px rgba(0,0,0,.7), 0 2px 4px rgba(0,0,0,.9)",
        }}
      />
    </div>
  </AbsoluteFill>
);

const AnkitStory: React.FC = () => {
  const frame = useCurrentFrame();
  const headlineOpacity = interpolate(frame, [60, 72], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const shrink = interpolate(frame, [74, 108], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const leftOpacity = interpolate(frame, [106, 114], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{backgroundColor: BG}}>
      {frame < 74 ? (
        <div
          style={{
            position: "absolute",
            top: 48,
            left: 64,
            right: 64,
            zIndex: 10,
            opacity: headlineOpacity,
            textShadow: "0 3px 18px rgba(0,0,0,.8), 0 1px 3px rgba(0,0,0,.9)",
          }}
        >
          <RevealLines
            lines={[
              {text: "DORAEMON CUT ANKIT'S BUILD", at: 0},
              {text: "FROM TWENTY MINUTES", at: 20},
              {text: "TO FOUR SECONDS", at: 40},
            ]}
            fontSize={44}
            color="#FFFFFF"
            gap={6}
          />
        </div>
      ) : null}

      {frame >= 106 ? (
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
            opacity: leftOpacity,
          }}
        >
          <RevealLines
            lines={[
              {text: "HIS TESTS", at: 114},
              {text: "PASSED", at: 126},
            ]}
            fontSize={52}
          />
          <div
            style={{
              width: 48,
              height: 6,
              margin: "24px 0",
              backgroundColor: BLACK,
              visibility: frame >= 134 ? "visible" : "hidden",
            }}
          />
          <RevealLines
            lines={[
              {text: "HIS STOMACH", at: 142},
              {text: "NEVER HAD", at: 156},
              {text: "A CHANCE", at: 170},
            ]}
            fontSize={38}
            color="#333333"
          />
        </div>
      ) : null}

      <div
        style={{
          position: "absolute",
          left: interpolate(shrink, [0, 1], [0, 570]),
          top: interpolate(shrink, [0, 1], [0, 48]),
          width: interpolate(shrink, [0, 1], [1280, 650]),
          height: interpolate(shrink, [0, 1], [720, 624]),
          overflow: "hidden",
          backgroundColor: "#000",
          boxShadow: `0 14px 40px rgba(0,0,0,${interpolate(shrink, [0, 1], [0, 0.14])})`,
        }}
      >
        <OffthreadVideo
          src={staticFile("video-burger.mp4")}
          style={{width: "100%", height: "100%", objectFit: "cover"}}
        />
      </div>
    </AbsoluteFill>
  );
};

const CiCard: React.FC = () => (
  <StarkCard>
    <RevealLines
      lines={[
        {text: "CI DOESN'T", at: 0},
        {text: "UNDERSTAND", at: 20},
        {text: "YOUR CODE", at: 40},
      ]}
      fontSize={88}
      gap={14}
      style={{justifyContent: "center", width: "100%"}}
    />
  </StarkCard>
);

const DoraemonCard: React.FC = () => {
  return (
    <StarkCard>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <RevealLines
          lines={[{text: "DORAEMON DOES", at: 18}]}
          fontSize={88}
        />
      </div>
    </StarkCard>
  );
};

const PunchlineCard: React.FC = () => (
  <StarkCard>
    <RevealLines
      lines={[
        {text: "STOP WAITING ON BUILDS", at: 0},
        {text: "TO LIVE YOUR", at: 20},
        {text: "TERRIBLE LIFE", at: 36},
      ]}
      fontSize={72}
      gap={12}
      style={{justifyContent: "center", width: "100%"}}
    />
  </StarkCard>
);

const FinalCard: React.FC = () => (
  <AbsoluteFill
    style={{
      backgroundColor: BG,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <div
      style={{
        fontFamily: FONT,
        fontWeight: 900,
        fontSize: 88,
        letterSpacing: "-0.03em",
        color: BLACK,
        lineHeight: 1,
      }}
    >
      doraemon.tech
    </div>
  </AbsoluteFill>
);
