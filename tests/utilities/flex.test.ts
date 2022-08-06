import { createUtility, flexDirectionUtility, flexGrowUtility, flexShrinkUtility, flexStretchUtility, flexUtility, flexWrapUtility, inlineFlexUtility } from "utilities";
import { flexDirectionConfig, flexGrowConfig, flexShrinkConfig, flexStretchConfig, flexWrapConfig } from "config";

test("Flex", () => {
  const flex = createUtility("flex").use(flexUtility()).init();
  expect(flex.css).toMatchSnapshot();
  expect(flex.meta).toMatchSnapshot();
});

test("Inline Flex", () => {
  const inlineFlex = createUtility("inlineFlex").use(inlineFlexUtility()).init();
  expect(inlineFlex.css).toMatchSnapshot();
  expect(inlineFlex.meta).toMatchSnapshot();

  const inline = createUtility("inline").case("flex", inlineFlexUtility()).init();
  // TODO: fix this ts error
  expect(inline.flex.css).toMatchSnapshot();

  const flex = createUtility("flex").case("inline", inlineFlexUtility()).init();
  expect(flex.inline.css).toMatchSnapshot();
});

test("Flex Direction", () => {
  const flex = createUtility("flex").use(flexDirectionUtility(flexDirectionConfig)).init();
  expect(flex.row.css).toMatchSnapshot();
  expect(flex.row.reverse.css).toMatchSnapshot();
  expect(flex.col.css).toMatchSnapshot();
  expect(flex.col.reverse.css).toMatchSnapshot();
});

test("Flex Wrap", () => {
  const flex = createUtility("flex").use(flexWrapUtility(flexWrapConfig)).init();
  expect(flex.wrap.css).toMatchSnapshot();
  expect(flex.wrap.reverse.css).toMatchSnapshot();
  expect(flex.nowrap.css).toMatchSnapshot();
});

test("Flex Stretch", () => {
  const flex = createUtility("flex").use(flexStretchUtility(flexStretchConfig)).init();
  expect(flex[1].css).toMatchSnapshot();
  expect(flex.auto.css).toMatchSnapshot();
  expect(flex.initial.css).toMatchSnapshot();
  expect(flex.none.css).toMatchSnapshot();
});

test("Flex Grow", () => {
  const flex = createUtility("flex").case("grow", flexGrowUtility(flexGrowConfig)).init();
  expect(flex.grow.css).toMatchSnapshot();
  expect(flex.grow[0].css).toMatchSnapshot();
});

test("Flex Shrink", () => {
  const flex = createUtility("flex").case("shrink", flexShrinkUtility(flexShrinkConfig)).init();
  expect(flex.shrink.css).toMatchSnapshot();
  expect(flex.shrink[0].css).toMatchSnapshot();
});

test("All Flex Utilities", () => {
  const flex = createUtility("flex")
    .use(flexUtility())
    .use(flexDirectionUtility(flexDirectionConfig))
    .use(flexWrapUtility(flexWrapConfig))
    .use(flexStretchUtility(flexStretchConfig))
    .case("grow", flexGrowUtility(flexGrowConfig))
    .case("shrink", flexShrinkUtility(flexShrinkConfig))
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
