---
outline: deep
---

# API Integrations

In addition to the API for customizing [utility](/customization/utility#create-utility-via-api), [variant](/customization/variant#create-variant-via-api), [handler](/customization/handler#built-in-handlers), ... that we introduced in the `Customization` chapter, windi includes many functions that may be helpful in practice.

:::warning
You can view all the api documentation <a href="/api.html" target="_blank">here</a>, the documentation is currently not commented in detail, this is the next phase of our work.
:::

## Packages

Different functional APIs are defined in different packages, all entries can be imported from the `windijs` repo, except for the `@windijs/utilities` and `@windijs/variants` package.

### <a href="/modules/_windijs_core.html" target="_blank">@windijs/core</a>

Core apis of windijs, like `createUtility`, `createVariant`, `colorHandler`, `configHandler`, ...

### <a href="/modules/_windijs_colors.html" target="_blank">@windijs/colors</a>

Colors of some popular web frameworks, `bootstrapColors`, `materialColors`, ...

### <a href="/modules/_windijs_config.html" target="_blank">@windijs/config</a>

The config variables of windi utilities. Also modular, you can import or expand the config of corresponding utility. The naming rule is `camelCased(utilityName) + "Config"`.
for example, `backgroundSizeConfig`.

### <a href="/modules/_windijs_utilities.html" target="_blank">@windijs/utilities</a>

All windi utilities, like `bg`, `text`, `p`, `m`, ...

### <a href="/modules/_windijs_variants.html" target="_blank">@windijs/variants</a>

All windi variants, like `sm`, `md`, `hover`, `focus`, `dark`, ...

### <a href="/modules/_windijs_style.html" target="_blank">@windijs/style</a>

The `style` utility, support for `style.backgroundColor.red`, `style.borderRadius.px[3]`, ...

### <a href="/modules/_windijs_helpers.html" target="_blank">@windijs/helpers</a>

Operations related to css.

-   css-in-js: `css`, `prop`, `unify`, `bundle`, ...
-   color process: `darken`, `lighten`, `adjustLightness`, ...
-   css units: `rem`, `px`, `em`, ...
-   css funcs: `rgb`, `rgba`, `linearGradient`, ...
-   others: `useProxy`, `alphaNamer`, `hashNamer`, ...

### <a href="/modules/_windijs_transformer.html" target="_blank">@windijs/transformer</a>

Windi internal typescript transformers.

### <a href="/modules/_windijs_shared.html" target="_blank">@windijs/shared</a>

Some common JavaScript functions, such as `range`, `fractions`, `spacings`, `hash`, ...

### <a href="/modules/_windijs_plugin_utils.html" target="_blank">@windijs/plugin-utils</a>

A set of utility functions commonly used by windijs development plugins, like vitePlugin.
