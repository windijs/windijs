import { prec } from "./math";

export type RGB = [number, number, number];
export type RGBA = [number, number, number, number];
export type HSL = [number, number, number];
export type HWB = [number, number, number];
export type HSLA = [number, number, number, number];
type AdjustColorOptions = Partial<Record<"red" | "green" | "blue" | "hue" | "saturation" | "lightness" | "alpha", number>>
type ScaleColorOptions = Partial<Record<"red" | "green" | "blue" | "saturation" | "lightness" | "alpha", number>>

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

export class Color {
  private hexval: string;
  private rgbaval: RGBA;
  private hslaval: HSLA;

  constructor (hexval: string);
  constructor (rgbaval: RGB | RGBA);
  constructor (hexval: string, rgbaval: RGBA, hslaval: HSLA);
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

    return Color.rgba(toRgb(scaledHue + 1 / 3), toRgb(scaledHue), toRgb(scaledHue - 1 / 3), alpha);
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

  static mix (color1: Color, color2: Color, w: number = 50): Color {
    const weightScale = w / 100;
    const normalizedWeight = weightScale * 2 - 1;
    const alphaDistance = color1.alpha - color2.alpha;

    const combinedWeight1 = normalizedWeight * alphaDistance === -1
      ? normalizedWeight
      : (normalizedWeight + alphaDistance) /
          (1 + normalizedWeight * alphaDistance);
    const weight1 = (combinedWeight1 + 1) / 2;
    const weight2 = 1 - weight1;

    const newcolor: RGBA = [
      Math.round(color1.red * weight1 + color2.red * weight2),
      Math.round(color1.green * weight1 + color2.green * weight2),
      Math.round(color1.blue * weight1 + color2.blue * weight2),
      color1.alpha * weightScale + color2.alpha * (1 - weightScale),
    ];

    return new Color(rgbToHEX(newcolor), newcolor, rgbToHSL(newcolor));
  }

  static subcolormix (c1: Color, c2: Color, w: number): Color {
    const weight = w || 50;
    const base = c1.rgba;
    const brend = c2.rgba;
    const newcolor = base.map(function (c, i) {
      if (i === 3) return brend[i] + (c - brend[i]) * (weight / 100);
      return Math.floor(brend[i] + (c - brend[i]) * (weight / 100));
    }) as RGBA;

    return new Color(rgbToHEX(newcolor), newcolor, rgbToHSL(newcolor).concat([newcolor[3]]) as HSLA);
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
    const inverted = this.rgba.map(function (c, i) {
      if (i === 3) { return c; }
      return Math.round(255 - c);
    }) as RGBA;

    return Color.mix(new Color(rgbToHEX(inverted), inverted, rgbToHSL(inverted).concat([inverted[3]]) as HSLA), this, weight);
  }

  adjustRed (deg?: number, scale: number = 0): Color {
    const rgba = this.rgbaval;

    if (deg) {
      rgba[0] = Math.max(Math.min(rgba[0] + deg, 255), 0);
    } else {
      scale >= 0
        ? rgba[0] = Math.floor((255 - rgba[0]) * scale / 100 + rgba[0])
        : rgba[0] = Math.floor(rgba[0] - rgba[0] * Math.abs(scale) / 100);
    }

    const hsla = rgbToHSL(rgba);
    return new Color(rgbToHEX(rgba), rgba, hsla);
  }

  adjustGreen (deg?: number, scale: number = 0): Color {
    const rgba = this.rgbaval;

    if (deg) {
      rgba[1] = Math.max(Math.min(rgba[1] + deg, 255), 0);
    } else {
      scale >= 0
        ? rgba[1] = Math.floor((255 - rgba[1]) * scale / 100 + rgba[1])
        : rgba[1] = Math.floor(rgba[1] - rgba[1] * Math.abs(scale) / 100);
    }

    const hsla = rgbToHSL(rgba);

    return new Color(rgbToHEX(rgba), rgba, hsla);
  }

  adjustBlue (deg?: number, scale: number = 0): Color {
    const rgba = this.rgbaval;

    if (deg) {
      rgba[2] = Math.max(Math.min(rgba[2] + deg, 255), 0);
    } else {
      scale >= 0
        ? rgba[2] = Math.floor((255 - rgba[2]) * scale / 100 + rgba[2])
        : rgba[2] = Math.floor(rgba[2] - rgba[2] * Math.abs(scale) / 100);
    }

    const hsla = rgbToHSL(rgba);

    return new Color(rgbToHEX(rgba), rgba, hsla);
  }

  adjustHue (deg: number): Color {
    const hsla = this.hslaval;
    hsla[0] = hsla[0] + deg;
    const rgba = hslToRGB(hsla);

    return new Color(rgbToHEX(rgba), rgba, hsla);
  }

  adjustSaturation (deg?: number, scale: number = 0): Color {
    const hsla = this.hslaval;

    if (deg) {
      hsla[1] = Math.max(Math.min(hsla[1] + deg, 100), 0);
    } else {
      scale >= 0
        ? hsla[1] = Math.floor((100 - hsla[1]) * scale / 100 + hsla[1])
        : hsla[1] = Math.floor(hsla[1] - hsla[1] * Math.abs(scale) / 100);
    }

    const rgba = hslToRGB(hsla);

    return new Color(rgbToHEX(rgba), rgba, hsla);
  }

