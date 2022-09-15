import { backgroundSizeConfig, borderRadiusConfig, touchActionConfig } from "@windijs/config";
import { css } from "@windijs/helpers";

import { dtsConfig, dtsHandler, dtsUtilities } from "../src/gen";

const get = (prop: string) => prop;

test("dts", () => {
  expect(dtsConfig(backgroundSizeConfig)).toMatchSnapshot();
});

test("dts nested", () => {
  expect(dtsConfig(touchActionConfig)).toMatchSnapshot();
  expect(
    dtsConfig({
      a: {
        b: {
          c: {
            d: "d",
          },
        },
      },
    })
  ).toMatchSnapshot();
});

test("dts number and string", () => {
  expect(
    dtsConfig({
      $: "a",
      2: "b",
      1.5: "c",
      "dts-test": "d",
    })
  ).toMatchSnapshot();
});

test("dts with default type", () => {
  expect(dtsConfig(touchActionConfig, "StyleObject<{}>")).toMatchSnapshot();
});

test("dts ignore DEFAULT", () => {
  expect(dtsConfig(borderRadiusConfig, "StyleObject<{}>", ["DEFAULT"])).toMatchSnapshot();
});

test("dst with array should be replaced", () => {
  expect(dtsConfig({ a: ["a", "b"] })).toMatchSnapshot();
});

test("generate dts", () => {
  const tmpl = `import { buildLinearGradient, buildTransition } from "@windijs/core";
export declare const image: {
  render: Inject<{
      auto: StyleObject<{}>;
      pixel: StyleObject<{}>;
      edge: StyleObject<{}>;
  }, "$windi.config.imageRenderingConfig.proxy">;
};
export declare const fill: Inject<{}, "$windi.color.colors.proxy">;
export declare const colors: Inject<{}, "$windi.config.colorsConfig">;
`;

  expect(
    dtsUtilities(tmpl, {
      theme: {
        colors: {
          blue: {
            50: "#ecfeff",
            100: "#cffafe",
          },
          cyan: {
            50: "#ecfeff",
            100: "#cffafe",
            200: "#a5f3fc",
          },
        },
        imageRendering: {
          auto: "auto",
          pixel: "pixelated",
          edge: "crisp-edges",
        },
      },
    })
  ).toMatchSnapshot();
});

test("dtsHandler with configHandler", () => {
  expect(
    dtsHandler({
      type: "config",
      meta: {
        config: {
          fixed: "fixed",
          local: "local",
          scroll: "scroll",
        },
      },
      get,
    })
  ).toMatchSnapshot();

  expect(
    dtsHandler({
      type: "config",
      meta: {
        config: {
          DEFAULT: "repeat",
          x: "repeat-x",
          y: "repeat-y",
          round: "round",
          space: "space",
        },
      },
      get,
    })
  ).toMatchSnapshot();

  expect(
    dtsHandler({
      type: "config",
      meta: {
        config: {
          repeat: {
            DEFAULT: "repeat",
            x: "repeat-x",
            y: "repeat-y",
            round: "round",
            space: "space",
          },
          noRepeat: "no-repeat",
        },
      },
      get,
    })
  ).toMatchSnapshot();
});

test("dtsHandler with colorHandler", () => {
  expect(
    dtsHandler({
      type: "color",
      meta: {
        colors: {
          red: "500",
        },
        op: undefined,
      },
      get,
    })
  ).toMatchSnapshot();

  expect(
    dtsHandler({
      type: "color",
      meta: {
        colors: {
          red: "500",
        },
        op: "--windi-opacity",
      },
      get,
    })
  ).toMatchSnapshot();
});

test("dtsHandler with numberHandler", () => {
  expect(
    dtsHandler({
      type: "number",
      meta: {
        size: "",
      },
      get,
    })
  ).toMatchSnapshot();

  expect(
    dtsHandler({
      type: "number",
      meta: {
        size: "rem",
      },
      get,
    })
  ).toMatchSnapshot();

  expect(
    dtsHandler({
      type: "fraction",
      meta: undefined,
      get,
    })
  ).toMatchSnapshot();
});

test("dtsHandler with guard", () => {
  expect(
    dtsHandler({
      type: "guard",
      meta: {
        key: "size",
        handler: {
          type: "number",
          meta: {
            size: "",
          },
          get,
        },
      },
      get,
    })
  ).toMatchSnapshot();
});

test("dtsHandler with meld", () => {
  expect(
    dtsHandler({
      type: "meld",
      meta: {
        handlers: [
          {
            type: "config",
            meta: {
              config: {
                DEFAULT: "repeat",
                x: "repeat-x",
                y: "repeat-y",
                round: "round",
                space: "space",
              },
            },
            get,
          },
          {
            type: "guard",
            meta: {
              key: "size",
              handler: {
                type: "number",
                meta: {
                  size: "",
                },
                get,
              },
            },
            get,
          },
        ],
      },
      get,
    })
  ).toMatchSnapshot();
});

test("dtsHandler with setup", () => {
  expect(
    dtsHandler({
      type: "setup",
      meta: {
        config: {
          red: css({ backgroundColor: "red" }),
          blue: {
            light: css({ backgroundColor: "blueviolet" }),
            handle: {
              type: "config",
              meta: {
                config: {
                  DEFAULT: "repeat",
                  x: "repeat-x",
                  y: "repeat-y",
                  round: "round",
                  space: "space",
                },
              },
              get,
            },
          },
        },
      },
      get,
    })
  ).toMatchSnapshot();

  expect(
    dtsHandler({
      type: "setup",
      meta: {
        config: {
          red: css({ backgroundColor: "red" }),
          blue: {
            light: css({ backgroundColor: "blueviolet" }),
            handle: {
              type: "meld",
              meta: {
                handlers: [
                  {
                    type: "config",
                    meta: {
                      config: {
                        DEFAULT: "repeat",
                        x: "repeat-x",
                        y: "repeat-y",
                        round: "round",
                        space: "space",
                      },
                    },
                    get,
                  },
                  {
                    type: "guard",
                    meta: {
                      key: "size",
                      handler: {
                        type: "number",
                        meta: {
                          size: "",
                        },
                        get,
                      },
                    },
                    get,
                  },
                ],
              },
              get,
            },
          },
        },
      },
      get,
    })
  ).toMatchSnapshot();
});
