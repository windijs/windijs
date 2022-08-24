import { configHandler, createUtility } from "@windijs/core";
import { m, mb, ml, mr, mt, mx, my, p, pb, pl, pr, pt, px, py, space } from "../src/spacing";
import { marginConfig, paddingConfig } from "@windijs/config";

import { unify } from "@windijs/helpers";

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
  expect(space.x.reverse.css).toMatchSnapshot();
  expect(space.x[4].css).toMatchSnapshot();
  expect(space.x[-10].css).toMatchSnapshot();
  expect(space.y.reverse.css).toMatchSnapshot();
  expect(space.y[2].css).toMatchSnapshot();
  expect(space.y[-4].css).toMatchSnapshot();
});

test("Build Space Between", () => {
  expect(unify(".space-x-reverse", space.x.reverse)).toMatchSnapshot();

  expect(unify(".space-y-2", space.y[2])).toMatchSnapshot();
});
