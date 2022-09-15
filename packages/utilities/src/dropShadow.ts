import { dropShadowConfig } from "@windijs/config";
import { configHandler, createUtility } from "@windijs/core";
import { css, filters } from "@windijs/helpers";

export default createUtility("dropShadow")
  .use(
    configHandler(dropShadowConfig, v =>
      css({
        "--w-drop-shadow": Array.isArray(v) ? v.map(i => `drop-shadow(${i})`).join(" ") : `drop-shadow(${v})`,
      })
    )
  )
  .init(filters.dropShadow);
