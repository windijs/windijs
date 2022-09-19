# How Windi JS Works?

Let's talk about how windijs works.

## Proxy API

> The Proxy object allows you to create an object that can be used in place of the original object, but which may redefine fundamental Object operations like getting, setting, and defining properties. Proxy objects are commonly used to log property accesses, validate, format, or sanitize inputs, and so on.

This is how MDN explains the [Proxy API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy). Let's take the most commonly used handler in Windi JS, the [configHandler](/customization/handler#confighandler) as an example.

First, we have a config object such that:

```ts
export const borderRadiusConfig = {
    DEFAULT: "0.25rem",
    none: "0px",
    sm: "0.125rem",
    md: "0.375rem",
    lg: "0.5rem",
    full: "9999px",
};
```

Its key is the name of the style and its value is the property value of the style. What we want to do is like this, css `border-radius: 0.125rem;` should be generated when we call `rounded.sm`. The Proxy API allows us to do this. You can simply understand it as follows.

```ts
const rounded = new Proxy(borderRadiusConfig, {
    get(target, prop) {
        if (Refelect.has(target, prop)) {
            const value = Refelect.get(target, prop);
            return css({
                borderRadius: value,
            });
        }
    },
});
```

Of course we have to consider how to deal with `DEFAULT` or nested objects, but I think ou already understand the basic concept. All the handlers in windi work on a similar principle.

## Style Applying

The next question we should address is how to insert generated css into the DOM, that is, what exactly the `css` function does.
The easiest way is perhaps to define a function, such as `apply`, maybe like `apply(rounded.sm, text.lg, ...)`, and just insert the generated css like below.

```ts
const el = document.createElement("style");
el.setAttribute("type", "text/css");
el.textContent = css;
document.head.appendChild(el);
```

But I actually don't like the way it works, I don't like having to use a function like `apply` to inject css everytime. This makes the template look bad and is not very clean and easy to use. So we took a relatiively geeky solution, which is `Array.prototype.toString`.

Whether in js template syntax like

```js
const tmpl = `<div class="${myClass}">Hello World</div>`;
```

or in jsx syntax

```jsx
<div className={myClass}>Hello World</div>
```

if `myClass` is an Object, or an Array, or any value, the framework like preact/react or native javascript will call the object's `toString` method.
This means that if we implement the `toString` method for our `StyleObject` and `Array`, we can insert our style in the most concise way.

```ts
const myStyleObject = {
    css: {
        borderRadius: "0.125rem",
    },
    toString() {
        injectCSS();
        return myClassName;
    },
};
```

and for `Array.toString`, we should check if the Array contains a `StyleObject`.

```ts
Array.prototype.toString = function () {
    return this.join(isStyleArray(this) ? " " : ",");
};
```

But it still not end, there is one exception that needs to be handled. The `vue.js` framework support the syntax like below:

```vue
<div :class="[{ myClassName: true }]"></div>
```

It's not `toString` based, but we would like to support it too. so we can use `<div :class="[rounded.sm, font.bold]">`, pretty cool, isn't it?

So the finally `StyleObject` that windi uses like below:

```ts
const windiStyleObject = new Proxy(
    {
        myClassName: true,
        [Symbol.for("css")]: {
            borderRadius: "0.125rem",
        },
        [Symbol.for("meta")]: {
            props: ["sm"],
            uid: "rounded",
        },
    },
    {
        get(target, prop) {
            // for react and vanilla
            if (prop === "toString") {
                injectCSS();
                return myClassName;
            }
            // for vue
            if (prop === myClassNmae) {
                injectCSS();
                return true;
            }
            // get css or meta
            if (prop === "css") return Reflect.get(target, Symbol.for("css"));
            if (prop === "meta") return Reflect.get(target, Symbol.for("meta"));
            if (Reflect.has(target, prop)) return Reflect.get(target, prop);
        },
    }
);
```

It may not look as clean as it was initially, but it does solve the compatibility problem for different frameworks and still maintains strong performance.

## Type System

Another topic worth delving into is the type system of Windi JS. Both utilities and css `StyleObject` have great intelligent completion, thanks to TypeScript's Intersection Operator.

The object type in TypeScript is very powerful, if we have a object like `borderRadiusConfig`, we will get type like this:

```ts
type BorderRadiusConfig = {
    DEFAULT: string;
    none: string;
    sm: string;
    md: string;
    lg: string;
    full: string;
};
```

Then the `configHandler` will perform some type operations and we get ths output.

```ts
type BorderRadiusConfigStyle = StyleObject & {
    none: StyleObject;
    sm: StyleObject;
    md: StyleObject;
    lg: StyleObject;
    full: StyleObject;
};
```

Finally, by `createUtility.use(...)` API, we combine the different handler types into one type.

```ts
const rounded = createUtility("rounded").use(configHandler(borderRadiusConfig, "borderRadius")).use(...).init();

type RoundedType = StyleObject & {
    none: StyleObject;
    sm: StyleObject;
    md: StyleObject;
    lg: StyleObject;
    full: StyleObject;
} & SomeOtherType & SomeOtherType ...
```

This is how Windi JS's Type System works.

## Config and Plugin

If you think about it, one thing that comes to mind is the fact that Windi JS does not support configuration. Because a config object like `borderRadiusConfig` has been hard coded and exported.

### Why not use theme?

We know that the previous windi and tailwind were using the theme function to get the theme, like `theme("borderRadius")`.
But such approach creates two broblems when subsumed into the css-in-js framework.

First of all, the size issue. With this approach, you need to pack all the configurations into the runtime, and it's not easy to tree-shaking. which means that the more powerful your utilities are, the bigger the runtime will be, especially since windi also includes a lot of animations, which take up a very large size.

The second is that you will lose the type checking and there will be no intelligent completion at all.

### How we solved this problem?

The method is actually quite simple to say. Since the Windi JS API schema is very clear, we only need to do a simple text replacement to generate new utilities. For example,

```js
export const rounded = createUtility("rounded").use(configHandler(borderRadiusConfig, "borderRadius")).init();
```

will be replaced into

```js
export const rounded = createUtility("rounded").use(configHandler(yourCustomBorderRadiusConfig, "borderRadius")).init();
```

This means that when you use the configuration file, the plugin in fact generating new utilities for you based on the exported mjs file. and it will also do a quick dts generation for you to support intelligent completion.

The part about generating dts will not be covered here. If you are interested, you can check the dts file generated byy `@windijs/utilities` and you will understand it.
