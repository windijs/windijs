/* eslint-disable no-console */
import { cssData, EntryStatus, IPropertyData, IReference, IValueData } from "./webCustomData";
import * as funcs from "../src/helpers/funcs";
import { writeFileSync } from "fs";

function dashToCamel (str: string) {
  if (/^-(webkit|ms|moz|o)-/.test(str) || str === "scrollbar-3dlight-color") return JSON.stringify(str);
  return str.replace(/(-[a-z])/g, function ($1) { return $1.toUpperCase().replace("-", ""); });
}

function indent (str: string, count = 2) {
  return " ".repeat(count) + str;
}

function escape (str: string) {
  return str.replace(/</g, "\\<");
}

function doc (str: string[], indentCount = 0): string | undefined {
  if (str.length === 0) return undefined;
  if (str.length === 1) return indent("/** " + escape(str[0]) + " */", indentCount);
  return [indent("/**", indentCount), ...str.map(i => i === "" ? indent(" *", indentCount) : indent(" * " + escape(i).trim(), indentCount)), indent(" */", indentCount)].join("\n");
}

function genBrower (browser: string): string | undefined {
  const replace = (from: string, to: string) => browser.replace(from, browser === from ? to : to + " ");
  if (browser[0] === "I") return replace("IE", "IE");
  if (browser[0] === "E") return replace("E", "Edge");
  if (browser[0] === "F") return replace("FF", "Firefox");
  if (browser[0] === "S") return replace("S", "Safari");
  if (browser[0] === "C") return replace("C", "Chrome");
  if (browser[0] === "O") return replace("O", "Opera");
}

function genBrowers (browsers: string[] | undefined): string | undefined {
  if (!browsers) return undefined;
  browsers = browsers.map(i => genBrower(i)).filter(i => i != null) as string[];
  if (browsers.length === 0) return undefined;
  return "(" + browsers.join(", ") + ")";
}

function genSyntax (syntax: string | undefined) {
  if (!syntax) return undefined;
  return "Syntax: " + syntax;
}

function genReference (ref: IReference) {
  return `[${ref.name}](${ref.url})`;
}

function genReferences (refs: IReference[] | undefined): string[] | undefined {
  if (!refs) return undefined;
  return refs.map(i => genReference(i));
}

function genStatus (status: EntryStatus | undefined): string | undefined {
  if (status === "nonstandard") return "🚨️ Property is nonstandard. Avoid using it.";
  if (status === "experimental") return "⚠️ Property is experimental. Be cautious when using it.️";
  if (status === "obsolete") return "🚨️️️ Property is obsolete. Avoid using it.";
  return undefined;
}

function genPropertyDoc (prop: IPropertyData, indent = 0): string | undefined {
  const docs: (string | undefined)[] = [
    genStatus(prop.status),
    prop.description,
    genBrowers(prop.browsers),
    genSyntax(prop.syntax),
    ...(genReferences(prop.references) ?? []),
  ];

  return doc(docs.filter(i => i != null).map(i => [i, ""]).flat().slice(0, -1) as string[], indent);
}

function genValueDoc (value: IValueData, indent = 0): string | undefined {
  const docs: (string | undefined)[] = [
    genStatus(value.status),
    value.description,
    genBrowers(value.browsers),
    ...(genReferences(value.references) ?? []),
  ];

  return doc(docs.filter(i => i != null).map(i => [i, ""]).flat().slice(0, -1) as string[], indent);
}

