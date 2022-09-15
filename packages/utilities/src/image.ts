import { imageRenderingConfig } from "@windijs/config";
import { buildImageRendering, configHandler, createUtility } from "@windijs/core";

export default createUtility("image").case("render", configHandler(imageRenderingConfig, buildImageRendering)).init();
