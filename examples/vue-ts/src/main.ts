import "./style.css";

import { createApp } from "vue";

import { cssInJsLoader, useStyleLoader } from "windijs";

import App from "./App.vue";

useStyleLoader(cssInJsLoader);

createApp(App).mount("#app");
