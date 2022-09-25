# What is Windi JS ?

Windi JS is [Windi CSS](https://windicss.org/)'s little brother, which provides a new way for implementing CSS-in-JS.

::: warning
Windi JS is still undergoing rapid release iterations, the API and config may still change between minor releases. You should consider using it in a production environment before the official release of v1.2.
:::

## Introduction

When talking about [CSS-in-JS](https://en.wikipedia.org/wiki/CSS-in-JS), you might think of these implementations.

**Tagged Templates Syntax**

```js
const heading = css`
  color: ${myTheme.colors.white};
  padding: 1rem;
  font-size: 1.125rem;
`;
```

Or you may see something like below in some of tailwind's CSS-in-JS implementations.

```js
const heading = tw`text-white p-4 font-lg`;
```

**Object Styles Syntax**

Another common implementation is the form of [JSS](https://cssinjs.org/) like following.

```js
const heading = css({
  color: myTheme.colors.white,
  padding: "1rem",
  fontSize: "1.125rem",
});
```

**Utility First Syntax**

Following tradition can be a lit boring, so we're bringing you a new approach that we'd like to call the Utility-first syntax.

```js
const heading = [style.color[myTheme.colors.white], style.padding.rem[1], style.fontSize.rem[1.125]];
```

You can also create [utilities](/customization/utility) to use syntax like tailwindcss or windicss.

```js
const heading = [text.white, p[4], font.lg];
```

Behind this, the real working principle is similar to Object-styles syntax, so of course you can also use JSS.

```js
const btn = css({
  padding: "1rem",
  backgroundColor: "rgba(22, 22, 22, 0.8)",
});
```

You can even combine Utility-first syntax and Object-styles syntax.

```js
const btn = [css({ backdropFilter: "blur(10px)" }), style.backgroundColor.rgba(22, 22, 22, 0.8), p[4], font.lg];
```

## Motivation

[The author](https://github.com/voorjaar)'s motivation for the project can be summarized as follows.

- Exploring and sharing a new way of implementing CSS-in-JS.

- Provides a common standard JavaScript library for manipulating CSS.

- As the foundation of the next generation [Windi CSS](https://windicss.org/). It will provide a new API interfaces for Windi CSS and a CSS-in-JS runtime that can be imported on demand.

- Take it a step further. It's also possible to apply it to a pure, simpler, JavaScript-based CSS generation.

## Advantage

Now, let’s talk about the advantages of Windi JS.

### Closer to JavaScript

Compared to other CSS-in-JS frameworks, Windi JS is closer to JavaScript. This makes it easier to extract components that can be extended, filtered, iterated, and more just like native [Arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array).

At the same time, the support for TypeScript is more friendly. In addition to better type checking, there is also better intelligent completions.

```js
style.fontStyle.bold;

// Better readability and intelligent completion than css({ fontStyle: "bold" }) or css`fontStyle: bold`
// `.` trigger always better than `: ` trigger.

style.backgroundColor.rgba(22, 22, 22, 0.8);

// Better type checking than css({ backgroundColor: "rgba(22, 22, 22, 0.8)" }) or css`backgroundColor: rgba(22, 22, 22, 0.8)`
```

And with the use of utilities, the readability becomes even better, and it also supports the use of theme. You can also use [variants](/customization/variant) to specify under what circumstances your utilities will be activated.

```js
font.bold;

bg.dark[500].opacity(80);

// variants
sm(text.lg, p[4], dark(text.white));
```

### Fully Customizable

Windi JS allows you to use the configuration file `windi.config.js` or `windi.config.ts` to customizing your experience. You can even define new [utilities](/guide/configuration#utilities) and [variants](/guide/configuration#variants) in config file by using simple Object or API.

```js
import { baseColors, materialColors, colorHandler, configHandler, css, defineConfig, gradientConfig } from "windijs";

const colors = {
  ...baseColors,
  ...materialColors,
};

export default defineConfig({
  theme: {
    // overwrite theme
    colors,
    // extend theme
    extend: {
      borderRadius: {
        xxl: "2rem",
      },
    },
  },
  utilities: {
    // overwrite utility
    bg: {
      DEFAULT: colorHandler(colors, "backgroundColor", "--w-bg-opacity"),
    },
    // create new utilities
    myColor: {
      red: css({
        backgroundColor: "#FF2F41",
      }),
    },
    gradient: {
      DEFAULT: configHandler(gradientConfig, "backgroundImage"),
    },
  },
  variants: {
    // create new variants
    hocus: "&:hover, &:focus",
  },
});
```

### And More

- **Simple and Atomic** (The Utility-first method can improve your development efficiency because of its simplicity and atomic.)

- **Optimized Build** (Optimized for bundlers, no side effects, only ship what you need.)

- **Powerful APIs** (Powerful APIs that can be used not only for CSS-in-JS, but also for various CSS operations such as color conversion.)

- **Framework Support** (Out-of-the-box support for Vanilla, Preact, React, Vue, Svelte, and more.)

- **Browser Support** (Built-in vendor prefix support, so you don't have to worry about cross-browser issues.)

- **Reusability** (Components are reusable, so you only have to write them once, then you can use them everywhere.)

- **Adaptability** (Available for any scenario related to CSS, SSR, SSG, Preprocessor, etc.)

## Disadvantage

Of course, nothing is perfect, and Windi JS has some drawbacks.

- **Runtime** (Like all CSS-in-JS frameworks, it has a runtime, although it's tiny, only about 1 Kb gzipped.)

- **The Needs of Imports** (The extensive use of utilities and variants does require multiple imports, but we can solve this problem by using a bundler plugin.)

- **Further Away from CSS** (This means that you can not directly copy existing CSS code, which requires additional conversion.)

- **Extra Layer of Abstraction** (Although it improves the ease of use, it does increase the complexity of implementation.)

- **Learning Curve** (If you have ever used windicss or tailwindcss, you should be able to get started with these utilities easily. And if you are familiar with CSS, the `style` syntax is also very easy to use.)

## Conclusion

As mentioned in the motivation, we want to explore a new method. Everyone has different opinions on the advantages and disadvantages. Make your own choice.

Even if you don't like CSS-in-JS, you can use Windi JS to replace `style` binding in some module, because it can easily support variants, vendor prefix and can be tree-shaking. Or you can use it to generate CSS.

However you decide, hope this project will help and inspire you. If you are interested, it will be helpful to sponsor us or leave a star.
