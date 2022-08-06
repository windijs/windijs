import { configHandler, createUtility } from "utilities";
import { heightConfig, widthConfig } from "config";

test("Width", () => {
  const w = createUtility("w")
    .use(configHandler(widthConfig, "width"))
    .init();

  expect(w["1/5"].css).toMatchSnapshot();
  expect(w["3/12"].css).toMatchSnapshot();
  expect(w[10].css).toMatchSnapshot();
  expect(w.md.css).toMatchSnapshot();
  expect(w.screen.css).toMatchSnapshot();
  expect(w.screen.lg.css).toMatchSnapshot();
  expect(w.min.css).toMatchSnapshot();
  expect(w[3.5].css).toMatchSnapshot();
  expect(w.full.css).toMatchSnapshot();
});

test("Min Width", () => {
  const w = createUtility("w")
    .case("min", configHandler(widthConfig, "minWidth"))
    .use(configHandler(widthConfig, "width"))
    .init();

  // TODO: fix this conflict
  expect(w.min.css).toMatchSnapshot();
  expect(w.min["1/5"].css).toMatchSnapshot();
  expect(w.min["3/12"].css).toMatchSnapshot();
  expect(w.min[10].css).toMatchSnapshot();
  expect(w.min.md.css).toMatchSnapshot();
  expect(w.min.screen.css).toMatchSnapshot();
  expect(w.min.screen.lg.css).toMatchSnapshot();
  expect(w.min.min.css).toMatchSnapshot();
  expect(w.min[3.5].css).toMatchSnapshot();
  expect(w.min.full.css).toMatchSnapshot();
});

test("Max Width", () => {
  const w = createUtility("w")
    .case("max", configHandler(widthConfig, "maxWidth"))
    .use(configHandler(widthConfig, "width"))
    .init();

  expect(w.max["1/5"].css).toMatchSnapshot();
  expect(w.max["3/12"].css).toMatchSnapshot();
  expect(w.max[10].css).toMatchSnapshot();
  expect(w.max.md.css).toMatchSnapshot();
  expect(w.max.screen.css).toMatchSnapshot();
  expect(w.max.screen.lg.css).toMatchSnapshot();
  expect(w.max.min.css).toMatchSnapshot();
  expect(w.max[3.5].css).toMatchSnapshot();
  expect(w.max.full.css).toMatchSnapshot();
});

test("Height", () => {
  const h = createUtility("h")
    .use(configHandler(heightConfig, "height"))
    .init();

  expect(h["1/5"].css).toMatchSnapshot();
  expect(h["3/12"].css).toMatchSnapshot();
  expect(h[10].css).toMatchSnapshot();
  expect(h.md.css).toMatchSnapshot();
  expect(h.screen.css).toMatchSnapshot();
  expect(h.screen.lg.css).toMatchSnapshot();
  expect(h.min.css).toMatchSnapshot();
  expect(h[3.5].css).toMatchSnapshot();
  expect(h.full.css).toMatchSnapshot();
});

test("Min Height", () => {
  const h = createUtility("h")
    .case("min", configHandler(heightConfig, "minHeight"))
    .use(configHandler(heightConfig, "height"))
    .init();

  expect(h.min.none.css).toMatchSnapshot();
  expect(h.min["1/5"].css).toMatchSnapshot();
  expect(h.min["3/12"].css).toMatchSnapshot();
  expect(h.min[10].css).toMatchSnapshot();
  expect(h.min.md.css).toMatchSnapshot();
  expect(h.min.screen.css).toMatchSnapshot();
  expect(h.min.screen.lg.css).toMatchSnapshot();
  expect(h.min.min.css).toMatchSnapshot();
  expect(h.min[3.5].css).toMatchSnapshot();
  expect(h.min.full.css).toMatchSnapshot();
});

test("Max Height", () => {
  const h = createUtility("h")
    .case("max", configHandler(heightConfig, "maxHeight"))
    .use(configHandler(heightConfig, "height"))
    .init();

  expect(h.max.none.css).toMatchSnapshot();
  expect(h.max["1/5"].css).toMatchSnapshot();
  expect(h.max["3/12"].css).toMatchSnapshot();
  expect(h.max[10].css).toMatchSnapshot();
  expect(h.max.md.css).toMatchSnapshot();
  expect(h.max.screen.css).toMatchSnapshot();
  expect(h.max.screen.lg.css).toMatchSnapshot();
  expect(h.max.min.css).toMatchSnapshot();
  expect(h.max[3.5].css).toMatchSnapshot();
  expect(h.max.full.css).toMatchSnapshot();
});
