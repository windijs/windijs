import { WindiElement, bg } from "./windi"
import { css, html } from 'lit'

import litLogo from './assets/lit.svg'
import { styles } from "./styles.windi"

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
export class MyElement extends WindiElement {
  static get properties() {
    return {
      /**
       * Copy for the read the docs hint.
       */
      docsHint: { type: String },

      /**
       * The number of times the button has been clicked.
       */
      count: { type: Number },

      /**
       * The button style.
       */
      button: { type: Array }
    }
  }

  constructor() {
    super()
    this.docsHint = 'Click on the Vite and Lit logos to learn more'
    this.count = 0
    this.colors = ["red", "orange", "yellow", "green", "teal", "blue", "purple", "pink"]
    this.button = [bg.pink[400]]
  }

  render() {
    return html`
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" class="logo" alt="Vite logo" />
        </a>
        <a href="https://lit.dev" target="_blank">
          <img src=${litLogo} class=${this.apply(["logo", "lit", bg.blue[400].opacity(20)])} alt="Lit logo" />
        </a>
      </div>
      <slot></slot>
      <div class="card">
        <button class=${this.apply(this.button)} @click=${this._onClick} part="button">
          count is ${this.count}
        </button>
      </div>
      <p class="read-the-docs">${this.docsHint}</p>
    `
  }

  _onClick() {
    this.button = [bg[this.colors[this.count % 8]][400]];

    this.count++
  }

  static get styles() {
    return styles
  }
}

window.customElements.define('my-element', MyElement)
