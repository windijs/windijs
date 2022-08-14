import { sr } from "../src/sr";

test("Screen Readers", () => {
  expect(sr.only.css).toMatchSnapshot();
  expect(sr.normal.css).toMatchSnapshot();
});
