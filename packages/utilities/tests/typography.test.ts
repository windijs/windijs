import { createUtility, fontSizeHandler } from "@windijs/core";

import { decoration, font, hyphens, indent, leading, tab, text, tracking, write } from "../src";

test("Font Family", () => {
  expect(font.mono.css).toMatchSnapshot();
  expect(font.sans.css).toMatchSnapshot();
  expect(font.serif.css).toMatchSnapshot();
});

test("Font Size", () => {
  expect(text.xs.css).toMatchSnapshot();
  expect(text["2xl"].css).toMatchSnapshot();
  expect(text.base.css).toMatchSnapshot();
  expect(text.lg.css).toMatchSnapshot();
});

test("Font Size With Different Config", () => {
  const text = createUtility("text")
    .use(
      fontSizeHandler({
        xs: ["0.75rem", "1rem"],
        sm: ["0.875rem"],
        md: ["1rem", { lineHeight: "1.25rem", letterSpacing: "1px" }],
      })
    )
    .init();
  expect(text.xs.css).toMatchSnapshot();
  expect(text.sm.css).toMatchSnapshot();
  expect(text.md.css).toMatchSnapshot();
});

test("Font Style and Font Smoothing", () => {
  expect(font.italic.css).toMatchSnapshot();
  expect(font.normal.css).toMatchSnapshot();
  expect(font.antialiased.css).toMatchSnapshot();
  expect(font.antialiased.auto.css).toMatchSnapshot();
});

test("Font Weight", () => {
  expect(font.bold.css).toMatchSnapshot();
  expect(font.medium.css).toMatchSnapshot();
  expect(font.normal.css).toMatchSnapshot();
  expect(font.italic.css).toMatchSnapshot();
});

test("Font Variant Numeric", () => {
  expect(font.nums.normal.css).toMatchSnapshot();
  expect(font.nums.ordinal.css).toMatchSnapshot();
  expect(font.nums.slashedZero.css).toMatchSnapshot();
  expect(font.nums.lining.css).toMatchSnapshot();
  expect(font.nums.oldstyle.css).toMatchSnapshot();
  expect(font.nums.proportional.css).toMatchSnapshot();
  expect(font.nums.tabular.css).toMatchSnapshot();
  expect(font.fractions.diagonal.css).toMatchSnapshot();
  expect(font.fractions.stacked.css).toMatchSnapshot();
});

test("Hyphens", () => {
  expect(hyphens.manual.css).toMatchSnapshot();
  expect(hyphens.auto.css).toMatchSnapshot();
});

test("Letter Spacing", () => {
  expect(tracking.tight.css).toMatchSnapshot();
  expect(tracking.wider.css).toMatchSnapshot();
});

test("Line Height", () => {
  expect(leading[4].css).toMatchSnapshot();
  expect(leading.normal.css).toMatchSnapshot();
  expect(leading.relaxed.css).toMatchSnapshot();
});

test("Tab Size", () => {
  expect(tab[4].css).toMatchSnapshot();
  expect(tab[2].css).toMatchSnapshot();
});

test("Text Alignment", () => {
  expect(text.left.css).toMatchSnapshot();
  expect(text.justify.css).toMatchSnapshot();
  expect(text.center.css).toMatchSnapshot();
  expect(text.right.css).toMatchSnapshot();
  expect(text.baseline.css).toMatchSnapshot();
  expect(text.top.css).toMatchSnapshot();
  expect(text.middle.css).toMatchSnapshot();
  expect(text.textTop.css).toMatchSnapshot();
  expect(text.textBottom.css).toMatchSnapshot();
});

test("Text Color", () => {
  expect(text.red[500].css).toMatchSnapshot();
  expect(text.blue[500].opacity(10).css).toMatchSnapshot();
  expect(text.opacity[40].css).toMatchSnapshot();
});

test("Text Decoration", () => {
  expect(decoration.underline.css).toMatchSnapshot();
  expect(decoration.linethrough.css).toMatchSnapshot();
  expect(decoration.overline.css).toMatchSnapshot();
  expect(decoration.none.css).toMatchSnapshot();

  expect(decoration.solid.css).toMatchSnapshot();
  expect(decoration.wavy.css).toMatchSnapshot();
  expect(decoration[2].css).toMatchSnapshot();
  expect(decoration.auto.css).toMatchSnapshot();
  expect(decoration.red[500].css).toMatchSnapshot();
  expect(decoration.opacity[20].css).toMatchSnapshot();
  expect(decoration.offset[3].css).toMatchSnapshot();
});

test("Text Indent", () => {
  expect(indent.css).toMatchSnapshot();
  expect(indent.lg.css).toMatchSnapshot();
  expect(indent.xl.css).toMatchSnapshot();
});

test("Text Shadow", () => {
  expect(text.shadow.css).toMatchSnapshot();
  expect(text.shadow.sm.css).toMatchSnapshot();
  expect(text.shadow.none.css).toMatchSnapshot();
});

test("Text Stroke", () => {
  expect(text.stroke.amber[300].css).toMatchSnapshot();
  expect(text.stroke.blue[300].opacity(10).css).toMatchSnapshot();
  expect(text.stroke.opacity[20].css).toMatchSnapshot();
  expect(text.stroke.sm.css).toMatchSnapshot();
  expect(text.stroke.none.css).toMatchSnapshot();
  expect(text.stroke.css).toMatchSnapshot();
  expect(text.stroke.lg.css).toMatchSnapshot();
  expect(text.stroke[5].css).toMatchSnapshot();
});

test("Text transform", () => {
  expect(text.normal.css).toMatchSnapshot();
  expect(text.uppercase.css).toMatchSnapshot();
  expect(text.capitalize.css).toMatchSnapshot();
});

test("Whitespace", () => {
  expect(text.space.normal.css).toMatchSnapshot();
  expect(text.space.nowrap.css).toMatchSnapshot();
  expect(text.space.pre.css).toMatchSnapshot();
  expect(text.space.pre.line.css).toMatchSnapshot();
  expect(text.space.pre.wrap.css).toMatchSnapshot();
});

test("WordBreak", () => {
  expect(text.break.all.css).toMatchSnapshot();
  expect(text.break.words.css).toMatchSnapshot();
  expect(text.break.normal.css).toMatchSnapshot();
});

test("Writing Mode & Text Orientation", () => {
  expect(write.normal.css).toMatchSnapshot();
  expect(write.vertical.right.css).toMatchSnapshot();
  expect(write.vertical.left.css).toMatchSnapshot();
  expect(write.mixed.css).toMatchSnapshot();
  expect(write.upright.css).toMatchSnapshot();
  expect(write.sideways.css).toMatchSnapshot();
});
