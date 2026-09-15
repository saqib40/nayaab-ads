import "./index.css";
import {Composition} from "remotion";
import {
  AD_FPS,
  AD_HEIGHT,
  AD_WIDTH,
  DoraemonAd,
  TOTAL_AD_FRAMES,
} from "./DoraemonAd";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="DoraemonAd"
      component={DoraemonAd}
      durationInFrames={TOTAL_AD_FRAMES}
      fps={AD_FPS}
      width={AD_WIDTH}
      height={AD_HEIGHT}
    />
  );
};
