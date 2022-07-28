// @ts-check

import { atomic, backgroundColor, colors, createUtility, nameStyle } from "windijs";

import { LitElement } from 'lit'

export const bg = createUtility("bg")
  .use(backgroundColor(colors))
  .init();

export class WindiElement extends LitElement {
  constructor() {
    super()
    this.$buildedClasses = []
  }

  /**
   * Apply windi utilities, you can put in an Array or just use args directly.
   * @typedef { import("windijs").StyleObject } StyleObject
   * @param { (string | StyleObject | (string | StyleObject | StyleObject[])[])[] } utilities
   * @returns { string } classNames joined with whitespace
   */
  apply(...utilities) {
    if (!this.shadowRoot) throw new Error("ShadowRoot not Found, maybe its not a LitElement?")

    let name;

    const names = [];
    const notBuilded = [];

    for (const utility of utilities.flat(2)) {
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
        const el = document.createElement("style");
        el.id = "windijs";
        el.textContent = css;
        this.shadowRoot.appendChild(el);
      }
    }

    return names.join(" ")
  }
}
