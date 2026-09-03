export const BASE_WIDTH = 375;
export const BASE_HEIGHT = 812;

const clamp = (value: number, minimum: number, maximum: number) =>
  Math.min(Math.max(value, minimum), maximum);

// Scaling is bounded so layouts stay usable on tablets and very small devices.
export const scaleWidth = (size: number, windowWidth = BASE_WIDTH) =>
  clamp((windowWidth / BASE_WIDTH) * size, size * 0.85, size * 1.35);

export const scaleHeight = (size: number, windowHeight = BASE_HEIGHT) =>
  clamp((windowHeight / BASE_HEIGHT) * size, size * 0.9, size * 1.25);

export const scaleFont = (size: number, windowWidth = BASE_WIDTH) =>
  clamp((windowWidth / BASE_WIDTH) * size, size * 0.9, size * 1.2);
