import { scaleConfig } from "@windijs/config";
import { configHandler, createUtility } from "@windijs/core";
import { prop, transforms } from "@windijs/helpers";

export default createUtility("scale")
  .use(configHandler(scaleConfig, [prop`--w-scale-x`, prop`--w-scale-y`, prop`--w-scale-z`]))
  .case("x", configHandler(scaleConfig, prop`--w-scale-x`))
  .case("y", configHandler(scaleConfig, prop`--w-scale-y`))
  .case("z", configHandler(scaleConfig, prop`--w-scale-z`))
  .init(transforms.scale);
