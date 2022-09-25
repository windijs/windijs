---
outline: deep
---

# Optimization

Currently, Windi JS is still in the early stage of development, there are some parts that are not perfect. If you encounter any of the following problems, I hope this article can help you. If you encounter an issue that is not mentioned, please create an issue in GitHub, and we will help you solve it as soon as possible.

## Tree-shaking

Generally speaking, you don't need to care about the size, Windi JS has optimized the package size a lot. The core size compressed by GZIP is only about 1kb. And it may be even smaller after the official release.

The main purpose of this section is to explain to those who are more sensitive to the numbers, why the package size is increase and what optimization you can take.

First, let's measure the size of 3 representative utilities as examples.

```sh
bg: min:13.17kb / gzip:5.14kb / brotli:4.30kb
rounded: min:2.17kb / gzip:1.03kb / brotli:0.94kb
animate: min:22.75kb / gzip:3.67kb / brotli:3.22kb
```

You may notice that the size of `animate` and `bg` is much larger than the size of `rounded`. So why is it like this?

First we look at the `animate` utility, windi's `animate` utility is too powerful cause it includes all animations from [animate.css](https://github.com/animate-css/animate.css). Although powerful, but this may sometimes overkill it.

In the future, we may introduce these animations in the form of **plugins**, but for now they are completely packaged. If you feel the need for optimization, you can simply rewrite the `animate` utility, either in your config file or your imports.

```js
import { createUtility, animateHandler, spinKeyframes } from "windijs";

export const animate = createUtility("animate")
  .use(animateHandler("none", "none"))
  .use(animateHandler("spin", "spin 1s linear infinite", spinKeyframes)) // only keep spin animation
  .init();
```

After did this, you will notice a significant improvement of package size. Note that the package size here includes the size of windijs core size.

```sh
animate: min:2.48kb / gzip:1.16kb / brotli:1.06kb
```

The same problem exists for `bg` utility, because `bg` utility includes 52 **gradients** besides colors, which leads to an increase in package size. Even though these gradients are beautiful and have simple names to use, they are extra by-products if you don't use them.

```js
import { createUtility, configHandler, colorHandler, opacityConfig, prop } from "windijs";
import { colors } from "@windijs/utilities";

export const bg = createUtility("bg")
  .use(colorHandler(colors, "backgroundColor", "--w-bg-opacity"))
  .case("opacity", configHandler(opacityConfig, prop`--w-bg-opacity`))
  .init();
```

If we rewrite the `bg` utility, only keep the basic background colors and opacity, the size does improved.

```sh
bg: min:7.03kb / gzip:3.07kb / brotli:2.48kb
colors: min:3.57kb / gzip:1.44kb / brotli:1.06kb
```

## Browser Support

By default, Windi JS has added vendor prefix support for all utilities. For example, the `gap` utility coded like this.

```js
const gap = createUtility("gap")
  .use(configHandler(spacingConfig, ["gridGap", "gap"]))
  .case("x", configHandler(spacingConfig, [prop`-webkit-column-gap`, prop`-moz-column-gap`, "gridColumnGap", "columnGap"]))
  .case("y", configHandler(spacingConfig, [prop`-webkit-row-gap`, prop`-moz-row-gap`, "gridRowGap", "rowGap"]))
  .init();
```

So if you are using utilities, you don't need to worry about cross-browser supports. Yet, if you are using `style`, Windi JS does not currently provide vendor prefix support. (Although we plan to add custom autoprefixer support in the future.)

For example, if you use this:

```js
style.backdropFilter["blur(10px)"];
```

Only such css will be generated:

```css
.withOutPrefixer {
  backdrop-filter: blur(10px);
}
```

If you want to support safari prefixer, you need to add it manually.

```js
[style.backdropFilter["blur(10px)"], style["-webkit-backdrop-filter"]["blur(10px)"]];
```

After this, this css will be

```css
.withPrefixer {
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}
```

## Type Checking

Although Windi JS actually implements the ability to [put arrays into JSX](http://localhost:5173/posts/how-windijs-works#style-applying), this would conflict with the framework's type checking. The main reason is that TypeScript only check whether target is a `string`, but not whether target implements the `toString` method.

For example, in preact-ts/react-ts, If you use the inline syntax, such as `<img className={[bg.blue[400], rounded.xl]}>`, the following error will be prompted.

```ts
(property) React.HTMLAttributes<T>.className?: string | undefined
Type '(string | StyleObject<{}>)[]' is not assignable to type 'string'.ts(2322)
```

There are two main solutions to this problem. One is to locate the corresponding `className` type, and change it to `string | unknown[]`.

```ts
interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
  // ...
  className?: string | unknown[] | undefined;
  // ...
}
```

The other way, you call `toString` explicitly.

```tsx
<img className={[bg.blue[400], rounded.xl].toString()}>
```

Or you can define a `$` function yourself.

```ts
import type { StyleObject, StyleArray } from "windijs";

function $(...utilities: (string | StyleObject | StyleArray)[]) {
  return utilities.toString();
}
```

Then you can use the `$` helper.

```tsx
<img className={$(bg.blue[400], rounded.xl)}>
```

We are still looking for a better solution, maybe work with the maintainers of these frameworks to solve this problem.
