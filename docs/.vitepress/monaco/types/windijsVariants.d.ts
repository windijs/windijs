import { VariantBuilder } from "@windijs/helpers";
/**
 * Same as :nth-child(1). Represents an element that is the first child of some other element.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/:first-child)
 */
export declare const first: VariantBuilder;
/**
 * Same as :nth-last-child(1). Represents an element that is the last child of some other element.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/:last-child)
 */
export declare const last: VariantBuilder;
/**
 * Same as :nth-of-type(even)
 *
 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-of-type)
 */
export declare const evenOfType: VariantBuilder;
/**
 * Same as :nth-of-type(odd)
 *
 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-of-type)
 */
export declare const oddOfType: VariantBuilder;
/**
 * Applies to the one or more UI elements that are the default among a set of similar elements. Typically applies to context menu items, buttons, and select lists/menus.
 *
 * (Edge 79, Firefox 4, Safari 5, Chrome 10, Opera 10)
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/:default)
 */
export declare const $default: VariantBuilder;
/**
 * Same as :not(:first-child).
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/:first-child)
 */
export declare const notFirst: VariantBuilder;
/**
 * Same as :not(:last-child).
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/:last-child)
 */
export declare const notLast: VariantBuilder;
/**
 * Same as :nth-child(odd), Represents the odd elements of its parent.
 *
 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-child)
 */
export declare const odd: VariantBuilder;
/**
 * Same as :nth-child(even), Represents the even elements of its parent.
 *
 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-child)
 */
export declare const even: VariantBuilder;
export declare const visited: VariantBuilder, checked: VariantBuilder, disabled: VariantBuilder, focusWithin: VariantBuilder, hover: VariantBuilder, focus: VariantBuilder, focusVisible: VariantBuilder, active: VariantBuilder, link: VariantBuilder, target: VariantBuilder, notChecked: VariantBuilder, enabled: VariantBuilder, indeterminate: VariantBuilder, invalid: VariantBuilder, valid: VariantBuilder, optional: VariantBuilder, required: VariantBuilder, placeholderShown: VariantBuilder, readOnly: VariantBuilder, readWrite: VariantBuilder, notDisabled: VariantBuilder, firstOfType: VariantBuilder, notFirstOfType: VariantBuilder, lastOfType: VariantBuilder, notLastOfType: VariantBuilder, onlyChild: VariantBuilder, notOnlyChild: VariantBuilder, onlyOfType: VariantBuilder, notOnlyOfType: VariantBuilder, root: VariantBuilder, empty: VariantBuilder;
/**
 * Represents a styleable child pseudo-element immediately after the originating element’s actual content.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/::after)
 */
export declare const after: VariantBuilder;
/**
 * Used to create a backdrop that hides the underlying document for an element in a top layer (such as an element that is displayed fullscreen).
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/::backdrop)
 */
/**
 * Represents a styleable child pseudo-element immediately before the originating element’s actual content.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/::before)
 */
export declare const before: VariantBuilder;
/**
 * Represents the first letter of an element, if it is not preceded by any other content (such as images or inline tables) on its line.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/::first-letter)
 */
export declare const firstLetter: VariantBuilder;
/**
 * Describes the contents of the first formatted line of its originating element.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/::first-line)
 */
export declare const firstLine: VariantBuilder;
/**
 * The ::marker CSS pseudo-element selects the marker box of a list item, which typically contains a bullet or number. It works on any element or pseudo-element set to display: list-item, such as the \<li> and \<summary> elements.
 *
 * (Edge 86, Firefox 68, Safari 11.1, Chrome 86, Opera 72)
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/::marker)
 */
export declare const marker: VariantBuilder;
/**
 * Represents the portion of a document that has been highlighted by the user.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/::selection)
 */
export declare const selection: VariantBuilder;
/**
 * Targets an element when a marked parent matches the hover pseudo-class.
 */
export declare const groupHover: VariantBuilder;
/**
 * Targets an element when a marked parent matches the focus pseudo-class.
 */
export declare const groupFocus: VariantBuilder;
/**
 * Targets an element when a marked parent matches the active pseudo-class.
 */
export declare const groupActive: VariantBuilder;
/**
 * Targets an element when a marked parent matches the visited pseudo-class.
 */
export declare const groupVisited: VariantBuilder;
/**
 * Targets svg nodes.
 */
export declare const svg: VariantBuilder;
/**
 * Target all nodes.
 */
export declare const all: VariantBuilder;
/**
 * Targets children nodes.
 */
export declare const children: VariantBuilder;
/**
 * Targets siblings nodes.
 */
export declare const siblings: VariantBuilder;
/**
 * Targets first sibling node.
 */
export declare const sibling: VariantBuilder;
/**
 * Enable utility when the screen width is greater than 640px
 */
export declare const sm: VariantBuilder;
/**
 * Enable utility when the screen width is greater than 768px
 */
export declare const md: VariantBuilder;
/**
 * Enable utility when the screen width is greater than 1024px
 */
export declare const lg: VariantBuilder;
/**
 * Enable utility when the screen width is greater than 120px
 */
export declare const xl: VariantBuilder;
/**
 * Enable utility when the screen width is greater than 1536px
 */
export declare const xxl: VariantBuilder;
/**
 * Enable utility when the screen width is less than 640px
 */
export declare const _sm: VariantBuilder;
/**
 * Enable utility when the screen width is less than 640px
 */
export declare const _md: VariantBuilder;
/**
 * Enable utility when the screen width is less than 640px
 */
export declare const _lg: VariantBuilder;
/**
 * Enable utility when the screen width is less than 640px
 */
export declare const _xl: VariantBuilder;
/**
 * Enable utility when the screen width is less than 640px
 */
export declare const _xxl: VariantBuilder;
/**
 * Enable utility when the screen width is greater than 640px and less than 768px
 */
export declare const $sm: VariantBuilder;
/**
 * Enable utility when the screen width is greater than 768px and less than 1024px
 */
export declare const $md: VariantBuilder;
/**
 * Enable utility when the screen width is greater than 1024px and less than 1280px
 */
export declare const $lg: VariantBuilder;
/**
 * Enable utility when the screen width is greater than 1280px and less than 1536px
 */
export declare const $xl: VariantBuilder;
/**
 * Enable utility when the screen width is greater than 1536px
 */
export declare const $xxl: VariantBuilder;
/**
 * Targets the prefers-reduced-motion: no-preference media query.
 */
export declare const motionSafe: VariantBuilder;
/**
 * Targets the prefers-reduced-motion: reduce media query.
 */
export declare const motionReduce: VariantBuilder;
/**
 * Enable utility when the system turns on dark mode
 */
export declare const dark: VariantBuilder;
/**
 * Enable utility when the system turns on light mode
 */
export declare const light: VariantBuilder;
/**
 * Enable utility base on application dark mode
 */
export declare const $dark: VariantBuilder;
/**
 * Enable utility base on application light mode
 */
export declare const $light: VariantBuilder;
/**
 * Enable utility when the device is in portrait orientation
 */
export declare const portrait: VariantBuilder;
/**
 * Enable utility when the device is in landscape orientation
 */
export declare const landscape: VariantBuilder;
/**
 * Enable utility when text is written from left to right.
 */
export declare const ltr: VariantBuilder;
/**
 * Enable utility when text is written from right to left.
 */
export declare const rtl: VariantBuilder;