  adjustLightness (deg?: number, scale: number = 0): Color {
    const hsla = this.hslaval;

    if (deg) {
      hsla[2] = Math.max(Math.min(hsla[2] + deg, 100), 0);
    } else {
      scale >= 0
        ? hsla[2] = Math.floor((100 - hsla[2]) * scale / 100 + hsla[2])
        : hsla[2] = Math.floor(hsla[2] - hsla[2] * Math.abs(scale) / 100);
    }

    const rgba = hslToRGB(hsla);

    return new Color(rgbToHEX(rgba), rgba, hsla);
  }

  adjustAlpha (deg?: number, scale: number = 0): Color {
    const rgba = this.rgbaval;
    const hsla = this.hslaval;
    let a;

    const alpha = this.alpha;

    if (deg) {
      a = Math.round(Math.max(Math.min(alpha + deg, 1), 0) * 100) / 100;
    } else {
      scale >= 0
        ? a = Math.floor((1 - alpha) * scale + (alpha * 100)) / 100
        : a = Math.floor(alpha * (100 + scale)) / 100;
    }

    rgba[3] = a;
    hsla[3] = a;

    return new Color(rgbToHEX(rgba), rgba, hsla);
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
    const operations = {
      red: (deg: number) => color.adjustRed(deg),
      green: (deg: number) => color.adjustGreen(deg),
      blue: (deg: number) => color.adjustBlue(deg),
      hue: (deg: number) => color.adjustHue(deg),
      saturation: (deg: number) => color.adjustSaturation(deg),
      lightness: (deg: number) => color.adjustLightness(deg),
      alpha: (deg: number) => color.adjustAlpha(deg),
    };

    for (const [k, v] of Object.entries(opt)) {
      color = operations[k as keyof typeof operations](v);
    }

    return color;
  }

  scale (opt: ScaleColorOptions): Color {
    let color: Color = this;
    const operations = {
      red: (scale: number) => color.adjustRed(undefined, scale),
      green: (scale: number) => color.adjustGreen(undefined, scale),
      blue: (scale: number) => color.adjustBlue(undefined, scale),
      saturation: (scale: number) => color.adjustSaturation(undefined, scale),
      lightness: (scale: number) => color.adjustLightness(undefined, scale),
      alpha: (scale: number) => color.adjustAlpha(undefined, scale),
    };

    for (const [k, v] of Object.entries(opt)) {
      color = operations[k as keyof typeof operations](v);
    }

    return color;
  }

  change (opt: AdjustColorOptions): Color {
    let rgba = this.rgba;
    let hsla = this.hsla;

    const operations = {
      red: (val: number) => { rgba[0] = val; hsla = rgbToHSL(rgba); },
      green: (val: number) => { rgba[1] = val; hsla = rgbToHSL(rgba); },
      blue: (val: number) => { rgba[2] = val; hsla = rgbToHSL(rgba); },
      hue: (val: number) => { hsla[0] = val; rgba = hslToRGB(hsla); },
      saturation: (val: number) => { hsla[1] = val; rgba = hslToRGB(hsla); },
      lightness: (val: number) => { hsla[2] = val; rgba = hslToRGB(hsla); },
      alpha: (val: number) => { rgba[3] = val; hsla[3] = val; },
    };

    for (const [k, v] of Object.entries(opt)) {
      operations[k as keyof typeof operations](v);
    }

    return new Color(rgbToHEX(rgba), rgba, hsla);
  }

  // Color Sets
  lightenSet (n: number) {
    const arr: Color[] = [this];
    const step = 100 / n;
    for (let i = 1; i < n; i++) {
      arr.push(this.adjustLightness(undefined, step * i));
    }
    return arr;
  }

  darkenSet (n: number) {
    const arr: Color[] = [this];
    const step = 100 / n;
    for (let i = n - 1; i > 0; i--) {
      arr.push(this.adjustLightness(undefined, -(step * i)));
    }
    return arr;
  }

  complementSet (n: number) {
    const base = this;
    const comp = this.complement();
    const arr: Color[] = [this];
    const step = 100 / (n - 1);

    for (let i = n - 1; i >= 0; i--) {
      if (i === n - 1) {
        arr.push(base);
      } else if (i === 0) {
        arr.push(comp);
      } else { arr.push(Color.subcolormix(base, comp, step * i)); }
    }
    return arr;
  }

  invertSet (n: number) {
    const base = this;
    const inv = this.invert();
    const arr: Color[] = [this];
    const step = 100 / (n - 1);

    for (let i = n - 1; i >= 0; i--) {
      if (i === n - 1) {
        arr.push(base);
      } else if (i === 0) {
        arr.push(inv);
      } else { arr.push(Color.subcolormix(base, inv, step * i)); }
    }
    return arr;
  }

  desaturateSet (n: number) {
    const arr: Color[] = [this];
    const step = 100 / n;
    for (let i = n - 1; i > 0; i--) {
      arr.push(this.adjustSaturation(undefined, -(step * i)));
    }
    return arr;
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
