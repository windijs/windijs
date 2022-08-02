import { fontFamily, fontSize, fontStyle } from "utilities/typography";
import { fontFamilyConfig, fontSizeConfig } from "config/typography";

import { createUtility } from "index";

test("Font Family", () => {
  const font = createUtility("font")
    .use(fontFamily(fontFamilyConfig))
    .init();
  expect(font.mono.css).toMatchSnapshot();
  expect(font.sans.css).toMatchSnapshot();
  expect(font.serif.css).toMatchSnapshot();
});

test("Font Size", () => {
  const text = createUtility("text")
    .use(fontSize(fontSizeConfig))
    .init();
  expect(text.xs.css).toMatchSnapshot();
  expect(text["2xl"].css).toMatchSnapshot();
  expect(text.base.css).toMatchSnapshot();
  expect(text.lg.css).toMatchSnapshot();
});

test("Font Size With Different Config", () => {
  const text = createUtility("text")
    .use(fontSize({
      xs: ["0.75rem", "1rem"],
      sm: ["0.875rem"],
      md: ["1rem", { lineHeight: "1.25rem", letterSpacing: "1px" }],
    }))
    .init();
  expect(text.xs.css).toMatchSnapshot();
  expect(text.sm.css).toMatchSnapshot();
  expect(text.md.css).toMatchSnapshot();
});

test("Font Style and Font Smoothing", () => {
  const { italic, antialiased } = createUtility("font").use(fontStyle()).init();
  expect(italic.not.css).toMatchSnapshot();
  expect(italic.css).toMatchSnapshot();
  expect(antialiased.auto.css).toMatchSnapshot();
  expect(antialiased.css).toMatchSnapshot();

  expect(italic.meta).toMatchSnapshot();
  expect(italic.not.meta).toMatchSnapshot();
  expect(antialiased.meta).toMatchSnapshot();
  expect(antialiased.auto.meta).toMatchSnapshot();
});
