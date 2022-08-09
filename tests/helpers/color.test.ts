import { Color, colorLuminance, getDarkColor, getLightColor, hexToRGB, hslToRGB, rgbToHEX, rgbToHSL } from "helpers";

test("rgbToHex", () => {
  expect(rgbToHEX([22, 22, 22, 1])).toEqual("#161616");
});

test("hexToRGB", () => {
  expect(hexToRGB("#161616")).toEqual([22, 22, 22, 1]);
});

test("rgbToHSL", () => {
  expect(rgbToHSL([22, 22, 22, 1])).toEqual([0, 0, 8.627450980392156, 1]);
});

test("hslToRGB", () => {
  expect(hslToRGB([0, 0, 8.6, 1])).toEqual([22, 22, 22, 1]);
});

test("Color", () => {
  const color = new Color("#ff0000");
  expect(color.hex).toEqual("#f00");
  expect(color.hsl).toEqual([0, 100, 50]);
  expect(color.hsla).toEqual([0, 100, 50, 1]);
  expect(color.rgb).toEqual([255, 0, 0]);
  expect(color.rgba).toEqual([255, 0, 0, 1]);
  expect(Color.hex("#036").hwb).toEqual([210, 0, 60]);

  expect(new Color([255, 0, 0]).hex).toEqual(color.hex);
  expect(new Color([255, 0, 0, 1]).hex).toEqual(color.hex);
  expect(Color.hex("#ff0000").hex).toEqual(color.hex);
  expect(Color.rgb(255, 0, 0).hex).toEqual(color.hex);
  expect(Color.rgba(255, 0, 0, 1).hex).toEqual(color.hex);
  expect(Color.hsl(0, 100, 50).hex).toEqual(color.hex);
  expect(Color.hsla(0, 100, 50, 1).hex).toEqual(color.hex);
  expect(Color.hwb(210, 0, 60).hex).toEqual("#036");
  expect(Color.hwb(34, 89, 5).hex).toEqual("#f2ece3");
  expect(Color.hwb(210, 0, 60, 0.5).rgba).toEqual([0, 51, 102, 0.5]);
});

test("Color adjust", () => {
  expect(Color.hex("#6b717f").adjust({ red: 15 }).hex).toEqual("#7a717f");
  expect(Color.hex("#d2e1dd").adjust({ red: -10, blue: 10 }).hex).toEqual("#c8e1e7");
  expect(Color.hex("#998099").adjust({ lightness: -30, alpha: -0.4 }).rgba).toEqual([71, 57, 71, 0.6]);
});

test("Color Getters", () => {
  const color = Color.hex("#e1d7d2");
  expect(color.red).toEqual(225);
  expect(color.green).toEqual(215);
  expect(color.blue).toEqual(210);
  expect(color.hue).toEqual(20);
  expect(Color.hex("#f2ece4").hue).toEqual(34.2857142857);
  expect(Color.hex("#dadbdf").hue).toEqual(228);
  expect(color.saturation).toEqual(20);
  expect(Color.hex("#f2ece4").saturation).toEqual(35);
  expect(Color.hex("#dadbdf").saturation).toEqual(7.2463768116);
  expect(color.lightness).toEqual(85.2941176471);
  expect(Color.hex("#f2ece4").lightness).toEqual(92.1568627451);
  expect(Color.hex("#dadbdf").lightness).toEqual(86.4705882353);
  expect(color.alpha).toEqual(1);
  expect(Color.rgba(210, 225, 221, 0.4).opacity).toEqual(0.4);
  expect(Color.hex("#e1d7d2").whiteness).toEqual(82.3529411765);
  expect(Color.hex("#e1d7d2").blackness).toEqual(11.7647058824);
});

test("Color Adjust Hue", () => {
  expect(Color.hex("#6b717f").adjustHue(60).hex).toEqual("#796b7f");
  expect(Color.hex("#d2e1dd").adjustHue(-60).hex).toEqual("#d6e1d2");
  expect(Color.hex("#036").adjustHue(45).hex).toEqual("#1a0066");
});

test("Color change", () => {
  expect(Color.hex("#6b717f").change({ red: 100 }).hex).toEqual("#64717f");
  expect(Color.hex("#d2e1dd").change({ red: 100, blue: 50 }).hex).toEqual("#64e132");
  expect(Color.hex("#998099").change({ lightness: 30, alpha: 0.5 }).rgba).toEqual([85, 68, 85, 0.5]);
});

test("Color complement", () => {
  expect(Color.hex("#6b717f").complement().hex).toEqual("#7f796b");
  expect(Color.hex("#d2e1dd").complement().hex).toEqual("#e1d2d6");
  expect(Color.hex("#036").complement().hex).toEqual("#630");
});

test("Color darken", () => {
  expect(Color.hex("#f00").darken(10).hex).toEqual("#c00");
  expect(Color.hex("#036").darken(30).hex).toEqual("#000");
  expect(Color.hex("#b37c99").darken(20).hex).toEqual("#7f4a66");
  expect(Color.hex("#f2ece4").darken(40).hex).toEqual("#b08b5a");
});

test("Color desaturate", () => {
  expect(Color.hex("#d2e1dd").desaturate(30).hex).toEqual("#dadada");
  expect(Color.hex("#f2ece4").desaturate(20).hex).toEqual("#eeebe8");
  expect(Color.hex("#036").desaturate(20).hex).toEqual("#0a335c");
});

