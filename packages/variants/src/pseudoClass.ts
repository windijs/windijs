import type { VariantBuilder } from "@windijs/helpers";
import { camelToDash } from "@windijs/shared";
import { createVariant } from "@windijs/core";
import { useProxy } from "@windijs/helpers";

// TODO: the document of variants need to be improved.

interface PseudoClassVariants {
  /**
   * Represents user interface elements that are in a disabled state; such elements have a corresponding enabled state.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/:disabled)
   */
  disabled: VariantBuilder,
  /**
   * Applies once the link has been visited by the user.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/:visited)
   */
  visited: VariantBuilder,
  /**
   * Radio and checkbox elements can be toggled by the user. Some menu items are 'checked' when the user selects them. When such elements are toggled 'on' the :checked pseudo-class applies.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/:checked)
   */
  checked: VariantBuilder,
  /**
   * The :focus-within pseudo-class applies to any element for which the :focus pseudo class applies as well as to an element whose descendant in the flat tree (including non-element nodes, such as text nodes) matches the conditions for matching :focus.
   *
   * (Edge 79, Firefox 52, Safari 10.1, Chrome 60, Opera 47)
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/:focus-within)
   */
  focusWithin: VariantBuilder,
  /**
   * Applies while the user designates an element with a pointing device, but does not necessarily activate it. For example, a visual user agent could apply this pseudo-class when the cursor (mouse pointer) hovers over a box generated by the element.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/:hover)
   */
  hover: VariantBuilder,
  /**
   * Applies while an element has the focus (accepts keyboard or mouse events, or other forms of input).
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/:focus)
   */
  focus: VariantBuilder,
  /**
   * The :focus-visible pseudo-class applies while an element matches the :focus pseudo-class and the UA determines via heuristics that the focus should be made evident on the element.
   *
   * (Edge 86, Firefox 85, Safari 15.4, Chrome 86, Opera 72)
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/:focus-visible)
   */
  focusVisible: VariantBuilder,
   /**
   * Applies while an element is being activated by the user. For example, between the times the user presses the mouse button and releases it.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/:active)
   */
  active: VariantBuilder,
  /**
   * Applies to links that have not yet been visited.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/:link)
   */
  link: VariantBuilder,
  /**
   * Some URIs refer to a location within a resource. This kind of URI ends with a 'number sign' (#) followed by an anchor identifier (called the fragment identifier).
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/:target)
   */
  target: VariantBuilder,
  /**
   * Same as :not(:checked)
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/:checked)
   */
  notChecked: VariantBuilder,
  /**
   * Represents user interface elements that are in an enabled state; such elements have a corresponding disabled state.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/:enabled)
   */
  enabled: VariantBuilder,
  /**
   * Applies to UI elements whose value is in an indeterminate state.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/:indeterminate)
   */
  indeterminate: VariantBuilder,
  /**
   * An element is :valid or :invalid when it is, respectively, valid or invalid with respect to data validity semantics defined by a different specification.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/:invalid)
   */
  invalid: VariantBuilder,
   /**
   * An element is :valid or :invalid when it is, respectively, valid or invalid with respect to data validity semantics defined by a different specification.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/:valid)
   */
  valid: VariantBuilder,
  /**
   * A form element is :required or :optional if a value for it is, respectively, required or optional before the form it belongs to is submitted. Elements that are not form elements are neither required nor optional.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/:optional)
   */
  optional: VariantBuilder,
  /**
   * A form element is :required or :optional if a value for it is, respectively, required or optional before the form it belongs to is submitted. Elements that are not form elements are neither required nor optional.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/:required)
   */
  required: VariantBuilder,
  /**
   * ⚠️ Property is experimental. Be cautious when using it.️
   *
   * The :placeholder-shown CSS pseudo-class represents any \<input> or \<textarea> element that is currently displaying placeholder text.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/:placeholder-shown)
   */
  placeholderShown: VariantBuilder,
  /**
   * An element whose contents are not user-alterable is :read-only. However, elements whose contents are user-alterable (such as text input fields) are considered to be in a :read-write state. In typical documents, most elements are :read-only.
   *
   * (Edge 13, Firefox 78, Safari 4, Chrome 1, Opera 9)
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/:read-only)
   */
  readOnly: VariantBuilder,
  /**
   * An element whose contents are not user-alterable is :read-only. However, elements whose contents are user-alterable (such as text input fields) are considered to be in a :read-write state. In typical documents, most elements are :read-only.
   *
   * (Edge 13, Firefox 78, Safari 4, Chrome 1, Opera 9)
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/:read-write)
   */
  readWrite: VariantBuilder,
  /**
   * Same as :not(:disabled)
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/:disabled)
   */
  notDisabled: VariantBuilder,
   /**
   * Same as :nth-of-type(1). Represents an element that is the first sibling of its type in the list of children of its parent element.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/:first-of-type)
   */
  firstOfType: VariantBuilder,
  /**
   * Same as :not(:nth-of-type(1))
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/:first-of-type)
   */
  notFirstOfType: VariantBuilder,
  /**
   * Same as :nth-last-of-type(1). Represents an element that is the last sibling of its type in the list of children of its parent element.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/:last-of-type)
   */
  lastOfType: VariantBuilder,
  /**
   * Same as :not(:last-of-type)
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/:last-of-type)
   */
  notLastOfType: VariantBuilder,
  /**
   * Represents an element that has a parent element and whose parent element has no other element children. Same as :first-child:last-child or :nth-child(1):nth-last-child(1), but with a lower specificity.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/:only-child)
   */
  onlyChild: VariantBuilder,
  /**
   * Same as :not(:only-child)
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/:only-child)
   */
  notOnlyChild: VariantBuilder,
  /**
   * Matches every element that is the only child of its type, of its parent. Same as :first-of-type:last-of-type or :nth-of-type(1):nth-last-of-type(1), but with a lower specificity.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/:only-of-type)
   */
  onlyOfType: VariantBuilder,
  /**
   * Same as :not(:only-of-type)
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/:only-of-type)
   */
  notOnlyOfType: VariantBuilder,
  /**
   * Represents an element that is the root of the document. In HTML 4, this is always the HTML element.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/:root)
   */
  root: VariantBuilder,
  /**
   * Represents an element that has no children at all.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/:empty)
   */
  empty: VariantBuilder
}

