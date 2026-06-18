import React from "react";
import { Sequence, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { ManifestoScene } from "./ManifestoScene";
import { BrunessScene } from "./BrunessScene";
import { ArthouseScene } from "./ArthouseScene";
import { EverythingScene } from "./EverythingScene";
import { ButScene } from "./ButScene";
import { HotMinuteScene } from "./HotMinuteScene";
import { LekinScene } from "./LekinScene";
import { TaiyaariScene } from "./TaiyaariScene";
import { BrunessFlashScene } from "./BrunessFlashScene";
import { BrunessIsBackScene } from "./BrunessIsBackScene";
import { NAYAAB_THEME } from "./Theme";

export const Main: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Transition from BrunessScene (ends at 120) to ArthouseScene (starts main content at 120)
  // Transition happens from absolute frame 105 to 120 (15 frames)
  const transitionSpring = spring({
    frame: frame - 105,
    fps,
    config: NAYAAB_THEME.springs.smoothSlide,
  });

  // Bruness slides left (0 -> -1920)
  const brunessTranslateX = frame >= 105
    ? interpolate(transitionSpring, [0, 1], [0, -1920])
    : 0;

  // Arthouse slides in from right (1920 -> 0)
  const arthouseTranslateX = frame >= 105
    ? interpolate(transitionSpring, [0, 1], [1920, 0])
    : 1920;

  return (
    <div style={{ backgroundColor: "#000000", width: "100%", height: "100%", position: "relative" }}>
      {/* ManifestoScene: 0 - 60 */}
      <Sequence durationInFrames={60} layout="none">
        <ManifestoScene />
      </Sequence>

      {/* BrunessScene: 60 - 120 */}
      <Sequence from={60} durationInFrames={60} layout="none">
        <div style={{ position: "absolute", width: "100%", height: "100%", transform: `translateX(${brunessTranslateX}px)` }}>
          <BrunessScene />
        </div>
      </Sequence>

      {/* ArthouseScene: 105 - 210 (starts rendering at frame 105 to animate during horizontal transition) */}
      <Sequence from={105} durationInFrames={105} layout="none">
        <div style={{ position: "absolute", width: "100%", height: "100%", transform: `translateX(${arthouseTranslateX}px)` }}>
          <ArthouseScene />
        </div>
      </Sequence>

      {/* ButScene: 285 - 300 (Rendered before EverythingScene in DOM so it sits underneath) */}
      <Sequence from={285} durationInFrames={15} layout="none">
        <ButScene />
      </Sequence>

      {/* EverythingScene: 210 - 300 (Rendered on top of ButScene) */}
      <Sequence from={210} durationInFrames={90} layout="none">
        <EverythingScene />
      </Sequence>

      {/* HotMinuteScene: 300 - 360 */}
      <Sequence from={300} durationInFrames={60} layout="none">
        <HotMinuteScene />
      </Sequence>

      {/* LekinScene: 360 - 375 */}
      <Sequence from={360} durationInFrames={15} layout="none">
        <LekinScene />
      </Sequence>

      {/* TaiyaariScene: 375 - 435 */}
      <Sequence from={375} durationInFrames={60} layout="none">
        <TaiyaariScene />
      </Sequence>

      {/* BrunessIsBackScene: 435 - 666 */}
      <Sequence from={435} durationInFrames={231} layout="none">
        <BrunessIsBackScene />
      </Sequence>

      {/* BrunessFlashScene: 666 - 726 */}
      <Sequence from={666} durationInFrames={60} layout="none">
        <BrunessFlashScene />
      </Sequence>
    </div>
  );
};

export default Main;

