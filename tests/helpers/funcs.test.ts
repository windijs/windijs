import { $in, $var, abs, add, attr, blur, brightness, calc, ch, circle, clamp, color, conicGradient, contrast, counter, counters, cubicBezier, deg, div, dropShadow, ellipse, em, env, ex, fitContent, fr, grayscale, hsl, hsla, hueRotate, hwb, inherit, inset, invert, linearGradient, matrix, matrix3d, max, min, minmax, mm, mul, none, opacity, path, percent, perspective, polygon, px, quote, rad, radialGradient, rem, repeat, repeatingConicGradient, repeatingLinearGradient, repeatingRadialGradient, rgb, rgba, rotate, rotate3d, rotateX, rotateY, rotateZ, saturate, scale, scale3d, scaleX, scaleY, scaleZ, sepia, sign, skew, skewX, skewY, steps, sub, translate, translate3d, translateX, translateY, translateZ, turn, url, vw } from "index";

test("sub", () => {
  expect(sub(rem[3], rem[1])).toEqual("2rem");
  expect(sub(px[3], px[4])).toEqual("-1px");
  expect(sub(percent[55], percent[32])).toEqual("23%");
  expect(sub(rem[1.5], rem[3])).toEqual("-1.5rem");
  expect(sub(rem[1], px[2])).toEqual("1rem - 2px");
});

test("add", () => {
  expect(add(rem[3], rem[1])).toEqual("4rem");
  expect(add(px[3], px[4])).toEqual("7px");
  expect(add(percent[55], percent[32])).toEqual("87%");
  expect(add(rem[-1.5], rem[3])).toEqual("1.5rem");
  expect(add(rem[1], px[2])).toEqual("1rem + 2px");
});

test("mul", () => {
  expect(mul(rem[1], 3)).toEqual("3rem");
  expect(mul(3, rem[1.5])).toEqual("4.5rem");
  expect(mul(3, 4)).toEqual("12");
  expect(mul(rem[1], px[2])).toEqual("1rem * 2px");
});

test("div", () => {
  expect(div(rem[3], 2)).toEqual("1.5rem");
  expect(div(3, 4)).toEqual("0.75");
  expect(div(3, rem[1.5])).toEqual("3 / 1.5rem");
  expect(div(rem[1], px[2])).toEqual("1rem / 2px");
});

test("quote", () => {
  expect(quote("Hello World")).toEqual("\"Hello World\"");
});

test("attr", () => {
  /* Simple usage */
  expect(attr("data-count")).toEqual("attr(data-count)");
  expect(attr("title")).toEqual("attr(title)");

  /* With type */
  expect(attr("src", "url")).toEqual("attr(src url)");
  expect(attr("data-count", "number")).toEqual("attr(data-count number)");
  expect(attr("data-width", "px")).toEqual("attr(data-width px)");

  /* With fallback */
  expect(attr("data-count", "number", 0)).toEqual("attr(data-count number, 0)");
  expect(attr("src", "url", quote(""))).toEqual("attr(src url, \"\")");
  expect(attr("data-width", "px", inherit)).toEqual("attr(data-width px, inherit)");
  expect(attr("data-something", undefined, quote("default"))).toEqual("attr(data-something, \"default\")");
});

test("url", () => {
  expect(url("fantasticfont.woff")).toEqual("url(fantasticfont.woff)");
  expect(url(quote("fantasticfont.woff"))).toEqual("url(\"fantasticfont.woff\")");
  expect(url("../images/bullet.jpg")).toEqual("url(../images/bullet.jpg)");

  /* Base 64 */
  expect(url("iRxVB0xyz", true)).toEqual("url(data:image/png;base64,iRxVB0xyz)");
});

test("var", () => {
  expect($var("color-a")).toEqual("var(--color-a)");
  expect($var("header-color", "blue")).toEqual("var(--header-color, blue)");
  expect($var("main-bg-color", $var("backup-bg-color", "white"))).toEqual("var(--main-bg-color, var(--backup-bg-color, white))");
});

test("path", () => {
  expect(path("M  20  240 L  20  80 L 160  80 L 160  20 L 280 100 L 160 180 L 160 120 L  60 120 L  60 240 Z")).toEqual("path(\"M  20  240 L  20  80 L 160  80 L 160  20 L 280 100 L 160 180 L 160 120 L  60 120 L  60 240 Z\")");
  expect(path("M 10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80", "evenodd")).toEqual("path(evenodd, \"M 10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80\")");
});

