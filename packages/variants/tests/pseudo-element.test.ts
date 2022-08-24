import { after, before, firstLetter, firstLine, marker, selection } from "../src/pseudoElement";

import { bg } from "@windijs/utilities";
import { bundle } from "@windijs/helpers";

const utilities = [bg.blue[500], bg.clip.content];

test("after", () => {
  expect(bundle(after(...utilities))).toMatchSnapshot();
});

test("before", () => {
  expect(bundle(before(...utilities))).toMatchSnapshot();
});

test("firstLetter", () => {
  expect(bundle(firstLetter(...utilities))).toMatchSnapshot();
});

test("firstLine", () => {
  expect(bundle(firstLine(...utilities))).toMatchSnapshot();
});

test("marker", () => {
  expect(bundle(marker(...utilities))).toMatchSnapshot();
});

test("selection", () => {
  expect(bundle(selection(...utilities))).toMatchSnapshot();
});
