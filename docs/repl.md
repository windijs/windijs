---
layout: home
---

<script setup lang="ts">
import { useMonaco } from "$/monaco";
import { ref, onMounted, onUnmounted, onBeforeMount } from "vue";
import Split from "split.js";
import Iframe from "$/iframe";

// TODO: support windi.config
// TODO: support view generated css

let split;
let listener;
let tsProxy;
const script = ref("");
const isDark = ref(localStorage.getItem("vitepress-theme-appearance") !== "light");
const showConfig = ref(false);

onMounted(() => {
  useMonaco().then(({monaco, editor}) => {
    const updateScript = (proxy) => {
        tsProxy = proxy;
        proxy.getEmitOutput(editor.getModel().uri.toString()).then((r) => {
            script.value = r.outputFiles[0].text
        })
    }

    monaco.languages.typescript.getTypeScriptWorker().then(worker => worker(editor.getModel().uri).then(updateScript));
    editor.onDidChangeModelContent(e => updateScript(tsProxy))
    document.querySelector("button.VPSwitchAppearance")?.addEventListener("click", () => {
      isDark.value = document.querySelector("html.dark") != null;
      editor.updateOptions({
        theme: isDark.value ? "vs-dark-plus" : "vs-light-plus"
      })
    })
  });


  document.querySelector("body").style.overflow = "hidden";
  document.querySelector(".VPNav .container").style.maxWidth = "100%";

  listener = window.addEventListener("resize", () => {
    document.getElementById("render").style.display = window.outerWidth < 640 ? "none" : null;
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
</script>

<div id="repl">
  <div id="split">
    <div id="editor">
      <div v-show="showConfig" id="config" class="modal"></div>
    </div>
    <div id="render">
      <Iframe style="width: 100%; height: 100%;" :script="script" :dark="isDark"></Iframe>
    </div>
  </div>
</div>

<button class="btn-settings" :class="[rounded.full, bg.gray[100], text.gray[400], hover(text.gray[500]), dark(bg.dark[400], text.stone[700], hover(text.stone[600]))]" @click="showConfig = !showConfig">
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
  /* position: relative; */
  overflow-y: scroll;
  overflow-x: scroll;
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

.modal {
  position: absolute;
  left: 20%;
  top: 5%;
  z-index: 50;
  width: 60%;
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