import { createUtility, marginBottomUtility, marginLeftUtility, marginRightUtility, marginTopUtility, marginUtility, marginXUtility, marginYUtility, paddingBottomUtility, paddingLeftUtility, paddingRightUtility, paddingTopUtility, paddingUtility, paddingXUtility, paddingYUtility, spaceBetweenXReverseUtility, spaceBetweenXUtility, spaceBetweenYReverseUtility, spaceBetweenYUtility } from "utilities";
import { guard, meld } from "utilities/handler";
import { marginConfig, paddingConfig, spaceBetweenConfig } from "config";

import { unify } from "helpers";

test("Padding Combined", () => {
  const p = createUtility("p")
    .use(paddingUtility(paddingConfig))
    .case("y", paddingYUtility(paddingConfig))
    .case("x", paddingXUtility(paddingConfig))
    .case("t", paddingTopUtility(paddingConfig))
    .case("l", paddingLeftUtility(paddingConfig))
    .case("b", paddingBottomUtility(paddingConfig))
    .case("r", paddingRightUtility(paddingConfig))
    .init();

  expect(p[4].css).toMatchSnapshot();
  expect(p[20].css).toMatchSnapshot();
  expect(p.x[1.5].css).toMatchSnapshot();
  expect(p.y[12].css).toMatchSnapshot();
  expect(p.t[2].css).toMatchSnapshot();
  expect(p.l[2].css).toMatchSnapshot();
  expect(p.b[2].css).toMatchSnapshot();
  expect(p.r[2].css).toMatchSnapshot();
});

test("Padding Separated", () => {
  const p = createUtility("p").use(paddingUtility(paddingConfig)).init();
  const py = createUtility("py").use(paddingYUtility(paddingConfig)).init();
  const px = createUtility("px").use(paddingXUtility(paddingConfig)).init();
  const pt = createUtility("pt").use(paddingTopUtility(paddingConfig)).init();
  const pl = createUtility("pl").use(paddingLeftUtility(paddingConfig)).init();
  const pb = createUtility("pb").use(paddingBottomUtility(paddingConfig)).init();
  const pr = createUtility("pr").use(paddingRightUtility(paddingConfig)).init();

  expect(p[4].css).toMatchSnapshot();
  expect(p[20].css).toMatchSnapshot();
  expect(px[1.5].css).toMatchSnapshot();
  expect(py[12].css).toMatchSnapshot();
  expect(pt[2].css).toMatchSnapshot();
  expect(pl[2].css).toMatchSnapshot();
  expect(pb[2].css).toMatchSnapshot();
  expect(pr[2].css).toMatchSnapshot();
});

test("Margin Combined", () => {
  const m = createUtility("m")
    .use(marginUtility(marginConfig))
    .case("y", marginYUtility(marginConfig))
    .case("x", marginXUtility(marginConfig))
    .case("t", marginTopUtility(marginConfig))
    .case("l", marginLeftUtility(marginConfig))
    .case("b", marginBottomUtility(marginConfig))
    .case("r", marginRightUtility(marginConfig))
    .init();

  expect(m[4].css).toMatchSnapshot();
  expect(m.auto.css).toMatchSnapshot();
  expect(m[-10].css).toMatchSnapshot();
  expect(m.x[1.5].css).toMatchSnapshot();
  expect(m.y[12].css).toMatchSnapshot();
  expect(m.t[2].css).toMatchSnapshot();
  expect(m.l[2].css).toMatchSnapshot();
  expect(m.b[2].css).toMatchSnapshot();
  expect(m.r[2].css).toMatchSnapshot();
});

test("Margin Separated", () => {
  const m = createUtility("m").use(marginUtility(marginConfig)).init();
  const my = createUtility("my").use(marginYUtility(marginConfig)).init();
  const mx = createUtility("mx").use(marginXUtility(marginConfig)).init();
  const mt = createUtility("mt").use(marginTopUtility(marginConfig)).init();
  const ml = createUtility("ml").use(marginLeftUtility(marginConfig)).init();
  const mb = createUtility("mb").use(marginBottomUtility(marginConfig)).init();
  const mr = createUtility("mr").use(marginRightUtility(marginConfig)).init();

  expect(m[4].css).toMatchSnapshot();
  expect(m.auto.css).toMatchSnapshot();
  expect(m[-10].css).toMatchSnapshot();
  expect(mx[1.5].css).toMatchSnapshot();
  expect(my[12].css).toMatchSnapshot();
  expect(mt[2].css).toMatchSnapshot();
  expect(ml[2].css).toMatchSnapshot();
  expect(mb[2].css).toMatchSnapshot();
  expect(mr[2].css).toMatchSnapshot();
});

test("Space Between", () => {
  const space = createUtility("space")
    .case("x", meld(
      guard("reverse", spaceBetweenXReverseUtility()),
      spaceBetweenXUtility(spaceBetweenConfig),
    ))
    .case("y", meld(
      guard("reverse", spaceBetweenYReverseUtility()),
      spaceBetweenYUtility(spaceBetweenConfig),
    ))
    .init();

  // TODO: fix posible undefined
  expect(space.x.reverse.css).toMatchSnapshot();
  expect(space.x[4].css).toMatchSnapshot();
  expect(space.x[-10].css).toMatchSnapshot();
  expect(space.y.reverse.css).toMatchSnapshot();
  expect(space.y[2].css).toMatchSnapshot();
  expect(space.y[-4].css).toMatchSnapshot();
});

test("Build Space Between", () => {
  const space = createUtility("space")
    .case("x", meld(
      guard("reverse", spaceBetweenXReverseUtility()),
      spaceBetweenXUtility(spaceBetweenConfig),
    ))
    .case("y", meld(
      guard("reverse", spaceBetweenYReverseUtility()),
      spaceBetweenYUtility(spaceBetweenConfig),
    ))
    .init();

  expect(unify(".space-x-reverse", space.x.reverse)).toMatchSnapshot();

  expect(unify(".space-y-2", space.y[2])).toMatchSnapshot();
});