test("Color grayscale", () => {
  expect(Color.hex("#6b717f").grayscale().hex).toEqual("#757575");
  expect(Color.hex("#d2e1dd").grayscale().hex).toEqual("#dadada");
  expect(Color.hex("#036").grayscale().hex).toEqual("#333");
});

test("Color ieHexStr", () => {
  expect(Color.hex("#b37399").ieHexStr).toEqual("#FFB37399");
  expect(Color.hex("#808c99").ieHexStr).toEqual("#FF808C99");
  expect(Color.rgba(242, 236, 228, 0.6).ieHexStr).toEqual("#99F2ECE4");
});

test("Color invert", () => {
  const red = new Color("#ff0000");
  expect(red.invert().hex).toEqual("#0ff");
  expect(Color.hex("#b37399").invert().hex).toEqual("#4c8c66");
  expect(Color.hex("#550e0c").invert(20).hex).toEqual("#663b3a");
});

test("Color lighten", () => {
  expect(Color.hex("#6b717f").lighten(20).hex).toEqual("#a1a5af");
  expect(Color.hex("#036").lighten(60).hex).toEqual("#9cf");
  expect(Color.hex("#e1d7d2").lighten(30).hex).toEqual("#fff");
});

test("Color mix", () => {
  expect(Color.mix(Color.hex("#036"), Color.hex("#d2e1dd")).hex).toEqual("#698aa2");
  expect(Color.mix(Color.hex("#036"), Color.hex("#d2e1dd"), 75).hex).toEqual("#355f84");
  expect(Color.mix(Color.hex("#036"), Color.hex("#d2e1dd"), 25).hex).toEqual("#9eb6bf");
  expect(Color.mix(Color.rgba(242, 236, 228, 0.5), Color.hex("#6b717f")).rgba).toEqual([141, 144, 152, 0.75]);
});

test("Color fadeIn", () => {
  expect(Color.rgba(225, 215, 210, 0.5).fadeIn(0.4).rgba).toEqual([225, 215, 210, 0.9]);
});

test("Color fadeOut", () => {
  expect(Color.rgba(225, 215, 210, 0.5).fadeOut(0.4).rgba).toEqual([225, 215, 210, 0.1]);
});

test("Color saturate", () => {
  expect(Color.hex("#c69").saturate(20).hex).toEqual("#e05299");
  expect(Color.hex("#0e4982").saturate(30).hex).toEqual("#004990");
  expect(Color.hex("#0e4982").scale({ saturation: 30 }).hex).toEqual("#0a4986");
});

test("Color opacity", () => {
  expect(Color.rgba(0, 51, 102, 0.7).opacify(0.3).rgba).toEqual([0, 51, 102, 1]);
});

test("Color scale", () => {
  expect(new Color("#6b717f").scale({ red: 15 }).hex).toEqual("#81717f");
  expect(new Color("#d2e1dd").scale({ lightness: -10, saturation: 10 }).hex).toEqual("#b1d3ca");
  expect(new Color("#998099").scale({ alpha: -40 }).rgba).toEqual([153, 128, 153, 0.6]);
  expect(new Color("#003366").scale({ lightness: -30 }).hex).toEqual("#002447");
});

test("Color transparentize", () => {
  expect(Color.rgba(0, 51, 102, 0.3).transparentize(0.3).rgba).toEqual([0, 51, 102, 0]);
  expect(Color.rgba(107, 113, 127, 0.5).transparentize(0.2).rgba).toEqual([107, 113, 127, 0.3]);
  expect(Color.rgba(0, 51, 102, 0.3).scale({ alpha: -30 }).rgba).toEqual([0, 51, 102, 0.21]);
});

test("Color lighten set", () => {
  const red = new Color("#ff0000");
  expect(red.lightenSet(5).map(i => i.hex)).toEqual([
    "#f00",
    "#f33",
    "#f66",
    "#f99",
    "#fcc",
  ]);
});

test("Color darken set", () => {
  const red = new Color("#ff0000");
  expect(red.darkenSet(5).map(i => i.hex)).toEqual([
    "#f00",
    "#c00",
    "#900",
    "#600",
    "#300",
  ]);
});

test("Color complement set", () => {
  expect(new Color("#ff0000").complementSet(1).map(i => i.hex)).toEqual([
    "#f00",
  ]);
  expect(new Color("#44A178").complementSet(5).map(i => i.hex)).toEqual([
    "#44A178",
    "#5b8975",
    "#727272",
    "#895b6f",
    "#a1446d",
  ]);
});

test("Color invert set", () => {
  expect(new Color("#ff0000").invertSet(1).map(i => i.hex)).toEqual([
    "#f00",
  ]);
  expect(new Color("#44A178").invertSet(5).map(i => i.hex)).toEqual([
    "#44A178",
    "#61907b",
    "#7f7f7f",
    "#9d6e83",
    "#bb5e87",
  ]);
});

test("Color desaturate set", () => {
  const red = new Color("#ff0000");
  expect(red.desaturateSet(5).map(i => i.hex)).toEqual([
    "#f00",
    "#e61919",
    "#c33",
    "#b34d4d",
    "#966",
  ]);
});

test("colorLuminance", () => {
  expect(colorLuminance(Color.hex("#1c1c1e"))).toEqual(0.0245739516);
});

test("getLightColor", () => {
  expect(getLightColor(Color.hex("#485fc7")).hex).toEqual("#eff1fa");
});

test("getDarkColor", () => {
  expect(getDarkColor(Color.hex("#485fc7")).hex).toEqual("#384fb8");
});
