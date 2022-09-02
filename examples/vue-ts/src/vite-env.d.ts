/// <reference types="vite/client" />
/// <reference path="./windi-module" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
