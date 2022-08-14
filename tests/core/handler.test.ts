import { backgroundGenericHandler, callHandler, colorHandler, configHandler, createUtility, genericHandler, guard, meld, use } from "core";
import { borderStyleConfig, borderWidthConfig } from "config";
import { css, rgb } from "helpers";
import { isNumber, parenWrap } from "utils";

import { StyleObject } from "types";
import { colors } from "utilities";

test("useGeneric With Trigger", () => {
  const backgroundGeneric = genericHandler("backgroundColor", prop => {
    if (isNumber(prop)) {
      return "#" + (+prop).toString(16);
    }
    return prop;
  });

  const bg = createUtility("bg")
    .case("trigger", backgroundGeneric)
    .init();

  expect(bg.trigger["rgb(22, 22, 22)"].css).toMatchSnapshot();
});

test("Call Handler", () => {
  const rgbCSS: (red: number, green: number, blue: number) => StyleObject = (red: number, green: number, blue: number) => css({ backgroundColor: rgb(red, green, blue) });
  Object.defineProperty(rgbCSS, "abc", { value: rgbCSS });

  const bg = createUtility("bg")
    .use(colorHandler(colors, "backgroundColor"))
    .case("rgb", callHandler(
      rgbCSS as typeof rgbCSS & { abc: typeof rgbCSS },
      genericHandler("backgroundColor", v => parenWrap("rgb", v)),
    ),
    ).init();
  expect(bg.red[500].css).toMatchSnapshot();
  expect(bg.rgb(22, 22, 22).css).toMatchSnapshot();
  expect(bg.rgb(22, 22, 22).meta).toMatchSnapshot();
  expect(bg.rgb.abc(22, 22, 22).css).toMatchSnapshot();
  expect(bg.rgb["22, 22, 22"].css).toMatchSnapshot();
});

test("guard with meld", () => {
  const border = createUtility("border")
    .use(guard("colors", guard("dark", colorHandler(colors, "borderColor", "--w-border-opacity"))))
    .use(guard("width", meld(configHandler(borderWidthConfig, "borderWidth"), colorHandler(colors, "borderColor", "--w-border-opacity"))))
    .init();

  expect(border.colors.dark.amber[100].css).toMatchSnapshot();
  expect(border.width[2].css).toMatchSnapshot();
  expect(border.width.blue).toBeDefined();
  expect(border.width.blue[400].css).toMatchSnapshot();
});

test("two guard with same name should not work", () => {
  const border = createUtility("border")
    .use(guard("width", configHandler(borderWidthConfig, "borderWidth")))
    .use(guard("width", colorHandler(colors, "borderColor", "--w-border-opacity")))
    .init();

  expect(border.width[2]).toBeDefined();
  expect(border.width.blue).toBeUndefined();
});

test("use single plugin", () => {
  const bg = use("bg", backgroundGenericHandler());

  expect(bg["rgb(22, 22, 22)"].css).toMatchSnapshot();
  expect(bg.red.css).toMatchSnapshot();
  expect(bg.aliceBlue.css).toMatchSnapshot();
  expect(bg[0xffffff].css).toMatchSnapshot();
});

test("use multi plugin with meld and use", () => {
  const border = use("border", meld(configHandler(borderWidthConfig, "borderWidth"), colorHandler(colors, "borderColor", "--w-border-opacity")));
  const border2 = use("border", meld(configHandler(borderWidthConfig, "borderWidth"), colorHandler(colors, "borderColor", "--w-border-opacity"), configHandler(borderStyleConfig, "borderStyle")));

  expect(border[0].css).toMatchSnapshot();
  expect(border.emerald[500].css).toMatchSnapshot();
  expect(border2[4].css).toEqual(border[4].css);
  expect(border2.emerald[500].css).toEqual(border.emerald[500].css);
  expect(border2.dashed.css).toMatchSnapshot();
});