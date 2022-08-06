import { SymbolProxy } from "helpers/common";
import { firstRet } from "utils";
import { guard } from "./api";
import { resetMeta } from "helpers/meta";

export class Utility<T = {}> implements ProxyHandler<Function> {
  private plugins: ((p: string) => any)[];

  readonly uid: string;

  constructor (uid: string) {
    this.uid = uid;
    this.plugins = [];
  }

  get (target: Function, p: string): any {
    return firstRet(this.plugins, [p]);
  }

  public case<K extends string, U> (trigger: K, plugin: (prop: string) => U): Utility<T & Record<K, U>> {
    this.plugins.push(guard(trigger, plugin));
    return this as unknown as Utility<T & Record<K, U>>;
  }

  public use<U> (plugin: (prop: string) => U): Utility<T & U> {
    this.plugins.push(plugin);
    return this as unknown as Utility<T & U>;
  }

  public init (): T {
    const uid = this.uid;
    const plugins = this.plugins;
    const target = function () {};
    Reflect.defineProperty(target, SymbolProxy, { value: true });

    const handler: ProxyHandler<Function> = {
      get (target, prop) {
        if (Reflect.has(target, prop)) return Reflect.get(target, prop);
        resetMeta(uid);
        let result;
        for (const plugin of plugins) {
          result = plugin(prop as string);
          if (result) return result;
        }
      },
      set (target, p, value) {
        return Reflect.defineProperty(target, p, { value, writable: true });
      },
    };
    return new Proxy(target, handler) as unknown as T;
  }
}

/**
 * Create a new utility.
 * @param uid Utility ID, usually it should be consistent with the variiable name you declared. Such as, `const bg = createUtility("bg")`
 * @returns {Utility} Utility
 */
export function createUtility (uid: string) {
  return new Utility(uid);
}

/**
 * Use single plugin.
 * @param uid
 * @param plugin
 * @returns
 */
export function use<U> (uid: string, plugin: (prop: string) => U): U {
  return new Proxy({}, {
    get (target, prop: string) {
      resetMeta(uid);
      const res = plugin(prop);
      if (res) return res;
    },
  }) as unknown as U;
}
