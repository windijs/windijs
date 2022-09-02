import './app.css'

import preactLogo from './assets/preact.svg'
import { useState } from 'preact/hooks'

export function App() {
  const [count, setCount] = useState(0)
  const [button, setButtonStyle] = useState([bg.pink[400]])
  /** @type {import("windijs").BootstrapColors} */
  const colors = ["red", "orange", "yellow", "green", "teal", "blue", "purple", "pink"]

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" class="logo" alt="Vite logo" />
        </a>
        <a href="https://preactjs.com" target="_blank">
          <img src={preactLogo} class={["logo", "preact", rounded.lg, bg.blue[400].opacity(20)]} alt="Preact logo" />
        </a>
      </div>
      <h1>Vite + Preact</h1>
      <div class="card">
        <button class={button} onClick={() => {
          setButtonStyle([bg[colors[count % 8]][400]])
          setCount((count) => count + 1)
        }}>
          count is {count}
        </button>
        <p>
          Edit <code>src/app.jsx</code> and save to test HMR
        </p>
      </div>
      <p class="read-the-docs">
        Click on the Vite and Preact logos to learn more
      </p>
    </>
  )
}
