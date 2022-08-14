export const transitionPropertyConfig = {
  DEFAULT: "background-color, border-color, color, fill, stroke, opacity, box-shadow, -webkit-box-shadow, transform, -webkit-transform, filter, backdrop-filter",
  all: "all",
  colors: "background-color, border-color, color, fill, stroke",
  opacity: "opacity",
  shadow: "box-shadow, -webkit-box-shadow",
  transform: "transform, -webkit-transform",
  none: "none",
};

export const transitionDelayConfig = {
  75: "75ms",
  100: "100ms",
  150: "150ms",
  200: "200ms",
  300: "300ms",
  500: "500ms",
  700: "700ms",
  1000: "1000ms",
};

export const transitionDurationConfig = {
  DEFAULT: "150ms",
  ...transitionDelayConfig,
};

export const transitionTimingFunctionConfig = {
  DEFAULT: "cubic-bezier(0.4, 0, 0.2, 1)",
  linear: "linear",
  in: "cubic-bezier(0.4, 0, 1, 1)",
  out: "cubic-bezier(0, 0, 0.2, 1)",
  inOut: "cubic-bezier(0.4, 0, 0.2, 1)",
};
