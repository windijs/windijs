import { degreeConfig } from "./transform";
import { positionConfig } from "./positioning";

export const backgroundAttachmentConfig = {
  fixed: "fixed",
  local: "local",
  scroll: "scroll",
};

export const backgroundClipConfig = {
  text: "text",
  border: "border-box",
  padding: "padding-box",
  content: "content-box",
};

export const backgroundPositionConfig = positionConfig;

export const backgroundRepeatConfig = {
  repeat: {
    DEFAULT: "repeat",
    x: "repeat-x",
    y: "repeat-y",
    round: "round",
    space: "space",
  },
  noRepeat: "no-repeat",
};

export const backgroundSizeConfig = {
  auto: "auto",
  cover: "cover",
  contain: "contain",
};

export const backgroundOriginConfig = {
  border: "border-box",
  padding: "padding-box",
  content: "content-box",
};

export const backgroundImageConfig = {
  none: "none",
};

export const gradientDirectionConfig = {
  to: {
    t: "top",
    tr: "top right",
    r: "right",
    br: "bottom right",
    b: "bottom",
    bl: "bottom left",
    l: "left",
    tl: "top left",
  },
  deg: degreeConfig,
};

export const gradientConfig = {
  red: "linear-gradient(135deg, rgb(255, 15, 123) 0%, rgb(248, 155, 41) 100%)",
  orange: "linear-gradient(135deg, rgb(254, 182, 146) 10%, rgb(234, 84, 85) 100%)",
  yellow: "linear-gradient(135deg, rgb(253, 235, 113) 10%, rgb(248, 216, 0) 100%)",
  amber: "linear-gradient(135deg, rgb(255, 168, 168) 10%, rgb(252, 255, 0) 100%)",
  lime: "linear-gradient(135deg, rgb(255, 247, 32) 10%, rgb(60, 213, 0) 100%)",
  green: "linear-gradient(135deg, rgb(129, 251, 184) 10%, rgb(40, 199, 111) 100%)",
  mint: "linear-gradient(135deg, rgb(42, 250, 223) 10%, rgb(76, 131, 255) 100%)",
  teal: "linear-gradient(135deg, rgb(144, 247, 236) 10%, rgb(50, 204, 188) 100%)",
  cyan: "linear-gradient(135deg, rgb(194, 255, 216) 10%, rgb(70, 94, 251) 100%)",
  sky: "linear-gradient(135deg, rgb(171, 220, 255) 10%, rgb(3, 150, 255) 100%)",
  blue: "linear-gradient(135deg, #45cafc, #303f9f)",
  sea: "linear-gradient(135deg, rgb(114, 237, 242) 10%, rgb(81, 81, 229) 100%)",
  ocean: "linear-gradient(135deg, rgb(60, 140, 231) 10%, rgb(0, 234, 255) 100%)",
  indigo: "linear-gradient(135deg, rgb(206, 159, 252) 10%, rgb(115, 103, 240) 100%)",
  purple: "linear-gradient(135deg, rgb(226, 176, 255) 10%, rgb(159, 68, 211) 100%)",
  pink: "linear-gradient(135deg, rgb(246, 206, 236) 10%, rgb(217, 57, 205) 100%)",
  brown: "linear-gradient(135deg, rgb(255, 170, 133) 10%, rgb(179, 49, 95) 100%)",
  aqua: "linear-gradient(135deg, #2096ff, #05ffa3)",
  peach: "linear-gradient(135deg, #ffd86f, #fc6262)",
  mango: "linear-gradient(135deg, rgb(252, 207, 49) 10%, rgb(245, 85, 85) 100%)",
  blood: "linear-gradient(135deg, rgb(240, 95, 87) 10%, rgb(54, 9, 64) 100%)",
  gold: "linear-gradient(135deg, rgba(255,223,0,1) 35%, rgba(252,211,77,1) 100%)",
  gray: "linear-gradient(135deg, #6a85b6, #bac8e0)",
  ink: "linear-gradient(135deg, #accbee, #e7f0fd)",
  snow: "linear-gradient(135deg, #e6e9f0, #eef1f5)",
  bootstrap: "linear-gradient(135deg, rgb(238, 154, 229) 10%, rgb(89, 97, 249) 100%)",
  sunny: "linear-gradient(135deg, #f6d365, #fda085)",
  winter: "linear-gradient(135deg, #a1c4fd, #c2e9fb)",
  azure: "linear-gradient(135deg, #84fab0, #8fd3f4)",
  beach: "linear-gradient(135deg, #4facfe, #00f2fe)",
  fresh: "linear-gradient(135deg, #43e97b, #38f9d7)",
  sunset: "linear-gradient(135deg, #fa709a, #fee140)",
  fisher: "linear-gradient(135deg, #89f7fe, #66a6ff)",
  acid: "linear-gradient(135deg, #37ecba, #72afd3)",
  fog: "linear-gradient(135deg, #fff1eb, #ace0f9)",
  milk: "linear-gradient(135deg, #feada6, #f5efef)",
  grass: "linear-gradient(135deg, #d4fc79, #96e6a1)",
  malinka: "linear-gradient(135deg, #f093fb, #f5576c)",
  morpheus: "linear-gradient(135deg, #30cfd0, #330867)",
  desert: "linear-gradient(135deg, #ffecd2, #fcb69f)",
  warm: "linear-gradient(135deg, #ff9a9e, #fad0c4)",
  warmth: "linear-gradient(135deg, #fad0c4, #ffd1ff)",
  spring: "linear-gradient(135deg, #c1dfc4, #deecdd)",
  wild: "linear-gradient(135deg, #d299c2, #fef9d7)",
  pine: "linear-gradient(135deg, #ebbba7, #cfc7f8)",
  miracle: "linear-gradient(135deg, #cd9cf2, #f6f3ff)",
  plum: "linear-gradient(135deg, #667eea, #764ba2)",
  night: "linear-gradient(135deg, rgb(151, 171, 255) 10%, rgb(18, 53, 151) 100%)",
  fuchsia: "linear-gradient(135deg, #c471f5, #fa71cd)",
  rainy: "linear-gradient(135deg, #fbc2eb, #a6c1ee)",
  amy: "linear-gradient(135deg, #a6c0fe, #f68084)",
  fly: "linear-gradient(135deg, #48c6ef, #6f86d6)",
};
