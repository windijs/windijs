import { mergeObject } from "../src/common";

test("mergeObject", () => {
  expect(mergeObject({ a: 1, b: 2 }, { c: 3, d: 4 })).toEqual({ a: 1, b: 2, c: 3, d: 4 });

  expect(mergeObject({ a: 1, b: 1 }, { a: 2 })).toEqual({ a: 2, b: 1 });

  expect(mergeObject({ a: [1, 2, 3] }, { a: [4, 5, 6] })).toEqual({ a: [4, 5, 6] });

  expect(mergeObject({ a: { b: 1, c: 2 } }, { a: { d: 3, c: 4 } })).toEqual({ a: { b: 1, c: 4, d: 3 } });
});