test("hwb", () => {
  expect(hwb(194, percent[0], percent[0])).toEqual("hwb(194 0% 0%)");
  expect(hwb(194, percent[0], percent[0], 0.5)).toEqual("hwb(194 0% 0% / 0.5)");
  expect(hwb(194, percent[0], percent[0], percent[50])).toEqual("hwb(194 0% 0% / 50%)");
});

test("matrix", () => {
  expect(matrix(1.2, 0.2, -1, 0.9, 0, 20)).toEqual("matrix(1.2, 0.2, -1, 0.9, 0, 20)");
  expect(matrix(0.1, 1, -0.3, 1, 0, 0)).toEqual("matrix(0.1, 1, -0.3, 1, 0, 0)");
});

test("matrix3d", () => {
  expect(matrix3d(
    -0.6, 1.34788, 0, 0,
    -2.34788, -0.6, 0, 0,
    0, 0, 1, 0,
    0, 0, 10, 1)).toEqual("matrix3d(-0.6, 1.34788, 0, 0, -2.34788, -0.6, 0, 0, 0, 0, 1, 0, 0, 0, 10, 1)");
});

test("perspective", () => {
  expect(perspective(0)).toEqual("perspective(0)");
  expect(perspective(rem[23])).toEqual("perspective(23rem)");
  expect(perspective(none)).toEqual("perspective(none)");
  expect(perspective(px[800])).toEqual("perspective(800px)");
});

test("rotate", () => {
  expect(rotate(0)).toEqual("rotate(0)");
  expect(rotate(deg[90])).toEqual("rotate(90deg)");
  expect(rotate(turn[-0.25])).toEqual("rotate(-0.25turn)");
  expect(rotate(rad[3.142])).toEqual("rotate(3.142rad)");
});

test("rotate3d", () => {
  expect(rotate3d(0)).toEqual("rotate3d(0)");
  expect(rotate3d(1, 1, 1, deg[45])).toEqual("rotate3d(1, 1, 1, 45deg)");
});

test("rotateX", () => {
  expect(rotateX(0)).toEqual("rotateX(0)");
  expect(rotateX(deg[90])).toEqual("rotateX(90deg)");
  expect(rotateX(turn[-0.25])).toEqual("rotateX(-0.25turn)");
  expect(rotateX(rad[3.142])).toEqual("rotateX(3.142rad)");
});

test("rotateY", () => {
  expect(rotateY(0)).toEqual("rotateY(0)");
  expect(rotateY(deg[90])).toEqual("rotateY(90deg)");
  expect(rotateY(turn[-0.25])).toEqual("rotateY(-0.25turn)");
  expect(rotateY(rad[3.142])).toEqual("rotateY(3.142rad)");
});

test("rotateZ", () => {
  expect(rotateZ(0)).toEqual("rotateZ(0)");
  expect(rotateZ(deg[90])).toEqual("rotateZ(90deg)");
  expect(rotateZ(turn[-0.25])).toEqual("rotateZ(-0.25turn)");
  expect(rotateZ(rad[3.142])).toEqual("rotateZ(3.142rad)");
});

test("scale", () => {
  expect(scale(1)).toEqual("scale(1)");
  expect(scale(0.7)).toEqual("scale(0.7)");
  expect(scale(percent[45])).toEqual("scale(45%)");
  expect(scale(1.3, 0.4)).toEqual("scale(1.3, 0.4)");
  expect(scale(-0.5, 1)).toEqual("scale(-0.5, 1)");
  expect(scale(percent[45], percent[80])).toEqual("scale(45%, 80%)");
});

test("scale3d", () => {
  expect(scale3d(1, 1, 1)).toEqual("scale3d(1, 1, 1)");
  expect(scale3d(-1.4, 0.4, 0.7)).toEqual("scale3d(-1.4, 0.4, 0.7)");
});

test("scaleX", () => {
  expect(scaleX(1)).toEqual("scaleX(1)");
  expect(scaleX(-0.5)).toEqual("scaleX(-0.5)");
});

test("scaleY", () => {
  expect(scaleY(1)).toEqual("scaleY(1)");
  expect(scaleY(-0.5)).toEqual("scaleY(-0.5)");
});

test("scaleZ", () => {
  expect(scaleZ(1)).toEqual("scaleZ(1)");
  expect(scaleZ(-0.5)).toEqual("scaleZ(-0.5)");
});

