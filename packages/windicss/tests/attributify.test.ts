import { style } from "@windijs/style";
import { attributifyExtractor, Processor } from "../src";

import * as utilities from "@windijs/utilities";
import * as variants from "@windijs/variants";

const processor = new Processor({
  separator: "-",
  variantSeparator: ":",
  utilities: {
    ...utilities,
    style,
    hue: {
      rotate: utilities.hueRotate,
    },
    drop: {
      shadow: utilities.dropShadow,
    },
  },
  attributify: {
    // prefix: "w:",
  },
  variants,
  extractors: [attributifyExtractor],
});

// TODO: fix attributifyExtractor conflict with utilityExtractor, duplicate css generated

test("attributify with inner variants", () => {
  expect(processor.interpret('bg="red-500 hover:red-400 sm:dark:red-600"')).toMatchSnapshot();
});

test("attributify with outer variants", () => {
  expect(processor.interpret('hover:bg="red-500 dark:red-400"')).toMatchSnapshot();
});

test("attributify with default value", () => {
  expect(processor.interpret('grid="cols-2"')).toMatchSnapshot();
});

test("attributify with filter", () => {
  expect(
    processor.interpret('filter="blur-sm brightness-75 contrast-50 drop-shadow drop-shadow-md grayscale hue-rotate-15 invert saturate-50 sepia-0"')
  ).toMatchSnapshot();
});

test("attributify with backdrop", () => {
  expect(processor.interpret('backdrop="blur blur-sm brightness-50 saturate-50 hue-rotate-15"')).toMatchSnapshot();
});

test("attributify with transition", () => {
  expect(processor.interpret('transition="none colors duration-75 ease-in delay-75 animate-spin"')).toMatchSnapshot();
});

test("attributify with transform", () => {
  expect(processor.interpret('transform="scale-0 scale-y-50 rotate-45 translate-x-0 skew-x-2 origin-center"')).toMatchSnapshot();
});
