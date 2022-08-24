import { buildContainer } from "@windijs/core";
import { screens } from "@windijs/config";
import { unify } from "@windijs/helpers";

test("Container", () => {
  const container = buildContainer(screens);
  expect(container.css).toMatchSnapshot();
});

test("Container center", () => {
  const container = buildContainer(screens, true);
  expect(container.css).toMatchSnapshot();
});

test("Container padding", () => {
  const container = buildContainer({
    DEFAULT: ["", { padding: "1rem" }],
    sm: ["640px", { padding: "2rem" }],
    md: "768px",
    lg: ["1024px", { padding: "4rem", margin: "2rem" }],
    xl: "1280px",
    "2xl": "1536px",
  });
  expect(container.css).toMatchSnapshot();
});

test("Container compile", () => {
  const container = buildContainer(screens);
  expect(unify(".container", container)).toMatchSnapshot();
});
