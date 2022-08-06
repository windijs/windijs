import { configHandler, createUtility, cssHandler, fontFamilyHandler, fontSizeHandler, guard, meld, prop } from "index";
import { fontFamilyConfig, fontSizeConfig, fontStyleConfig, fontWeightConfig, hyphensConfig, letterSpacingConfig, lineHeightConfig, tabSizeConfig, textAlignmentConfig } from "config/typography";

test("Font Family", () => {
  const font = createUtility("font")
    .use(fontFamilyHandler(fontFamilyConfig))
    .init();
  expect(font.mono.css).toMatchSnapshot();
  expect(font.sans.css).toMatchSnapshot();
  expect(font.serif.css).toMatchSnapshot();
});

test("Font Size", () => {
  const text = createUtility("text")
    .use(fontSizeHandler(fontSizeConfig))
    .init();
  expect(text.xs.css).toMatchSnapshot();
  expect(text["2xl"].css).toMatchSnapshot();
  expect(text.base.css).toMatchSnapshot();
  expect(text.lg.css).toMatchSnapshot();
});

test("Font Size With Different Config", () => {
  const text = createUtility("text")
    .use(fontSizeHandler({
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
  const font = createUtility("font")
    .use(configHandler(fontStyleConfig, "fontStyle"))
    .case("antialiased", meld(
      cssHandler({
        "-webkit-font-smoothing": "antialiased",
        "-moz-osx-font-smoothing": "grayscale",
      }),
      guard("auto", cssHandler({
        "-webkit-font-smoothing": "auto",
        "-moz-osx-font-smoothing": "auto",
      })),
    ))
    .init();

  expect(font.italic.css).toMatchSnapshot();
  expect(font.normal.css).toMatchSnapshot();
  expect(font.antialiased.css).toMatchSnapshot();
  expect(font.antialiased.auto.css).toMatchSnapshot();
});

test("Font Weight", () => {
  const font = createUtility("font").use(configHandler(fontWeightConfig, "fontWeight")).init();

  expect(font.bold.css).toMatchSnapshot();
  expect(font.medium.css).toMatchSnapshot();
});

test("Hyphens", () => {
  const hyphens = createUtility("hyphens").use(configHandler(hyphensConfig, [prop`-webkit-hyphens`, prop`-ms-hyphens`, "hyphens"])).init();

  expect(hyphens.manual.css).toMatchSnapshot();
  expect(hyphens.auto.css).toMatchSnapshot();
});

test("Letter Spacing", () => {
  const tracking = createUtility("tracking").use(configHandler(letterSpacingConfig, "letterSpacing")).init();

  expect(tracking.tight.css).toMatchSnapshot();
  expect(tracking.wider.css).toMatchSnapshot();
});

test("Line Height", () => {
  const leading = createUtility("leading").use(configHandler(lineHeightConfig, "lineHeight")).init();

  expect(leading[4].css).toMatchSnapshot();
  expect(leading.normal.css).toMatchSnapshot();
  expect(leading.relaxed.css).toMatchSnapshot();
});

test("Tab Size", () => {
  const tab = createUtility("tab").use(configHandler(tabSizeConfig, [prop`-moz-tab-size`, prop`-o-tab-size`, "tabSize"])).init();

  expect(tab[4].css).toMatchSnapshot();
  expect(tab[2].css).toMatchSnapshot();
});

test("Text Alignment", () => {
  const text = createUtility("text").use(configHandler(textAlignmentConfig, "textAlign")).init();

  expect(text.left.css).toMatchSnapshot();
  expect(text.justify.css).toMatchSnapshot();
});
