import './style.css'

import { cssInJsLoader, useStyleLoader } from 'windijs'

import App from './App.vue'
import { createApp } from 'vue'

useStyleLoader(cssInJsLoader)

createApp(App).mount('#app')
