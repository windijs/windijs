import { atomic, atomicNamer, useNamer } from "@windijs/helpers";
import { bg, font, text } from "@windijs/utilities";
import { sm } from "@windijs/variants";

import { Vm } from "../src";

useNamer(atomicNamer);
const vm = new Vm(undefined, { bg, text, font, sm });

test("vm eval", () => {
  const expr = vm.parse("bg.red[500], font.bold, text.left");
  expect(atomic(expr.eval())).toMatchSnapshot();
});

test("vm with number calc", () => {
  const expr = vm.parse("bg.red[100 + 400]");
  expect(atomic(expr.eval())).toMatchSnapshot();
});

test("vm with variants", () => {
  // const expr = vm.parse("sm(bg.red[500])");
  // TODO: a bug here
});