test("skew", () => {
  expect(skew(0)).toEqual("skew(0)");
  expect(skew(deg[15], deg[15])).toEqual("skew(15deg, 15deg)");
  expect(skew(turn[-0.06], deg[18])).toEqual("skew(-0.06turn, 18deg)");
  expect(skew(rad[0.312])).toEqual("skew(0.312rad)");
});

test("skewX", () => {
  expect(skewX(0)).toEqual("skewX(0)");
  expect(skewX(deg[35])).toEqual("skewX(35deg)");
  expect(skewX(turn[-0.06])).toEqual("skewX(-0.06turn)");
  expect(skewX(rad[0.352])).toEqual("skewX(0.352rad)");
});

test("skewY", () => {
  expect(skewY(0)).toEqual("skewY(0)");
  expect(skewY(deg[35])).toEqual("skewY(35deg)");
  expect(skewY(turn[-0.06])).toEqual("skewY(-0.06turn)");
  expect(skewY(rad[0.352])).toEqual("skewY(0.352rad)");
});

test("translate", () => {
  expect(translate(0)).toEqual("translate(0)");
  expect(translate(px[42], px[18])).toEqual("translate(42px, 18px)");
  expect(translate(rem[-2.1], ex[-2])).toEqual("translate(-2.1rem, -2ex)");
  expect(translate(ch[3], mm[3])).toEqual("translate(3ch, 3mm)");
});

test("translate3d", () => {
  expect(translate3d(0)).toEqual("translate3d(0)");
  expect(translate3d(px[42], px[-62], px[-135])).toEqual("translate3d(42px, -62px, -135px)");
  expect(translate3d(rem[-2.7], 0, rem[1])).toEqual("translate3d(-2.7rem, 0, 1rem)");
  expect(translate3d(ch[5], $in[0.4], em[5])).toEqual("translate3d(5ch, 0.4in, 5em)");
});

test("translateX", () => {
  expect(translateX(px[200])).toEqual("translateX(200px)");
  expect(translateX(percent[50])).toEqual("translateX(50%)");
});

test("translateY", () => {
  expect(translateY(0)).toEqual("translateY(0)");
  expect(translateY(px[42])).toEqual("translateY(42px)");
  expect(translateY(rem[-2.1])).toEqual("translateY(-2.1rem)");
});

test("translateZ", () => {
  expect(translateZ(0)).toEqual("translateZ(0)");
  expect(translateZ(px[42])).toEqual("translateZ(42px)");
  expect(translateZ(rem[-2.1])).toEqual("translateZ(-2.1rem)");
});

test("calc", () => {
  expect(calc(percent[100] + " - " + px[30])).toEqual("calc(100% - 30px)");
  expect(calc(px[10] + " + " + px[100])).toEqual("calc(10px + 100px)");
  expect(calc(em[2] + " * " + 5)).toEqual("calc(2em * 5)");
  expect(calc($var("variable-width") + " + " + px[20])).toEqual("calc(var(--variable-width) + 20px)");
});

test("clamp", () => {
  expect(clamp(rem[1], vw[2.5], rem[2])).toEqual("clamp(1rem, 2.5vw, 2rem)");
});

test("max", () => {
  expect(max(vw[20], px[400])).toEqual("max(20vw, 400px)");
  expect(max(vw[4], em[2], rem[2])).toEqual("max(4vw, 2em, 2rem)");
});

test("min", () => {
  expect(min(vw[20], px[400])).toEqual("min(20vw, 400px)");
  expect(min(vw[4], em[2], rem[2])).toEqual("min(4vw, 2em, 2rem)");
  expect(min(percent[40], px[400])).toEqual("min(40%, 400px)");
});

test("abs", () => {
  expect(abs("20% - 100px")).toEqual("abs(20% - 100px)");
  expect(abs($var("font-size"))).toEqual("abs(var(--font-size))");
});

test("sign", () => {
  expect(sign("--value")).toEqual("sign(--value)");
  expect(sign(percent[10])).toEqual("sign(10%)");
  expect(sign($var("value"))).toEqual("sign(var(--value))");
});

test("blur", () => {
  expect(blur(0)).toEqual("blur(0)");
  expect(blur(px[8])).toEqual("blur(8px)");
  expect(blur(rem[1.17])).toEqual("blur(1.17rem)");
});

