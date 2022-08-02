import type { StyleObject, UtilityMeta } from "types";
import { baseStyleHandler, baseStyleTarget, css, useStyleLoader } from "helpers/css";

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
  useStyleLoader((css, meta, data) => new Proxy({
    "bg.red.500": true,
    "text.lg": true,
    ...baseStyleTarget(css, meta, data),
  } as unknown as StyleObject, {
    get (target, prop, receiver) {
      if (prop === "toString") return () => Object.keys(target).join(" ");
      return baseStyleHandler(target, prop, receiver);
    },
  }));

  expect(css({}).toString()).toEqual("bg.red.500 text.lg");
});
