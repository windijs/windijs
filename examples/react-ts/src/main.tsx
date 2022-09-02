import './index.css'

import { cssInJsLoader, useArrayHelper, useStyleLoader } from 'windijs'

import App from './App'
import React from 'react'
import ReactDOM from 'react-dom/client'

useArrayHelper();
useStyleLoader(cssInJsLoader);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
