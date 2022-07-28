// @ts-check

import { bg } from "./windi";

export function setupCounter(/** @type {HTMLElement} */ element) {
  let counter = 0
  let btn = [bg.pink[400]]

  const colors = ["red", "orange", "yellow", "green", "teal", "blue", "purple", "pink"]
  const setCounter = (count) => {
    counter = count
    element.setAttribute("class", btn.toString())
    btn = [bg[colors[count % 8]][400]]
    element.innerHTML = `count is ${counter}`
  }
  element.addEventListener('click', () => setCounter(++counter))
  setCounter(0)
}
