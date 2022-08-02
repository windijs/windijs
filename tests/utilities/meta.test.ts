import { backgroundColor, backgroundGeneric, borderColor, borderOpacity, borderWidth, borderWidthConfig, colors, createUtility, opacityConfig } from "index";
import { guard, meld } from "utilities/handler";

test("Color Meta", () => {
  const bg = createUtility("bg")
    .use(backgroundColor(colors))
    .init();
  expect(bg.current.meta.uid).toEqual("bg");
  expect(bg.blue[700].meta.uid).toEqual("bg");
  expect(bg.blue[300].opacity(30).meta.uid).toEqual("bg");

  expect(bg.current.meta.props).toEqual(["current"]);
  expect(bg.blue[700].meta.props).toEqual(["blue", "700"]);
  expect(bg.blue[300].opacity(30).meta.props).toEqual(["blue", "300", "opacity(30)"]);
});

test("Static Meta", () => {
  const border = createUtility("border")
    .use(borderWidth(borderWidthConfig))
    .use(borderOpacity(opacityConfig, "op"))
    .init();

  expect(border.meta.uid).toEqual("border");
  expect(border[0].meta.uid).toEqual("border");
  expect(border.op[50].meta.uid).toEqual("border");

  expect(border.meta.props).toEqual([]);
  expect(border[0].meta.props).toEqual(["0"]);
  expect(border.op[50].meta.props).toEqual(["op", "50"]);
});

test("Generic Meta", () => {
  const bg = createUtility("bg")
    .use(backgroundGeneric())
    .init();

  expect(bg[0x1c1c1e].meta.props).toEqual([0x1c1c1e.toString()]);

  expect(bg["rgba(22, 22, 22, 0.3)"].meta.props).toEqual(["rgba(22, 22, 22, 0.3)"]);
});

test("Guard Meta", () => {
  const border = createUtility("border")
    .use(guard("colors", guard("dark", borderColor(colors))))
    .use(guard("width", meld(borderWidth(borderWidthConfig), borderColor(colors))))
    .init();

  expect(border.colors.dark.amber[100].meta.props).toEqual(["colors", "dark", "amber", "100"]);
  expect(border.width[2].meta.props).toEqual(["width", "2"]);
  expect(border.width.blue[400].meta.props).toEqual(["width", "blue", "400"]);
});
