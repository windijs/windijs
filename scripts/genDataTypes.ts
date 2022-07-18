/* eslint-disable no-console */
import { cssData, EntryStatus, IAtDirectiveData, IPropertyData, IPseudoClassData, IPseudoElementData, IReference, IValueData } from "../data/cssData";
import { htmlData, IAttributeData, ITagData } from "../data/htmlData";
import * as funcs from "../src/helpers/funcs";
import { writeFileSync } from "fs";

const codes: string[] = [];
const funcDepends: string[] = [];

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
  str = str.map(i => i.split("\n")).flat();
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

function genCSSDoc (value: IValueData | IAtDirectiveData | IPseudoClassData | IPseudoElementData, indent = 0): string | undefined {
  const docs: (string | undefined)[] = [
    genStatus(value.status),
    value.description,
    genBrowers(value.browsers),
    ...(genReferences(value.references) ?? []),
  ];

  return doc(docs.filter(i => i != null).map(i => [i, ""]).flat().slice(0, -1) as string[], indent);
}

function genHTMLDoc (value: ITagData | IAttributeData, indent = 0): string | undefined {
  const docs: (string | undefined)[] = [
    typeof value.description === "string" ? value.description : value.description?.value,
    ...(genReferences(value.references) ?? []),
  ];

  return doc(docs.filter(i => i != null).map(i => [i, ""]).flat().slice(0, -1) as string[], indent);
}

function genEndTypes (prop: IPropertyData, header?: string): string {
  const ends = header ? [] : ["}"];

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

  if (header) ends[0] = header + ends[0];

  return ends.join(" & ");
}

function genCSSDecls () {
  codes.push("import { StyleObject, ColorEntry, LengthEntry, PercentEntry, AlphaEntry, IntegerEntry, URLEntry, StringEntry, AngleEntry, TimeEntry, WideEntry, PositionEntry, RepeatStyleEntry, LineStyleEntry, LineWidthEntry, BoxEntry, GeometryBoxEntry, ColorFunctions, ImageFunctions, BasicShapeFunctions, TransitionTimingFunctions } from \"./index\";");
  codes.push("");
  codes.push("export interface CSSDecls {");

  let d, values, header, isFunc;

  for (const p of cssData.properties) {
    header = undefined;
    values = p.values ?? [];
    d = genPropertyDoc(p, 2);
    if (d) codes.push(d);
    if (values.length === 0) {
      header = indent(dashToCamel(p.name) + ": ", 0);
    } else {
      codes.push(indent(dashToCamel(p.name) + ": {"));
      for (const v of values) {
        isFunc = false;
        d = genCSSDoc(v, 4);
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
    codes.push(indent(genEndTypes(p, header)));
  }

  console.log("Collect function depends...\n");

  codes.splice(2, 0, `import { ${funcDepends.join(", ")} } from "../helpers/funcs";`);

  codes.push("}");
  codes.push("");
}

function genCSSAtRules () {
  let doc;

  codes.push("export interface CSSAtRules<T> {");

  for (const rule of cssData.atDirectives!) {
    doc = genCSSDoc(rule, 2);
    doc && codes.push(doc);
    codes.push(indent(JSON.stringify(rule.name) + ": T", 2));
  }

  codes.push("}");
  codes.push("");
}

function genCSSClasses () {
  let doc;

  codes.push("export interface CSSClasses<T> {");

  for (const c of cssData.pseudoClasses!) {
    doc = genCSSDoc(c, 2);
    doc && codes.push(doc);
    codes.push(indent(JSON.stringify("&" + c.name) + ": T", 2));
  }

  codes.push("}");
  codes.push("");
}

function genCSSElements () {
  let doc;

  codes.push("export interface CSSElements<T> {");

  for (const e of cssData.pseudoElements!) {
    doc = genCSSDoc(e, 2);
    doc && codes.push(doc);
    codes.push(indent(JSON.stringify("&" + e.name) + ": T", 2));
  }

  codes.push("}");
  codes.push("");
}

function genHTMLTags () {
  let doc;

  codes.push("export interface HTMLTags<T> {");

  for (const tag of htmlData.tags!) {
    doc = genHTMLDoc(tag, 2);
    doc && codes.push(doc);
    codes.push(indent(tag.name + ": T", 2));
  }

  codes.push("}");
  codes.push("");
}

function genHTMLAttrs () {
  let doc;

  codes.push("export interface HTMLAttrs<T> {");

  for (const tag of htmlData.tags!) {
    for (const attr of tag.attributes) {
      doc = genHTMLDoc(attr, 2);
      doc && codes.push(doc);
      codes.push(indent((JSON.stringify(tag.name + "[" + attr.name + "]")) + ": T", 2));
    }
  }

  for (const attr of htmlData.globalAttributes!) {
    doc = genHTMLDoc(attr, 2);
    doc && codes.push(doc);
    codes.push(indent((JSON.stringify("[" + attr.name + "]")) + ": T", 2));
  }

  codes.push("}");
  codes.push("");
}

console.log("Start generating...\n");

codes.push(doc(["This file is auto generated by 'pnpm gen:style'", "Please don't edit it directly!"])!);

console.log("Generating CSS Declarations..");

genCSSDecls();

console.log("Generating CSS AtRules..");

genCSSAtRules();

console.log("Generating CSS Pseudo Classes..");

genCSSClasses();

console.log("Generating CSS Pseudo Elements..");

genCSSElements();

console.log("Generating HTML Tags..");

genHTMLTags();

console.log("Generating HTML Attributes..\n");

genHTMLAttrs();

console.log("Write to ./src/types/data.d.ts\n");

writeFileSync("./src/types/data.d.ts", codes.join("\n"));

console.log("Done.\n");
