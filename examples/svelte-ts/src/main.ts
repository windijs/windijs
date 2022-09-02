import './app.css'

import { cssInJsLoader, useArrayHelper, useStyleLoader } from 'windijs'

import App from './App.svelte'

useArrayHelper();
useStyleLoader(cssInJsLoader);

const app = new App({
  target: document.getElementById('app')
})

export default app
