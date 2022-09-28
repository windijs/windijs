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
  variants,
  extractors: [utilityExtractor, utilityArbitraryExtractor, styleArbitraryExtractor, attributifyExtractor],
});

test("arbitrary values", () => {
  expect(
    processor.interpret(
      `aspect-[4/3] columns-[20] columns-[10rem] object-[center_bottom] z-[100] basis-[14.2857143%] flex-[2_2_0%] grow-[2] order-[13] shrink-[2] bg-[#1C1C1E] scroll-m-[24rem]
        font-['Open_Sans'] text-[14px] font-[1100]
        before:content-['Mobile'] md:before:content-['Desktop']
        divide-[#243c5a] divide-x-[3px] divide-y-[4px]
        outline-[#243c5a] outline-[3px] outline-offset-[4px]
        shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]
        shadow-[#50d71e]
        blur-[2px]
        backdrop-invert-[.25]
        backdrop-opacity-[.15]
        `
    )
  ).toMatchSnapshot();
});

test("grid arbitrary values", () => {
  expect(
    processor.interpret(
      `col-[span_16_/_span_16] col-span-[17] col-start-[18] col-end-[19]
        grid-cols-[200px_minmax(900px,_1fr)_100px] grid-rows-[200px_minmax(900px,_1fr)_100px]
        row-[span_16_/_span_16] row-span-[17] row-start-[18] row-end-[19]
        `
    )
  ).toMatchSnapshot();
});

test("space arbitrary values", () => {
  expect(processor.interpret("p-[14px] m-[16px] my-[20px] space-x-[15px] space-y-[1.8rem] gap-x-[12rem] gap-y-[13px] gap-[20px]")).toMatchSnapshot();
});

test("inset arbitrary values", () => {
  expect(processor.interpret("inset-[12rem] inset-x-[13.5rem] inset-y-[14.2rem] top-[4px] left-[5px] bottom-[6px] right-[9px]")).toMatchSnapshot();
});

test("bg arbitrary values", () => {
  expect(
    processor.interpret(
      "bg-[#1C1C1E] bg-[rgb(13,14,15)] bg-[hsl(50_80%_40%)] bg-[center_top_1rem] bg-[length:200px_100px] bg-[url('/img/hero-pattern.svg')] bg-[linear-gradient(#e66465,#9198e5)]"
    )
  ).toMatchSnapshot();
});

test("border arbitrary values", () => {
  expect(processor.interpret("border-[#234c5a] border-l-[#1c1c1e] border-t-[3px] border-[1.5rem] border-spacing-[7px]")).toMatchSnapshot();
});

test("gradient arbitrary values", () => {
  expect(processor.interpret("from-[#234c5a] via-[#1c1c1e] to-[#0f0f0f]")).toMatchSnapshot();
});

test("ring arbitrary values", () => {
  expect(processor.interpret("ring-[10px] ring-[#50d71e] ring-offset-[3px] ring-offset-[#50d71e] ring-offset-opacity-[0.5]")).toMatchSnapshot();
});

test("extract utilities", () => {
  expect(processor.interpret("bg-red-500 !hover:focus:bg-blue-400 rounded style-backgroundColor-red style-padding-1rem")).toMatchSnapshot();
});

test("arbitrary properties", () => {
  expect(processor.interpret("[mask-type:luminance] hover:[mask-type:alpha] [--scroll-offset:56px] lg:[--scroll-offset:44px]")).toMatchSnapshot();
});

test("resolving ambiguities", () => {
  expect(
    processor.interpret("text-[22px] text-[#bada55] text-[var(--my-var)] text-[length:var(--my-var)] text-[color:var(--my-var)]")
  ).toMatchSnapshot();
});

test("multiple extractors", () => {
  expect(
    processor.interpret(
      "bg-red-500 hover:focus:bg-blue-400 rounded style-backgroundColor-red style-padding-1rem [padding:1rem] [font-size:14em] p-[15px] bg-[#1c1c1e] bg-opacity-[0.25]"
    )
  ).toMatchSnapshot();
});
