import { defineComponent, h, onMounted, ref, toRefs, watchEffect } from "vue";

import srcdoc from "./srcdoc.html?raw";
import utilities from "./windijsUtilities.mjs?raw";
import { processCode } from "../shared";
import type { Config } from "windijs";

export default defineComponent({
  props: {
    dark: {
      type: Boolean,
      default: false,
    },
    script: {
      type: String,
      default: "",
    },
    rawScript: {
      type: String,
      default: "",
    },
    config: {
      type: String,
      default: "",
    },
    css: {
      type: String,
      default: "",
    },
    fixedCss: {
      type: String,
      default: "",
    },
    classes: {
      type: String,
      default: "",
    },
    html: {
      type: String,
      default: "Preview",
    },
  },
  emits: {
    updateConfig: (config: Config) => true,
  },
  setup(props, { emit }) {
    onMounted(createSandBox);

    const container = ref<HTMLElement | null>(null);
    const isReady = ref(false);
    const propRefs = toRefs(props);

    let sandbox: HTMLIFrameElement;

    function createSandBox() {
      if (sandbox) container.value?.removeChild(sandbox);

      sandbox = document.createElement("iframe");
      sandbox.setAttribute(
        "sandbox",
        [
          "allow-forms",
          "allow-modals",
          "allow-pointer-lock",
          "allow-popups",
          "allow-same-origin",
          "allow-scripts",
          "allow-top-navigation-by-user-activation",
        ].join(" ")
      );
      sandbox.srcdoc = srcdoc.replace(
        /(var\s+utilitiesRuntime\s*=\s*)[^;]+/,
        "$1" + JSON.stringify(processCode(utilities).replace(/var\s+(h)\s*=\s*/, "var windiH = "))
      );
      sandbox.style.width = "100%";
      sandbox.style.height = "100%";
      sandbox.style.background = "transparent";
      container.value?.appendChild(sandbox);
      sandbox.addEventListener("load", () => {
        Object.defineProperty(sandbox.contentWindow, "$$vueEmit", { value: emit });
        isReady.value = true;
      });
    }

    for (const key of Object.keys(propRefs) as (keyof typeof propRefs)[]) {
      watchEffect(() => {
        if (!isReady.value) return;
        sandbox?.contentWindow?.postMessage(
          JSON.stringify({
            [key]: propRefs[key].value,
            ...(key === "dark" ? { script: propRefs.script.value, rawScript: propRefs.rawScript.value } : {}), // force update when toggle darkMode
            ...(key === "config" ? { script: propRefs.script.value, rawScript: propRefs.rawScript.value } : {}), // force update when config changes
          }),
          location.origin
        );
      });
    }

    watchEffect(() => {
      if (!isReady.value) return;
      sandbox.contentWindow?.document?.querySelector("html")?.classList?.toggle("dark", props.dark);
    });

    return () =>
      h("div", {
        ref: container,
        class: "preview-container",
      });
  },
});
