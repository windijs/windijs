# typedoc-monorepo-link-types

This module helps monorepos to create a nicer documentation with cross package links, and also creating non-exported but in packages Symbols.

> Supports TypeDoc 0.22.x

### What is does?

After TypeDoc has finished converting package; it will;

- Look for types which are referenced and have been instantiate on other scopes and create a `link` to it.
- Look for types which are referenced, but not exported, and place them into an internal namespace for that entry point (called `internal` by default).

If your project references classes which are built into the language (e.g. `HTMLElement`), this package _will_ result in those types being documented to. If you want to prevent this, set TypeDoc's `excludeExternals` option to `true`. The default pattern for determining if a symbol is external will exclude everything within `node_modules`.

### Usage

```shell
npm install typedoc-monorepo-link-types --save-dev
```

TypeDoc will automatically use this plugin when present.

### Options

| Name                | Type      | Description                                                     |
| :------------------ | :-------- | :-------------------------------------------------------------- |
| `internalNamespace` | `string`  | Define the name of the namespace to append non exported symbols |
| `noMissingExports`  | `boolean` | Disabling this only link between exported types will be created |

### Road map

- [ ] Add tests
