import type { CamelCase } from "./types";
import { prec } from "./math";
import { range } from "@windijs/shared";

export type RGB = [number, number, number];
export type RGBA = [number, number, number, number];
export type HSL = [number, number, number];
export type HWB = [number, number, number];
export type HSLA = [number, number, number, number];

type AdjustColorOptions = Partial<Record<"red" | "green" | "blue" | "hue" | "saturation" | "lightness" | "alpha", number>>;
type ScaleColorOptions = Omit<AdjustColorOptions, "hue">;

type AdjustColorFuncs = CamelCase<`adjust_${keyof AdjustColorOptions}`>;
type ScaleColorFuncs = CamelCase<`adjust_${keyof ScaleColorOptions}`>;

export function digitToHEX (d: number) {
  let hex = d.toString(16);
  hex = "00".slice(0, 2 - hex.length) + hex;
  return hex;
}

export function rgbToHEX (rgba: RGBA): string {
  const rgb = rgba.slice(0, 3);
  return "#" + rgb.map(digitToHEX).join("").toLowerCase();
}

export function hexToRGB (hex: string): [number, number, number, number] {
  if (hex.length === 4) hex = "#" + [hex[1], hex[1], hex[2], hex[2], hex[3], hex[3]].join("");
  else if (hex.length === 5) hex = "#" + [hex[1], hex[1], hex[2], hex[2], hex[3], hex[3], hex[4], hex[4]].join("");
  const c = +("0x" + hex.substring(1));
  if (hex.length === 9) return [(c >> 24) & 255, (c >> 16) & 255, (c >> 8) & 255, (c & 255) / 256];
  return [(c >> 16) & 255, (c >> 8) & 255, c & 255, 1];
}

export function sliceColor (str: string): string[] {
  const params = str.slice(str.indexOf("(") + 1, str.indexOf(")"));
  return params.indexOf(",") !== -1 ? params.split(/,\s*/) : params.split(/\s+\/?\s*/);
}

export function rgbToHSL (rgba: RGBA): HSLA {
  const r = rgba[0] / 255;
  const g = rgba[1] / 255;
  const b = rgba[2] / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h;
  let s;
  const l = (max + min) / 2;
  const d = max - min;
  const huecalc = {
    [r]: () => (60 * (g - b) / d) + (g < b ? 360 : 0),
    [g]: () => (60 * (b - r) / d) + 120,
    [b]: () => (60 * (r - g) / d) + 240,
  };

  if (d === 0) {
    h = s = 0; // grayscaled color
  } else {
    s = l < 0.5 ? d / (max + min) : d / (2 - max - min);
    h = huecalc[max]();
  }
  return [h, s * 100, l * 100].concat([rgba[3]]) as HSLA;
}

export function hueToRGB (p: number, q: number, t: number) {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
  return p;
}

export function hslToRGB (hsla: HSLA): RGBA {
  let r;
  let g;
  let b;
  const h = hsla[0] / 360;
  const s = hsla[1] / 100;
  const l = hsla[2] / 100;

  if (s === 0) {
    r = g = b = l; // grayscaled color
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hueToRGB(p, q, h + 1 / 3);
    g = hueToRGB(p, q, h);
    b = hueToRGB(p, q, h - 1 / 3);
  }
  return [r, g, b].map(function (c) { return Math.round(c * 255); }).concat([hsla[3]]) as RGBA;
}

export function hwbToRGB (hue: number, whiteness: number, blackness: number, alpha: number = 1): RGBA {
  const scaledHue = hue % 360 / 360;
  let scaledWhiteness = whiteness / 100;
  let scaledBlackness = blackness / 100;

  const sum = scaledWhiteness + scaledBlackness;
  if (sum > 1) {
    scaledWhiteness /= sum;
    scaledBlackness /= sum;
  }

  const factor = 1 - scaledWhiteness - scaledBlackness;

  function toRgb (hue: number) {
    const channel = hueToRGB(0, 1, hue) * factor + scaledWhiteness;
    return Math.round(channel * 255);
  }

  return [toRgb(scaledHue + 1 / 3), toRgb(scaledHue), toRgb(scaledHue - 1 / 3), alpha];
}

