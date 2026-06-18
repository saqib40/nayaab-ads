import { loadFont as loadInter } from "@remotion/google-fonts/Inter";

const interFont = loadInter("normal", {
  weights: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export const NAYAAB_THEME = {
  colors: {
    background: '#000000',
    textPrimary: '#FFFFFF',
    textMuted: '#A3A3A3', // Tailwind neutral-400
    brandRed: '#EF4444',   // Vibrant brand red from reference (#EF4444)
  },
  fonts: {
    sansBold: `"Helvetica Neue", ${interFont.fontFamily}, Arial, sans-serif`, // Clean, heavy sans stack with loaded Inter fallback
  },
  // Reusable spring physics config for snappy, organic pops
  springs: {
    staccatoPop: {
      mass: 0.4,
      stiffness: 150,
      damping: 12,
    },
    smoothSlide: {
      mass: 0.8,
      stiffness: 90,
      damping: 15,
    }
  }
};