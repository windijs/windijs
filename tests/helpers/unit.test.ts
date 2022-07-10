import { em, rem, vh, vw, cm, mm, pt, px, deg, s, ms, dpi, percent, color } from "../../src";

test("em", () => {
  expect(em[3]).toEqual("3em");
  expect(em[1.25]).toEqual("1.25em");
  expect(em[3.5]).toEqual("3.5em");
});

test("rem", () => {
  expect(rem[3]).toEqual("3rem");
  expect(rem[1.25]).toEqual("1.25rem");
  expect(rem[3.5]).toEqual("3.5rem");
});

test("vh", () => {
  expect(vh[50]).toEqual("50vh");
  expect(vh[100]).toEqual("100vh");
  expect(vh[35]).toEqual("35vh");
});

test("vw", () => {
  expect(vw[50]).toEqual("50vw");
  expect(vw[100]).toEqual("100vw");
  expect(vw[35]).toEqual("35vw");
});

test("cm", () => {
  expect(cm[50]).toEqual("50cm");
  expect(cm[100]).toEqual("100cm");
  expect(cm[35]).toEqual("35cm");
});

test("mm", () => {
  expect(mm[50]).toEqual("50mm");
  expect(mm[100]).toEqual("100mm");
  expect(mm[35]).toEqual("35mm");
});

test("pt", () => {
  expect(pt[3]).toEqual("3pt");
  expect(pt[3.25]).toEqual("3.25pt");
  expect(pt[1]).toEqual("1pt");
});

test("px", () => {
  expect(px[3]).toEqual("3px");
  expect(px[3.25]).toEqual("3.25px");
  expect(px[1]).toEqual("1px");
  expect(px[-3]).toEqual("-3px");
});

test("deg", () => {
  expect(deg[60]).toEqual("60deg");
  expect(deg[360]).toEqual("360deg");
  expect(deg[-90]).toEqual("-90deg");
});

test("s", () => {
  expect(s[60]).toEqual("60s");
  expect(s[360]).toEqual("360s");
  expect(s[3600]).toEqual("3600s");
});

test("ms", () => {
  expect(ms[60]).toEqual("60ms");
  expect(ms[360]).toEqual("360ms");
  expect(ms[3600]).toEqual("3600ms");
});

test("dpi", () => {
  expect(dpi[60]).toEqual("60dpi");
  expect(dpi[360]).toEqual("360dpi");
  expect(dpi[120]).toEqual("120dpi");
});

test("percent", () => {
  expect(percent[60]).toEqual("60%");
  expect(percent[12.5]).toEqual("12.5%");
  expect(percent[90]).toEqual("90%");
});

test("color", () => {
  expect(color.aliceblue).toEqual("aliceblue");
  expect(color.lightgoldenrodyellow).toEqual("lightgoldenrodyellow");
  expect(color.transparent).toEqual("transparent");
  expect(color.currentColor).toEqual("currentColor");
  expect(color.inherit).toEqual("inherit");
  expect(color.initial).toEqual("initial");
  expect(color.unset).toEqual("unset");
  expect(color.var("bg-color")).toEqual("var(--bg-color)");
  expect(color.var("bg-color", "blue")).toEqual("var(--bg-color, blue)");
  expect(color.calc("var(--colorPrimary-h) + 120), var(--colorPrimary-s), var(--colorPrimary-l))")).toEqual("calc(var(--colorPrimary-h) + 120), var(--colorPrimary-s), var(--colorPrimary-l)))");
  expect(color.rgb(22, 22, 22)).toEqual("rgb(22, 22, 22)");
  expect(color.rgba(22, 22, 22, 0.1)).toEqual("rgba(22, 22, 22, 0.1)");
  expect(color.rgba(22, 22, 22, 0.1)).toEqual("rgba(22, 22, 22, 0.1)");
  expect(color.hsl(147, percent[50], percent[47])).toEqual("hsl(147, 50%, 47%)");
  expect(color.hsla(147, percent[50], percent[47], 0.3)).toEqual("hsla(147, 50%, 47%, 0.3)");
  expect(color.hwb(194, percent[0], percent[0])).toEqual("hwb(194 0% 0%)");
  expect(color.hwb(194, percent[0], percent[0], 0.3)).toEqual("hwb(194 0% 0% / 0.3)");
});
