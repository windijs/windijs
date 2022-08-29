import { StyleObject, css, rgb } from "@windijs/helpers";
import { backgroundClipConfig, backgroundRepeatConfig, backgroundSizeConfig, borderStyleConfig, borderWidthConfig, fontStyleConfig, justifyItemsConfig, overflowConfig } from "@windijs/config";
import { backgroundGenericHandler, callHandler, colorHandler, configHandler, createUtility, genericHandler, guard, meld, setup, setupHandler, setupUtility, use } from "../src";
import { isNumber, parenWrap } from "@windijs/shared";

import { colors } from "@windijs/utilities";

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

test("setup", () => {
  const bg = setup({
    red: css({ backgroundColor: "red" }),
    size: configHandler(backgroundSizeConfig, "backgroundSize"),
    repeat: configHandler(backgroundRepeatConfig.repeat, "backgroundRepeat"),
    multi: meld(
      configHandler(justifyItemsConfig, "justifyItems"),
      configHandler(fontStyleConfig, "fontStyle"),
    ),
    nested: {
      blue: css({ backgroundColor: "blue" }),
      opacity: {
        10: css({ backgroundColor: "aqua" }),
      },
      size: configHandler(backgroundSizeConfig, "backgroundSize"),
    },
  });
  expect(bg.red.css).toMatchSnapshot();
  expect(bg.size.auto.css).toMatchSnapshot();
  expect(bg.repeat.css).toMatchSnapshot();
  expect(bg.repeat.x.css).toMatchSnapshot();
  expect(bg.multi.end.css).toMatchSnapshot();
  expect(bg.multi.italic.css).toMatchSnapshot();
  expect(bg.nested.blue.css).toMatchSnapshot();
  expect(bg.nested.size.auto.css).toMatchSnapshot();
  expect(bg.nested.opacity[10].css).toMatchSnapshot();
});

test("setupHandler", () => {
  const bg = createUtility("bg")
    .use(setupHandler({
      red: css({ backgroundColor: "red" }),
      size: configHandler(backgroundSizeConfig, "backgroundSize"),
    }))
    .use(configHandler(backgroundRepeatConfig, "backgroundRepeat"))
    .init();

  expect(bg.red.css).toMatchSnapshot();
  expect(bg.size.auto.css).toMatchSnapshot();
  expect(bg.repeat.css).toMatchSnapshot();
  expect(bg.repeat.x.css).toMatchSnapshot();
  expect(bg.noRepeat.css).toMatchSnapshot();

  expect(bg.size.auto.meta).toMatchSnapshot();
  expect(bg.repeat.x.meta).toMatchSnapshot();
});

test("setupUtility with css", () => {
  const red = setupUtility("red", css({ backgroundColor: "red" }));
  expect(red.css).toMatchSnapshot();
  expect(red.meta).toMatchSnapshot();
});

test("setupUtility with handler", () => {
  const bg = setupUtility("bg", configHandler(backgroundRepeatConfig, "backgroundRepeat"));
  expect(bg.repeat.css).toMatchSnapshot();
  expect(bg.noRepeat.css).toMatchSnapshot();
  expect(bg.repeat.x.css).toMatchSnapshot();
  expect(bg.repeat.meta).toMatchSnapshot();
  expect(bg.repeat.x.meta).toMatchSnapshot();
});

test("setupUtility with config", () => {
  const overflow = setupUtility("overflow", {
    DEFAULT: meld(
      configHandler(overflowConfig, "overflow"),
      configHandler(backgroundClipConfig, "overflow"),
    ),
    ellpsis: css({ "-o-text-overflow": "ellipsis", textOverflow: "ellipsis" }),
    x: configHandler(overflowConfig, "overflowX"),
    multi: meld(
      configHandler(justifyItemsConfig, "justifyItems"),
      configHandler(fontStyleConfig, "fontStyle"),
    ),
    nested: {
      blue: css({ backgroundColor: "blue" }),
      opacity: {
        10: css({ backgroundColor: "aqua" }),
      },
      size: configHandler(backgroundSizeConfig, "backgroundSize"),
    },
  });

  expect(overflow.border.css).toMatchSnapshot();
  expect(overflow.clip.css).toMatchSnapshot();
  expect(overflow.ellpsis.css).toMatchSnapshot();
  expect(overflow.x.clip.css).toMatchSnapshot();
  expect(overflow.multi.center.css).toMatchSnapshot();
  expect(overflow.multi.italic.css).toMatchSnapshot();
  expect(overflow.nested.blue.css).toMatchSnapshot();
  expect(overflow.nested.opacity[10].css).toMatchSnapshot();
  expect(overflow.nested.size.contain.css).toMatchSnapshot();

  expect(overflow.border.meta).toMatchSnapshot();
  expect(overflow.clip.meta).toMatchSnapshot();
  expect(overflow.ellpsis.meta).toMatchSnapshot();
  expect(overflow.x.clip.meta).toMatchSnapshot();
  expect(overflow.multi.center.meta).toMatchSnapshot();
  expect(overflow.multi.italic.meta).toMatchSnapshot();
  expect(overflow.nested.blue.meta).toMatchSnapshot();
  expect(overflow.nested.opacity[10].meta).toMatchSnapshot();
  expect(overflow.nested.size.contain.meta).toMatchSnapshot();
});
