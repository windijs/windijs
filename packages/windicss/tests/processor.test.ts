import { utilityExtractor, utilityArbitraryExtractor, styleArbitraryExtractor, Processor, attributifyExtractor } from "../src";

import * as utilities from "@windijs/utilities";
import * as variants from "@windijs/variants";
import { style } from "@windijs/style";

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

test("interpret", () => {
  expect(
    processor.interpret(
      "bg-red-500 hover:focus:bg-blue-400 rounded style-backgroundColor-red style-padding-1rem [padding:1rem] [font-size:14em] p-[15px] bg-[#1c1c1e] bg-opacity-[0.25]"
    )
  ).toMatchSnapshot();
});

test("compile", () => {
  expect(
    processor.compile(
      "bg-red-500 hover:focus:bg-blue-400 rounded style-backgroundColor-red style-padding-1rem [padding:1rem] [font-size:14em] p-[15px] bg-[#1c1c1e] bg-opacity-[0.25]"
    )
  ).toMatchSnapshot();
});

test("attributify", () => {
  // TODO: fix w:lg:bg="..."
  expect(processor.interpret('<div bg="red-500 fixed" text="lg" />')).toMatchSnapshot();
});
