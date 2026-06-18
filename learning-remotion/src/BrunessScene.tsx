import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  staticFile,
} from "remotion";
import { loadFont as loadPoppins } from "@remotion/google-fonts/Poppins";
import { loadFont as loadAnton } from "@remotion/google-fonts/Anton";
import { NAYAAB_THEME } from "./Theme";

const poppinsFont = loadPoppins("normal", {
  weights: ["300", "400", "600"],
  subsets: ["latin"],
});
const antonFont = loadAnton();

const LetterItem: React.FC<{
  letter: string;
  image: string;
  index: number;
  frame: number;
}> = ({ letter, image, index, frame }) => {
  const revealFrame = Math.round(25 + index * 1.5);
  const hideFrame = Math.round(36 + index * 1.5);

  const isRevealed = frame >= revealFrame;
  const isHidden = frame >= hideFrame;
  const blackOpacity = (!isRevealed || isHidden) ? 1 : 0;

  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
        // eslint-disable-next-line @remotion/no-background-image
        backgroundImage: `url(${staticFile(image)})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        color: "transparent",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
    >
      {letter}
      <span
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          color: "#000000",
          opacity: blackOpacity,
          WebkitTextFillColor: "#000000",
          pointerEvents: "none",
        }}
      >
        {letter}
      </span>
    </div>
  );
};

export const BrunessScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Override/map variables for high-contrast white mode
  const backgroundColor = "#FFFFFF";
  const textColor = "#000000";

  // 1. Staggered Word Entry Timings
  // Word 1: so (starts at frame 0)
  const soSpring = spring({
    frame: frame,
    fps,
    config: NAYAAB_THEME.springs.staccatoPop,
  });
  const soScale = frame >= 0 ? soSpring : 0;
  const soOpacity = frame >= 0 ? interpolate(soSpring, [0, 0.4], [0, 1], { extrapolateRight: "clamp" }) : 0;

  // Word 2: we (starts at frame 6)
  const weSpring = spring({
    frame: frame - 6,
    fps,
    config: NAYAAB_THEME.springs.staccatoPop,
  });
  const weScale = frame >= 6 ? weSpring : 0;
  const weOpacity = frame >= 6 ? interpolate(weSpring, [0, 0.4], [0, 1], { extrapolateRight: "clamp" }) : 0;

  // Word 3: created (starts at frame 12)
  const createdSpring = spring({
    frame: frame - 12,
    fps,
    config: NAYAAB_THEME.springs.staccatoPop,
  });
  const createdScale = frame >= 12 ? createdSpring : 0;
  const createdOpacity = frame >= 12 ? interpolate(createdSpring, [0, 0.4], [0, 1], { extrapolateRight: "clamp" }) : 0;

  // Word 4: BRUNESS (starts at frame 20)
  const brunessSpring = spring({
    frame: frame - 20,
    fps,
    config: NAYAAB_THEME.springs.staccatoPop,
  });
  const brunessScale = frame >= 20 ? brunessSpring : 0;
  const brunessOpacity = frame >= 20 ? interpolate(brunessSpring, [0, 0.4], [0, 1], { extrapolateRight: "clamp" }) : 0;

  return (
    <AbsoluteFill
      className="flex flex-col justify-center items-center text-center overflow-hidden"
      style={{ backgroundColor }}
    >
      {/* 
        We use an inline-flex container with stretch alignment.
        This forces the container width to be determined by the largest child (the massive BRUNESS text),
        which in turn stretches the first row to match that exact width, aligning "so" and "created"
        perfectly with the left and right boundaries of BRUNESS.
      */}
      <div className="inline-flex flex-col items-stretch select-none">

        {/* Line 1: so we created (Montserrat, Regular/Light) */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            fontFamily: poppinsFont.fontFamily,
            fontSize: "100px",
            fontWeight: 600,
            color: textColor,
            textTransform: "lowercase",
            marginBottom: "20px",
            letterSpacing: "-0.03em",
          }}
        >
          <span style={{ transform: `scale(${soScale})`, opacity: soOpacity, display: "inline-block" }}>
            so
          </span>
          <span style={{ transform: `scale(${weScale})`, opacity: weOpacity, display: "inline-block" }}>
            we
          </span>
          <span style={{ transform: `scale(${createdScale})`, opacity: createdOpacity, display: "inline-block" }}>
            created
          </span>
        </div>

        {/* Line 2: BRUNESS (Anton) */}
        {/* 
          We render the element always present in layout with scale and opacity animations 
          to ensure the layout width is reserved from frame 0 and prevent horizontal text shifting.
        */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            fontFamily: antonFont.fontFamily,
            fontSize: "550px", // Adjusted sizing to fit width proportions
            fontWeight: 900,
            textTransform: "uppercase",
            letterSpacing: "-0.01em", // tight kerning
            lineHeight: "0.85",
            transform: `scale(${brunessScale})`,
            opacity: brunessOpacity,
            transformOrigin: "center center",
          }}
        >
          {[
            { char: "N", image: "ss0.jfif" },
            { char: "A", image: "ss1.jfif" },
            { char: "Y", image: "ss2.jfif" },
            { char: "A", image: "ss3.jfif" },
            { char: "A", image: "ss4.jfif" },
            { char: "B", image: "ss5.png" },
          ].map((item, index) => (
            <LetterItem
              key={index}
              letter={item.char}
              image={item.image}
              index={index}
              frame={frame}
            />
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
export default BrunessScene;
