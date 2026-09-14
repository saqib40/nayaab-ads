import React from "react";
import { AbsoluteFill, OffthreadVideo, staticFile } from "remotion";

// The video file is now cleanly clipped with the initial photo removed
export const VIDEO_DURATION_IN_FRAMES = 232; // 9.67s at 24 fps
export const VIDEO_FPS = 24;
export const VIDEO_WIDTH = 1280;
export const VIDEO_HEIGHT = 720;

export const ClippedVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      <OffthreadVideo src={staticFile("video.mp4")} />
    </AbsoluteFill>
  );
};
