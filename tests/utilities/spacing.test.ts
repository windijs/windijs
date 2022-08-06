import { buildSpaceBetweenX, buildSpaceBetweenY, configHandler, createUtility, guard, meld, spaceBetweenXReverseHandler, spaceBetweenYReverseHandler } from "index";
import { marginConfig, paddingConfig, spaceBetweenConfig } from "config";

import { unify } from "helpers";

test("Padding Combined", () => {
  const p = createUtility("p")
    .use(configHandler(paddingConfig, "padding"))
    .case("y", configHandler(paddingConfig, ["paddingTop", "paddingBottom"]))
    .case("x", configHandler(paddingConfig, ["paddingLeft", "paddingRight"]))
    .case("t", configHandler(paddingConfig, "paddingTop"))
    .case("l", configHandler(paddingConfig, "paddingLeft"))
    .case("b", configHandler(paddingConfig, "paddingBottom"))
    .case("r", configHandler(paddingConfig, "paddingRight"))
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
  const p = createUtility("p").use(configHandler(paddingConfig, "padding")).init();
  const py = createUtility("py").use(configHandler(paddingConfig, ["paddingTop", "paddingBottom"])).init();
  const px = createUtility("px").use(configHandler(paddingConfig, ["paddingLeft", "paddingRight"])).init();
  const pt = createUtility("pt").use(configHandler(paddingConfig, "paddingTop")).init();
  const pl = createUtility("pl").use(configHandler(paddingConfig, "paddingLeft")).init();
  const pb = createUtility("pb").use(configHandler(paddingConfig, "paddingBottom")).init();
  const pr = createUtility("pr").use(configHandler(paddingConfig, "paddingRight")).init();

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
    .use(configHandler(marginConfig, "margin"))
    .case("y", configHandler(marginConfig, ["marginTop", "marginBottom"]))
    .case("x", configHandler(marginConfig, ["marginLeft", "marginRight"]))
    .case("t", configHandler(marginConfig, "marginTop"))
    .case("l", configHandler(marginConfig, "marginLeft"))
    .case("b", configHandler(marginConfig, "marginBottom"))
    .case("r", configHandler(marginConfig, "marginRight"))
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
  const m = createUtility("m").use(configHandler(marginConfig, "margin")).init();
  const my = createUtility("my").use(configHandler(marginConfig, ["marginTop", "marginBottom"])).init();
  const mx = createUtility("mx").use(configHandler(marginConfig, ["marginLeft", "marginRight"])).init();
  const mt = createUtility("mt").use(configHandler(marginConfig, "marginTop")).init();
  const ml = createUtility("ml").use(configHandler(marginConfig, "marginLeft")).init();
  const mb = createUtility("mb").use(configHandler(marginConfig, "marginBottom")).init();
  const mr = createUtility("mr").use(configHandler(marginConfig, "marginRight")).init();

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
      guard("reverse", spaceBetweenXReverseHandler()),
      configHandler(spaceBetweenConfig, buildSpaceBetweenX),
    ))
    .case("y", meld(
      guard("reverse", spaceBetweenYReverseHandler()),
      configHandler(spaceBetweenConfig, buildSpaceBetweenY),
    ))
    .init();

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
      guard("reverse", spaceBetweenXReverseHandler()),
      configHandler(spaceBetweenConfig, buildSpaceBetweenX),
    ))
    .case("y", meld(
      guard("reverse", spaceBetweenYReverseHandler()),
      configHandler(spaceBetweenConfig, buildSpaceBetweenY),
    ))
    .init();

  expect(unify(".space-x-reverse", space.x.reverse)).toMatchSnapshot();

  expect(unify(".space-y-2", space.y[2])).toMatchSnapshot();
});
