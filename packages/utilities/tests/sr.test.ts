import { sr } from "../src";

test("Screen Readers", () => {
  expect(sr.only.css).toMatchSnapshot();
  expect(sr.normal.css).toMatchSnapshot();
});
