import React from "react";
import {
  AbsoluteFill,
  staticFile,
} from "remotion";
import { Video } from "@remotion/media";
import { loadFont as loadPoppins } from "@remotion/google-fonts/Poppins";
import { loadFont as loadAnton } from "@remotion/google-fonts/Anton";
import { NAYAAB_THEME } from "./Theme";

const poppinsFont = loadPoppins("normal", {
  weights: ["500"],
  subsets: ["latin"],
});
const antonFont = loadAnton();

export const BrunessIsBackScene: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#000000",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* Masked Video Background */}
      <div style={{ position: "absolute", width: "100%", height: "100%" }}>
        <Video
          src={staticFile("edit.mp4")}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
          }}
          objectFit="cover"
          muted
          loop
        />
        {/* Multiply layer to mask the video inside NAYAAB text */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "#000000",
            mixBlendMode: "multiply",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontFamily: antonFont.fontFamily,
              fontSize: "350px",
              fontWeight: 900,
              textTransform: "uppercase",
              letterSpacing: "-0.01em",
              lineHeight: "1",
              transform: "scaleY(3.2)",
              transformOrigin: "center center",
              color: "#FFFFFF",
              display: "inline-block",
              userSelect: "none",
            }}
          >
            NAYAAB
          </div>
        </div>
      </div>

      {/* Central Red Grid Text Box */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "520px",
          height: "100px",
          border: "3px solid #000000",
          backgroundColor: NAYAAB_THEME.colors.brandRed, // #EF4444
          backgroundImage: `
            linear-gradient(rgba(0, 0, 0, 0.15) 1.5px, transparent 1.5px),
            linear-gradient(90deg, rgba(0, 0, 0, 0.15) 1.5px, transparent 1.5px)
          `,
          backgroundSize: "20px 20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
          userSelect: "none",
        }}
      >
        <div
          style={{
            fontFamily: poppinsFont.fontFamily,
            fontSize: "64px",
            fontWeight: 500,
            color: "#000000",
            textTransform: "lowercase",
            letterSpacing: "-0.02em",
            textAlign: "center",
            lineHeight: "1",
          }}
        >
          go meet people
        </div>
      </div>
    </AbsoluteFill>
  );
};

export default BrunessIsBackScene;
