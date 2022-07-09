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

export const backgroundPositionConfig = {
  bottom: "bottom",
  center: "center",
  left: {
    "": "left",
    bottom: "left bottom",
    top: "left top",
  },
  right: {
    "": "right",
    bottom: "right bottom",
    top: "right top",
  },
  top: "top",
};

export const backgroundRepeatConfig = {
  "": "repeat",
  not: "no-repeat",
  x: "repeat-x",
  y: "repeat-y",
  round: "round",
  space: "space",
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