function adjustWithScale (rgba: RGBA | HSLA, deg?: number, scale: number = 0, index: 0 | 1 | 2 | 3 = 0, len = 100): RGBA | HSLA {
  rgba = [...rgba];
  rgba[index] = deg
    ? Math.max(Math.min(rgba[index] + deg, len), 0)
    : scale >= 0
      ? Math.floor((len - rgba[index]) * scale / 100 + rgba[index])
      : Math.floor(rgba[index] - rgba[index] * Math.abs(scale) / 100);

  return rgba;
}

export function adjustHue (hsla: HSLA, deg: number): HSLA {
  hsla = [...hsla];
  hsla[0] = hsla[0] + deg;
  return hsla;
}

export const adjustSaturation = (hsla: HSLA, deg?: number, scale: number = 0): HSLA => adjustWithScale(hsla, deg, scale, 1);

export const adjustLightness = (hsla: HSLA, deg?: number, scale: number = 0): HSLA => adjustWithScale(hsla, deg, scale, 2);

export const adjustRed = (rgba: RGBA, deg?: number, scale: number = 0): RGBA => adjustWithScale(rgba, deg, scale, 0, 255);

export const adjustGreen = (rgba: RGBA, deg?: number, scale: number = 0): RGBA => adjustWithScale(rgba, deg, scale, 1, 255);

export const adjustBlue = (rgba: RGBA, deg?: number, scale: number = 0): RGBA => adjustWithScale(rgba, deg, scale, 2, 255);

export const adjustAlpha: ((hsla: HSLA, deg?: number, scale?: number) => HSLA) & ((hsla: RGBA, deg?: number, scale?: number) => RGBA) = (hsla, deg, scale = 0) => {
  hsla = [...hsla];
  hsla[3] = deg
    ? Math.round(Math.max(Math.min(hsla[3] + deg, 1), 0) * 100) / 100
    : scale >= 0
      ? Math.floor((1 - hsla[3]) * scale + (hsla[3] * 100)) / 100
      : Math.floor(hsla[3] * (100 + scale)) / 100;
  return hsla;
};

export function mixColor (color1: RGBA, color2: RGBA, w: number = 50): RGBA {
  const weightScale = w / 100;
  const normalizedWeight = weightScale * 2 - 1;
  const alphaDistance = color1[3] - color2[3];

  const combinedWeight1 = normalizedWeight * alphaDistance === -1
    ? normalizedWeight
    : (normalizedWeight + alphaDistance) /
    (1 + normalizedWeight * alphaDistance);
  const weight1 = (combinedWeight1 + 1) / 2;
  const weight2 = 1 - weight1;

  return [Math.round(color1[0] * weight1 + color2[0] * weight2), Math.round(color1[1] * weight1 + color2[1] * weight2), Math.round(color1[2] * weight1 + color2[2] * weight2), color1[3] * weightScale + color2[3] * (1 - weightScale)];
}

export function subMixColor (color1: RGBA, color2: RGBA, w: number = 50): RGBA {
  return color1.map((c, i) => i === 3 ? color2[i] + (c - color2[i]) * (w / 100) : Math.floor(color2[i] + (c - color2[i]) * (w / 100))) as RGBA;
}

export class Color {
  private hexval: string;
  private rgbaval: RGBA;
  private hslaval: HSLA;

  constructor(hexval: string);
  constructor(rgbaval: RGB | RGBA);
  constructor(hexval: string, rgbaval: RGBA, hslaval: HSLA);
  constructor (hexval: string | RGB | RGBA, rgbaval?: RGBA, hslaval?: HSLA) {
    if (Array.isArray(hexval)) {
      if (hexval[3] == null) hexval.push(1);
      this.rgbaval = hexval as RGBA;
      this.hexval = rgbToHEX(this.rgbaval);
    } else {
      this.hexval = hexval;
      this.rgbaval = rgbaval ?? hexToRGB(hexval);
    }
    this.hslaval = hslaval ?? rgbToHSL(this.rgbaval);
  }

