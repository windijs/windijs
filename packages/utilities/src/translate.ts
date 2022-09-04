import { configHandler, createUtility } from "@windijs/core";
import { prop, transforms } from "@windijs/helpers";

import { translateConfig } from "@windijs/config";

export default createUtility("translate")
  .use(configHandler(translateConfig, [prop`--w-translate-x`, prop`--w-translate-y`, prop`--w-translate-z`]))
  .case("x", configHandler(translateConfig, prop`--w-translate-x`))
  .case("y", configHandler(translateConfig, prop`--w-translate-y`))
  .case("z", configHandler(translateConfig, prop`--w-translate-z`))
  .init(transforms.translate);
