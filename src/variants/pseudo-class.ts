import { VariantBuilder } from "../types";
import { camelToDash } from "../utils";
import { useVariant } from "./base";

type PseudoClassVariantKeys = "first" | "last" | "odd" | "even" | "visited" | "checked" | "focusWithin" | "hover" | "focus" | "focusVisible" | "active" | "link" | "target" | "notChecked" | "enabled" | "indeterminate" | "invalid" | "valid" | "optional" | "required" | "placeholderShown" | "readOnly" | "readWrite" | "notDisabled" | "firstOfType" | "notFirstOfType" | "lastOfType" | "notLastOfType" | "notFirst" | "notLast" | "onlyChild" | "notOnlyChild" | "onlyOfType" | "notOnlyOfType" | "root" | "empty";

export const evenOfType: VariantBuilder = (...utilities) => useVariant("&:nth-of-type(even)", utilities);
export const oddOfType: VariantBuilder = (...utilities) => useVariant("&:nth-of-type(odd)", utilities);
export const $default: VariantBuilder = (...utilities) => useVariant("&:default", utilities);

export const { first, last, odd, even, visited, checked, focusWithin, hover, focus, focusVisible, active, link, target, notChecked, enabled, indeterminate, invalid, valid, optional, required, placeholderShown, readOnly, readWrite, notDisabled, firstOfType, notFirstOfType, lastOfType, notLastOfType, notFirst, notLast, onlyChild, notOnlyChild, onlyOfType, notOnlyOfType, root, empty } = new Proxy({}, {
  get (target, prop: string, receiver) {
    return (...args: any[]) => {
      prop = camelToDash(prop);
      if (prop.startsWith("not-")) prop = `not(:${prop.slice(4)})`;
      return useVariant("&:" + prop, args);
    };
  },
// eslint-disable-next-line no-unused-vars
}) as { [key in PseudoClassVariantKeys]: VariantBuilder };
