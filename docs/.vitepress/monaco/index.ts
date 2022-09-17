import * as monaco from "monaco-editor";
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";

import { wireTmGrammars } from "monaco-editor-textmate";
import { Registry } from "monaco-textmate"; // peer dependency
import { loadWASM } from "onigasm"; // peer dependency of 'monaco-textmate'

import vsDarkPlus from "./themes/dark_plus.json";
import vsLightPlus from "./themes/light_plus.json";
import preactDts from "./types/preact.d.ts?raw";
import windijsDts from "./types/windijs.d.ts?raw";
import windiColorsDts from "./types/windijsColors.d.ts?raw";
import windiConfigDts from "./types/windijsConfig.d.ts?raw";
import windiCoreDts from "./types/windijsCore.d.ts?raw";
import windiHelpersDts from "./types/windijsHelpers.d.ts?raw";
import windiSharedDts from "./types/windijsShared.d.ts?raw";
import windiStyleDts from "./types/windijsStyle.d.ts?raw";
import windiUtilitiesDts from "./types/windijsUtilities.d.ts?raw";
import windiVariantsDts from "./types/windijsVariants.d.ts?raw";

// @ts-ignore
self.MonacoEnvironment = {
  getWorker(_: any, label: string) {
    if (label === "json") {
      return new jsonWorker();
    }
    if (label === "css" || label === "scss" || label === "less") {
      return new cssWorker();
    }
    if (label === "html" || label === "handlebars" || label === "razor") {
      return new htmlWorker();
    }
    if (label === "typescript" || label === "javascript") {
      return new tsWorker();
    }
    return new editorWorker();
  },
};

monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true);

// monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
//   noSemanticValidation: false,
//   noSyntaxValidation: false
// })

monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
  target: monaco.languages.typescript.ScriptTarget.Latest,
  allowNonTsExtensions: true,
  moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
  jsx: monaco.languages.typescript.JsxEmit.React,
  jsxFactory: "h",
  jsxFragmentFactory: "Fragment",
  allowJs: true,
});

monaco.languages.typescript.typescriptDefaults.addExtraLib(windiColorsDts, "file:///node_modules/@windijs/colors/index.d.ts");
monaco.languages.typescript.typescriptDefaults.addExtraLib(windiConfigDts, "file:///node_modules/@windijs/config/index.d.ts");
monaco.languages.typescript.typescriptDefaults.addExtraLib(windiCoreDts, "file:///node_modules/@windijs/core/index.d.ts");
monaco.languages.typescript.typescriptDefaults.addExtraLib(windiHelpersDts, "file:///node_modules/@windijs/helpers/index.d.ts");
monaco.languages.typescript.typescriptDefaults.addExtraLib(windiSharedDts, "file:///node_modules/@windijs/shared/index.d.ts");
monaco.languages.typescript.typescriptDefaults.addExtraLib(windiStyleDts, "file:///node_modules/@windijs/style/index.d.ts");
monaco.languages.typescript.typescriptDefaults.addExtraLib(windiUtilitiesDts, "file:///node_modules/@windijs/utilities/index.d.ts");
monaco.languages.typescript.typescriptDefaults.addExtraLib(windiVariantsDts, "file:///node_modules/@windijs/variants/index.d.ts");
monaco.languages.typescript.typescriptDefaults.addExtraLib(windijsDts, "file:///node_modules/windijs/index.d.ts");

const preactLibUri = "file:///node_modules/preact/index.d.ts";
monaco.languages.typescript.typescriptDefaults.addExtraLib(preactDts, preactLibUri);
monaco.editor.createModel(preactDts, "typescript", monaco.Uri.parse(preactLibUri));

