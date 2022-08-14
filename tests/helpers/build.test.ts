import { atomic, atomicNamer, hashNamer, unify, useNamer } from "helpers";
import { bg, border, rounded, text } from "utilities";
import { dark, hover, sm } from "variants";

test("unify with utilities", () => {
  expect(unify(".test", bg.blue[500], text.lg, sm(border, rounded, bg.blue[400]))).toMatchSnapshot();

  expect(unify(".test2", bg.blue[500], text.lg, [rounded.md, border[2]], sm(border, rounded, bg.blue[400]))).toMatchSnapshot();
});

test("unify with utility object", () => {
  expect(unify({
    ".test": [bg.blue[500], text.lg],
    ".button": [bg.rose[500], rounded, border],
  })).toMatchSnapshot();

  expect(unify({
    ".test": [bg.blue[500], text.lg],
    ".button": [bg.rose[500], rounded, border],
  }, {
    p: [text.lg],
  })).toMatchSnapshot("a");

  expect(unify({
    ".test": [bg.blue[500], text.lg],
    ".button": [bg.rose[500], rounded, border],
  }, {
    p: text.lg,
  })).toMatchSnapshot("a");
});

test("atomic", () => {
  expect(atomic(bg.blue[500], text.lg, sm(border, rounded, bg.blue[300]))).toMatchSnapshot();
});

test("atomic with nested variant", () => {
  expect(atomic(bg.blue[500], text.lg, hover(bg.yellow[300]), sm(border, rounded, bg.blue[300], hover(bg.blue[600]), dark(hover(bg.blue[800]))))).toMatchSnapshot();
});

test("atomic with atomicNamer", () => {
  useNamer(atomicNamer);

  expect(atomic(bg.blue[500], text.lg, sm(border, rounded, bg.blue[300]))).toMatchSnapshot();
});

test("atomic with nested variant and atomicNamer", () => {
  useNamer(atomicNamer);

  expect(atomic(bg.blue[500], text.lg, hover(bg.yellow[300]), sm(border, rounded, bg.blue[300], hover(bg.blue[600]), dark(hover(bg.blue[800]))))).toMatchSnapshot();
});

test("atomic with hashNamer", () => {
  useNamer(hashNamer);

  expect(atomic(bg.blue[500], text.lg, sm(border, rounded, bg.blue[300]))).toMatchSnapshot();
});

test("atomic with empty variant", () => {
  expect(atomic(sm())).toEqual("");
  expect(atomic()).toEqual("");
});
