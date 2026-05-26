// Centralized image registry. Import images from here across the app.
import nayan from "./nayan.png";
import kartik from "./kartik.png";

export const images = {
  nayan,
  kartik,
} as const;

export type ImageKey = keyof typeof images;
export default images;
