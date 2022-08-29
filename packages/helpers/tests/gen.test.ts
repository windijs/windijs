import { backgroundSizeConfig, borderRadiusConfig, touchActionConfig } from "@windijs/config";
import { dtsConfig, dtsHandler, genUtilitiesDts, genUtilitiesJs } from "../src/gen";

import { css } from "../src/css";

const get = (prop) => prop;

test("dts", () => {
  expect(dtsConfig(backgroundSizeConfig)).toMatchSnapshot();
});

test("dts nested", () => {
  expect(dtsConfig(touchActionConfig)).toMatchSnapshot();
  expect(dtsConfig({
    a: {
      b: {
        c: {
          d: "d",
        },
      },
    },
  })).toMatchSnapshot();
});

test("dts number and string", () => {
  expect(dtsConfig({
    $: "a",
    2: "b",
    1.5: "c",
    "dts-test": "d",
  })).toMatchSnapshot();
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

  expect(genUtilitiesDts(tmpl, {
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
  })).toMatchSnapshot();
});

test("generate js", () => {
  const tmpl = `'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var core = require('@windijs/core');
var config = require('@windijs/config');
var helpers = require('@windijs/helpers');
var colors$1 = require('@windijs/colors');

const animate = core.createUtility("animate")
    .use(core.animateHandler("none", "none"))
    .use(core.animateHandler("spin", "spin 1s linear infinite", config.spinKeyframes))
    .use(core.animateHandler("ping", "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite", config.pingKeyframes))
    .use(core.animateHandler("pulse", "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite", config.pulseKeyframes))
    .init();

const colors = { ...colors$1.baseColors, ...colors$1.windiColors };

const image = core.createUtility("image")
    .case("render", core.configHandler(config.imageRenderingConfig, core.buildImageRendering))
    .init();
const list = core.createUtility("list")
    .use(core.configHandler(config.listStyleTypeConfig, "listStyleType"))
    .use(core.configHandler(config.listStylePositionConfig, "listStylePosition"))
    .init();
const overflow = core.createUtility("overflow")
    .use(core.configHandler(config.overflowConfig, "overflow"))
    .case("truncate", core.cssHandler({ overflow: "hidden", "-o-text-overflow": "ellipsis", textOverflow: "ellipsis", whiteSpace: "nowrap" }))
    .case("ellipsis", core.cssHandler({ "-o-text-overflow": "ellipsis", textOverflow: "ellipsis" }))
    .case("x", core.configHandler(config.overflowConfig, "overflowX"))
    .case("y", core.configHandler(config.overflowConfig, "overflowY"))
    .init();
  `;

  expect(genUtilitiesJs(tmpl, { listStyleType: { a: 1, b: 2 }, overflow: { c: 3, d: 4 }, colors: { red: "#ff0" } })).toMatchSnapshot();
});

test("dtsHandler with configHandler", () => {
  expect(dtsHandler({
    type: "config",
    meta: {
      config: {
        fixed: "fixed",
        local: "local",
        scroll: "scroll",
      },
    },
    get,
  })).toMatchSnapshot();

  expect(dtsHandler({
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
  })).toMatchSnapshot();

  expect(dtsHandler({
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
  })).toMatchSnapshot();
});

test("dtsHandler with colorHandler", () => {
  expect(dtsHandler({
    type: "color",
    meta: {
      colors: {
        red: "500",
      },
      op: undefined,
    },
    get,
  })).toMatchSnapshot();

  expect(dtsHandler({
    type: "color",
    meta: {
      colors: {
        red: "500",
      },
      op: "--windi-opacity",
    },
    get,
  })).toMatchSnapshot();
});

test("dtsHandler with numberHandler", () => {
  expect(dtsHandler({
    type: "number",
    meta: {
      size: "",
    },
    get,
  })).toMatchSnapshot();

  expect(dtsHandler({
    type: "number",
    meta: {
      size: "rem",
    },
    get,
  })).toMatchSnapshot();

  expect(dtsHandler({
    type: "fraction",
    meta: undefined,
    get,
  })).toMatchSnapshot();
});

test("dtsHandler with guard", () => {
  expect(dtsHandler({
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
  })).toMatchSnapshot();
});

test("dtsHandler with meld", () => {
  expect(dtsHandler({
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
  })).toMatchSnapshot();
});

test("dtsHandler with setup", () => {
  expect(dtsHandler({
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
  })).toMatchSnapshot();

  expect(dtsHandler({
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
  })).toMatchSnapshot();
});