test("brightness", () => {
  expect(brightness(1)).toEqual("brightness(1)");
  expect(brightness(1.75)).toEqual("brightness(1.75)");
  expect(brightness(percent[50])).toEqual("brightness(50%)");
  expect(brightness(0)).toEqual("brightness(0)");
});

test("contrast", () => {
  expect(contrast(1)).toEqual("contrast(1)");
  expect(contrast(1.75)).toEqual("contrast(1.75)");
  expect(contrast(percent[50])).toEqual("contrast(50%)");
  expect(contrast(0)).toEqual("contrast(0)");
});

test("dropShadow", () => {
  expect(dropShadow(px[16], px[16], px[10], color.black)).toEqual("drop-shadow(16px 16px 10px black)");
  expect(dropShadow(rem[0.5], rem[0.5], rem[1], "#e23")).toEqual("drop-shadow(0.5rem 0.5rem 1rem #e23)");
});

test("grayscale", () => {
  expect(grayscale(0)).toEqual("grayscale(0)");
  expect(grayscale(0.2)).toEqual("grayscale(0.2)");
  expect(grayscale(percent[60])).toEqual("grayscale(60%)");
  expect(grayscale(1)).toEqual("grayscale(1)");
});

test("hueRotate", () => {
  expect(hueRotate(0)).toEqual("hue-rotate(0)");
  expect(hueRotate(deg[90])).toEqual("hue-rotate(90deg)");
  expect(hueRotate(turn[-0.25])).toEqual("hue-rotate(-0.25turn)");
  expect(hueRotate(rad[3.142])).toEqual("hue-rotate(3.142rad)");
});

test("invert", () => {
  expect(invert(0)).toEqual("invert(0)");
  expect(invert(0.3)).toEqual("invert(0.3)");
  expect(invert(percent[70])).toEqual("invert(70%)");
  expect(invert(1)).toEqual("invert(1)");
});

test("opacity", () => {
  expect(opacity(1)).toEqual("opacity(1)");
  expect(opacity(percent[70])).toEqual("opacity(70%)");
  expect(opacity(0.2)).toEqual("opacity(0.2)");
  expect(opacity(0)).toEqual("opacity(0)");
});

test("saturate", () => {
  expect(saturate(1)).toEqual("saturate(1)");
  expect(saturate(4)).toEqual("saturate(4)");
  expect(saturate(percent[50])).toEqual("saturate(50%)");
  expect(saturate(0)).toEqual("saturate(0)");
});

test("sepia", () => {
  expect(sepia(1)).toEqual("sepia(1)");
  expect(sepia(4)).toEqual("sepia(4)");
  expect(sepia(percent[50])).toEqual("sepia(50%)");
  expect(sepia(0)).toEqual("sepia(0)");
});

test("hsl", () => {
  expect(hsl(315, percent[100], percent[50])).toEqual("hsl(315, 100%, 50%)");
});

test("hsla", () => {
  expect(hsla(315, percent[100], percent[50], 0.5)).toEqual("hsla(315, 100%, 50%, 0.5)");
  expect(hsla(315, percent[100], percent[50], percent[50])).toEqual("hsla(315, 100%, 50%, 50%)");
});

test("rgb", () => {
  expect(rgb(255, 255, 255)).toEqual("rgb(255, 255, 255)");
});

test("rgba", () => {
  expect(rgba(255, 255, 255, 0.5)).toEqual("rgba(255, 255, 255, 0.5)");
});

test("linearGradient", () => {
  expect(linearGradient(deg[45], color.blue, color.red)).toEqual("linear-gradient(45deg, blue, red)");
  expect(linearGradient("to left top", color.blue, color.red)).toEqual("linear-gradient(to left top, blue, red)");
  expect(linearGradient(deg[0], color.blue, [color.green, percent[40]].join(" "), color.red)).toEqual("linear-gradient(0deg, blue, green 40%, red)");
  expect(linearGradient(deg[0], color.blue, [color.green, percent[40]], color.red)).toEqual("linear-gradient(0deg, blue, green 40%, red)");
  expect(linearGradient(turn[0.25], color.red, percent[10], color.blue)).toEqual("linear-gradient(0.25turn, red, 10%, blue)");
  expect(linearGradient(deg[45], [color.red, 0, percent[50]], [color.blue, percent[50], percent[100]])).toEqual("linear-gradient(45deg, red 0 50%, blue 50% 100%)");
});

