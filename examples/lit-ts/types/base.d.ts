import { LitElement } from "lit";
import type { StyleObject } from "windijs";

export default class WindiElement extends LitElement {
  private $buildedClasses;
  constructor();
  /**
   * Apply windi utilities, you can put in an Array or just use args directly.
   * @param { (string | StyleObject | (string | StyleObject | StyleObject[])[])[] } utilities string | utility
   * @returns { string } classNames joined with whitespace
   */
  apply(utilities: (string | StyleObject | StyleObject[])[]): string;
  apply(...utilities: (string | StyleObject | StyleObject[])[]): string;
}