const utilities = [
  "animate",
  "aspect",
  "auto",
  "backdrop",
  "bg",
  "blend" /*"blur"*/,
  ,
  "border",
  "brightness",
  "col",
  "colors",
  "container",
  "contrast",
  "decoration",
  "delay",
  "divide",
  "dropShadow",
  "duration",
  "ease",
  "fill",
  "filter",
  "flex",
  "font",
  "from",
  "gap",
  "grayscale",
  "grid",
  "hueRotate",
  "hyphens",
  "image",
  "indent",
  "invert",
  "leading",
  "list",
  "m",
  "mb",
  "ml",
  "mr",
  "mt",
  "mx",
  "my",
  "opacity" /*"origin"*/,
  ,
  "outline",
  "overflow",
  "overscroll",
  "p",
  "pb",
  "perspect",
  "pl",
  "placeholder",
  "pr",
  "preserve",
  "pt",
  "px",
  "py",
  "ring",
  "rotate",
  "rounded",
  "row",
  "saturate",
  "scale",
  "sepia",
  "shadow",
  "skew",
  "space",
  "sr",
  "stroke",
  "tab",
  "text",
  "to",
  "tracking",
  "transform",
  "transition",
  "translate",
  "via",
  "w",
  "write",
];
const variants = [
  "$dark",
  "$default",
  "$lg",
  "$light",
  "$md",
  "$sm",
  "$xl",
  "$xxl",
  "_lg",
  "_md",
  "_sm",
  "_xl",
  "_xxl",
  "active",
  "after",
  "all",
  "before",
  "checked",
  "children",
  "dark",
  "disabled",
  "empty",
  "enabled",
  "even",
  "evenOfType",
  "first",
  "firstLetter",
  "firstLine",
  "firstOfType" /*"focus"*/,
  ,
  "focusVisible",
  "focusWithin",
  "groupActive",
  "groupFocus",
  "groupHover",
  "groupVisited",
  "hover",
  "indeterminate",
  "invalid",
  "landscape",
  "last",
  "lastOfType",
  "lg",
  "light",
  "link",
  "ltr",
  "marker",
  "md",
  "motionReduce",
  "motionSafe",
  "notChecked",
  "notDisabled",
  "notFirst",
  "notFirstOfType",
  "notLast",
  "notLastOfType",
  "notOnlyChild",
  "notOnlyOfType",
  "odd",
  "oddOfType",
  "onlyChild",
  "onlyOfType",
  "optional",
  "placeholderShown",
  "portrait",
  "readOnly",
  "readWrite",
  "required",
  "root",
  "rtl",
  "selection",
  "sibling",
  "siblings",
  "sm",
  "svg",
  "target",
  "valid",
  "visited",
  "xl",
  "xxl",
];
const styles = [
  "accentColor",
  "additiveSymbols",
  "alignContent",
  "alignItems",
  "alignSelf",
  "alignTracks" /*"all"*/,
  ,
  "alt",
  "animation",
  "animationDelay",
  "animationDirection",
  "animationDuration",
  "animationFillMode",
  "animationIterationCount",
  "animationName",
  "animationPlayState",
  "animationTimeline",
  "animationTimingFunction",
  "appearance",
  "ascentOverride",
  "aspectRatio",
  "azimuth",
  "backdropFilter",
  "backfaceVisibility",
  "background",
  "backgroundAttachment",
  "backgroundBlendMode",
  "backgroundClip",
  "backgroundColor",
  "backgroundImage",
  "backgroundOrigin",
  "backgroundPosition",
  "backgroundPositionX",
  "backgroundPositionY",
  "backgroundRepeat",
  "backgroundSize",
  "behavior",
  "bleed",
  "blockSize" /*"border"*/,
  ,
  "borderBlock",
  "borderBlockColor",
  "borderBlockEnd",
  "borderBlockEndColor",
  "borderBlockEndStyle",
  "borderBlockEndWidth",
  "borderBlockStart",
  "borderBlockStartColor",
  "borderBlockStartStyle",
  "borderBlockStartWidth",
  "borderBlockStyle",
  "borderBlockWidth",
  "borderBottom",
  "borderBottomColor",
  "borderBottomLeftRadius",
  "borderBottomRightRadius",
  "borderBottomStyle",
  "borderBottomWidth",
  "borderCollapse",
  "borderColor",
  "borderEndEndRadius",
  "borderEndStartRadius",
  "borderImage",
  "borderImageOutset",
  "borderImageRepeat",
  "borderImageSlice",
  "borderImageSource",
  "borderImageWidth",
  "borderInline",
  "borderInlineColor",
  "borderInlineEnd",
  "borderInlineEndColor",
  "borderInlineEndStyle",
  "borderInlineEndWidth",
  "borderInlineStart",
  "borderInlineStartColor",
  "borderInlineStartStyle",
  "borderInlineStartWidth",
  "borderInlineStyle",
  "borderInlineWidth",
  "borderLeft",
  "borderLeftColor",
  "borderLeftStyle",
  "borderLeftWidth",
  "borderRadius",
  "borderRight",
  "borderRightColor",
  "borderRightStyle",
  "borderRightWidth",
  "borderSpacing",
  "borderStartEndRadius",
  "borderStartStartRadius",
  "borderStyle",
  "borderTop",
  "borderTopColor",
  "borderTopLeftRadius",
  "borderTopRightRadius",
  "borderTopStyle",
  "borderTopWidth",
  "borderWidth",
  "bottom",
  "boxAlign",
  "boxDecorationBreak",
  "boxDirection",
  "boxFlex",
  "boxFlexGroup",
  "boxLines",
  "boxOrdinalGroup",
  "boxOrient",
  "boxPack",
  "boxShadow",
  "boxSizing",
  "breakAfter",
  "breakBefore",
  "breakInside",
  "captionSide",
  "caretColor",
  "clear",
  "clip",
  "clipPath",
  "clipRule",
  "color",
  "colorInterpolationFilters",
  "colorScheme",
  "columnCount",
  "columnFill",
  "columnGap",
  "columnRule",
  "columnRuleColor",
  "columnRuleStyle",
  "columnRuleWidth",
  "columnSpan",
  "columnWidth",
  "columns",
  "contain",
  "content",
  "contentVisibility",
  "counterIncrement",
  "counterReset",
  "counterSet",
  "cursor",
  "descentOverride",
  "direction",
  "display",
  "emptyCells",
  "enableBackground",
  "fallback" /*"fill"*/,
  ,
  "fillOpacity",
  "fillRule" /*"filter"*/ /*"flex"*/,
  ,
  ,
  "flexBasis",
  "flexDirection",
  "flexFlow",
  "flexGrow",
  "flexShrink",
  "flexWrap",
  "float",
  "floodColor",
  "floodOpacity" /*"font"*/,
  ,
  "fontDisplay",
  "fontFamily",
  "fontFeatureSettings",
  "fontKerning",
  "fontLanguageOverride",
  "fontOpticalSizing",
  "fontSize",
  "fontSizeAdjust",
  "fontSmooth",
  "fontStretch",
  "fontStyle",
  "fontSynthesis",
  "fontVariant",
  "fontVariantAlternates",
  "fontVariantCaps",
  "fontVariantEastAsian",
  "fontVariantLigatures",
  "fontVariantNumeric",
  "fontVariantPosition",
  "fontVariationSettings",
  "fontWeight",
  "forcedColorAdjust" /*"gap"*/,
  ,
  "glyphOrientationHorizontal",
  "glyphOrientationVertical" /*"grid"*/,
  ,
  "gridArea",
  "gridAutoColumns",
  "gridAutoFlow",
  "gridAutoRows",
  "gridColumn",
  "gridColumnEnd",
  "gridColumnGap",
  "gridColumnStart",
  "gridGap",
  "gridRow",
  "gridRowEnd",
  "gridRowGap",
  "gridRowStart",
  "gridTemplate",
  "gridTemplateAreas",
  "gridTemplateColumns",
  "gridTemplateRows",
  "hangingPunctuation",
  "height",
  "hyphenateCharacter" /*"hyphens"*/,
  ,
  "imageOrientation",
  "imageRendering",
  "imageResolution",
  "imeMode",
  "inherits",
  "initialLetter",
  "initialLetterAlign",
  "initialValue",
  "inlineSize",
  "inputSecurity",
  "inset",
  "insetBlock",
  "insetBlockEnd",
  "insetBlockStart",
  "insetInline",
  "insetInlineEnd",
  "insetInlineStart",
  "isolation",
  "justifyContent",
  "justifyItems",
  "justifySelf",
  "justifyTracks",
  "kerning",
  "left",
  "letterSpacing",
  "lightingColor",
  "lineBreak",
  "lineClamp",
  "lineGapOverride",
  "lineHeight",
  "lineHeightStep",
  "listStyle",
  "listStyleImage",
  "listStylePosition",
  "listStyleType",
  "margin",
  "marginBlock",
  "marginBlockEnd",
  "marginBlockStart",
  "marginBottom",
  "marginInline",
  "marginInlineEnd",
  "marginInlineStart",
  "marginLeft",
  "marginRight",
  "marginTop",
  "marginTrim" /*"marker"*/,
  ,
  "markerEnd",
  "markerMid",
  "markerStart",
  "marks",
  "mask",
  "maskBorder",
  "maskBorderMode",
  "maskBorderOutset",
  "maskBorderRepeat",
  "maskBorderSlice",
  "maskBorderSource",
  "maskBorderWidth",
  "maskClip",
  "maskComposite",
  "maskImage",
  "maskMode",
  "maskOrigin",
  "maskPosition",
  "maskRepeat",
  "maskSize",
  "maskType",
  "masonryAutoFlow",
  "mathStyle",
  "maxBlockSize",
  "maxHeight",
  "maxInlineSize",
  "maxLines",
  "maxWidth",
  "maxZoom",
  "minBlockSize",
  "minHeight",
  "minInlineSize",
  "minWidth",
  "minZoom",
  "mixBlendMode",
  "motion",
  "motionOffset",
  "motionPath",
  "motionRotation",
  "navDown",
  "navIndex",
  "navLeft",
  "navRight",
  "navUp",
  "negative",
  "objectFit",
  "objectPosition",
  "offset",
  "offsetAnchor",
  "offsetBlockEnd",
  "offsetBlockStart",
  "offsetDistance",
  "offsetInlineEnd",
  "offsetInlineStart",
  "offsetPath",
  "offsetPosition",
  "offsetRotate" /*"opacity"*/,
  ,
  "order" /*"orientation"*/,
  ,
  "orphans" /*"outline"*/,
  ,
  "outlineColor",
  "outlineOffset",
  "outlineStyle",
  "outlineWidth" /*"overflow"*/,
  ,
  "overflowAnchor",
  "overflowBlock",
  "overflowClipBox",
  "overflowClipMargin",
  "overflowInline",
  "overflowWrap",
  "overflowX",
  "overflowY",
  "overscrollBehavior",
  "overscrollBehaviorBlock",
  "overscrollBehaviorInline",
  "overscrollBehaviorX",
  "overscrollBehaviorY",
  "pad",
  "padding",
  "paddingBlock",
  "paddingBlockEnd",
  "paddingBlockStart",
  "paddingBottom",
  "paddingInline",
  "paddingInlineEnd",
  "paddingInlineStart",
  "paddingLeft",
  "paddingRight",
  "paddingTop",
  "pageBreakAfter",
  "pageBreakBefore",
  "pageBreakInside",
  "paintOrder",
  "perspective",
  "perspectiveOrigin",
  "placeContent",
  "placeItems",
  "placeSelf",
  "pointerEvents",
  "position",
  "prefix",
  "printColorAdjust",
  "quotes",
  "range",
  "resize",
  "right" /*"rotate"*/,
  ,
  "rowGap",
  "rubyAlign",
  "rubyMerge",
  "rubyOverhang",
  "rubyPosition",
  "rubySpan" /*"scale"*/,
  ,
  "scrollBehavior",
  "scrollMargin",
  "scrollMarginBlock",
  "scrollMarginBlockEnd",
  "scrollMarginBlockStart",
  "scrollMarginBottom",
  "scrollMarginInline",
  "scrollMarginInlineEnd",
  "scrollMarginInlineStart",
  "scrollMarginLeft",
  "scrollMarginRight",
  "scrollMarginTop",
  "scrollPadding",
  "scrollPaddingBlock",
  "scrollPaddingBlockEnd",
  "scrollPaddingBlockStart",
  "scrollPaddingBottom",
  "scrollPaddingInline",
  "scrollPaddingInlineEnd",
  "scrollPaddingInlineStart",
  "scrollPaddingLeft",
  "scrollPaddingRight",
  "scrollPaddingTop",
  "scrollSnapAlign",
  "scrollSnapCoordinate",
  "scrollSnapDestination",
  "scrollSnapPointsX",
  "scrollSnapPointsY",
  "scrollSnapStop",
  "scrollSnapType",
  "scrollSnapTypeX",
  "scrollSnapTypeY" /*"scrollbar-3dlight-color"*/,
  ,
  "scrollbarArrowColor",
  "scrollbarBaseColor",
  "scrollbarColor",
  "scrollbarDarkshadowColor",
  "scrollbarFaceColor",
  "scrollbarGutter",
  "scrollbarHighlightColor",
  "scrollbarShadowColor",
  "scrollbarTrackColor",
  "scrollbarWidth",
  "shapeImageThreshold",
  "shapeMargin",
  "shapeOutside",
  "shapeRendering",
  "size",
  "sizeAdjust",
  "speakAs",
  "src",
  "stopColor",
  "stopOpacity" /*"stroke"*/,
  ,
  "strokeDasharray",
  "strokeDashoffset",
  "strokeLinecap",
  "strokeLinejoin",
  "strokeMiterlimit",
  "strokeOpacity",
  "strokeWidth",
  "suffix",
  "symbols",
  "syntax",
  "system",
  "tabSize",
  "tableLayout",
  "textAlign",
  "textAlignLast",
  "textAnchor",
  "textCombineUpright",
  "textDecoration",
  "textDecorationColor",
  "textDecorationLine",
  "textDecorationSkip",
  "textDecorationSkipInk",
  "textDecorationStyle",
  "textDecorationThickness",
  "textEmphasis",
  "textEmphasisColor",
  "textEmphasisPosition",
  "textEmphasisStyle",
  "textIndent",
  "textJustify",
  "textOrientation",
  "textOverflow",
  "textRendering",
  "textShadow",
  "textSizeAdjust",
  "textTransform",
  "textUnderlineOffset",
  "textUnderlinePosition" /*"top"*/,
  ,
  "touchAction" /*"transform"*/,
  ,
  "transformBox",
  "transformOrigin",
  "transformStyle" /*"transition"*/,
  ,
  "transitionDelay",
  "transitionDuration",
  "transitionProperty",
  "transitionTimingFunction" /*"translate"*/,
  ,
  "unicodeBidi",
  "unicodeRange",
  "userSelect",
  "userZoom",
  "verticalAlign",
  "viewportFit",
  "visibility",
  "whiteSpace",
  "widows",
  "width",
  "willChange",
  "wordBreak",
  "wordSpacing",
  "wordWrap",
  "writingMode",
  "zIndex",
  "zoom",
];

