import { aspect } from "../src/aspect";

test("Aspect Ratio", () => {
  expect(aspect.auto.css).toMatchSnapshot();
  expect(aspect.none.css).toMatchSnapshot();
  expect(aspect.video.css).toMatchSnapshot();
  expect(aspect.w[9].css).toMatchSnapshot();
  expect(aspect.h[16].css).toMatchSnapshot();
  expect(aspect[4 / 5].css).toMatchSnapshot();
});
