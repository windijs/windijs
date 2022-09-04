import { decoration, image, list, overflow, overscroll, placeholder } from "../src";

test("Box Decoration Break", () => {
  expect(decoration.slice.css).toMatchSnapshot();
  expect(decoration.clone.css).toMatchSnapshot();
});

test("Image Rendering", () => {
  expect(image.render.auto.css).toMatchSnapshot();
  expect(image.render.pixel.css).toMatchSnapshot();
  expect(image.render.edge.css).toMatchSnapshot();
});

test("List", () => {
  expect(list.disc.css).toMatchSnapshot();
  expect(list.zeroDecimal.css).toMatchSnapshot();
  expect(list.upperRoman.css).toMatchSnapshot();
  expect(list.inside.css).toMatchSnapshot();
  expect(list.outside.css).toMatchSnapshot();
});

test("Overflow", () => {
  expect(overflow.scroll.css).toMatchSnapshot();
  expect(overflow.x.hidden.css).toMatchSnapshot();
  expect(overflow.y.visible.css).toMatchSnapshot();
  expect(overflow.truncate.css).toMatchSnapshot();
  expect(overflow.ellipsis.css).toMatchSnapshot();
  expect(overflow.clip.css).toMatchSnapshot();
});

test("OverScroll", () => {
  expect(overscroll.contain.css).toMatchSnapshot();
  expect(overscroll.x.none.css).toMatchSnapshot();
  expect(overscroll.y.auto.css).toMatchSnapshot();
});

test("Placeholder", () => {
  expect(placeholder.amber[300].css).toMatchSnapshot();
  expect(placeholder.amber[300].opacity(20).css).toMatchSnapshot();
  expect(placeholder.opacity[20].css).toMatchSnapshot();
});
