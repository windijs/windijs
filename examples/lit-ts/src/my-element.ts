import type { WindiColors, StyleObject, ColorStyleObject } from 'windijs'
import { html } from 'lit'
import { styles } from './styles.windi'
import { customElement, property } from 'lit/decorators.js'
import litLogo from './assets/lit.svg'
import WindiElement from './base'
import { bg } from "@windijs/utilities";

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('my-element')
export class MyElement extends WindiElement {
  /**
   * Copy for the read the docs hint.
   */
  @property()
  docsHint = 'Click on the Vite and Lit logos to learn more'

  /**
   * The number of times the button has been clicked.
   */
  @property({ type: Number })
  count = 0

  @property({ type: Array<StyleObject | (StyleObject|ColorStyleObject)[]> })
  button = [bg.pink[400]]

  @property({ type: Array<WindiColors> })
  colors: WindiColors[] = ["red", "orange", "yellow", "green", "teal", "blue", "purple", "pink"]

  render() {
    return html`
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" class="logo" alt="Vite logo" />
        </a>
        <a href="https://lit.dev" target="_blank">
          <img src=${litLogo} class=${this.apply("logo", "lit", bg.blue[400].opacity(20))} alt="Lit logo" />
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

  private _onClick() {
    this.button = [bg[this.colors[this.count % 8]][400]];

    this.count++
  }

  static styles = styles
}

declare global {
  interface HTMLElementTagNameMap {
    'my-element': MyElement
  }
}
