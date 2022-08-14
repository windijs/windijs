import { buildTransform, configHandler, createUtility, cssHandler } from "core";
import { perspectiveConfig, perspectiveOriginConfig, rotateConfig, scaleConfig, skewConfig, transformOriginConfig, transformStyleConfig, translateConfig } from "config";
import { prop, transforms } from "helpers";

export const transform = createUtility("transform")
  .use(cssHandler({
    "--w-translate-x": "0",
    "--w-translate-y": "0",
    "--w-translate-z": "0",
    "--w-rotate": "0",
    "--w-rotate-x": "0",
    "--w-rotate-y": "0",
    "--w-rotate-z": "0",
    "--w-skew-x": "0",
    "--w-skew-y": "0",
    "--w-scale-x": "1",
    "--w-scale-y": "1",
    "--w-scale-z": "1",
    "-webkit-transform": "translateX(var(--w-translate-x)) translateY(var(--w-translate-y)) translateZ(var(--w-translate-z)) rotate(var(--w-rotate)) rotateX(var(--w-rotate-x)) rotateY(var(--w-rotate-y)) rotateZ(var(--w-rotate-z)) skewX(var(--w-skew-x)) skewY(var(--w-skew-y)) scaleX(var(--w-scale-x)) scaleY(var(--w-scale-y)) scaleZ(var(--w-scale-z))",
    "-ms-transform": "translateX(var(--w-translate-x)) translateY(var(--w-translate-y)) translateZ(var(--w-translate-z)) rotate(var(--w-rotate)) rotateX(var(--w-rotate-x)) rotateY(var(--w-rotate-y)) rotateZ(var(--w-rotate-z)) skewX(var(--w-skew-x)) skewY(var(--w-skew-y)) scaleX(var(--w-scale-x)) scaleY(var(--w-scale-y)) scaleZ(var(--w-scale-z))",
    transform: "translateX(var(--w-translate-x)) translateY(var(--w-translate-y)) translateZ(var(--w-translate-z)) rotate(var(--w-rotate)) rotateX(var(--w-rotate-x)) rotateY(var(--w-rotate-y)) rotateZ(var(--w-rotate-z)) skewX(var(--w-skew-x)) skewY(var(--w-skew-y)) scaleX(var(--w-scale-x)) scaleY(var(--w-scale-y)) scaleZ(var(--w-scale-z))",
  }))
  .init(buildTransform);

export const rotate = createUtility("rotate")
  .use(configHandler(rotateConfig, prop`--w-rotate`))
  .case("x", configHandler(rotateConfig, prop`--w-rotate-x`))
  .case("y", configHandler(rotateConfig, prop`--w-rotate-y`))
  .case("z", configHandler(rotateConfig, prop`--w-rotate-z`))
  .init(transforms.rotate);

export const scale = createUtility("scale")
  .use(configHandler(scaleConfig, [prop`--w-scale-x`, prop`--w-scale-y`, prop`--w-scale-z`]))
  .case("x", configHandler(scaleConfig, prop`--w-scale-x`))
  .case("y", configHandler(scaleConfig, prop`--w-scale-y`))
  .case("z", configHandler(scaleConfig, prop`--w-scale-z`))
  .init(transforms.scale);

export const skew = createUtility("skew")
  .use(configHandler(skewConfig, [prop`--w-skew-x`, prop`--w-skew-y`]))
  .case("x", configHandler(skewConfig, prop`--w-skew-x`))
  .case("y", configHandler(skewConfig, prop`--w-skew-y`))
  .init(transforms.skew);

export const translate = createUtility("translate")
  .use(configHandler(translateConfig, [prop`--w-translate-x`, prop`--w-translate-y`, prop`--w-translate-z`]))
  .case("x", configHandler(translateConfig, prop`--w-translate-x`))
  .case("y", configHandler(translateConfig, prop`--w-translate-y`))
  .case("z", configHandler(translateConfig, prop`--w-translate-z`))
  .init(transforms.translate);

export const preserve = createUtility("preserve")
  .use(configHandler(transformStyleConfig, [prop`-webkit-transform-style`, "transformStyle"]))
  .init();

export const origin = createUtility("origin")
  .use(configHandler(transformOriginConfig, [prop`-webkit-transform-origin`, prop`-ms-transform-origin`, "transformOrigin"]))
  .init();

export const perspect = createUtility("perspect")
  .use(configHandler(perspectiveConfig, [prop`-webkit-perspective`, "perspective"]))
  .case("origin", configHandler(perspectiveOriginConfig, [prop`-webkit-perspective-origin`, "perspectiveOrigin"]))
  .init();
