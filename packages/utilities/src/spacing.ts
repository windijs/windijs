import { buildSpaceBetweenX, buildSpaceBetweenY, configHandler, createUtility, guard, meld, spaceBetweenXReverseHandler, spaceBetweenYReverseHandler } from "@windi/core";
import { marginConfig, paddingConfig, spaceBetweenConfig } from "@windi/config";

export const p = createUtility("p")
  .use(configHandler(paddingConfig, "padding"))
  .init();

export const py = createUtility("py")
  .use(configHandler(paddingConfig, ["paddingTop", "paddingBottom"]))
  .init();

export const px = createUtility("px")
  .use(configHandler(paddingConfig, ["paddingLeft", "paddingRight"]))
  .init();

export const pt = createUtility("pt")
  .use(configHandler(paddingConfig, "paddingTop"))
  .init();

export const pl = createUtility("pl")
  .use(configHandler(paddingConfig, "paddingLeft"))
  .init();

export const pb = createUtility("pb")
  .use(configHandler(paddingConfig, "paddingBottom"))
  .init();

export const pr = createUtility("pr")
  .use(configHandler(paddingConfig, "paddingRight"))
  .init();

export const m = createUtility("m")
  .use(configHandler(marginConfig, "margin"))
  .init();

export const my = createUtility("my")
  .use(configHandler(marginConfig, ["marginTop", "marginBottom"]))
  .init();

export const mx = createUtility("mx")
  .use(configHandler(marginConfig, ["marginLeft", "marginRight"]))
  .init();

export const mt = createUtility("mt")
  .use(configHandler(marginConfig, "marginTop"))
  .init();

export const ml = createUtility("ml")
  .use(configHandler(marginConfig, "marginLeft"))
  .init();

export const mb = createUtility("mb")
  .use(configHandler(marginConfig, "marginBottom"))
  .init();

export const mr = createUtility("mr")
  .use(configHandler(marginConfig, "marginRight"))
  .init();

export const space = createUtility("space")
  .case("x", meld(
    guard("reverse", spaceBetweenXReverseHandler()),
    configHandler(spaceBetweenConfig, buildSpaceBetweenX),
  ))
  .case("y", meld(
    guard("reverse", spaceBetweenYReverseHandler()),
    configHandler(spaceBetweenConfig, buildSpaceBetweenY),
  ))
  .init();
