import { StyleObject, buildWritingMode, colorHandler, configHandler, createUtility, cssHandler, fontFamilyHandler, fontSizeHandler, guard, meld, opacityConfig, prop, pxHandler, windiColors } from "index";
import { fontFamilyConfig, fontSizeConfig, fontStyleConfig, fontVariantNumericConfig, fontWeightConfig, hyphensConfig, letterSpacingConfig, lineHeightConfig, tabSizeConfig, textAlignConfig, textDecorationOffsetConfig, textDecorationStyleConfig, textDecorationThicknessConfig, textDecorationTypeConfig, textIndentConfig, textShadowConfig, textStrokeWidthConfig, textTransformConfig, verticalAlignConfig, whiteSpaceConfig, writingModeConfig, writingOrientationConfig } from "config/typography";

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
  const font = createUtility("font")
    .case("normal", cssHandler({ fontStyle: "normal", fontWeight: fontWeightConfig.normal }))
    .use(configHandler(fontStyleConfig, "fontStyle"))
    .use(configHandler(fontWeightConfig, "fontWeight")).init();

  expect(font.bold.css).toMatchSnapshot();
  expect(font.medium.css).toMatchSnapshot();
  expect(font.normal.css).toMatchSnapshot();
  expect(font.italic.css).toMatchSnapshot();
});

test("Font Variant Numeric", () => {
  const font = createUtility("font").use(configHandler(fontVariantNumericConfig, "fontVariantNumeric")).init();

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
  const text = createUtility("text")
    .use(configHandler(textAlignConfig, "textAlign"))
    .use(configHandler(verticalAlignConfig, "verticalAlign"))
    .init();

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
  const text = createUtility("text")
    .use(colorHandler(windiColors, "color", "--w-text-opacity"))
    .case("opacity", configHandler(opacityConfig, prop`--w-text-opacity`))
    .init();

  expect(text.red[500].css).toMatchSnapshot();
  expect(text.blue[500].opacity(10).css).toMatchSnapshot();
  expect(text.opacity[40].css).toMatchSnapshot();
});

test("Text Decoration", () => {
  const decoration = createUtility("decoration")
    .use(configHandler(textDecorationTypeConfig, [prop`-webkit-text-decoration-line`, "textDecorationLine"]))
    .use(configHandler(textDecorationStyleConfig, [prop`-webkit-text-decoration-style`, "textDecorationStyle"]))
    .use(configHandler(textDecorationThicknessConfig, "textDecorationThickness"))
    .use(colorHandler(windiColors, [prop`-webkit-text-decoration-color`, "textDecorationColor"], "--w-text-decoration-opacity"))
    .case("opacity", configHandler(opacityConfig, prop`--w-text-decoration-opacity`))
    .case("offset", configHandler(textDecorationOffsetConfig, "textUnderlineOffset"))
    .init();

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
  const indent = createUtility("indent")
    .use(configHandler(textIndentConfig, "textIndent"))
    .init();

  expect(indent.css).toMatchSnapshot();
  expect(indent.lg.css).toMatchSnapshot();
  expect(indent.xl.css).toMatchSnapshot();
});

test("Text Shadow", () => {
  const text = createUtility("text")
    .case("shadow", configHandler(textShadowConfig, "textShadow"))
    .init();

  expect(text.shadow.css).toMatchSnapshot();
  expect(text.shadow.sm.css).toMatchSnapshot();
  expect(text.shadow.none.css).toMatchSnapshot();
});

test("Text Stroke", () => {
  const text = createUtility("text")
    .case("stroke", meld(
      configHandler(textStrokeWidthConfig, prop`-webkit-text-stroke-width`),
      colorHandler(windiColors, prop`-webkit-text-stroke-color`, "--w-text-stroke-opacity"),
      pxHandler<Record<0|1|2|3|4|5|6|7|8, StyleObject>>(prop`-webkit-text-stroke-width`),
      guard("opacity", configHandler(opacityConfig, prop`--w-text-stroke-opacity`)),
    ))
    .init();

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
  const text = createUtility("text")
    .use(configHandler(textTransformConfig, "textTransform"))
    .init();

  expect(text.normal.css).toMatchSnapshot();
  expect(text.uppercase.css).toMatchSnapshot();
  expect(text.capitalize.css).toMatchSnapshot();
});

test("Whitespace", () => {
  const text = createUtility("text")
    .case("space", configHandler(whiteSpaceConfig, "whiteSpace"))
    .init();

  expect(text.space.normal.css).toMatchSnapshot();
  expect(text.space.nowrap.css).toMatchSnapshot();
  expect(text.space.pre.css).toMatchSnapshot();
  expect(text.space.pre.line.css).toMatchSnapshot();
  expect(text.space.pre.wrap.css).toMatchSnapshot();
});

test("WordBreak", () => {
  const text = createUtility("text")
    .case("break", meld(
      guard("normal", cssHandler({ wordBreak: "normal", overflowWrap: "normal" })),
      guard("words", cssHandler({ overflowWrap: "break-word" })),
      guard("all", cssHandler({ wordBreak: "break-all" })),
    ))
    .init();

  expect(text.break.all.css).toMatchSnapshot();
  expect(text.break.words.css).toMatchSnapshot();
  expect(text.break.normal.css).toMatchSnapshot();
});

test("Writing Mode & Text Orientation", () => {
  const write = createUtility("write")
    .use(configHandler(writingModeConfig, buildWritingMode))
    .use(configHandler(writingOrientationConfig, [prop`-webkit-text-orientation`, "textOrientation"]))
    .init();

  expect(write.normal.css).toMatchSnapshot();
  expect(write.vertical.right.css).toMatchSnapshot();
  expect(write.vertical.left.css).toMatchSnapshot();
  expect(write.mixed.css).toMatchSnapshot();
  expect(write.upright.css).toMatchSnapshot();
  expect(write.sideways.css).toMatchSnapshot();
});
