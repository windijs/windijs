import { borderColor, borderWidth, colors, createUtility, CSSObject, StyleObject, borderWidthConfig, use, backgroundGeneric, borderStyle, borderStyleConfig, Handler } from "../../src";
import { guard, meld, useGenericHandler } from "../../src/utilities/handler";
import { isNumber } from "../../src/utils";

test("useGeneric With Trigger", () => {
  const backgroundGeneric = useGenericHandler<"trigger", { [key: string]: StyleObject }>("trigger", prop => {
    const build = (value: string) => ({
      backgroundColor: value,
    } as CSSObject);
    if (isNumber(prop)) {
      return build("#" + (+prop).toString(16));
    }
    return build(prop);
  });

  const bg = createUtility("bg")
    .use(backgroundGeneric())
    .init();

  expect(bg.trigger["rgb(22, 22, 22)"].css).toMatchSnapshot();
});

test("useGeneric With Trigger2", () => {
  const backgroundGeneric = useGenericHandler<{ [key: string]: StyleObject }>(prop => {
    const build = (value: string) => ({
      backgroundColor: value,
    } as CSSObject);
    if (isNumber(prop)) {
      return build("#" + (+prop).toString(16));
    }
    return build(prop);
  });

  const bg = createUtility("bg")
    .use(guard("test", guard("trigger", backgroundGeneric())))
    .init();

  expect(bg.test.trigger["rgb(22, 22, 22)"].css).toMatchSnapshot();
});

test("guard with meld", () => {
  const border = createUtility("border")
    .use(guard("colors", guard("dark", borderColor(colors))))
    .use(guard("width", meld(borderWidth(borderWidthConfig), borderColor(colors))))
    .init();

  expect(border.colors.dark.amber[100]).toMatchSnapshot();
  expect(border.width[2]).toMatchSnapshot();
  expect(border.width.blue).toBeDefined();
  expect(border.width.blue[400]).toMatchSnapshot();
});

test("two guard with same name should not work", () => {
  const border = createUtility("border")
    .use(guard("width", borderWidth(borderWidthConfig)))
    .use(guard("width", borderColor(colors)))
    .init();

  expect(border.width[2]).toBeDefined();
  expect(border.width.blue).toBeUndefined();
});

test("use single plugin", () => {
  const bg = use("bg", backgroundGeneric());

  expect(bg["rgb(22, 22, 22)"].css).toMatchSnapshot();
  expect(bg.red.css).toMatchSnapshot();
  expect(bg.aliceBlue.css).toMatchSnapshot();
  expect(bg[0xffffff].css).toMatchSnapshot();
});

test("use multi plugin with meld and use", () => {
  const border = use("border", meld(borderWidth(borderWidthConfig), borderColor(colors)));
  const border2 = use("border", meld(borderWidth(borderWidthConfig), borderColor(colors), borderStyle(borderStyleConfig)));

  expect(border[0].css).toMatchSnapshot();
  expect(border.emerald[500].css).toMatchSnapshot();
  expect(border2[4].css).toEqual(border[4].css);
  expect(border2.emerald[500].css).toEqual(border.emerald[500].css);
  expect(border2.dashed.css).toMatchSnapshot();
});
