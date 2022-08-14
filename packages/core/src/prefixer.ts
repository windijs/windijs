import type { CSSPrefixer } from "@windi/helpers";
import { camelToDash } from "@windi/shared";

export function prefixer (filter: ((k: string, v: string) => boolean) | string | Array<string>, updater: (k: string, v: string) => object): CSSPrefixer {
  let updated;
  return <T extends object>(t: T) => {
    for (const [k, v] of Object.entries(t)) {
      if (typeof filter === "function" ? filter(k, v) : Array.isArray(filter) ? filter.includes(k) : k === filter) {
        updated = updater(k, v) as Record<string, string>;
        if (k in updated) Reflect.set(t, k, updated[k]);
        t = Object.assign(updater(k, v), t);
      }
    }
    return t;
  };
}

export const prefixKeyframes = prefixer(["transform", "animationTimingFunction", "transformOrigin"], (k, v) => ({ ["-webkit-" + camelToDash(k)]: v }));

export const prefixAnimation = prefixer("animation", (_, v) => ({ "-webkit-animation": v }));

export const prefixImageRendering = prefixer("imageRendering", (_, v) => v === "pixelated" ? { "-ms-interpolation-mode": "nearest-neighbor", imageRendering: ["-webkit-optimize-contrast", "-moz-crisp-edges", "-o-pixelated", "pixelated"] } : {});

export const prefixNotHidden: CSSPrefixer = <T extends object>(t: T) => ({ "& > :not([hidden]) ~ :not([hidden])": t });

export const prefixPlaceholder: CSSPrefixer = <T extends object>(t: T) => ({ "&::-webkit-input-placeholder": t, "&::-moz-placeholder": t, "&:-ms-input-placeholder": t, "&::-ms-input-placeholder": t, "&::placeholder": t });

export const prefixWritingMode = prefixer("writingMode", (_, v) => ({ "-webkit-writing-mode": v, "-ms-writing-mode": v.replace("vertical", "tb").replace("horizontal", "lr") }));
