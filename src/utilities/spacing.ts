import { cssHandler } from "./api";

export function spaceBetweenXReverseHandler () {
  return cssHandler({
    "& > :not([hidden]) ~ :not([hidden])": {
      "--w-space-x-reverse": "1",
    },
  });
}

export function spaceBetweenYReverseHandler () {
  return cssHandler({
    "& > :not([hidden]) ~ :not([hidden])": {
      "--w-space-y-reverse": "1",
    },
  });
}
