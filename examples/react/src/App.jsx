import './App.css'

import { bg } from './windi'
import reactLogo from './assets/react.svg'
import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)
  const [button, setButtonStyle] = useState([bg.pink[400]])
  /** @type {import("windijs").NestedColors} */
  const colors = ["red", "orange", "yellow", "green", "teal", "blue", "purple", "pink"]

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className={["logo", "react", bg.blue[400].opacity(20)]} alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div>
        <button className={button} onClick={() => {
          setButtonStyle([bg[colors[count % 8]][400]])
          setCount((count) => count + 1)
        }}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