const globalUri = "file:///global.d.ts";
const globalSource = `
import * as helpers from "@windijs/helpers";
import * as utilities from "@windijs/utilities";
import * as variants from "@windijs/variants";
import * as preact from "preact";
import { style as $style } from "@windijs/style";

declare global {
${utilities.map(i => `  const ${i}: typeof utilities.${i};`).join("\n")}
${variants.map(i => `  const ${i}: typeof variants.${i};`).join("\n")}
${styles
  .filter(String)
  .map(i => `  const ${i}: typeof $style["${i}"];`)
  .join("\n")}
  const h: typeof utilities.h & typeof preact.h;
  const style: typeof $style;
  const css: typeof helpers.css;
}
export {};
`;
monaco.languages.typescript.typescriptDefaults.addExtraLib(globalSource, globalUri);
export const globalModel = monaco.editor.createModel(globalSource, "typescript", monaco.Uri.parse(globalUri));

monaco.languages.typescript.typescriptDefaults.addExtraLib(
  `
import JSX = preact.JSXInternal;
declare const Component: typeof preact.Component;
declare const Fragment: typeof preact.Fragment;
declare const cloneElement: typeof preact.cloneElement;
declare const createContext: typeof preact.createContext;
declare const createElement: typeof preact.createElement;
declare const createRef: typeof preact.createRef;
// declare const h: typeof preact.h;
declare const hydrate: typeof preact.hydrate;
declare const isValidElement: typeof preact.isValidElement;
declare const options: typeof preact.options;
declare const render: typeof preact.render;
declare const toChildArray: typeof preact.toChildArray;
declare const useCallback: typeof preact.useCallback;
declare const useContext: typeof preact.useContext;
declare const useDebugValue: typeof preact.useDebugValue;
declare const useEffect: typeof preact.useEffect;
declare const useErrorBoundary: typeof preact.useErrorBoundary;
declare const useImperativeHandle: typeof preact.useImperativeHandle;
declare const useLayoutEffect: typeof preact.useLayoutEffect;
declare const useMemo: typeof preact.useMemo;
declare const useReducer: typeof preact.useReducer;
declare const useRef: typeof preact.useRef;
declare const useState: typeof preact.useState;
`,
  "file:///preact.d.ts"
);

