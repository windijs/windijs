import { atomic, nameStyle } from "windijs";

import { LitElement } from 'lit'
import type { StyleObject } from "windijs";

export default class WindiElement extends LitElement {
  private $buildedClasses: string[]

  constructor() {
    super()
    this.$buildedClasses = []
  }

  /**
   * Apply windi utilities, you can put in an Array or just use args directly.
   * @param { (string | StyleObject | (string | StyleObject | StyleObject[])[])[] } utilities string | utility
   * @returns { string } classNames joined with whitespace
   */
  apply(utilities: (string | StyleObject | StyleObject[])[]): string;
  apply(...utilities: (string | StyleObject | StyleObject[])[]): string;
  apply(...args: (string | StyleObject | (string | StyleObject | StyleObject[])[])[]): string {
    if (!this.shadowRoot) throw new Error("ShadowRoot not Found, maybe its not a LitElement?")

    let name;

    const names = [];
    const notBuilded = [];

    for (const utility of args.flat(2)) {
      if (typeof utility === "string") {
        names.push(utility)
      } else {
        name = nameStyle(utility);
        names.push(name);

        if (!this.$buildedClasses.includes(name)) {
          this.$buildedClasses.push(name)
          notBuilded.push(utility)
        }
      }
    }

    if (notBuilded.length > 0) {
      let el = this.shadowRoot.getElementById("windijs");
      const css = atomic(notBuilded);
      if (el) {
        el.textContent += "\n" + css
      } else {
        el = document.createElement("style");
        el.id = "windijs";
        el.textContent = css;
        this.shadowRoot.appendChild(el);
      }
    }

    return names.join(" ")
  }
}
