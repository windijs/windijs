import './style.css'

import { bg } from "./windi"
import javascriptLogo from './javascript.svg'
import { lg } from 'windijs'
import { setupCounter } from './counter.js'

const logo = [ bg.yellow[400].opacity(30), lg(bg.green[400].opacity(40)) ]

document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo ${bg.indigo[500].opacity(50)}" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla ${logo}" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`

setupCounter(document.querySelector('#counter'))
