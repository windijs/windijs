import { backgroundSizeConfig, borderRadiusConfig, touchActionConfig } from "@windi/config";

import { dtsConfig } from "../src";

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
