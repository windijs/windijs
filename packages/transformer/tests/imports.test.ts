import { importsTransformer, useTransformer } from "../src";

test("Transform imports", () => {
  const code = `
  import { VariantBuilder } from "@windi/helpers";
  declare const first: VariantBuilder;
  declare const notFirst: VariantBuilder;
  declare const after: import("@windi/helpers").VariantBuilder;
  declare const before: import("@windi/helpers").VariantBuilder;
  `;

  expect(useTransformer(code, importsTransformer)).toMatchSnapshot();
});

test("Transform imports with type params", () => {
  const code = `
import { CSSObject, StyleObject } from "@windi/helpers";
import { buildLinearGradient, buildTransition } from "@windi/core";
declare const animate: {
    none: StyleObject<{}>;
    spin: import("@windi/helpers").StyleObject<{a: string}>;
    ping: StyleObject<{}>;
    pulse: StyleObject<{}>;
    bounce: import("@windi/helpers").StyleObject<{}>;
    shock: StyleObject<{}>;
    flash: StyleObject<{}>;
  `;
  expect(useTransformer(code, importsTransformer)).toMatchSnapshot();
});
