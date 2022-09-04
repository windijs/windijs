import { configHandler, createUtility, cssHandler, fontFamilyHandler, guard, meld } from "@windijs/core";
import { fontFamilyConfig, fontStyleConfig, fontVariantNumericConfig, fontWeightConfig } from "@windijs/config";

export default createUtility("font")
  .case("normal", cssHandler({ fontStyle: "normal", fontWeight: fontWeightConfig.normal }))
  .case("antialiased", meld(
    cssHandler({
      "-webkit-font-smoothing": "antialiased",
      "-moz-osx-font-smoothing": "grayscale",
    }),
    guard("auto", cssHandler({
      "-webkit-font-smoothing": "auto",
      "-moz-osx-font-smoothing": "auto",
    })),
  ))
  .use(fontFamilyHandler(fontFamilyConfig))
  .use(configHandler(fontStyleConfig, "fontStyle"))
  .use(configHandler(fontWeightConfig, "fontWeight"))
  .use(configHandler(fontVariantNumericConfig, "fontVariantNumeric"))
  .init();
