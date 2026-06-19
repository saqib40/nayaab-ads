import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { loadFont as loadArchivo } from "@remotion/google-fonts/Archivo";

const inter = loadInter("normal", {
  weights: ["400", "500", "700"],
  subsets: ["latin"],
});

const archivo = loadArchivo("normal", {
  weights: ["900"],
  subsets: ["latin"],
});

export const vicelandTheme = {
  // Pure, raw contrast. No comforting middle-ground grays.
  colors: {
    background: "#000000",      // Pitch black canvas
    surface: "#0D0D0D",         // Subtly lifted dark layer for structural cards
    textPrimary: "#FFFFFF",     // Pure white for striking, readable headlines
    textSecondary: "#8A8A8A",   // Clean, mid-tone gray for secondary metadata
    accent: "#FFFFFF",          // The accent is just more high-contrast white
    inverseBackground: "#FFFFFF",
    inverseText: "#000000",
    // Accent colors for raw brutalist overlays/flashes
    rawYellow: "#EAFF00",       // Raw neon yellow
    rawGreen: "#00FF66",        // Raw neon green
    rawRed: "#FF003C",          // Raw danger red
  },

  // Completely default, robust, neutral Neo-Grotesque Swiss typography
  fonts: {
    heading: `${archivo.fontFamily}, "Helvetica Neue", Helvetica, Arial, sans-serif`,
    body: `${inter.fontFamily}, "Helvetica Neue", Helvetica, Arial, sans-serif`,
    mono: 'SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace',
  },

  fontSizes: {
    xs: "12px",
    sm: "14px",
    md: "16px",
    lg: "20px",
    xl: "28px",
    xxl: "48px",   // Brutalist scale for kinetic, heavy typographic treatments
    giant: "72px", // For massive headline block copy
  },

  fontWeights: {
    regular: "400",
    medium: "500",
    bold: "700",
    black: "900",  // Used almost everywhere for headers to get that heavy, blocky ink feel
  },

  // Tight letter-spacing gives that urgent, compact "street poster" look
  letterSpacings: {
    tighter: "-0.05em",
    tight: "-0.02em",
    normal: "0",
    wide: "0.05em",
  },

  lineHeights: {
    none: "1",
    tight: "1.1",  // Crushing line height so stacked text blocks feel structural
    body: "1.4",
  },

  // Sharp, dangerous borders. Zero border-radius allowed.
  radii: {
    none: "0px",
    sharp: "0px",
  },

  // The anti-slick guideline: no blurred dropshadows.
  shadows: {
    none: "none",
    brutalist: "4px 4px 0px #FFFFFF", // If a shadow is absolutely needed, it's hard-edged and solid
    brutalistYellow: "4px 4px 0px #EAFF00",
  },

  // Motion timings designed for violent cuts and instantaneous responses
  transitions: {
    instant: "0s",
    hardCut: "all 0.08s cubic-bezier(0, 0, 0.2, 1)", // Snappy, almost imperceptible easing
    linearSlide: "transform 0.15s cubic-bezier(0.4, 0, 1, 1)", // Straightforward, mechanical slides
    violentSnap: "all 0.2s cubic-bezier(0.85, 0, 0.15, 1)", // Snappy ease-in-out
  }
};

export type CustomTheme = typeof vicelandTheme;
