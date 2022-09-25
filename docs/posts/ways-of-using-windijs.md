# Ways of Using Windi JS

Windi JS v1.x will focus on improving utilities, config and plugin, mainly supporting CSS-In-JS and SSR patterns.
Starting from version v2.0, windi's vision will be to provide a true JavaScript abstraction layer for css.

Unlike previous CSS-In-JS implementations, windi's abstraction layer allows each utility/atomic to be simply generated, filtered, and extended, while supporting a variety of scenarios.

## CSS In JS

The most common pattern is of course the CSS-In-JS pattern, where we generate css on the client side and insert it into DOM. A simple usage example like below, we register the `cssInJsLoader` in the main entry, and then we can use utilities and variants.

```js
import { useStyleLoader, cssInJsLoader } from "windijs";

useStyleLoader(cssInJsLoader);
```

## SSR

Another common pattern is the SSR pattern, where we render the css and class name of the corresponding page on the server side, and then return the css to the client side, inject it into DOM. Then we should also switch to CSS-In-JS mode on the client side, so we can complete the after dynamic generation of css.

```js
import { useStyleLoader, ssrLoader, mountCSS, cssInJsLoader } from "windijs";

useStyleLoader(ssrLoader);

onMount(() => {
  mountCSS();
  useStyleLoader(cssInJsLoader);
});
```

<br>
<br>

---

:::warning
The following patterns are still in the testing phase and some are still being conceived, so please do not use them.
:::

## SSG

SSG pattern means we generate all the css on the client side and then return the generated css file directly to the client side instead of inserting it into the DOM. Of course, you can still switch to CSS-In-JS mode after delivery to the client.

```js
import { useStyleLoader, ssgLoader, cssInJsLoader } from "windijs";

useStyleLoader(ssgLoader);

onMount(() => {
  useStyleLoader(cssInJsLoader);
});
```

## Preprocessor

Windi JS will also be available for preprocessor, or for compiling `.css` files just like [sass](https://sass-lang.com/) did. But windi is completely built with TypeScript, so all the features of JavaScript/TypeScript included, like **type checking**, and windi also includes many built-in APIs for handling css, sizes, colors, etc. Some of the APIs also reference sass. Meanwhile, windi provide a `$` shorthand special for this case.

```js
$.btn(px[2], py[4], bg.blue[200], hover(rounded.lg));
// Should Generate .btn { ... } .btn:hover { ... }
```

## Generator

> Unlike preprocessor, generator refers to the mehod of parsing classNames through a parser and then generating the corresponding css on demand. Windi CSS was the first to adopt such a shceme, and then tailwindcss took the same approach.

There are some problems with the parser-based generator, First, it is not friendly for other css frameworks, different syntax may break the parser. Second it's too loose when generating utilities, the wrong css may be generated. Also, parser-based generators are not easy for user to customize utilities and variants, at least compared to object-based definitions.

Now we have Windi JS, which will serve as the foundation for the next generation of [Windi CSS](https://github.com/windicss). The new Windi CSS will be based on the **extractor + generator** model, using Windi JS's vm to generate utilities, the above-mentioned problems will be perfectly solved.

Not only that, Windi JS and Windi CSS will use the same utilities, variants, and even config file, so you can quickly define utilities, variants with a simple object, also many powerful APIs of Windi JS will be available for Windi CSS.

When you mainly use Windi CSS, when you encounter the need to dynamically generate css, you can bring a small part of the Windi JS runtime into it.
Or when you mainly use Windi JS, where you don't need dynamic generation, you can replace that part with strings from Windi CSS, and the corresponding code will not be inserted into the runtime, instead the css file will be generated.

We believe that **the combination of Windi JS and Windi CSS** will bring you a new css experience, so stay tuned, this vision will come true soon.