/**
 * Same as :nth-child(1). Represents an element that is the first child of some other element.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/:first-child)
 */
export const first = createVariant("&:first-child");

/**
 * Same as :nth-last-child(1). Represents an element that is the last child of some other element.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/:last-child)
 */
export const last = createVariant("&:last-child");

/**
 * Same as :nth-of-type(even)
 *
 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-of-type)
 */
export const evenOfType = createVariant("&:nth-of-type(even)");

/**
 * Same as :nth-of-type(odd)
 *
 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-of-type)
 */
export const oddOfType = createVariant("&:nth-of-type(odd)");

/**
 * Applies to the one or more UI elements that are the default among a set of similar elements. Typically applies to context menu items, buttons, and select lists/menus.
 *
 * (Edge 79, Firefox 4, Safari 5, Chrome 10, Opera 10)
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/:default)
 */
export const $default = createVariant("&:default");

/**
 * Same as :not(:first-child).
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/:first-child)
 */
export const notFirst = createVariant("&:not(:first-child)");

/**
 * Same as :not(:last-child).
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/:last-child)
 */
export const notLast = createVariant("&:not(:last-child)");

/**
 * Same as :nth-child(odd), Represents the odd elements of its parent.
 *
 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-child)
 */
export const odd = createVariant("&:nth-child(odd)");

/**
 * Same as :nth-child(even), Represents the even elements of its parent.
 *
 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-child)
 */
export const even = createVariant("&:nth-child(even)");

export const { visited, checked, disabled, focusWithin, hover, focus, focusVisible, active, link, target, notChecked, enabled, indeterminate, invalid, valid, optional, required, placeholderShown, readOnly, readWrite, notDisabled, firstOfType, notFirstOfType, lastOfType, notLastOfType, onlyChild, notOnlyChild, onlyOfType, notOnlyOfType, root, empty } = useProxy<PseudoClassVariants, Function>((prop) => {
  prop = camelToDash(prop);
  if (prop.startsWith("not-")) prop = `not(:${prop.slice(4)})`;
  return createVariant("&:" + prop);
});