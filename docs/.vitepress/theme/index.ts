import "./custom.css";
import "./reset.css";

import { onBeforeMount } from "vue";

import { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import { cssInJsLoader, hashNamer, useNamer, useStyleLoader } from "windijs";

import { mountCSS, ssrLoader } from "./loader";

useNamer(hashNamer);
useStyleLoader(ssrLoader);

export default {
  ...DefaultTheme,
  setup() {
    onBeforeMount(() => {
      mountCSS();
      useStyleLoader(cssInJsLoader);
    });
  },
} as Theme;
