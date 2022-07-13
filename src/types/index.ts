import { StyleProperties } from "./css";

export * from "./css";

export type CSSDict = {
  [key in StyleProperties]?: string;
}

export type CSSObject = CSSDict & {[key: string]: CSSObject | string}

export type NumberDict = { [key: number]: string };

export type UtilityMeta = {
  uid: string;
  type: "static" | "color" | "generic";
  props?: string[];
  variants?: string[];
};

export interface StyleObject {
    /** @internal */
    css: CSSObject;
    /** @internal */
    meta?: UtilityMeta;
}

export type ObjectEntry<T> = Omit<{ [key in keyof T]: StyleObject }, "css" | "meta" | "DEFAULT">

export type ProxyEntry<T> = (uid: string, prop: string) => ObjectEntry<T> | undefined;

export type VariantBuilder = (...utilities: StyleObject[]) => StyleObject;