test("radialGradient", () => {
  expect(radialGradient("#e66465", "#9198e5")).toEqual("radial-gradient(#e66465, #9198e5)");
  expect(radialGradient("closest-side", "#3f87a6", "#ebf8e1", "#f69d3c")).toEqual("radial-gradient(closest-side, #3f87a6, #ebf8e1, #f69d3c)");
  expect(radialGradient("circle at 100%", "#333", ["#333", percent[50]], ["#eee", percent[75]], ["#333", percent[75]])).toEqual("radial-gradient(circle at 100%, #333, #333 50%, #eee 75%, #333 75%)");
  expect(radialGradient("ellipse at top", "#e66465", "transparent")).toEqual("radial-gradient(ellipse at top, #e66465, transparent)");
});

test("conicGradient", () => {
  expect(conicGradient(color.red, color.orange, color.yellow, color.green, color.blue)).toEqual("conic-gradient(red, orange, yellow, green, blue)");
  expect(conicGradient("from 0.25turn at 50% 30%", "#f69d3c", deg[10], "#3f87a6", deg[350], "#ebf8e1")).toEqual("conic-gradient(from 0.25turn at 50% 30%, #f69d3c, 10deg, #3f87a6, 350deg, #ebf8e1)");
  expect(conicGradient([color.red, deg[6]], [color.orange, deg[6], deg[18]], [color.yellow, deg[18], deg[45]], [color.green, deg[45], deg[110]], [color.blue, deg[110], deg[200]], [color.purple, deg[200]])).toEqual("conic-gradient(red 6deg, orange 6deg 18deg, yellow 18deg 45deg, green 45deg 110deg, blue 110deg 200deg, purple 200deg)");
});

test("repeatingLinearGradient", () => {
  expect(repeatingLinearGradient(deg[45], color.blue, color.red)).toEqual("repeating-linear-gradient(45deg, blue, red)");
  expect(repeatingLinearGradient("to left top", color.blue, color.red)).toEqual("repeating-linear-gradient(to left top, blue, red)");
  expect(repeatingLinearGradient(deg[0], color.blue, [color.green, percent[40]].join(" "), color.red)).toEqual("repeating-linear-gradient(0deg, blue, green 40%, red)");
  expect(repeatingLinearGradient(deg[0], color.blue, [color.green, percent[40]], color.red)).toEqual("repeating-linear-gradient(0deg, blue, green 40%, red)");
  expect(repeatingLinearGradient(turn[0.25], color.red, percent[10], color.blue)).toEqual("repeating-linear-gradient(0.25turn, red, 10%, blue)");
  expect(repeatingLinearGradient(deg[45], [color.red, 0, percent[50]], [color.blue, percent[50], percent[100]])).toEqual("repeating-linear-gradient(45deg, red 0 50%, blue 50% 100%)");
});

test("repeatingRadialGradient", () => {
  expect(repeatingRadialGradient("#e66465", "#9198e5")).toEqual("repeating-radial-gradient(#e66465, #9198e5)");
  expect(repeatingRadialGradient("closest-side", "#3f87a6", "#ebf8e1", "#f69d3c")).toEqual("repeating-radial-gradient(closest-side, #3f87a6, #ebf8e1, #f69d3c)");
  expect(repeatingRadialGradient("circle at 100%", "#333", ["#333", percent[50]], ["#eee", percent[75]], ["#333", percent[75]])).toEqual("repeating-radial-gradient(circle at 100%, #333, #333 50%, #eee 75%, #333 75%)");
  expect(repeatingRadialGradient("ellipse at top", "#e66465", "transparent")).toEqual("repeating-radial-gradient(ellipse at top, #e66465, transparent)");
});

test("repeatingConicGradient", () => {
  expect(repeatingConicGradient(color.red, color.orange, color.yellow, color.green, color.blue)).toEqual("repeating-conic-gradient(red, orange, yellow, green, blue)");
  expect(repeatingConicGradient("from 0.25turn at 50% 30%", "#f69d3c", deg[10], "#3f87a6", deg[350], "#ebf8e1")).toEqual("repeating-conic-gradient(from 0.25turn at 50% 30%, #f69d3c, 10deg, #3f87a6, 350deg, #ebf8e1)");
  expect(repeatingConicGradient([color.red, deg[6]], [color.orange, deg[6], deg[18]], [color.yellow, deg[18], deg[45]], [color.green, deg[45], deg[110]], [color.blue, deg[110], deg[200]], [color.purple, deg[200]])).toEqual("repeating-conic-gradient(red 6deg, orange 6deg 18deg, yellow 18deg 45deg, green 45deg 110deg, blue 110deg 200deg, purple 200deg)");
});

