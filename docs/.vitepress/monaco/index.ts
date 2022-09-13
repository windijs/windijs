import * as monaco from "monaco-editor";

import { Registry } from 'monaco-textmate' // peer dependency
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import libSource from "../windi-global.d.ts?raw";
import { loadWASM } from 'onigasm' // peer dependency of 'monaco-textmate'
import preactSource from "./preact.d.ts?raw";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";
import vsDarkPlus from "./themes/dark_plus.json";
import vsLightPlus from "./themes/light_plus.json";
import { wireTmGrammars } from 'monaco-editor-textmate'

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
  jsx: monaco.languages.typescript.JsxEmit.React,
  jsxFactory: "preact.h",
  // jsxImportSource: "preact",
  jsxFragmentFactory: "Fragment",
  allowJs: true,
});

// monaco.languages.registerCompletionItemProvider("typescript", {
//   triggerCharacters: ["."],
//   provideCompletionItems(model, position, context, token) {

//   },
// })

// const libSource = [
// 	'declare class Facts {',
// 	'    /**',
// 	'     * Returns the next fact',
// 	'     */',
// 	'    static next():string',
// 	'}'
// ].join('\n');
const libUri = 'ts:filename/windi.d.ts';
monaco.languages.typescript.typescriptDefaults.addExtraLib(libSource, libUri);
monaco.editor.createModel(libSource, 'typescript', monaco.Uri.parse(libUri));


const preactLibUri = 'ts:filename/preact.d.ts';
monaco.languages.typescript.typescriptDefaults.addExtraLib(preactSource, preactLibUri);
monaco.editor.createModel(preactSource, 'typescript', monaco.Uri.parse(preactLibUri));

monaco.languages.typescript.typescriptDefaults.addExtraLib(`
import JSX = preact.JSXInternal;
declare const Component: typeof preact.Component;
declare const Fragment: typeof preact.Fragment;
declare const cloneElement: typeof preact.cloneElement;
declare const createContext: typeof preact.createContext;
declare const createElement: typeof preact.createElement;
declare const createRef: typeof preact.createRef;
declare const h: typeof preact.h;
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
`)

const modelUri = monaco.Uri.file("main.tsx")
export const codeModel = monaco.editor.createModel(
  `
  function Counter() {
    const [value, setValue] = useState(0);

    return (
      <>
        <div>Counter: {value}</div>
        <button onClick={() => setValue(value + 1)}>Increment</button>
        <button onClick={() => setValue(value - 1)}>Decrement</button>
      </>
    );
  }

  render(<Counter />, document.getElementById('app'));
  `,
  "typescript",
  modelUri // Pass the file name to the model here.
);

const configModel = monaco.editor.createModel(`/* windi.config.ts */
export default defineConfig({

})`, "typescript", monaco.Uri.file("windi.config.ts"));

let loaded = false;

export async function useMonaco() {
  !loaded && await loadWASM("/onigasm/onigasm.wasm");

  loaded = true;

  const registry = new Registry({
    getGrammarDefinition: async (scopeName) => {
      return {
        format: 'json',
        content: await (await fetch(`/grammars/${scopeName === "source.js" ? "JavaScript" : scopeName === "source.ts" ? "TypeScriptReact" : ""}.tmLanguage.json`)).text()
      }
    }
  })

  // map of monaco "language id's" to TextMate scopeNames
  const grammars = new Map()
  // grammars.set('css', 'source.css')
  // grammars.set('html', 'text.html.basic')
  grammars.set("javascript", "source.js")
  grammars.set('typescript', 'source.ts')

  // @ts-ignore
  monaco.editor.defineTheme('vs-dark-plus', vsDarkPlus);
  // @ts-ignore
  monaco.editor.defineTheme('vs-light-plus', vsLightPlus);

  const vsDarkPlusTransParent = { ...vsDarkPlus };
  vsDarkPlusTransParent.colors["editorCursor.foreground"] = "#74C0FC";
  vsDarkPlusTransParent.colors["editor.background"] = "#00000000";
  vsDarkPlusTransParent.rules.push({ "background": "#1C1C1E00" });

  const vsLightPlusTransParent = { ...vsLightPlus };
  vsLightPlusTransParent.colors["editorCursor.foreground"] = "#2D7E98";
  vsLightPlusTransParent.colors["editor.background"] = "#00000000";
  vsLightPlusTransParent.rules.push({ "background": "#F3F3F300" });

  monaco.editor.defineTheme('vs-dark-plus-transparent', vsDarkPlusTransParent);
  monaco.editor.defineTheme('vs-light-plus-transparent', vsLightPlusTransParent);
  // "editor.lineHighlightBackground": "#2F3239D9",

  const editor = monaco.editor.create(document.getElementById('editor'), {
    theme: document.querySelector("html.dark") ? 'vs-dark-plus' : 'vs-light-plus',
    // value: jsCode,
    language: "typescript",
    automaticLayout: true,
    suggest: {
      preview: true,
      previewMode: "subwordSmart",
    }
    // bracketPairColorization: true
  });

  const configEditor = monaco.editor.create(document.getElementById('config'), {
    theme: document.querySelector("html.dark") ? 'vs-dark-plus-transparent' : 'vs-light-plus-transparent',
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
      // enabled: true,
    // }
  });

  configEditor.setModel(configModel);

  editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyP, (args) => {
    editor.trigger(null, "editor.action.quickCommand", args);
  });

  editor.setModel(codeModel);

  await wireTmGrammars(monaco, registry, grammars, editor)

  return { monaco, editor }
}
