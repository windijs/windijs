---
layout: home
---

<script setup lang="ts">
import { useMonaco, htmlModel, styleModel, scriptModel } from "$/monaco";
import { ref, onMounted, onUnmounted, onBeforeMount, getCurrentInstance } from "vue";
import Split from "split.js";
import Iframe from "$/iframe";

// TODO: support windi.config

let split;
let listener;
let tsProxy;
let renderEditor;
let currentTab: -1 | 0 | 1 | 2 = -1;
const script = ref("");
const isDark = ref(localStorage.getItem("vitepress-theme-appearance") !== "light");
const showConfig = ref(false);
const showRenderEditor = ref(false);
const btnStyle = [rounded.full, bg.gray[100], text.gray[400], hover(text.gray[500]), dark(bg.dark[400], text.stone[600], hover(text.stone[500]))];

onMounted(() => {
  useMonaco().then(({monaco, editor, renderEditor: _renderEditor}) => {
    renderEditor = _renderEditor
    const updateScript = (proxy) => {
        tsProxy = proxy;
        proxy.getEmitOutput(editor.getModel().uri.toString()).then((r) => {
          script.value = r.outputFiles[0].text.replace(/export\s+{};?/, "");
          setTimeout(() => updateRender(currentTab), 10);
        })
    }

    monaco.languages.typescript.getTypeScriptWorker().then(worker => worker(editor.getModel().uri).then(updateScript));
    editor.onDidChangeModelContent(e => updateScript(tsProxy))
    document.querySelector("button.VPSwitchAppearance")?.addEventListener("click", () => {
      isDark.value = document.querySelector("html.dark") != null;
      editor.updateOptions({
        theme: isDark.value ? "vs-dark-plus" : "vs-light-plus"
      });
    })
  });


  document.querySelector("body").style.overflow = "hidden";
  document.querySelector(".VPNav .container").style.maxWidth = "100%";

  listener = window.addEventListener("resize", () => {
    const render = document.getElementById("render");
    if (render) render.style.display = window.outerWidth < 640 ? "none" : null;
  })

  split = Split(["#editor", "#render"], {
    gutterSize: 10,
    sizes: [61.8, 38.2],
    minSize: [0, 0],
    gutterAlign: "center",
    onDrag: (sizes) => {
      if (window.outerWidth < 640) {
        document.getElementById("render").style.display = null;
      }

      document.querySelector(".monaco-editor").style.display = sizes[0] < 1 ? "none" : null;
    },
  })
})

onUnmounted(() => {
  document.querySelector("body").style.overflow = null;
  document.querySelector(".VPNav .container").style.maxWidth = null;

  split.destroy();
  window.removeEventListener("resize", listener);
});

function updateRender(tab: number = -1 | 0 | 1 | 2) {
  currentTab = tab;
  if (tab === 0) {
    htmlModel.setValue(window.frames[0].document.getElementById("app").innerHTML.replace(/></g, ">\n<").replace(/></g, ">\n<"));
    if (renderEditor) {
      renderEditor.setModel(htmlModel);
      renderEditor.updateOptions({ readOnly: false });
      renderEditor.getAction('editor.action.formatDocument').run().then(() => renderEditor.updateOptions({ readOnly: true }));
    }
    showRenderEditor.value = true;
  } else if (tab === 1) {
    styleModel.setValue(window.frames[0].document.getElementById("windijs")?.innerHTML.replace(/^\s*/, "") ?? "");
    if (renderEditor) renderEditor.setModel(styleModel);
    showRenderEditor.value = true;
  } else if (tab === 2) {
    scriptModel.setValue(script.value);
    if (renderEditor) renderEditor.setModel(scriptModel);;
    showRenderEditor.value = true;
  }
}

function hideRenderEditor (tab) {
  if (showRenderEditor.value && currentTab === tab) {
    currentTab = -1;
    showRenderEditor.value = false;
    return true;
  }
  return false;
}
</script>

