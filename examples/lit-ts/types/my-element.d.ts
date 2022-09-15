import type { ColorStyleObject, WindiColors } from "windijs";

import WindiElement from "./base";

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
export declare class MyElement extends WindiElement {
  /**
   * Copy for the read the docs hint.
   */
  docsHint: string;
  /**
   * The number of times the button has been clicked.
   */
  count: number;
  button: ColorStyleObject[];
  colors: WindiColors[];
  render(): import("lit").TemplateResult<1>;
  private _onClick;
  static styles: import("lit").CSSResult[];
}
declare global {
  interface HTMLElementTagNameMap {
    "my-element": MyElement;
  }
}
