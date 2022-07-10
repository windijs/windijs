import { BgColorStyle, ObjectEntry, StyleBuilder, StyleObject } from "../types";
import { hasKey, isNumber, useProxy } from "../utils";

// TODO: support call bg as a function via apply proxy
// TODO: maybe support delete api, like delete bg.red[500]??

export function backgroundGeneric () {
    type RealType = (key: string) => StyleObject;
    type ProxyType = (key: string) => {
        [key: string]: StyleObject
    } & {
        $: {[key: string]: StyleObject}
    }

    const handler: RealType = (key: string) => {
      if (isNumber(key)) {
        return handleSingleColor("#" + (+key).toString(16));
      }
      return handleSingleColor(key);
    };

    return handler as unknown as ProxyType;
}

export function backgroundColor<T extends object> (colors: T) {
    type BgColorProxy<T> = {
        [key in keyof T]: (T[key] extends object ? {[k in keyof T[key]]: BgColorStyle} : BgColorStyle) & {
            [key: string]: BgColorStyle
        }
    }
    type RealType = (key: string) => object | BgColorStyle | undefined;
    type ProxyType = (key: string) => BgColorProxy<T> | undefined;

    const handler: RealType = (key: string) => {
      if (hasKey(colors, key)) {
        const value = colors[key];
        if (typeof value === "string") {
          const singleColor = handleSingleColor(value);
          if (singleColor) return singleColor;
        }
        if (typeof value === "object") {
          const child = value as unknown as {[key: string]: string};
          return useProxy(prop => {
            if (hasKey(child, prop)) return handleSingleColor(child[prop]);
          });
        }
      }
    };
    return handler as ProxyType;
}

export function backgroundAttachment<T extends object> (attachments: T) {
    type RealType = (key: string) => StyleObject | undefined;
    type ProxyType = (key: string) => ObjectEntry<T> | undefined;

    const build: StyleBuilder = (value) => {
      return {
        css: {
          backgroundAttachment: value,
        },
      };
    };

    const handler: RealType = (key) => {
      if (hasKey(attachments, key)) {
        const value = attachments[key];
        if (typeof value === "string") {
          return build(value);
        }
      }
    };
    return handler as ProxyType;
}

export function backgroundClip<T extends object> (clips: T, key = "clip") {
    type RealType = (key: string) => object | undefined;
    type ProxyType = (key: string) => { clip: ObjectEntry<T> };

    const build: StyleBuilder = (value) => {
      return {
        css: {
          webkitBackgroundClip: value,
          backgroundClip: value,
        },
      };
    };

    const handler: RealType = (prop) => {
      if (prop === key) {
        return useProxy(clip => {
          if (hasKey(clips, clip)) {
            const value = clips[clip];
            if (typeof value === "string") return build(value);
          }
        });
      }
    };

    return handler as ProxyType;
}

function handleSingleColor (value: string): BgColorStyle {
  return {
    css: {
      backgroundColor: value,
    },
    opacity: (op) => {
      return {
        css: {
          backgroundColor: value,
        },
      };
    },
  };
}
