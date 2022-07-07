export type StyleProperties = keyof Omit<CSSStyleDeclaration, "getPropertyPriority" | "getPropertyValue" | "item" | "removeProperty" | "setProperty">;

export interface StyleObject {
    /** @internal */
    css: {
        [key in StyleProperties]?: string;
    }
}

export type StyleBuilder = (key: string) => StyleObject;

export type ObjectEntry<T> = {[key in keyof T]: StyleObject}

export interface BgColorStyle extends StyleObject {
    opacity: (op: number) => StyleObject
}
