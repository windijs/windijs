import { resetMeta, SymbolProxy } from "@windijs/helpers";

import { guard } from "./api";

import type { Handler } from "@windijs/helpers";

export class Utility<T extends object = {}> implements ProxyHandler<T> {
  uid: string;
  plugins: ((p: string) => any)[];

  constructor(uid: string) {
    this.uid = uid;
    this.plugins = [];
  }

  get(target: T, prop: string | symbol) {
    if (Reflect.has(target, prop)) return Reflect.get(target, prop);
    resetMeta(this.uid);
    let result;
    for (const plugin of this.plugins) {
      result = plugin(prop as string);
      if (result) return result;
    }
  }

  set(target: T, prop: string | symbol, value: any) {
    return Reflect.defineProperty(target, prop, { value, writable: true });
  }

  public case<K extends string, U>(trigger: K, plugin: Handler<U>): Utility<T & { [P in K]: U }> {
    this.plugins.push(guard(trigger, plugin).get);
    return this as unknown as Utility<T & { [P in K]: U }>;
  }

  public use<U>(plugin: Handler<U>): Utility<T & U> {
    this.plugins.push(plugin.get);
    return this as unknown as Utility<T & U>;
  }

  public init(): T;
  public init<F extends Function | object>(target: F): F & T;
  public init<F extends Function | object>(target: F, handler: ProxyHandler<F>): F & T;
  public init<F extends Function | object>(target?: F | T, handler?: ProxyHandler<F>) {
    if (!target) target = function () {} as T;
    Object.defineProperty(target, SymbolProxy, { value: true });
    return new Proxy(target, handler || this);
  }
}

/**
 * Create a new utility.
 * @param uid Utility ID, usually it should be consistent with the variiable name you declared. Such as, `const bg = createUtility("bg")`
 * @returns Utility
 */
export function createUtility(uid: string) {
  return new Utility(uid);
}
