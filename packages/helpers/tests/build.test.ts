import { variant } from "@windijs/core";
import { atomic, atomicNamer, buildCSS, bundle, hashNamer, unify, useNamer } from "@windijs/helpers";
import { style } from "@windijs/style";
import { bg, border, rounded, text } from "@windijs/utilities";
import { dark, hover, sm } from "@windijs/variants";

test("unify with utilities", () => {
  expect(unify(".test", bg.blue[500], text.lg, sm(border, rounded, bg.blue[400]))).toMatchSnapshot();

  expect(unify(".test2", bg.blue[500], text.lg, [rounded.md, border[2]], sm(border, rounded, bg.blue[400]))).toMatchSnapshot();
});

test("unify with utility object", () => {
  expect(
    unify({
      ".test": [bg.blue[500], text.lg],
      ".button": [bg.rose[500], rounded, border],
    })
  ).toMatchSnapshot();

  expect(
    unify(
      {
        ".test": [bg.blue[500], text.lg],
        ".button": [bg.rose[500], rounded, border],
      },
      {
        p: [text.lg],
      }
    )
  ).toMatchSnapshot("a");

  expect(
    unify(
      {
        ".test": [bg.blue[500], text.lg],
        ".button": [bg.rose[500], rounded, border],
      },
      {
        p: text.lg,
      }
    )
  ).toMatchSnapshot("a");
});

test("atomic", () => {
  expect(atomic(bg.blue[500], text.lg, sm(border, rounded, bg.blue[300]))).toMatchSnapshot();
});

test("atomic with nested variant", () => {
  expect(
    atomic(bg.blue[500], text.lg, hover(bg.yellow[300]), sm(border, rounded, bg.blue[300], hover(bg.blue[600]), dark(hover(bg.blue[800]))))
  ).toMatchSnapshot();
});

test("atomic with atomicNamer", () => {
  useNamer(atomicNamer);

  expect(atomic(bg.blue[500], text.lg, sm(border, rounded, bg.blue[300]))).toMatchSnapshot();
});

test("atomic with nested variant and atomicNamer", () => {
  useNamer(atomicNamer);

  expect(
    atomic(bg.blue[500], text.lg, hover(bg.yellow[300]), sm(border, rounded, bg.blue[300], hover(bg.blue[600]), dark(hover(bg.blue[800]))))
  ).toMatchSnapshot();
});

test("atomic with hashNamer", () => {
  useNamer(hashNamer);

  expect(atomic(bg.blue[500], text.lg, sm(border, rounded, bg.blue[300]))).toMatchSnapshot();
});

test("atomic with empty variant", () => {
  expect(atomic(sm())).toEqual("");
  expect(atomic()).toEqual("");
});

test("bundle with nested media", () => {
  const bundled = bundle(
    hover(variant("@media (hover: hover)", style.border["2px solid black"], variant("@media (color)", style.borderColor["#036"])))
  );
  expect(bundled).toMatchSnapshot();
});

test("build keyframes", () => {
  expect(
    buildCSS({
      "@-webkit-keyframes": {
        from: { opacity: 0 },
        to: { opacity: 1 },
      },
      "@keyframes slideRight": {
        from: { opacity: 0 },
        to: { opacity: 1 },
      },
      ".container": {
        animationName: "slideRight",
      },
    })
  ).toMatchSnapshot();
});

test("build same css property", () => {
  expect(
    buildCSS({
      ".flex": {
        display: ["flex", "-ms-flex"],
      },
    })
  ).toMatchSnapshot();
});

test("build font-face", () => {
  expect(
    buildCSS({
      "@font-face": {
        fontFamily: "monospace",
        src: "url(webfont.eot)",
      },
    })
  ).toMatchSnapshot();

  expect(
    buildCSS({
      "@font-face": [
        {
          fontFamily: "MyWebFont",
          src: "url(webfont.eot)",
        },
        {
          fontFamily: "MySecondFont",
          src: "url(webfont2.eot)",
        },
      ],
    })
  ).toMatchSnapshot();
});

test("build global media rules", () => {
  expect(
    buildCSS({
      "@namespace": "url(XML-namespace-URL)",
      "@charset": '"utf-8"',
      "@import": "url(http://mysite.com/custom.css)",
      "@layer": "utilities",
      "@layer utilities": {
        ".padding-sm": {
          padding: "0.5rem",
        },
        ".padding-lg": {
          padding: "0.8rem",
        },
      },
    })
  ).toMatchSnapshot();
});