<div id="repl">
  <div id="split">
    <div id="editor">
      <div v-show="showConfig" id="config" class="modal"></div>
    </div>
    <div id="render">
      <Iframe style="width: 100%; height: 100%;" :script="script" :dark="isDark"></Iframe>
      <div v-show="showRenderEditor" id="render-editor"></div>
      <div class="render-btns" :class="[space.x[2]]">
        <button class="btn-html" :class="btnStyle" @click="hideRenderEditor(0) || updateRender(0)">
          <svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12,17.56L16.07,16.43L16.62,10.33H9.38L9.2,8.3H16.8L17,6.31H7L7.56,12.32H14.45L14.22,14.9L12,15.5L9.78,14.9L9.64,13.24H7.64L7.93,16.43L12,17.56M4.07,3H19.93L18.5,19.2L12,21L5.5,19.2L4.07,3Z" /></svg>
        </button>
        <button class="btn-style" :class="btnStyle" @click="hideRenderEditor(1) || updateRender(1)">
          <svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M5,3L4.35,6.34H17.94L17.5,8.5H3.92L3.26,11.83H16.85L16.09,15.64L10.61,17.45L5.86,15.64L6.19,14H2.85L2.06,18L9.91,21L18.96,18L20.16,11.97L20.4,10.76L21.94,3H5Z" /></svg>
        </button>
        <button class="btn-script" :class="btnStyle" @click="hideRenderEditor(2) || updateRender(2)">
        <svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M3,3H21V21H3V3M7.73,18.04C8.13,18.89 8.92,19.59 10.27,19.59C11.77,19.59 12.8,18.79 12.8,17.04V11.26H11.1V17C11.1,17.86 10.75,18.08 10.2,18.08C9.62,18.08 9.38,17.68 9.11,17.21L7.73,18.04M13.71,17.86C14.21,18.84 15.22,19.59 16.8,19.59C18.4,19.59 19.6,18.76 19.6,17.23C19.6,15.82 18.79,15.19 17.35,14.57L16.93,14.39C16.2,14.08 15.89,13.87 15.89,13.37C15.89,12.96 16.2,12.64 16.7,12.64C17.18,12.64 17.5,12.85 17.79,13.37L19.1,12.5C18.55,11.54 17.77,11.17 16.7,11.17C15.19,11.17 14.22,12.13 14.22,13.4C14.22,14.78 15.03,15.43 16.25,15.95L16.67,16.13C17.45,16.47 17.91,16.68 17.91,17.26C17.91,17.74 17.46,18.09 16.76,18.09C15.93,18.09 15.45,17.66 15.09,17.06L13.71,17.86Z" /></svg>
        </button>
      </div>
    </div>
  </div>
</div>

<button class="btn-settings" :class="btnStyle" @click="showConfig = !showConfig">
  <svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M19.14 12.94c.04-.3.06-.61.06-.94c0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.488.488 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6s3.6 1.62 3.6 3.6s-1.62 3.6-3.6 3.6z"/></svg>
</button>

<style>
#repl {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
}

#split {
  height: 100%;
  display: flex;
  flex-direction: row;
}

#editor {
  position: relative;
  flex: 1;
  overflow: hidden;
  background-color: #FCFCFC;
}

.dark #editor {
  background-color: #1E1E1E !important;
}

#render {
  position: relative;
  overflow-y: scroll;
  overflow-x: scroll;
}

#render-editor {
  width: 100%;
  height: 100%;
  position: absolute;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  top: 0;
  left:0;
  z-index: 10;
  background-color: rgba(252, 252, 252, 0.5);
}

.dark #render-editor {
  background-color: rgba(30, 30, 30, 0.5) !important;
}

.gutter {
  margin-bottom: 10rem;
  margin-left: -12.25px;
  z-index: 10;
  background-color: transparent;
  background-repeat: no-repeat;
  background-position: 50%;
}

.gutter.gutter-horizontal {
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAIklEQVQoU2M4c+bMfxAGAgYYmwGrIIiDjrELjpo5aiZeMwF+yNnOs5KSvgAAAABJRU5ErkJggg==');
  cursor: col-resize;
}

.btn-settings {
  position: fixed;
  left: 0;
  bottom: 0;
  margin-left: 1rem;
  margin-bottom: 1rem;
}

.render-btns {
  position: absolute;
  top: calc(100vh - 6rem);
  left: 0.3rem;
  z-index: 100;
}

@media (min-width: 960px) {
  .render-btns {
    top: calc(100vh - 7rem);
  }
}

.modal {
  position: absolute;
  left: 15%;
  top: 5%;
  z-index: 50;
  width: 70%;
  height: 80%;
  border-radius: 1rem;
  border: #DCDCDC 1px solid;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

.dark .modal {
  border: #383838 1px solid;
}
</style>