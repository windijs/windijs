import './app.css'

import type { BootstrapColors } from 'windijs'
import preactLogo from './assets/preact.svg'
import { useState } from 'preact/hooks'

export function App() {
  const [count, setCount] = useState(0)
  const [button, setButtonStyle] = useState([bg.pink[400]])
  const colors: BootstrapColors[] = ["red", "orange", "yellow", "green", "teal", "blue", "purple", "pink"]

  const logo = [rounded.xl, m[4]]

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" class={["logo", logo, bg.purple[400].opacity(20)].toString()} alt="Vite logo" />
        </a>
        <a href="https://preactjs.com" target="_blank">
          {/* TODO: same problem with react, can we make class support Array? */}
          <img src={preactLogo} class={["logo", "preact", logo, bg.blue[400].opacity(20)].toString()} alt="Preact logo" />
        </a>
      </div>
      <h1>Vite + Preact</h1>
      <div class="card">
        <button class={button.toString()} onClick={() => {
          setButtonStyle([bg[colors[count % 8]][400]])
          setCount((count) => count + 1)
        }}>
          count is {count}
        </button>
        <p>
          Edit <code>src/app.tsx</code> and save to test HMR
        </p>
      </div>
      <p class="read-the-docs">
        Click on the Vite and Preact logos to learn more
      </p>
    </>
  )
}
