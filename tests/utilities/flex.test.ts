import { buildFlexDirection, buildFlexStretch, configHandler, createUtility, cssHandler } from "core";
import { flexDirectionConfig, flexGrowConfig, flexShrinkConfig, flexStretchConfig, flexWrapConfig } from "config";

import { prop } from "index";

test("Flex", () => {
  const flex = createUtility("flex").use(cssHandler({ display: ["-webkit-box", "-ms-flexbox", "-webkit-flex", "flex"] })).init();
  expect(flex.css).toMatchSnapshot();
  expect(flex.meta).toMatchSnapshot();
});

test("Inline Flex", () => {
  const inlineFlexHandler = cssHandler({ display: ["-webkit-inline-box", "-ms-inline-flexbox", "-webkit-inline-flex", "inline-flex"] });

  const inlineFlex = createUtility("inlineFlex").use(inlineFlexHandler).init();
  expect(inlineFlex.css).toMatchSnapshot();
  expect(inlineFlex.meta).toMatchSnapshot();

  const inline = createUtility("inline").case("flex", inlineFlexHandler).init();
  expect(inline.flex.css).toMatchSnapshot();

  const flex = createUtility("flex").case("inline", inlineFlexHandler).init();
  expect(flex.inline.css).toMatchSnapshot();
});

test("Flex Direction", () => {
  const flex = createUtility("flex").use(configHandler(flexDirectionConfig, buildFlexDirection)).init();
  expect(flex.row.css).toMatchSnapshot();
  expect(flex.row.reverse.css).toMatchSnapshot();
  expect(flex.col.css).toMatchSnapshot();
  expect(flex.col.reverse.css).toMatchSnapshot();
});

test("Flex Wrap", () => {
  const flex = createUtility("flex").use(configHandler(flexWrapConfig, [prop`-ms-flex-wrap`, prop`-webkit-flex-wrap`, "flexWrap"])).init();
  expect(flex.wrap.css).toMatchSnapshot();
  expect(flex.wrap.reverse.css).toMatchSnapshot();
  expect(flex.nowrap.css).toMatchSnapshot();
});

test("Flex Stretch", () => {
  const flex = createUtility("flex").use(configHandler(flexStretchConfig, buildFlexStretch)).init();
  expect(flex[1].css).toMatchSnapshot();
  expect(flex.auto.css).toMatchSnapshot();
  expect(flex.initial.css).toMatchSnapshot();
  expect(flex.none.css).toMatchSnapshot();
});

test("Flex Grow", () => {
  const flex = createUtility("flex").case("grow", configHandler(flexGrowConfig, [prop`-webkit-box-flex`, prop`-ms-flex-positive`, prop`-webkit-flex-grow`, "flexGrow"])).init();
  expect(flex.grow.css).toMatchSnapshot();
  expect(flex.grow[0].css).toMatchSnapshot();
});

test("Flex Shrink", () => {
  const flex = createUtility("flex").case("shrink", configHandler(flexShrinkConfig, [prop`-ms-flex-negative`, prop`-webkit-flex-shrink`, "flexShrink"])).init();
  expect(flex.shrink.css).toMatchSnapshot();
  expect(flex.shrink[0].css).toMatchSnapshot();
});

test("All Flex Utilities", () => {
  const flex = createUtility("flex")
    .use(cssHandler({ display: ["-webkit-box", "-ms-flexbox", "-webkit-flex", "flex"] }))
    .use(configHandler(flexDirectionConfig, buildFlexDirection))
    .use(configHandler(flexWrapConfig, [prop`-ms-flex-wrap`, prop`-webkit-flex-wrap`, "flexWrap"]))
    .use(configHandler(flexStretchConfig, buildFlexStretch))
    .case("grow", configHandler(flexGrowConfig, [prop`-webkit-box-flex`, prop`-ms-flex-positive`, prop`-webkit-flex-grow`, "flexGrow"]))
    .case("shrink", configHandler(flexShrinkConfig, [prop`-ms-flex-negative`, prop`-webkit-flex-shrink`, "flexShrink"]))
    .init();

  expect(flex.css).toMatchSnapshot();
  expect(flex.meta).toMatchSnapshot();
  expect(flex.row.css).toMatchSnapshot();
  expect(flex.col.reverse.css).toMatchSnapshot();
  expect(flex.wrap.reverse.css).toMatchSnapshot();
  expect(flex.initial.css).toMatchSnapshot();
  expect(flex.grow[0].css).toMatchSnapshot();
  expect(flex.shrink.css).toMatchSnapshot();
});
