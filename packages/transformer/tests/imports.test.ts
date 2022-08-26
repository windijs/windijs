import { importTypesTransformer, importsTransformer, useTransformer } from "../src";

test("Transform imports", () => {
  const code = `
  import { VariantBuilder } from "@windijs/helpers";
  declare const first: VariantBuilder;
  declare const notFirst: VariantBuilder;
  declare const after: import("@windijs/helpers").VariantBuilder;
  declare const before: import("@windijs/helpers").VariantBuilder;
  `;

  expect(useTransformer(code, importsTransformer)).toMatchSnapshot();
});

test("Transform imports with type params", () => {
  const code = `
import { CSSObject, StyleObject } from "@windijs/helpers";
import { buildLinearGradient, buildTransition } from "@windijs/core";
declare const animate: {
    none: StyleObject<{}>;
    spin: import("@windijs/helpers").StyleObject<{a: string}>;
    ping: StyleObject<{}>;
    pulse: StyleObject<{}>;
    bounce: import("@windijs/helpers").StyleObject<{}>;
    shock: StyleObject<{}>;
    flash: StyleObject<{}>;
  `;
  expect(useTransformer(code, importsTransformer)).toMatchSnapshot();
});

test("Transform imports should keep typeof", () => {
  const code = `
export declare const dropShadow: {
  lg: StyleObject<{}>;
  xl: StyleObject<{}>;
} & typeof import("@windijs/helpers").dropShadow & import("@windijs/helpers").StyleObjectBase;
  `;
  expect(useTransformer(code, importTypesTransformer)).toMatchSnapshot();
});

test("Transform imports should join old imports", () => {
  const code = `
import { buildLinearGradient, buildTransition } from "@windijs/core";
import { CSSObject } from "@windijs/helpers";
export declare const animate: {
  none: import("@windijs/helpers").StyleObject<{}>;
  spin: StyleObject<{}>;
}
  `;
  expect(useTransformer(code, importTypesTransformer)).toMatchSnapshot();
});
