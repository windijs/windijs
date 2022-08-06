import { createContainer } from "utilities/container";
import { unify } from "helpers";

const screens = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
};

test("Container", () => {
  const container = createContainer(screens);
  expect(container.css).toMatchSnapshot();
});

test("Container center", () => {
  const container = createContainer(screens, true);
  expect(container.css).toMatchSnapshot();
});

test("Container padding", () => {
  const container = createContainer({
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
  const container = createContainer(screens);
  expect(unify(".container", container)).toMatchSnapshot();
});
