import { StyleProperties } from "./css";

export * from "./css";

export type CSSDict = {
  [key in StyleProperties]?: string;
}

export type CSSObject = CSSDict & {[key: string]: CSSObject | string}

export type NumberDict = { [key: number]: string };

export interface StyleObject {
    /** @internal */
    css: CSSObject
}

export type StyleBuilder = (key: string) => StyleObject;

export type ObjectEntry<T> = { [key in keyof T]: StyleObject }

export interface BgColorStyle extends StyleObject {
    opacity: (op: number) => StyleObject
}

export type VariantBuilder = (...utilities: StyleObject[]) => StyleObject;
