import React from "react";
import { AbsoluteFill } from "remotion";
import { loadFont as loadPoppins } from "@remotion/google-fonts/Poppins";
import { NAYAAB_THEME } from "./Theme";

const poppinsFont = loadPoppins("normal", {
  weights: ["400"],
  subsets: ["latin"],
});

export const ButScene: React.FC = () => {
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
      <div
        style={{
          fontFamily: poppinsFont.fontFamily,
          fontSize: "300px",
          fontWeight: 400,
          color: NAYAAB_THEME.colors.brandRed, // Soft, muted red
          display: "inline-block",
          textAlign: "center",
          userSelect: "none",
          letterSpacing: "-0.04em",
          lineHeight: "1",
        }}
      >
        [but]
      </div>
    </AbsoluteFill>
  );
};

export default ButScene;
