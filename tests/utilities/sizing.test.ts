import { h, w } from "utilities";

test("Width", () => {
  expect(w["1/5"].css).toMatchSnapshot();
  expect(w["3/12"].css).toMatchSnapshot();
  expect(w[10].css).toMatchSnapshot();
  expect(w.md.css).toMatchSnapshot();
  expect(w.screen.css).toMatchSnapshot();
  expect(w.screen.lg.css).toMatchSnapshot();
  expect(w.content.min.css).toMatchSnapshot();
  expect(w[3.5].css).toMatchSnapshot();
  expect(w.full.css).toMatchSnapshot();
});

test("Min Width", () => {
  expect(w.content.min.css).toMatchSnapshot();
  expect(w.min["1/5"].css).toMatchSnapshot();
  expect(w.min["3/12"].css).toMatchSnapshot();
  expect(w.min[10].css).toMatchSnapshot();
  expect(w.min.md.css).toMatchSnapshot();
  expect(w.min.screen.css).toMatchSnapshot();
  expect(w.min.screen.lg.css).toMatchSnapshot();
  expect(w.min.content.min.css).toMatchSnapshot();
  expect(w.min[3.5].css).toMatchSnapshot();
  expect(w.min.full.css).toMatchSnapshot();
});

test("Max Width", () => {
  expect(w.max["1/5"].css).toMatchSnapshot();
  expect(w.max["3/12"].css).toMatchSnapshot();
  expect(w.max[10].css).toMatchSnapshot();
  expect(w.max.md.css).toMatchSnapshot();
  expect(w.max.screen.css).toMatchSnapshot();
  expect(w.max.screen.lg.css).toMatchSnapshot();
  expect(w.max.content.min.css).toMatchSnapshot();
  expect(w.max[3.5].css).toMatchSnapshot();
  expect(w.max.full.css).toMatchSnapshot();
});

test("Height", () => {
  expect(h["1/5"].css).toMatchSnapshot();
  expect(h["3/12"].css).toMatchSnapshot();
  expect(h[10].css).toMatchSnapshot();
  expect(h.md.css).toMatchSnapshot();
  expect(h.screen.css).toMatchSnapshot();
  expect(h.screen.lg.css).toMatchSnapshot();
  expect(h.content.min.css).toMatchSnapshot();
  expect(h[3.5].css).toMatchSnapshot();
  expect(h.full.css).toMatchSnapshot();
});

test("Min Height", () => {
  expect(h.min.none.css).toMatchSnapshot();
  expect(h.min["1/5"].css).toMatchSnapshot();
  expect(h.min["3/12"].css).toMatchSnapshot();
  expect(h.min[10].css).toMatchSnapshot();
  expect(h.min.md.css).toMatchSnapshot();
  expect(h.min.screen.css).toMatchSnapshot();
  expect(h.min.screen.lg.css).toMatchSnapshot();
  expect(h.min.content.min.css).toMatchSnapshot();
  expect(h.min[3.5].css).toMatchSnapshot();
  expect(h.min.full.css).toMatchSnapshot();
});

test("Max Height", () => {
  expect(h.max.none.css).toMatchSnapshot();
  expect(h.max["1/5"].css).toMatchSnapshot();
  expect(h.max["3/12"].css).toMatchSnapshot();
  expect(h.max[10].css).toMatchSnapshot();
  expect(h.max.md.css).toMatchSnapshot();
  expect(h.max.screen.css).toMatchSnapshot();
  expect(h.max.screen.lg.css).toMatchSnapshot();
  expect(h.max.content.min.css).toMatchSnapshot();
  expect(h.max[3.5].css).toMatchSnapshot();
  expect(h.max.full.css).toMatchSnapshot();
});
