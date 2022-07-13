import { StyleProperties } from "../types";
import { ColorOpacityProxy, ColorProxy, createColorHandler, createStaticHandler } from "./handler";

export function borderRadius<T extends object> (radius: T) {
  return createStaticHandler(radius, "borderRadius", undefined, true);
}

export function borderWidth<T extends object> (width: T) {
  return createStaticHandler(width, "borderWidth", undefined, true);
}

export function borderOpacity<T extends object, K extends string = "opacity"> (opacity: T, key?: K) {
  if (!key) key = "opacity" as K;
  return createStaticHandler(opacity, "--w-border-opacity" as StyleProperties, key);
}

export function borderStyle<T extends object> (styles: T) {
  return createStaticHandler(styles, "borderStyle");
}

export function borderColor<T extends object> (colors: T): (uid: string, prop: string) => ColorOpacityProxy<T> | undefined;
export function borderColor<T extends object> (colors: T, withOpacity: true | undefined): (uid: string, prop: string) => ColorOpacityProxy<T> | undefined;
export function borderColor<T extends object> (colors: T, withOpacity: true | undefined, opacityName: string): (uid: string, prop: string) => ColorOpacityProxy<T> | undefined;
export function borderColor<T extends object> (colors: T, withOpacity: false): (uid: string, prop: string) => ColorProxy<T> | undefined;
export function borderColor<T extends object> (colors: T, withOpacity = true, opacityName = "--w-border-opacity") {
  if (!withOpacity) return createColorHandler(colors, "borderColor");
  return createColorHandler(colors, "borderColor", opacityName);
}
