import './style.css'

import { bg } from "./windi"
import { lg } from 'windijs'
import { setupCounter } from './counter'
import typescriptLogo from './typescript.svg'

const logo = [ bg.blue[400].opacity(30), lg(bg.green[400].opacity(40)) ]

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo ${bg.indigo[500].opacity(50)}" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla ${logo}" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
