<h1 align="center">
<a href="https://github.com/windicss/windicss/wiki">
  <img src="https://next.windicss.org/assets/logo.svg" alt="Windi Logo" height="120" width="120"/><br>
</a>
  Windi JS
</h1>

<p align="center">The Utility-first CSS-In-JS Framework Powered by ES6 Proxy API and TypeScript.</p>

## Getting Started

Windi JS is still in beta. Expect bugs! Read more [here](), and track progress towards 1.0 [here]().

### Quick Examples

#### Utility

```js
const btn = [bg.gray[400], text.lg, p[2], rounded.sm, dark(bg.gray[700], text.gray[100])]
```

#### Native

```js
const btn = [backgroundColor.gray, fontSize.rem[2], borderRadius.px[4], dark(backgroundColor.blue)]
```

#### JSS Object

```js
const btn = css({
    backgroundColor: "gray",
    fontSize: "2rem",
    "&:hover": {
        backgroundColor: "black"
    }
})
```

#### Mixed

```js
const btn = [bg.gray[400], fontSize.rem[2], css({ borderRadius: "4px" })]
```

### Integrations

Windi JS is written by [TypeScript](), the greate type system give us [awesome intelligence]() completions. So without import even any extensions, you can use it with all **js/ts projects**.

#### **As a css-in-js framework**

You can use **inline style**, or extract utilities into a **variable** or component, as mentioned above.

Vanilla

```js
element.innerHTML = `
  <div class="logo ${bg.indigo[500].opacity(50)}" />
  <button class="${btn}" />
`
```

React

```jsx
<div className={["logo", "react", bg.blue[400].opacity(20)]} />
```

Svelte

```svelte
<div class="logo" use:w={[bg.indigo[300], text.lg, p[2]]} />
```

Vue

```vue
<div class="logo vue" :class="[bg.green[300], text.lg, p[2]]" />
```

#### **As a css compiler**

You can also use Windi JS to compile `.css` files just like [sass]() did. But windi is completely built with TypeScript, so all the features of JavaScript/TypeScript included, like **type checking**. Also windi provide a `$` shorthand for this usecase.

```js
$.btn(
    px[2], py[4],
    bg.blue[200],
    hover(rounded.lg)
)
// Should Generate .btn { ... } .btn:hover { ... }
```

#### **As a css generator**

Windi JS includes all core functions of Windi CSS, so the next generation of [Windi CSS](https://github.com/windicss) will be released as a monorepo based on Windi JS.

The `windicss@next` will include a `parser` and a `vm`. So that you can use both the classic `class="bg-red-500 p-2"` type and `class="bg.red.500 p[2]"` type (which the typeof *JavaScript Expression Virtual Machine*). And you can also import part of the runtime([Windi JS]()) into your project when necessary. After this, all the puzzles of [Windi]() should be completed.

## FAQ

You may have a question like, "Do I need to `import { bg, text ... }` all the time?". 

The Answer is **No**. In Modern bundlers, such as [vite](). You can inject all utilities at once by using a [plugin](), and then solve the type problem by definiing a `global.d.ts` or `vite-env.d.ts`. Then with the help of tree-shaking, only the utilities that you used would be bundled. So even the css-in-js case. which has a runtime, is actually very small and can be ignored.

## API

The api of Windi JS is very simple yet powerful, such as the example we use, `bg` utility.

```js
export const bg = createUtility("bg")
  .use(colorHandler(colors, "backgroundColor", "--w-bg-opacity"))
  .int();
```

The full implementation like below, which can handle `bg.blue[500], bg.fixed, bg.clip.border, bg.origin.top, bg.opacity[10], bg.gradient.to.r ...`

```js
export const bg = createUtility("bg")
  .use(colorHandler(colors, "backgroundColor", "--w-bg-opacity"))
  .use(configHandler(backgroundAttachmentConfig, "backgroundAttachment"))
  .use(configHandler(backgroundPositionConfig, "backgroundPosition"))
  .use(configHandler(backgroundRepeatConfig, "backgroundRepeat"))
  .use(configHandler(backgroundSizeConfig, "backgroundSize"))
  .use(configHandler(backgroundImageConfig, "backgroundImage"))
  .case("clip", configHandler(backgroundClipConfig, ["backgroundClip", prop`-webkit-background-clip`]))
  .case("blend", configHandler(blendModeConfig, "backgroundBlendMode"))
  .case("origin", configHandler(backgroundOriginConfig, "backgroundOrigin"))
  .case("opacity", configHandler(opacityConfig, prop`--w-bg-opacity`))
  .case("gradient", callHandler(buildLinearGradient, meld(
    configHandler(gradientDirectionConfig, buildGradientDirection),
    configHandler(gradientConfig, "backgroundImage"),
  )))
  .init();
```

And if you want just gradient ?

```js
export const gradient = createUtility("gradient")
  .use(configHandler(gradientDirectionConfig, buildGradientDirection))
  .use(configHandler(gradientConfig, "backgroundImage"))
  .init()
```

Each created utility is an [ES6 Proxy](), which wll only be called at runtime. At the same time, by using `config Object` like [gradientDirectionConfig](), we can merge all types, so you should have a perfect completion system.

Creating your utilities has never been easier, you can even create your own framework by using windi's api. If you want to do this. you can refer to [@windi/utilities]() which should be a perfect example.

To learn more, please check [the documentation website]().

## Packages

### [@windi/core]()

Core apis of windijs, like `createUtility`, `createVariant`, `colorHandler`, `configHandler`, ...

### [@windi/colors]()

Colors of some popular web framework ([apple]()/[bootstrap]()/[bulma]()/[material]()/[tailwind]()/[web]()/[windi]()), you can choose the best for yourself. And also don't forget to say thanks to all these frameworks and their developers.

### [@windi/config]()

The config variables of windi utilities. Also modular, you can import or expand the config of corresponding utility. The naming rule is `camelCased(utilityName) + Config`.
for example, `backgroundSizeConfig`.

### [@windi/preflight]()

Generate reset css.

### [@windi/utilities]()

All windi utilities, like `bg`, `text`, `p`, `m`, ...

### [@windi/variants]()

All windi variants, like `sm`, `md`, `hover`, `focus`, `dark`, ...

### [@windi/helpers]()

Operations related to css.

- css-in-js: [`css`, `prop`, `unify`, `bundle`, ...]
- color process: [`darken`, `lighten`, `adjustLightness`, ...]
- css units: [`rem`, `px`, `em`, ...]
- css funcs: [`rgb`, `rgba`, `linearGradient`, ...]
- others: [`useProxy`, `alphaNamer`, `hashNamer`, ...]

### [@windi/shared]()

Internal shared funcs and utils.

## Discussions

We’re using [GitHub Discussions](https://github.com/windicss/windijs/discussions) as a place to connect with other members of our community. You are free to ask questions and share ideas, so enjoy yourself.

## Contributing

If you're interested in contributing to windijs, please read our [contributing docs](https://github.com/windicss/windijs/blob/main/CONTRIBUTING.md) **before submitting a pull request**.

## Supporting

Windi is an MIT-licensed open source project with its ongoing development made possible entirely by fantastic volunteers. If you'd like to support their efforts, please consider [Becoming a backer on Open Collective]().

## License

[MIT](https://github.com/windicss/windijs/blob/main/LICENSE)

Copyright (c) 2022, Raven Satir