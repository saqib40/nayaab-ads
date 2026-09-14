import React from "react";
import { AbsoluteFill } from "remotion";
import { VICELAND_BG } from "./VicelandTypography";

export const WindowedLayout: React.FC<{
  children: React.ReactNode;
  header: React.ReactNode;
}> = ({ children, header }) => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: VICELAND_BG,
        padding: "48px 64px 56px 64px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div style={{ width: "100%", marginBottom: 28 }}>{header}</div>
      <div
        style={{
          width: "100%",
          flex: 1,
          position: "relative",
          overflow: "hidden",
          backgroundColor: "#000",
          boxShadow: "0 12px 36px rgba(0, 0, 0, 0.12)",
        }}
      >
        {children}
      </div>
    </AbsoluteFill>
  );
};

export const SplitLayout: React.FC<{
  children: React.ReactNode;
  leftContent: React.ReactNode;
}> = ({ children, leftContent }) => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: VICELAND_BG,
        padding: "48px 60px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 40,
      }}
    >
      <div
        style={{
          flex: "1 1 45%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {leftContent}
      </div>
      <div
        style={{
          flex: "1 1 55%",
          height: "100%",
          position: "relative",
          overflow: "hidden",
          backgroundColor: "#000",
          boxShadow: "0 14px 40px rgba(0, 0, 0, 0.14)",
        }}
      >
        {children}
      </div>
    </AbsoluteFill>
  );
};

export const StarkCard: React.FC<{
  children: React.ReactNode;
  footer?: React.ReactNode;
}> = ({ children, footer }) => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: VICELAND_BG,
        padding: "64px 80px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", width: "100%" }}>
        {children}
      </div>
      {footer && <div style={{ width: "100%", paddingTop: 24 }}>{footer}</div>}
    </AbsoluteFill>
  );
};
