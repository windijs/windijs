import { buildTransform, createUtility, cssHandler } from "@windijs/core";

export default createUtility("transform")
  .use(
    cssHandler({
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
      "-webkit-transform":
        "translateX(var(--w-translate-x)) translateY(var(--w-translate-y)) translateZ(var(--w-translate-z)) rotate(var(--w-rotate)) rotateX(var(--w-rotate-x)) rotateY(var(--w-rotate-y)) rotateZ(var(--w-rotate-z)) skewX(var(--w-skew-x)) skewY(var(--w-skew-y)) scaleX(var(--w-scale-x)) scaleY(var(--w-scale-y)) scaleZ(var(--w-scale-z))",
      "-ms-transform":
        "translateX(var(--w-translate-x)) translateY(var(--w-translate-y)) translateZ(var(--w-translate-z)) rotate(var(--w-rotate)) rotateX(var(--w-rotate-x)) rotateY(var(--w-rotate-y)) rotateZ(var(--w-rotate-z)) skewX(var(--w-skew-x)) skewY(var(--w-skew-y)) scaleX(var(--w-scale-x)) scaleY(var(--w-scale-y)) scaleZ(var(--w-scale-z))",
      transform:
        "translateX(var(--w-translate-x)) translateY(var(--w-translate-y)) translateZ(var(--w-translate-z)) rotate(var(--w-rotate)) rotateX(var(--w-rotate-x)) rotateY(var(--w-rotate-y)) rotateZ(var(--w-rotate-z)) skewX(var(--w-skew-x)) skewY(var(--w-skew-y)) scaleX(var(--w-scale-x)) scaleY(var(--w-scale-y)) scaleZ(var(--w-scale-z))",
    })
  )
  .init(buildTransform);
