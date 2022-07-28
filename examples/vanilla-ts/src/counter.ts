import { NestedColors } from "windijs"
import { bg } from "./windi"

export function setupCounter(element: HTMLButtonElement) {
  let counter = 0
  let btn = [bg.pink[400]]

  const colors: NestedColors[] = ["red", "orange", "yellow", "green", "teal", "blue", "purple", "pink"]
  const setCounter = (count: number) => {
    counter = count
    element.setAttribute("class", btn.toString())
    btn = [bg[colors[count % 8]][400]]
    element.innerHTML = `count is ${counter}`
  }
  element.addEventListener('click', () => setCounter(++counter))
  setCounter(0)
}
