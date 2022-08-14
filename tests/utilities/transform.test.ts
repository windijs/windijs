import { buildTransform, configHandler, createUtility, cssHandler } from "core";
import { deg, prop, rem, transforms } from "helpers";
import { perspectiveConfig, perspectiveOriginConfig, rotateConfig, scaleConfig, skewConfig, transformOriginConfig, transformStyleConfig, translateConfig } from "config";

const rotate = createUtility("rotate")
  .use(configHandler(rotateConfig, prop`--w-rotate`))
  .case("x", configHandler(rotateConfig, prop`--w-rotate-x`))
  .case("y", configHandler(rotateConfig, prop`--w-rotate-y`))
  .case("z", configHandler(rotateConfig, prop`--w-rotate-z`))
  .init(transforms.rotate);

const scale = createUtility("scale")
  .use(configHandler(scaleConfig, [prop`--w-scale-x`, prop`--w-scale-y`, prop`--w-scale-z`]))
  .case("x", configHandler(scaleConfig, prop`--w-scale-x`))
  .case("y", configHandler(scaleConfig, prop`--w-scale-y`))
  .case("z", configHandler(scaleConfig, prop`--w-scale-z`))
  .init(transforms.scale);

const skew = createUtility("skew")
  .use(configHandler(skewConfig, [prop`--w-skew-x`, prop`--w-skew-y`]))
  .case("x", configHandler(skewConfig, prop`--w-skew-x`))
  .case("y", configHandler(skewConfig, prop`--w-skew-y`))
  .init(transforms.skew);

const translate = createUtility("translate")
  .use(configHandler(translateConfig, [prop`--w-translate-x`, prop`--w-translate-y`, prop`--w-translate-z`]))
  .case("x", configHandler(translateConfig, prop`--w-translate-x`))
  .case("y", configHandler(translateConfig, prop`--w-translate-y`))
  .case("z", configHandler(translateConfig, prop`--w-translate-z`))
  .init(transforms.translate);

test("Rotate", () => {
  expect(rotate[90].css).toMatchSnapshot();
  expect(rotate[-45].css).toMatchSnapshot();
  expect(rotate.x[30].css).toMatchSnapshot();
  expect(rotate.y[45].css).toMatchSnapshot();
  expect(rotate.z[60].css).toMatchSnapshot();
  expect(rotate(deg[72.5])).toEqual("rotate(72.5deg)");
});

test("Scale", () => {
  expect(scale[90].css).toMatchSnapshot();
  expect(scale.x[30].css).toMatchSnapshot();
  expect(scale.y[45].css).toMatchSnapshot();
  expect(scale.z[60].css).toMatchSnapshot();
  expect(scale(0.72)).toEqual("scale(0.72)");
});

test("Skew", () => {
  expect(skew[90].css).toMatchSnapshot();
  expect(skew[-45].css).toMatchSnapshot();
  expect(skew.x[30].css).toMatchSnapshot();
  expect(skew.y[45].css).toMatchSnapshot();
  expect(skew(deg[72.5])).toEqual("skew(72.5deg)");
});

test("Translate", () => {
  expect(translate[6].css).toMatchSnapshot();
  expect(translate.x[12].css).toMatchSnapshot();
  expect(translate.y["-1/3"].css).toMatchSnapshot();
  expect(translate.z[-28].css).toMatchSnapshot();
  expect(translate(rem[1.5], rem[3])).toEqual("translate(1.5rem, 3rem)");
});

test("Transform", () => {
  const transform = createUtility("transform")
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

  expect(transform(rotate[60], skew.y[-30], translate.x[8]).css).toMatchSnapshot();
  expect([transform.css, rotate[60].css, skew.y[-30].css, translate.x[8].css]).toMatchSnapshot();
});

test("Transform Style", () => {
  const preserve = createUtility("preserve").use(configHandler(transformStyleConfig, [prop`-webkit-transform-style`, "transformStyle"])).init();
  expect(preserve.box.css).toMatchSnapshot();
  expect(preserve.flat.css).toMatchSnapshot();
});

test("Transform Origin", () => {
  const origin = createUtility("origin").use(configHandler(transformOriginConfig, [prop`-webkit-transform-origin`, prop`-ms-transform-origin`, "transformOrigin"])).init();

  expect(origin.center.css).toMatchSnapshot();
  expect(origin.top.left.css).toMatchSnapshot();
  expect(origin.left.bottom.css).toMatchSnapshot();
});

test("Perspective", () => {
  const perspect = createUtility("perspect")
    .use(configHandler(perspectiveConfig, [prop`-webkit-perspective`, "perspective"]))
    .case("origin", configHandler(perspectiveOriginConfig, [prop`-webkit-perspective-origin`, "perspectiveOrigin"]))
    .init();

  expect(perspect.sm.css).toMatchSnapshot();
  expect(perspect[12].css).toMatchSnapshot();
  expect(perspect.origin.center.css).toMatchSnapshot();
  expect(perspect.origin.left.bottom.css).toMatchSnapshot();
});
