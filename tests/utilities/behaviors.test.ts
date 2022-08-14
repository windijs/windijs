import { boxDecorationBreakConfig, imageRenderingConfig, listStylePositionConfig, listStyleTypeConfig, opacityConfig, overflowConfig, overscrollConfig } from "config";
import { buildImageRendering, buildPlaceholder, colorHandler, configHandler, createUtility, cssHandler } from "utilities";

import { prop } from "helpers";
import { windiColors } from "colors";

test("Box Decoration Break", () => {
  const decoration = createUtility("decoraton").use(configHandler(boxDecorationBreakConfig, [prop`-webkit-box-decoration-break`, prop`box-decoration-break`])).init();

  expect(decoration.slice.css).toMatchSnapshot();
  expect(decoration.clone.css).toMatchSnapshot();
});

test("Image Rendering", () => {
  const image = createUtility("image").case("render", configHandler(imageRenderingConfig, buildImageRendering)).init();
  expect(image.render.auto.css).toMatchSnapshot();
  expect(image.render.pixel.css).toMatchSnapshot();
  expect(image.render.edge.css).toMatchSnapshot();
});

test("List", () => {
  const list = createUtility("list")
    .use(configHandler(listStyleTypeConfig, "listStyleType"))
    .use(configHandler(listStylePositionConfig, "listStylePosition"))
    .init();
  expect(list.disc.css).toMatchSnapshot();
  expect(list.zeroDecimal.css).toMatchSnapshot();
  expect(list.upperRoman.css).toMatchSnapshot();
  expect(list.inside.css).toMatchSnapshot();
  expect(list.outside.css).toMatchSnapshot();
});

test("Overflow", () => {
  const overflow = createUtility("overflow")
    .use(configHandler(overflowConfig, "overflow"))
    .case("truncate", cssHandler({ overflow: "hidden", "-o-text-overflow": "ellipsis", textOverflow: "ellipsis", whiteSpace: "nowrap" }))
    .case("ellipsis", cssHandler({ "-o-text-overflow": "ellipsis", textOverflow: "ellipsis" }))
    .case("x", configHandler(overflowConfig, "overflowX"))
    .case("y", configHandler(overflowConfig, "overflowY"))
    .init();

  expect(overflow.scroll.css).toMatchSnapshot();
  expect(overflow.x.hidden.css).toMatchSnapshot();
  expect(overflow.y.visible.css).toMatchSnapshot();
  expect(overflow.truncate.css).toMatchSnapshot();
  expect(overflow.ellipsis.css).toMatchSnapshot();
  expect(overflow.clip.css).toMatchSnapshot();
});

test("OverScroll", () => {
  const overscroll = createUtility("overscroll")
    .use(configHandler(overscrollConfig, "overscrollBehavior"))
    .case("x", configHandler(overscrollConfig, "overscrollBehaviorX"))
    .case("y", configHandler(overscrollConfig, "overscrollBehaviorY"))
    .init();

  expect(overscroll.contain.css).toMatchSnapshot();
  expect(overscroll.x.none.css).toMatchSnapshot();
  expect(overscroll.y.auto.css).toMatchSnapshot();
});

test("Placeholder", () => {
  const placeholder = createUtility("placeholder")
    .use(colorHandler(windiColors, buildPlaceholder))
    .case("opacity", configHandler(opacityConfig, prop`--w-placeholder-opacity`))
    .init();

  expect(placeholder.amber[300].css).toMatchSnapshot();
  expect(placeholder.amber[300].opacity(20).css).toMatchSnapshot();
  expect(placeholder.opacity[20].css).toMatchSnapshot();
});
