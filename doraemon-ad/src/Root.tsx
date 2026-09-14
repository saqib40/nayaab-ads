import "./index.css";
import { Composition } from "remotion";
import {
  DoraemonAd,
  TOTAL_AD_FRAMES,
  AD_FPS,
  AD_WIDTH,
  AD_HEIGHT,
} from "./DoraemonAd";
import { ClippedVideo } from "./ClippedVideo";

// Each <Composition> is an entry in the sidebar!

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="DoraemonAd"
        component={DoraemonAd}
        durationInFrames={TOTAL_AD_FRAMES}
        fps={AD_FPS}
        width={AD_WIDTH}
        height={AD_HEIGHT}
      />

      <Composition
        id="RawFootage"
        component={ClippedVideo}
        durationInFrames={232}
        fps={AD_FPS}
        width={AD_WIDTH}
        height={AD_HEIGHT}
      />
    </>
  );
};