const modelUri = monaco.Uri.file("main.tsx");
export const codeModel = monaco.editor.createModel(
  `import type { WindiColors } from "windijs";

function Counter() {
  const [value, setValue] = useState(0);
  const colors: WindiColors[] = ["blue", "purple", "pink", "red", "orange", "yellow", "green", "teal"];
  const btnStyle = [myBtn, bg.gray[400].opacity(60), hover(bg.gray[500].opacity(50)), dark(bg.stone[700], hover(bg.stone[500])), text.white];

  return (
    <div class={[marginTop.vh[35]]}>
      <div class={[bg[colors[Math.abs(value % 8)]][500].gradient, hocus(bg.opacity[90]), w.content.max, mx.auto, p[4], text.white, rounded.lg, userSelect.none]}>Counter: {value}</div>
      <div class={[layout.hstack, mt[4], space.x[4]]}>
        <button class={btnStyle} onClick={() => setValue(value + 1)}>Increment</button>
        <button class={btnStyle} onClick={() => setValue(value - 1)}>Decrement</button>
      </div>
    </div>
  );
}

render(<Counter />, document.getElementById("app"));
`,
  "typescript",
  modelUri // Pass the file name to the model here.
);

const configModel = monaco.editor.createModel(
  `import { css, baseColors, materialColors, defineConfig } from "windijs";

export default defineConfig({
  darkMode: "class",
  theme: {
    colors: {
      ...baseColors,
      ...materialColors
    }
  },
  utilities: {
    layout: {
      hstack: css({
        display: "flex",
        justifyContent: "center",    
      }),
      vstack: css({
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }),
    },
    myBtn: css({
      borderStyle: "none",
      cursor: "pointer",
      userSelect: "none",
      borderRadius: "9999px",
      padding: "0.5rem",
      "&:focus": {
        outline: "none",
      }
    })
  },
  variants: {
    hocus: "&:hover, &:focus"
  }
})`,
  "typescript",
  monaco.Uri.file("windi.config.ts")
);

