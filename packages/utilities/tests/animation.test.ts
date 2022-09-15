import { unify } from "@windijs/helpers";

import { animate } from "../src";

test("Animation", () => {
  expect(animate.none.css).toMatchSnapshot();
  expect(animate.bounce.css).toMatchSnapshot();
  expect(animate.flip.css).toMatchSnapshot();
  expect(animate.backInUp.css).toMatchSnapshot();
});

test("Build Animation Keyframes", () => {
  expect(unify(".animate-none", animate.none)).toMatchSnapshot();
  expect(unify(".animate-spin", animate.spin)).toMatchSnapshot();
  expect(unify(".animate-flip", animate.flip)).toMatchSnapshot();
});
