---
outline: deep
---

# Variant

Variant allows you to specify under what circumstances your utilities will activated.
You may use the screen size, system appearance, or any pseudo-selector, such as `:hover`. You can use variant like ordinary functions in Windi JS.

```js
import { sm, hover } from "@windijs/variants";
import { bg, rounded } from "@windijs/utilities";

const btnStyle = sm(rounded.lg, bg.blue[300], hover(bg.blue[400]));
```

## Built-in Variants

All built-in variants defined in [@windijs/variants](https://github.com/windijs/windijs/tree/main/packages/variants).

**Note**: Variants should follow **camelCase** naming convention, because dashCase cannot used to name variables in JavaScript, so `not-checked -> notChecked`, also they shouldn't start with numbers, for example `2xl -> xxl`, which is different from Windi CSS.

### Screen Variants

| Variant | Rule                               | Description                                                 |
| :------ | :--------------------------------- | :---------------------------------------------------------- |
| sm      | @media (min-width: 640px) { ... }  | Enable utility when the screen width is greater than 640px  |
| md      | @media (min-width: 768px) { ... }  | Enable utility when the screen width is greater than 768px  |
| lg      | @media (min-width: 1024px) { ... } | Enable utility when the screen width is greater than 1024px |
| xl      | @media (min-width: 1280px) { ... } | Enable utility when the screen width is greater than 1280px |
| xxl     | @media (min-width: 1536px) { ... } | Enable utility when the screen width is greater than 1536px |

### Theme Variants

| Variant | Rule                                                                          | Description                               |
| :------ | :---------------------------------------------------------------------------- | :---------------------------------------- |
| dark    | `@media (prefers-color-scheme: dark) { ... }` or `.dark .{utility} { ... }`   | Enable utility base on user configuration |
| light   | `@media (prefers-color-scheme: light) { ... }` or `.light .{utility} { ... }` | Enable utility base on user configuration |

### Orientation Variants

| Variant   | Rule                                      | Description                                                |
| :-------- | :---------------------------------------- | :--------------------------------------------------------- |
| portrait  | `@media (orientation: portrait) { ... }`  | Enable utility when the device is in portrait orientation  |
| landscape | `@media (orientation: landscape) { ... }` | Enable utility when the device is in landscape orientation |

### Motion Variants

| Variant      | Rule                                                     | Description                                                    |
| :----------- | :------------------------------------------------------- | :------------------------------------------------------------- |
| motionSafe   | `@media (prefers-reduced-motion: no-preference) { ... }` | Targets the prefers-reduced-motion: no-preference media query. |
| motionReduce | `@media (prefers-reduced-motion: reduce) { ... }`        | Targets the prefers-reduced-motion: reduce media query.        |

### Pseudo Classes

| Variant          | Rule                                      | Description                                    |
| :--------------- | :---------------------------------------- | :--------------------------------------------- |
| first            | `.${utility}:first { ... }`               | Targets the first-child pseudo-class.          |
| last             | `.${utility}:last { ... }`                | Targets the last-child pseudo-class.           |
| odd              | `.${utility}:odd { ... }`                 | Targets the odd-child pseudo-class.            |
| even             | `.${utility}:even { ... }`                | Targets the even-child pseudo-class.           |
| visited          | `.${utility}:visited { ... }`             | Targets the visited pseudo-class.              |
| checked          | `.${utility}:checked { ... }`             | Targets the checked pseudo-class.              |
| focusWithin      | `.${utility}:focus-within { ... }`        | Targets the focus-within pseudo-class.         |
| hover            | `.${utility}:hover { ... }`               | Targets the hover pseudo-class.                |
| focus            | `.${utility}:focus { ... }`               | Targets the focus pseudo-class.                |
| focusVisible     | `.${utility}:focus-visible { ... }`       | Targets the focus-visible pseudo-class.        |
| active           | `.${utility}:active { ... }`              | Targets the active pseudo-class.               |
| link             | `.${utility}:link { ... }`                | Targets the link pseudo-class.                 |
| target           | `.${utility}:target { ... }`              | Targets the target pseudo-class.               |
| notChecked       | `.${utility}:not(:checked) { ... }`       | Targets the :not(:checked) pseudo-class.       |
| default          | `.${utility}:default { ... }`             | Targets the default pseudo-class.              |
| enabled          | `.${utility}:enabled { ... }`             | Targets the enabled pseudo-class.              |
| indeterminate    | `.${utility}:indeterminate { ... }`       | Targets the indeterminate pseudo-class.        |
| invalid          | `.${utility}:invalid { ... }`             | Targets the invalid pseudo-class.              |
| valid            | `.${utility}:valid { ... }`               | Targets the valid pseudo-class.                |
| optional         | `.${utility}:optional { ... }`            | Targets the optional pseudo-class.             |
| required         | `.${utility}:required { ... }`            | Targets the required pseudo-class.             |
| placeholderShown | `.${utility}:placeholder-shown { ... }`   | Targets the placeholder-shown pseudo-class.    |
| readOnly         | `.${utility}:read-only { ... }`           | Targets the read-only pseudo-class.            |
| readWrite        | `.${utility}:read-write { ... }`          | Targets the read-write pseudo-class.           |
| notDisabled      | `.${utility}:not(:disabled) { ... }`      | Targets the :not(:disabled) pseudo-class.      |
| firstOfType      | `.${utility}:first-of-type { ... }`       | Targets the first-of-type pseudo-class.        |
| notFirstOfType   | `.${utility}:not(:first-of-type) { ... }` | Targets the :not(:first-of-type) pseudo-class. |
| lastOfType       | `.${utility}:last-of-type { ... }`        | Targets the last-of-type pseudo-class.         |
| notLastOfType    | `.${utility}:not(:last-of-type) { ... }`  | Targets the :not(:last-of-type) pseudo-class.  |
| notFirst         | `.${utility}:not(:first-child) { ... }`   | Targets the not(:first-child) pseudo-class.    |
| notLast          | `.${utility}:not(:last-child) { ... }`    | Targets the not(:last-child) pseudo-class.     |
| onlyChild        | `.${utility}:only-child { ... }`          | Targets the only-child pseudo-class.           |
| notOnlyChild     | `.${utility}:not(:only-child) { ... }`    | Targets the not(:only-child) pseudo-class.     |
| onlyOfType       | `.${utility}:only-of-type { ... }`        | Targets the only-of-type pseudo-class.         |
| notOnlyOfType    | `.${utility}:not(:only-of-type) { ... }`  | Targets the not(:only-of-type) pseudo-class.   |
| evenOfType       | `.${utility}:nth-of-type(even) { ... }`   | Targets the nth-of-type(even) pseudo-class.    |
| oddOfType        | `.${utility}:nth-of-type(odd) { ... }`    | Targets the nth-of-type(odd) pseudo-class.     |
| root             | `.${utility}:root { ... }`                | Targets the root pseudo-class.                 |
| empty            | `.${utility}:empty { ... }`               | Targets the empty pseudo-class.                |

### Pseudo Elements

| Variant     | Rule                                      | Description                                              |
| :---------- | :---------------------------------------- | :------------------------------------------------------- |
| before      | `.{utility}::before { ... }`              | Targets the before pseudo-element.                       |
| after       | `.{utility}::after { ... }`               | Targets the after pseudo-element.                        |
| firstLetter | `.{utility}::first-letter { ... }`        | Targets the first-letter pseudo-element.                 |
| firstLine   | `.{utility}::first-line { ... }`          | Targets the first-line pseudo-element.                   |
| marker      | `.{utility} *::marker, {utility}::marker` | Targets the marker pseudo-element. Can used inheritable. |
| selection   | `.{utility}::selection { ... }`           | Targets the selection pseudo-element.                    |

### Parent Selectors

| Variant      | Rule                                 | Description                                                               |
| :----------- | :----------------------------------- | :------------------------------------------------------------------------ |
| groupHover   | `.group:hover .${utility} { ... }`   | Targets an element when a marked parent matches the hover pseudo-class.   |
| groupFocus   | `.group:focus .${utility} { ... }`   | Targets an element when a marked parent matches the focus pseudo-class.   |
| groupActive  | `.group:active .${utility} { ... }`  | Targets an element when a marked parent matches the active pseudo-class.  |
| groupVisited | `.group:visited .${utility} { ... }` | Targets an element when a marked parent matches the visited pseudo-class. |

### Child Selectors

| Variant  | Rule                      | Description                 |
| :------- | :------------------------ | :-------------------------- |
| svg      | `.${utility} svg { ... }` | Targets svg nodes.          |
| all      | `.${utility} * { ... }`   | Targets all nodes.          |
| children | `.${utility} > * { ... }` | Targets children nodes.     |
| siblings | `.${utility} ~ * { ... }` | Targets siblings nodes .    |
| sibling  | `.${utility} + * { ... }` | Targets first sibling node. |

Learn more about built-in variants, read the variants api documents <a href="/windijs/modules/_windijs_variants.html" target="_blank">here</a>.

## Create Variant Via API

You can quickly create variants through the following APIs.

### createVariant

Create a new variant.

```js
import { createVariant } from "windijs";

export const hv = createVariant("&:hover");

export const children = createVariant("& > *");

export const notFirst = createVariant("&:not(:first-child)");

export const sm = createVariant("@media (min-width: 720px)");
```

### createMedia

Abbreviation of `createVariant(@media ...)`.

```js
import { createMedia } from "windijs";

export const sm = createMedia("(min-width: 720px)");

export const onlyMd = createMedia("(min-width: 768px) and (max-width: 1024px)");
```

### createDarkModeVariants

Helper for creating darkMode variants.

#### Type

```ts
function createDarkModeVariants(media = true): { dark: VariantBuilder; light: VariantBuilder };
```

#### Example

```js
import { createDarkModeVariants } from "windijs";

// follow system appearance, generate `@media ...`
export const { dark, light } = createDarkModeVariants();
```

```js
// generate `.dark &`, `.light &`
export const { dark, light } = createDarkModeVariants(false);
```

### createScreenVariants

Helper for creating screen variants. Generate `@media (min-width: ...)` or `@media (max-width: ...)`

#### Type

```ts
function createScreenVariants<T extends object>(screens: T, mobile = true): Record<keyof T, VariantBuilder>;
```

#### Example

```js
import { createScreenVariants } from "windijs";

const screens = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
};

export const { sm, md, lg } = createScreenVariants(screens);
```

### createOrientationVariants

Helper for creating orientation variants. Generate `@media (orientation: ...)`

#### Type

```ts
function createOrientationVariants<T extends object>(orientations: T): Record<keyof T, VariantBuilder>;
```

#### Example

```js
import { createOrientationVariants } from "windijs";

export const { portrait, landscape } = createOrientationVariants({
  portrait: "portrait",
  landscape: "landscape",
});
```

### createMotionVariants

Helper for creating motion variants. Generate `@media (prefers-reduced-motion: ...)`

#### Type

```ts
function createMotionVariants<T extends object>(motions: T): Record<keyof T, VariantBuilder>;
```

#### Example

```js
import { createMotionVariants } from "windijs";

export const { motionSafe, motionReduce } = createMotionVariants({
  motionSafe: "no-preference",
  motionReduce: "reduce",
});
```

### setupVariant

Create variants by user variants config.

:::warning
This api may renamed to `setupVariants` from next version.
:::

```js
export const { sm, hover, dark } = setupVariant({
  sm: "@media (min-width: 640px)",
  hover: "&:hover",
  dark: ".dark &",
});
```

## Create Variant Via Config

If you have created the configuration file of windi, `windi.config.js` or `windi.config.ts`. You can define or overwrite variants in your config file.

```js windi.config.js
import { defineConfig } from "windijs";

export default defineConfig({
  variants: {
    sm: "@media (min-width: 640px)",
    hover: "&:hover",
    dark: "@media (prefers-color-scheme: dark)",
    hocus: "&:hover, &:focus",
    // TODO: support array variants
    smDark: ["@media (min-width: 640px)", "@media (prefers-color-scheme: dark)"],
    smDarkHover: ["@media (min-width: 640px)", "@media (prefers-color-scheme: dark)", "&:hover"],
  },
});
```

Then you can import them from `virtual:variants` or just use global define if you enabled the automatic import of windi plugin. For more configuration, please refer to [Vite Plugin](/integrations/vite).

```js
import { bg, rounded } from "@windijs/utilities";
import { sm, smDarkHover } from "virtual:variants";

sm(bg.red[500], rounded.lg, smDarkHover(bg.red[300]));
```

**Note**: The configuration file can only work when you install the [@windijs/plugin-utils](https://github.com/windijs/windijs/tree/main/packages/plugin-utils).

## Applying Variant

Usually, you use variant like a function. Yet, in some special cases, you may want to use custom variant quickly without specifying them as variables or putting them in config file. The following Apis can help you complete this work.

### useVariant

Create a variant and apply it to utilities.

#### Type

```ts
function useVariant(rule: string, utilities: Utilities[]): StyleObject[];
```

#### Example

```js
import { useVariant } from "windijs";
import { bg, p, rounded } from "@windijs/utilities";

const btnStyle = useVariant("&:hover", [bg.red[500], p[2], rounded.lg]);
```

### useMedia

Create a media variant and apply it to utilities.

#### Type

```ts
function useMedia(rule: string, utilities: Utilities[]): StyleObject[];
```

#### Example

```js
import { useMedia } from "windijs";
import { bg, p, rounded } from "@windijs/utilities";

const btnStyle = useMedia("(min-width: 400px)", [bg.red[500], p[2], rounded.lg]);
```

### variant

Shorthand for [useVariant](#usevariant).

#### Type

```ts
function variant(rule: string, ...utilities: Utilities[]): StyleObject[];
```

#### Example

```js
import { variant } from "windijs";
import { bg, p, rounded } from "@windijs/utilities";

const btnStyle = variant("&:hover", bg.red[500], p[2], rounded.lg);
```

### media

Shorthand for [useMedia](#usemedia).

#### Type

```ts
function media(rule: string, ...utilities: Utilities[]): StyleObject[];
```

#### Example

```js
import { media } from "windijs";
import { bg, p, rounded } from "@windijs/utilities";

const btnStyle = media("(min-width: 400px)", bg.red[500], p[2], rounded.lg);
```
