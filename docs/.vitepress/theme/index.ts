import './custom.css'

import { cssInJsLoader, useStyleLoader } from 'windijs';

import DefaultTheme from 'vitepress/theme'
import { Theme } from 'vitepress'
import { mountCSS } from './loader';
import { onBeforeMount } from 'vue';

export default {
  ...DefaultTheme,
  enhanceApp({ app, router, siteData }) {
    // ctx.app.component('VueClickAwayExample', VueClickAwayExample)
  },
  setup() {
    onBeforeMount(() => {
      mountCSS();
      useStyleLoader(cssInJsLoader);
  })
  },
} as Theme;
