import './index.css'

import { cssInJsLoader, useArrayHelper, useStyleLoader } from 'windijs'

import { App } from './app'
import { render } from 'preact'

useArrayHelper()
useStyleLoader(cssInJsLoader)

render(<App />, document.getElementById('app'))
