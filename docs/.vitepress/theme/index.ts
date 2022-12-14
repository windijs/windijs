import "./custom.css";
import "./reset.css";

import { cssInJsLoader, hashNamer, useNamer, useStyleLoader } from "windijs";
import { mountCSS, ssrLoader } from "./loader";
import { onBeforeMount, onMounted } from "vue";

import DefaultTheme from "vitepress/theme";
import { Theme } from "vitepress";

useNamer(hashNamer);
useStyleLoader(ssrLoader);

export default {
  ...DefaultTheme,
  setup() {
    onBeforeMount(() => {
      mountCSS();
      useStyleLoader(cssInJsLoader);
    });
    onMounted(() => {
      // convert api page to external link, cause it's actually generated by typedoc.
      const el = [...document.querySelectorAll(".VPLink.link.VPNavBarMenuLink")].find(i => (i as HTMLElement).innerText.includes("API"));
      if (el) el.setAttribute("target", "_blank");
    });
  },
} as Theme;
