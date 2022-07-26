import { StyleObject, UtilityMeta } from "../../src/types";
import { css, useStyleLoader } from "../../src/helpers/css";

test("css", () => {
  const props = {
    fontSize: "large",
    backgroundColor: "aliceblue",
  };
  const decl = css(props);

  expect(decl.css).toEqual(props);
  expect(decl.meta).toEqual({
    uid: "css",
    type: "css",
    props: [],
    variants: [],
  });
});

test("css with data function", () => {
  const decl = css({
    fontSize: "large",
    backgroundColor: "aliceblue",
  }, {
    opacity: () => decl,
  }) as StyleObject<{ opacity(op: number, set: boolean): StyleObject }>;
  expect(decl.opacity(1, true).meta.props).toEqual(["opacity(1,true)"]);
});

test("css with meta", () => {
  const meta: UtilityMeta = {
    uid: "test",
    props: [],
    type: "static",
    variants: [],
  };

  expect(css({
    fontSize: "large",
    backgroundColor: "aliceblue",
  }, undefined, meta).meta).toEqual(meta);
});

test("style loader", () => {
  useStyleLoader((css, meta, data, props) => {
    props = { "bg.red.500": true, "text.lg": true };

    return { css, meta, data, props };
  });

  expect(css({}).toString()).toEqual("bg.red.500 text.lg");
});
