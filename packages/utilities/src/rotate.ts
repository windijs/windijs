import { rotateConfig } from "@windijs/config";
import { configHandler, createUtility } from "@windijs/core";
import { prop, transforms } from "@windijs/helpers";

export default createUtility("rotate")
  .use(configHandler(rotateConfig, prop`--w-rotate`))
  .case("x", configHandler(rotateConfig, prop`--w-rotate-x`))
  .case("y", configHandler(rotateConfig, prop`--w-rotate-y`))
  .case("z", configHandler(rotateConfig, prop`--w-rotate-z`))
  .init(transforms.rotate);
