import { skewConfig } from "@windijs/config";
import { configHandler, createUtility } from "@windijs/core";
import { prop, transforms } from "@windijs/helpers";

export default createUtility("skew")
  .use(configHandler(skewConfig, [prop`--w-skew-x`, prop`--w-skew-y`]))
  .case("x", configHandler(skewConfig, prop`--w-skew-x`))
  .case("y", configHandler(skewConfig, prop`--w-skew-y`))
  .init(transforms.skew);