let loaded = false;

export const htmlModel = monaco.editor.createModel("", "html", monaco.Uri.file("index.html"));
export const styleModel = monaco.editor.createModel("", "css", monaco.Uri.file("index.css"));
export const scriptModel = monaco.editor.createModel("", "javascript", monaco.Uri.file("index.js"));

const scopeMap = {
  "text.html.basic": "html",
  "source.css": "css",
  "source.ts": "TypeScriptReact",
  "source.js": "JavaScriptReact",
};

export async function useMonaco() {
  !loaded && (await loadWASM("/onigasm/onigasm.wasm"));

  loaded = true;

  const registry = new Registry({
    getGrammarDefinition: async scopeName => {
      return {
        format: "json",
        content: await (await fetch(`/grammars/${scopeMap[scopeName as keyof typeof scopeMap] ?? ""}.tmLanguage.json`)).text(),
      };
    },
  });

  // map of monaco "language id's" to TextMate scopeNames
  const grammars = new Map();
  grammars.set("css", "source.css");
  grammars.set("html", "text.html.basic");
  grammars.set("javascript", "source.js");
  grammars.set("typescript", "source.ts");

  // fix jsx completion
  monaco.languages.registerCompletionItemProvider("typescript", {
    triggerCharacters: [">"],
    provideCompletionItems: (model, position) => {
      const codePre = model.getValueInRange({
        startLineNumber: position.lineNumber,
        startColumn: 1,
        endLineNumber: position.lineNumber,
        endColumn: position.column,
      });

      /** @type { string | undefined } */
      const tag = codePre.match(/.*<(\w+)>$/)?.[1];

      /** @type { monaco.languages.CompletionItem[] } */
      const suggestions = [];

      if (tag) {
        const word = model.getWordUntilPosition(position);
        suggestions.push({
          label: `</${tag}>`,
          kind: monaco.languages.CompletionItemKind.EnumMember,
          insertText: "${0}</" + tag + ">",
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          range: {
            startLineNumber: position.lineNumber,
            endLineNumber: position.lineNumber,
            startColumn: word.startColumn,
            endColumn: word.endColumn,
          },
        });
      }

      return {
        suggestions,
      };
    },
  });

  monaco.editor.defineTheme("vs-dark-plus", vsDarkPlus as monaco.editor.IStandaloneThemeData);
  monaco.editor.defineTheme("vs-light-plus", vsLightPlus as monaco.editor.IStandaloneThemeData);

  const vsDarkPlusTransParent = { ...vsDarkPlus } as monaco.editor.IStandaloneThemeData;
  vsDarkPlusTransParent.colors["editorCursor.foreground"] = "#74C0FC";
  vsDarkPlusTransParent.colors["editor.background"] = "#00000000";
  vsDarkPlusTransParent.rules.push({ background: "#1C1C1E00" } as monaco.editor.ITokenThemeRule);
  vsDarkPlusTransParent.rules.push({ token: "meta.tag", foreground: "#d4d4d4" });

  const vsLightPlusTransParent = { ...vsLightPlus } as monaco.editor.IStandaloneThemeData;
  vsLightPlusTransParent.colors["editorCursor.foreground"] = "#2D7E98";
  vsLightPlusTransParent.colors["editor.background"] = "#00000000";
  vsLightPlusTransParent.rules.push({ background: "#F3F3F300" } as monaco.editor.ITokenThemeRule);
  vsLightPlusTransParent.rules.push({ token: "meta.tag", foreground: "#000000" });

  monaco.editor.defineTheme("vs-dark-plus-transparent", vsDarkPlusTransParent);
  monaco.editor.defineTheme("vs-light-plus-transparent", vsLightPlusTransParent);
  // "editor.lineHighlightBackground": "#2F3239D9",

  const editor = monaco.editor.create(document.getElementById("editor")!, {
    theme: document.querySelector("html.dark") ? "vs-dark-plus" : "vs-light-plus",
    // value: jsCode,
    language: "typescript",
    automaticLayout: true,
    padding: {
      top: 12,
    },
    suggest: {
      preview: true,
      previewMode: "subwordSmart",
    },
    quickSuggestions: {
      other: "on",
      strings: "on",
      comments: "on",
    },
    // bracketPairColorization: {
    //   enabled: true
    // },
    // matchBrackets: "always"
  });

  const configEditor = monaco.editor.create(document.getElementById("config")!, {
    theme: document.querySelector("html.dark") ? "vs-dark-plus-transparent" : "vs-light-plus-transparent",
    minimap: {
      enabled: false,
    },
    padding: {
      top: 16,
    },
    scrollbar: {
      vertical: "hidden",
      verticalHasArrows: false,
      verticalScrollbarSize: 0,
      verticalSliderSize: 0,
      horizontal: "hidden",
      horizontalHasArrows: false,
      horizontalScrollbarSize: 0,
      horizontalSliderSize: 0,
    },
    language: "typescript",
    automaticLayout: true,
    suggest: {
      preview: true,
      previewMode: "subwordSmart",
    },
    // bracketPairColorization: {
    //   enabled: true
    // },
    // matchBrackets: "always",
  });

  configEditor.setModel(configModel);

  editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyP, args => {
    editor.trigger(null, "editor.action.quickCommand", args);
  });

  editor.setModel(codeModel);

  const renderEditor = monaco.editor.create(document.getElementById("render-editor")!, {
    theme: document.querySelector("html.dark") ? "vs-dark-plus-transparent" : "vs-light-plus-transparent",
    automaticLayout: true,
    padding: {
      top: 12,
    },
    minimap: {
      enabled: false,
    },
    readOnly: true,
    suggest: {
      preview: true,
      previewMode: "subwordSmart",
    },
  });

  await wireTmGrammars(monaco, registry, grammars, editor);

  return { monaco, editor, renderEditor, configEditor };
}
