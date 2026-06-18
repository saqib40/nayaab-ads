import "./index.css";
import { Composition } from "remotion";
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
import { Main } from "./Main";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Main"
        component={Main}
        durationInFrames={726}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="ManifestoScene"
        component={ManifestoScene}
        durationInFrames={60}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="BrunessScene"
        component={BrunessScene}
        durationInFrames={60}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="ArthouseScene"
        component={ArthouseScene}
        durationInFrames={90}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="EverythingScene"
        component={EverythingScene}
        durationInFrames={90}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="ButScene"
        component={ButScene}
        durationInFrames={15}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="HotMinuteScene"
        component={HotMinuteScene}
        durationInFrames={60}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="LekinScene"
        component={LekinScene}
        durationInFrames={15}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="TaiyaariScene"
        component={TaiyaariScene}
        durationInFrames={60}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="BrunessIsBackScene"
        component={BrunessIsBackScene}
        durationInFrames={231}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="BrunessFlashScene"
        component={BrunessFlashScene}
        durationInFrames={60}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};

