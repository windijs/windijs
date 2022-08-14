import { deg, rem } from "helpers";
import { origin, perspect, preserve, rotate, scale, skew, transform, translate } from "utilities";

test("Rotate", () => {
  expect(rotate[90].css).toMatchSnapshot();
  expect(rotate[-45].css).toMatchSnapshot();
  expect(rotate.x[30].css).toMatchSnapshot();
  expect(rotate.y[45].css).toMatchSnapshot();
  expect(rotate.z[60].css).toMatchSnapshot();
  expect(rotate(deg[72.5])).toEqual("rotate(72.5deg)");
});

test("Scale", () => {
  expect(scale[90].css).toMatchSnapshot();
  expect(scale.x[30].css).toMatchSnapshot();
  expect(scale.y[45].css).toMatchSnapshot();
  expect(scale.z[60].css).toMatchSnapshot();
  expect(scale(0.72)).toEqual("scale(0.72)");
});

test("Skew", () => {
  expect(skew[90].css).toMatchSnapshot();
  expect(skew[-45].css).toMatchSnapshot();
  expect(skew.x[30].css).toMatchSnapshot();
  expect(skew.y[45].css).toMatchSnapshot();
  expect(skew(deg[72.5])).toEqual("skew(72.5deg)");
});

test("Translate", () => {
  expect(translate[6].css).toMatchSnapshot();
  expect(translate.x[12].css).toMatchSnapshot();
  expect(translate.y["-1/3"].css).toMatchSnapshot();
  expect(translate.z[-28].css).toMatchSnapshot();
  expect(translate(rem[1.5], rem[3])).toEqual("translate(1.5rem, 3rem)");
});

test("Transform", () => {
  expect(transform(rotate[60], skew.y[-30], translate.x[8]).css).toMatchSnapshot();
  expect([transform.css, rotate[60].css, skew.y[-30].css, translate.x[8].css]).toMatchSnapshot();
});

test("Transform Style", () => {
  expect(preserve.box.css).toMatchSnapshot();
  expect(preserve.flat.css).toMatchSnapshot();
});

test("Transform Origin", () => {
  expect(origin.center.css).toMatchSnapshot();
  expect(origin.top.left.css).toMatchSnapshot();
  expect(origin.left.bottom.css).toMatchSnapshot();
});

test("Perspective", () => {
  expect(perspect.sm.css).toMatchSnapshot();
  expect(perspect[12].css).toMatchSnapshot();
  expect(perspect.origin.center.css).toMatchSnapshot();
  expect(perspect.origin.left.bottom.css).toMatchSnapshot();
});