test("fitContent", () => {
  expect(fitContent(ch[8])).toEqual("fit-content(8ch)");
  expect(fitContent(percent[40])).toEqual("fit-content(40%)");
});

test("cubicBezier", () => {
  expect(cubicBezier(0.1, 0.7, 1, 0.1)).toEqual("cubic-bezier(0.1, 0.7, 1, 0.1)");
});

test("steps", () => {
  expect(steps(3)).toEqual("steps(3)");
});

test("counter", () => {
  expect(counter("countername")).toEqual("counter(countername)");
  expect(counter("countername", "upper-roman")).toEqual("counter(countername, upper-roman)");
});

test("counters", () => {
  expect(counters("countername", "-")).toEqual("counters(countername, \"-\")");
  expect(counters("countername", ".", "upper-roman")).toEqual("counters(countername, \".\", upper-roman)");
});

test("circle", () => {
  expect(circle(px[50])).toEqual("circle(50px)");
  expect(circle(rem[6], ["right", "center"])).toEqual("circle(6rem at right center)");
  expect(circle(percent[10], [rem[2], percent[90]])).toEqual("circle(10% at 2rem 90%)");
  expect(circle("closest-side", [rem[5], rem[6]])).toEqual("circle(closest-side at 5rem 6rem)");
  expect(circle("farthest-side")).toEqual("circle(farthest-side)");
});

test("ellipse", () => {
  expect(ellipse(px[20], px[50])).toEqual("ellipse(20px 50px)");
  expect(ellipse(rem[4], percent[50], ["right", "center"])).toEqual("ellipse(4rem 50% at right center)");
  expect(ellipse("closest-side", "closest-side", [rem[5], rem[6]])).toEqual("ellipse(closest-side closest-side at 5rem 6rem)");
  expect(ellipse("closest-side", "farthest-side")).toEqual("ellipse(closest-side farthest-side)");
  expect(ellipse(percent[40], percent[50], "left")).toEqual("ellipse(40% 50% at left)");
  expect(ellipse("closest-side", "farthest-side", percent[30])).toEqual("ellipse(closest-side farthest-side at 30%)");
});

test("inset", () => {
  expect(inset(px[30]).toString()).toEqual("inset(30px)");
  expect(inset(rem[1], rem[2], rem[3], rem[4]).toString()).toEqual("inset(1rem 2rem 3rem 4rem)");
  expect(inset(percent[20], percent[30]).round(px[20])).toEqual("inset(20% 30% round 20px)");
  expect(inset(rem[4], percent[20]).round(rem[1], rem[2], rem[3], rem[4])).toEqual("inset(4rem 20% round 1rem 2rem 3rem 4rem)");
});

test("polygon", () => {
  expect(polygon("evenodd", [percent[50], percent[2.4]], [percent[34.5], percent[33.8]], [percent[0], percent[38.8]], [percent[25], percent[63.1]], [percent[19.1], percent[97.6]])).toEqual("polygon(evenodd, 50% 2.4%, 34.5% 33.8%, 0% 38.8%, 25% 63.1%, 19.1% 97.6%)");
  expect(polygon([percent[50], percent[2.4]], [percent[34.5], percent[33.8]], [percent[0], percent[38.8]], [percent[25], percent[63.1]], [percent[19.1], percent[97.6]])).toEqual("polygon(50% 2.4%, 34.5% 33.8%, 0% 38.8%, 25% 63.1%, 19.1% 97.6%)");
});

test("env", () => {
  expect(env("safe-area-inset-top")).toEqual("env(safe-area-inset-top)");
  expect(env("safe-area-inset-right", em[1])).toEqual("env(safe-area-inset-right, 1em)");
});

test("minmax", () => {
  expect(minmax(px[20], "auto")).toEqual("minmax(20px, auto)");
  expect(minmax(percent[50], "min-content")).toEqual("minmax(50%, min-content)");
  expect(minmax("max-content", "auto")).toEqual("minmax(max-content, auto)");
  expect(minmax(px[200], fr[1])).toEqual("minmax(200px, 1fr)");
});

test("repeat", () => {
  expect(repeat("auto-fill", px[250])).toEqual("repeat(auto-fill, 250px)");
  expect(repeat(4, "[col-start] 250px [col-end]")).toEqual("repeat(4, [col-start] 250px [col-end])");
});
