# What is Windi JS ?

Windi JS is [Windi CSS](https://windicss.org/)'s little brother, his job is to complete problems related to dynamic css that Windi CSS not fully solved. 

:::warning
Windi JS is currently in beta status. It is already suitable for out-of-the-box documentation use, but the config and theming API may still change between minor releases.
:::

## Introduction

When you think about css-in-js, you might think of these implementations.

### Tagged Templates Syntax

```js
const heading = css`
  font-size: 2em;
  color: ${myTheme.color};
`;
```

or

```js
const heading = tw`font-lg color-${myTheme.color}`;
```

### Object Styles Syntax

```js
const heading = css({
  fontSize: "2em",
  color: myTheme.color,
});
```

### Utility First Syntax

```js
const heading = [font.lg, text[myTheme.color]]
```

## Motivation

When I was doing windicss, someone asked me if I wanted to make a css-in-js framework, and I said no. The concerns of mine at that time were the following.

- Runtime

When you need css-in-js, you know that it's inevitable to add runtime, but from another perspective, the javascript frameworks we use is also runtime, using something like `` 

- Package size (config, themes, colors, aniamtions, parser, generator...)

Why tw`...` not good enough.



- Fun, It's not an interesting task for me to solve the same problem repeatedly, but not to solve it better.

## Advantage

- Closer to JavaScript

- Tree-shaking friendly

- Atomic

- Support Theme

- Browser Support vender prefix

- Extract/extend component is easy.

## Disadvantage

- Further away from CSS. This means that you can not directly copy existing CSS code, which requires a step-by-step conversion.
- Additional learning curve. If you have ever used windicss or tailwindcss, you should be able to get started with these utilities easily.


## Styles applying