function genEndTypes (prop: IPropertyData, all = false): string {
  const ends = ["}"];

  // 'integer', 'string', 'image', 'identifier', 'enum', 'time', 'timing-function', 'number', 'color', 'position', 'length', 'repeat', 'percentage', 'box', 'url', 'line-width', 'line-style', 'shape', 'geometry-box', 'number(0-1)', 'font', 'angle', 'property', 'positon', 'unicode-range'

  if (prop.restrictions?.includes("color")) {
    ends.push("ColorEntry");
    ends.push("ColorFunctions");
  }

  prop.restrictions?.includes("string") && ends.push("StringEntry");
  prop.restrictions?.includes("url") && ends.push("URLEntry");
  prop.restrictions?.includes("length") && ends.push("LengthEntry");
  prop.restrictions?.includes("percentage") && ends.push("PercentEntry");
  prop.restrictions?.includes("angle") && ends.push("AngleEntry");
  prop.restrictions?.includes("number") && ends.push("{ [value: number]: StyleObject }");
  prop.restrictions?.includes("integer") && ends.push("IntegerEntry");
  prop.restrictions?.includes("number(0-1)") && ends.push("AlphaEntry");
  prop.restrictions?.includes("time") && ends.push("TimeEntry");
  prop.restrictions?.includes("image") && ends.push("ImageFunctions");
  prop.restrictions?.includes("position") && ends.push("PositionEntry");
  prop.restrictions?.includes("repeat") && ends.push("RepeatStyleEntry");
  prop.restrictions?.includes("line-width") && ends.push("LineWidthEntry");
  prop.restrictions?.includes("line-style") && ends.push("LineStyleEntry");
  prop.restrictions?.includes("shape") && ends.push("BasicShapeFunctions");
  prop.restrictions?.includes("box") && ends.push("BoxEntry");
  prop.restrictions?.includes("geometry-box") && ends.push("GeometryBoxEntry");
  prop.restrictions?.includes("timing-function") && ends.push("TransitionTimingFunctions");
  ends.push("WideEntry");

  if (!all) ends.push("{ [key: string]: StyleObject }");
  return ends.join(" & ");
}

const codes: string[] = [];
const funcDepends: string[] = [];

console.log("Start generating...\n");

codes.push(doc(["This file is auto generated by 'pnpm gen:style'", "Please don't edit it directly!"])!);

codes.push("import { StyleObject, ColorEntry, LengthEntry, PercentEntry, AlphaEntry, IntegerEntry, URLEntry, StringEntry, AngleEntry, TimeEntry, WideEntry, PositionEntry, RepeatStyleEntry, LineStyleEntry, LineWidthEntry, BoxEntry, GeometryBoxEntry, ColorFunctions, ImageFunctions, BasicShapeFunctions, TransitionTimingFunctions } from \"./index\";");
codes.push("");
codes.push("export interface CSSStyleData {");

let d, values, all, isFunc;

for (const p of cssData.properties) {
  all = false;
  values = p.values ?? [];
  d = genPropertyDoc(p, 2);
  if (d) codes.push(d);
  codes.push(indent(dashToCamel(p.name) + ": {"));
  if (values.length === 0) {
    all = true;
    codes.push(indent("[key: string]: StyleObject", 4));
  } else {
    for (const v of values) {
      isFunc = false;
      d = genValueDoc(v, 4);
      // replace css function
      // some css functions not been handled, because it should never been used.
      // format() | local() | rect() | annotation() | character-variant() | ornaments() | styleset() | stylistic() | swash() | symbols() | snapInterval(100%, 100%) | snapList()
      if (v.name.endsWith("()") || /^(rotate(X|Y|Z))|(attr)|(counter)\(/.test(v.name)) {
        const end = v.name.indexOf("(");
        const fName = dashToCamel(v.name.slice(0, end));
        if (fName in funcs) {
          if (!funcDepends.includes(fName)) funcDepends.push(fName);
          if (d) codes.push(d);
          codes.push(indent(`${fName}: (...params: Parameters<typeof ${fName}>) => StyleObject`, 4));
          isFunc = true;
        }
      }
      if (!isFunc) {
        if (d) codes.push(d);
        codes.push(indent(JSON.stringify(v.name) + ": StyleObject,", 4));
      }
    }
  }
  codes.push(indent(genEndTypes(p, all)));
}

console.log("Collect function depends...\n");

codes.splice(2, 0, `import { ${funcDepends.join(", ")} } from "../helpers/funcs";`);

codes.push("}");
codes.push("");

console.log("Write to ./src/types/style.d.ts\n");

writeFileSync("./src/types/style.d.ts", codes.join("\n"));

console.log("Done.\n");
