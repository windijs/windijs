import { createUtility, cssHandler } from "core";

import { flex } from "utilities";

test("Flex", () => {
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
  expect(flex.row.css).toMatchSnapshot();
  expect(flex.row.reverse.css).toMatchSnapshot();
  expect(flex.col.css).toMatchSnapshot();
  expect(flex.col.reverse.css).toMatchSnapshot();
});

test("Flex Wrap", () => {
  expect(flex.wrap.css).toMatchSnapshot();
  expect(flex.wrap.reverse.css).toMatchSnapshot();
  expect(flex.nowrap.css).toMatchSnapshot();
});

test("Flex Stretch", () => {
  expect(flex[1].css).toMatchSnapshot();
  expect(flex.auto.css).toMatchSnapshot();
  expect(flex.initial.css).toMatchSnapshot();
  expect(flex.none.css).toMatchSnapshot();
});

test("Flex Grow", () => {
  expect(flex.grow.css).toMatchSnapshot();
  expect(flex.grow[0].css).toMatchSnapshot();
});

test("Flex Shrink", () => {
  expect(flex.shrink.css).toMatchSnapshot();
  expect(flex.shrink[0].css).toMatchSnapshot();
});

test("All Flex Utilities", () => {
  expect(flex.css).toMatchSnapshot();
  expect(flex.meta).toMatchSnapshot();
  expect(flex.row.css).toMatchSnapshot();
  expect(flex.col.reverse.css).toMatchSnapshot();
  expect(flex.wrap.reverse.css).toMatchSnapshot();
  expect(flex.initial.css).toMatchSnapshot();
  expect(flex.grow[0].css).toMatchSnapshot();
  expect(flex.shrink.css).toMatchSnapshot();
});
