import { style } from "@windijs/style";
import { attributifyExtractor, Processor, styleArbitraryExtractor, utilityArbitraryExtractor, utilityExtractor } from "../src";

import * as utilities from "@windijs/utilities";
import * as variants from "@windijs/variants";

const processor = new Processor({
  separator: "-",
  variantSeparator: ":",
  utilities: {
    ...utilities,
    style,
  },
  attributify: {
    // prefix: "w:",
  },
  variants,
  extractors: [utilityExtractor, utilityArbitraryExtractor, styleArbitraryExtractor, attributifyExtractor],
});

test("attributify with inner variants", () => {
  expect(processor.interpret('bg="red-500 hover:red-400 sm:dark:red-600"')).toMatchSnapshot();
});

test("attributify with outer variants", () => {
  expect(processor.interpret('hover:bg="red-500 dark:red-400"')).toMatchSnapshot();
});

test("attributify with default value", () => {
  expect(processor.interpret('grid="cols-2"')).toMatchSnapshot();
});
