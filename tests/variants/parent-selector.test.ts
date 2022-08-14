import { groupActive, groupFocus, groupHover, groupVisited } from "variants";

import { bg } from "utilities";
import { bundle } from "helpers";

const utilities = [bg.blue[500], bg.clip.content];

test("groupHover", () => {
  expect(bundle(groupHover(...utilities))).toMatchSnapshot();
});

test("groupFocus", () => {
  expect(bundle(groupFocus(...utilities))).toMatchSnapshot();
});

test("groupActive", () => {
  expect(bundle(groupActive(...utilities))).toMatchSnapshot();
});

test("groupVisited", () => {
  expect(bundle(groupVisited(...utilities))).toMatchSnapshot();
});