  static hex (str: string) {
    const hexval = str.toLowerCase();
    const rgbaval = hexToRGB(hexval);
    const hslaval = rgbToHSL(rgbaval);
    return new Color(hexval, rgbaval, hslaval);
  }

  static rgb (r: number, g: number, b: number, a: number = 1) {
    return Color.rgba(r, g, b, a);
  }

  static rgba (r: number, g: number, b: number, a: number) {
    const rgbaval = [r, g, b, a] as RGBA;
    const hexval = rgbToHEX(rgbaval);
    const hslaval = rgbToHSL(rgbaval);
    return new Color(hexval, rgbaval, hslaval);
  }

  static hsl (h: number, s: number, l: number, a: number = 1) {
    return Color.hsla(h, s, l, a);
  }

  static hsla (h: number, s: number, l: number, a: number) {
    const hslaval = [h, s, l, a] as HSLA;
    const rgbaval = hslToRGB(hslaval);
    const hexval = rgbToHEX(rgbaval);
    return new Color(hexval, rgbaval, hslaval);
  }

  static hwb (hue: number, whiteness: number, blackness: number, alpha: number = 1) {
    return Color.rgba(...hwbToRGB(hue, whiteness, blackness, alpha));
  }

  get hex (): string {
    const v = this.hexval;
    return (v[1] === v[2] && v[3] === v[4] && v[5] === v[6]) ? "#" + v[1] + v[3] + v[5] : v;
  }

  get rgb (): RGB {
    return this.rgba.slice(0, 3) as RGB;
  }

  get rgba (): RGBA {
    return this.rgbaval;
  }

  get hsl (): HSL {
    return this.hsla.slice(0, 3) as HSL;
  }

  get hsla (): HSLA {
    return this.hslaval.map(i => prec(i)) as HSLA;
  }

  get hwb (): HWB {
    return [this.hue, this.whiteness, this.blackness];
  }

  static mix (c1: Color, c2: Color, w: number = 50): Color {
    return Color.rgba(...mixColor(c1.rgbaval, c2.rgbaval, w));
  }

  static subcolormix (c1: Color, c2: Color, w: number = 50): Color {
    return Color.rgba(...subMixColor(c1.rgbaval, c2.rgbaval, w));
  }

  get red () {
    return this.rgbaval[0];
  }

  get green () {
    return this.rgbaval[1];
  }

  get blue () {
    return this.rgbaval[2];
  }

  get hue () {
    return prec(this.hslaval[0]);
  }

  get saturation () {
    return prec(this.hslaval[1]);
  }

  get lightness () {
    return prec(this.hslaval[2]);
  }

  get alpha () {
    return this.rgbaval[3];
  }

  get opacity () {
    return this.alpha;
  }

  get whiteness () {
    const [r, g, b] = this.rgbaval;
    return prec(Math.min(Math.min(r, g), b) / 255 * 100);
  }

  get blackness () {
    const [r, g, b] = this.rgbaval;
    return prec(100 - Math.max(Math.max(r, g), b) / 255 * 100);
  }

  get ieHexStr () {
    return "#" + (digitToHEX(this.alpha * 255) + this.hexval.slice(1)).toUpperCase();
  }

  invert (weight = 100): Color {
    const inverted = this.rgba.map((c, i) => i === 3 ? c : Math.round(255 - c)) as RGBA;

    return Color.mix(new Color(rgbToHEX(inverted), inverted, rgbToHSL(inverted).concat([inverted[3]]) as HSLA), this, weight);
  }

  adjustRed (deg?: number, scale: number = 0): Color {
    return Color.rgba(...adjustRed(this.rgbaval, deg, scale));
  }

  adjustGreen (deg?: number, scale: number = 0): Color {
    return Color.rgba(...adjustGreen(this.rgbaval, deg, scale));
  }

  adjustBlue (deg?: number, scale: number = 0): Color {
    return Color.rgba(...adjustBlue(this.rgbaval, deg, scale));
  }

  adjustHue (deg: number): Color {
    return Color.hsla(...adjustHue(this.hslaval, deg));
  }

