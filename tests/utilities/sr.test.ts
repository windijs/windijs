import { sr } from "utilities";

test("Screen Readers", () => {
  expect(sr.only.css).toMatchSnapshot();
  expect(sr.normal.css).toMatchSnapshot();
});
