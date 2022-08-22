import { atomic, atomicNamer, useNamer } from "@windi/helpers";
import { bg, font, text } from "@windi/utilities";

import { Vm } from "../src";
import { sm } from "@windi/variants";

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
  const expr = vm.parse("sm(bg.red[500])");

  // TODO: a bug here
});
