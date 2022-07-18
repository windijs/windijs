import { VariantBuilder } from "../types";
import { useVariant } from "./base";

/**
 * Represents a styleable child pseudo-element immediately after the originating element’s actual content.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/::after)
 */
export const after: VariantBuilder = (...utilities) => useVariant("&::after", utilities);

/**
 * Used to create a backdrop that hides the underlying document for an element in a top layer (such as an element that is displayed fullscreen).
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/::backdrop)
 */
export const backdrop: VariantBuilder = (...utilities) => useVariant("&::backdrop", utilities);

/**
 * Represents a styleable child pseudo-element immediately before the originating element’s actual content.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/::before)
 */
export const before: VariantBuilder = (...utilities) => useVariant("&::before", utilities);

/**
 * Represents the first letter of an element, if it is not preceded by any other content (such as images or inline tables) on its line.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/::first-letter)
 */
export const firstLetter: VariantBuilder = (...utilities) => useVariant("&::first-letter", utilities);

/**
 * Describes the contents of the first formatted line of its originating element.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/::first-line)
 */
export const firstLine: VariantBuilder = (...utilities) => useVariant("&::first-line", utilities);

/**
 * The ::marker CSS pseudo-element selects the marker box of a list item, which typically contains a bullet or number. It works on any element or pseudo-element set to display: list-item, such as the \<li> and \<summary> elements.
 *
 * (Edge 86, Firefox 68, Safari 11.1, Chrome 86, Opera 72)
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/::marker)
 */
export const marker: VariantBuilder = (...utilities) => useVariant("& *::marker, &::marker", utilities);

/**
 * Represents the portion of a document that has been highlighted by the user.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/::selection)
 */
export const selection: VariantBuilder = (...utilities) => useVariant("& *::selection, &::selection", utilities);