  adjustSaturation (deg?: number, scale: number = 0): Color {
    return Color.hsla(...adjustSaturation(this.hslaval, deg, scale));
  }

  adjustLightness (deg?: number, scale: number = 0): Color {
    return Color.hsla(...adjustLightness(this.hslaval, deg, scale));
  }

  adjustAlpha (deg?: number, scale: number = 0): Color {
    return Color.hsla(...adjustAlpha(this.hslaval, deg, scale));
  }

  complement () {
    return this.adjustHue(180);
  }

  saturate (deg: number) {
    return this.adjustSaturation(deg);
  }

  desaturate (deg: number) {
    return this.adjustSaturation(-deg);
  }

  grayscale () {
    return this.adjustSaturation(-100);
  }

  lighten (amount: number) {
    return this.adjustLightness(amount);
  }

  darken (amount: number) {
    return this.adjustLightness(-amount);
  }

  opacify (deg: number) {
    return this.adjustAlpha(deg);
  }

  transparentize (deg: number) {
    return this.adjustAlpha(-deg);
  }

  fadeIn (deg: number) {
    return this.adjustAlpha(deg);
  }

  fadeOut (deg: number) {
    return this.adjustAlpha(-deg);
  }

  adjust (opt: AdjustColorOptions): Color {
    let color: Color = this;

    for (const [k, v] of Object.entries(opt)) {
      color = color["adjust" + k[0].toUpperCase() + k.slice(1) as AdjustColorFuncs](v);
    }

    return color;
  }

  scale (opt: ScaleColorOptions): Color {
    let color: Color = this;

    for (const [k, v] of Object.entries(opt)) {
      color = color["adjust" + k[0].toUpperCase() + k.slice(1) as ScaleColorFuncs](undefined, v);
    }

    return color;
  }

  change (opt: AdjustColorOptions): Color {
    let rgba = this.rgba;
    let hsla = this.hsla;

    for (const [k, v] of Object.entries(opt)) {
      switch (k) {
      case "red": rgba[0] = v; hsla = rgbToHSL(rgba); break;
      case "green": rgba[1] = v; hsla = rgbToHSL(rgba); break;
      case "blue": rgba[2] = v; hsla = rgbToHSL(rgba); break;
      case "hue": hsla[0] = v; rgba = hslToRGB(hsla); break;
      case "saturation": hsla[1] = v; rgba = hslToRGB(hsla); break;
      case "lightness": hsla[2] = v; rgba = hslToRGB(hsla); break;
      case "alpha": rgba[3] = v; hsla[3] = v; break;
      }
    }

    return new Color(rgbToHEX(rgba), rgba, hsla);
  }

  // Color Sets
  lightenSet (n: number) {
    return [this as Color].concat(range(1, n as 10).map(i => this.adjustLightness(undefined, 100 / n * i)));
  }

  darkenSet (n: number) {
    return [this as Color].concat(range(1, n as 10).map(i => this.adjustLightness(undefined, -(100 / n * i))));
  }

  desaturateSet (n: number) {
    return [this as Color].concat(range(1, n as 10).map(i => this.adjustSaturation(undefined, -(100 / n * i))));
  }

  complementSet (n: number) {
    const comp = this.complement();
    return range(0, n as 10).reverse().map(i => i === n - 1 ? this : i === 0 ? comp : Color.subcolormix(this, comp, 100 / (n - 1) * i));
  }

  invertSet (n: number) {
    const inv = this.invert();
    return range(0, n as 10).reverse().map(i => i === n - 1 ? this : i === 0 ? inv : Color.subcolormix(this, inv, 100 / (n - 1) * i));
  }
};

export function colorLuminance (color: Color): number {
  const rgb = color.rgb.map(i => i / 255).map(v => v < 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2);
  return prec(rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722);
}

export function getLightColor (color: Color, lightness = 96) {
  return color.change({ lightness: color.lightness > 96 ? color.lightness : lightness });
}

export function getDarkColor (color: Color, lightness = 29) {
  return color.change({ lightness: Math.max(lightness, Math.round(lightness + ((0.53 - colorLuminance(color)) * 53))) });
}
