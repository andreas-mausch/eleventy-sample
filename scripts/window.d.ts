import { SwiffySlider } from "swiffy-slider"

declare global {
  interface Window {
    showToast: () => void;
    swiffyslider: SwiffySlider;
   }
}

export {}
