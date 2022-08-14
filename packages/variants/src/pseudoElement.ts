import { createVariant } from "@windi/core";

/**
 * Represents a styleable child pseudo-element immediately after the originating element’s actual content.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/::after)
 */
export const after = createVariant("&::after");

/**
 * Used to create a backdrop that hides the underlying document for an element in a top layer (such as an element that is displayed fullscreen).
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/::backdrop)
 */
// export const backdrop = createVariant("&::backdrop");

/**
 * Represents a styleable child pseudo-element immediately before the originating element’s actual content.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/::before)
 */
export const before = createVariant("&::before");

/**
 * Represents the first letter of an element, if it is not preceded by any other content (such as images or inline tables) on its line.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/::first-letter)
 */
export const firstLetter = createVariant("&::first-letter");

/**
 * Describes the contents of the first formatted line of its originating element.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/::first-line)
 */
export const firstLine = createVariant("&::first-line");

/**
 * The ::marker CSS pseudo-element selects the marker box of a list item, which typically contains a bullet or number. It works on any element or pseudo-element set to display: list-item, such as the \<li> and \<summary> elements.
 *
 * (Edge 86, Firefox 68, Safari 11.1, Chrome 86, Opera 72)
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/::marker)
 */
export const marker = createVariant("& *::marker, &::marker");

/**
 * Represents the portion of a document that has been highlighted by the user.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/::selection)
 */
export const selection = createVariant("& *::selection, &::selection");
