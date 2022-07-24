// TODO: support more complex plugin api, like allow both get and set

import { CSSObject, StyleObject, UtilityMeta } from "../types";
import { SymbolCSS, SymbolData, SymbolMeta, SymbolProxy } from "../helpers/symbol";
import { firstRet, parenWrap } from "../utils";
import { getMeta, pushMetaProp, resetMeta } from "../helpers/meta";

interface UtilityPlugin {
  get: (p: string) => any;
  apply?: (thisArg: any, argArray: any[]) => any;
  construct?: (argArray: any[], newTarget: Function) => object;
  defineProperty?: (p: string, attributes: PropertyDescriptor) => boolean;
  deleteProperty?: (p: string) => boolean;
  getOwnPropertyDescriptor?: (p: string) => PropertyDescriptor | undefined;
  getPrototypeOf?: () => object | null;
  has?: (p: string) => boolean;
  isExtensible?: () => boolean;
  ownKeys?: () => ArrayLike<string>;
  preventExtensions?: () => boolean;
  set?: (p: string, value: any) => boolean;
  setPrototypeOf?: (v: object | null) => boolean;
}

export function isStyleObject (i: unknown) {
  return i != null && typeof i === "object" && SymbolCSS in i;
}

export function css (css: CSSObject, data?: { [key: string]: unknown }, meta?: UtilityMeta) {
  if (data != null) {
    for (const [k, v] of Object.entries(data)) {
      if (typeof v === "function") {
        data[k] = (...args: unknown[]) => {
          pushMetaProp(parenWrap(k, args.toString())); // push func prop, for example bg.red.opacity(50) -> [..., opacity(50)]
          return v(...args);
        };
      }
    }
  }

  return new Proxy({
    [SymbolProxy]: true,
    [SymbolCSS]: css,
    [SymbolMeta]: meta ?? getMeta(),
    [SymbolData]: data,
  }, {
    get (target, prop, receiver) {
      if (prop === "css") return Reflect.get(target, SymbolCSS, receiver);
      if (prop === "meta") return Reflect.get(target, SymbolMeta, receiver);
      if (prop === "toString") return () => Object.keys(target).join(" ");
      const data = Reflect.get(target, SymbolData, receiver);
      if (data && prop in data) return data[prop];
      return Reflect.get(target, prop, receiver);
    },
  }) as StyleObject;
}

export class Utility<T = {}> implements Required<ProxyHandler<Function>> {
  private plugins: {
    get: ((p: string) => any)[];
    apply: ((thisArg: any, argArray: any[]) => any)[];
    construct: ((argArray: any[], newTarget: Function) => object)[];
    defineProperty: ((p: string, attributes: PropertyDescriptor) => boolean)[];
    deleteProperty: ((p: string) => boolean)[];
    getOwnPropertyDescriptor: ((p: string) => PropertyDescriptor | undefined)[];
    getPrototypeOf: (() => object | null)[];
    has: ((p: string) => boolean)[];
    isExtensible: (() => boolean)[];
    ownKeys: (() => ArrayLike<string>)[];
    preventExtensions: (() => boolean)[];
    set: ((p: string, value: any) => boolean)[];
    setPrototypeOf: ((v: object | null) => boolean)[];
  };

  readonly uid: string;

  constructor (uid: string) {
    this.uid = uid;
    this.plugins = {
      get: [],
      apply: [],
      construct: [],
      defineProperty: [],
      deleteProperty: [],
      getOwnPropertyDescriptor: [],
      getPrototypeOf: [],
      has: [],
      isExtensible: [],
      ownKeys: [],
      preventExtensions: [],
      set: [],
      setPrototypeOf: [],
    };
  }

  get (target: Function, p: string): any {
    return firstRet(this.plugins.get, [p]);
  }

  apply (target: Function, thisArg: any, argArray: any[]) {
    return firstRet(this.plugins.apply, argArray);
  }

  construct (target: Function, argArray: any[], newTarget: Function): object {
    return firstRet(this.plugins.construct, argArray);
  }

  defineProperty (target: Function, p: string, attributes: PropertyDescriptor): boolean {
    return firstRet(this.plugins.defineProperty, [p, attributes]);
  }

  deleteProperty (target: Function, p: string): boolean {
    return firstRet(this.plugins.deleteProperty, [p]);
  }

  getOwnPropertyDescriptor (target: Function, p: string): PropertyDescriptor | undefined {
    return firstRet(this.plugins.getOwnPropertyDescriptor, [p]);
  }

  getPrototypeOf (): object | null {
    return firstRet(this.plugins.getPrototypeOf);
  }

  has (target: Function, p: string): boolean {
    return firstRet(this.plugins.has, [p]);
  }

  isExtensible (): boolean {
    return firstRet(this.plugins.isExtensible);
  }

  ownKeys (): Array<string> {
    return [];
  }

  preventExtensions (): boolean {
    return firstRet(this.plugins.preventExtensions);
  }

  set (target: Function, p: string, value: any, receiver: any): boolean {
    return firstRet(this.plugins.set, [p, value]);
  }

  setPrototypeOf (target: Function, v: object | null): boolean {
    return firstRet(this.plugins.setPrototypeOf, [v]);
  }

  public use<U> (plugin: ((prop: string) => U) | { get: (prop: string) => U }): Utility<T & U> {
    if (typeof plugin === "function") {
      this.plugins.get.push(plugin);
    } else {
      this.plugins.get.push(plugin.get);
    }
    return this as unknown as Utility<T & U>;
  }

  public init (): T {
    const uid = this.uid;
    const plugins = this.plugins.get;
    const handler: ProxyHandler<{}> = {
      get (target, prop: string) {
        let result;
        resetMeta(uid);
        for (const plugin of plugins) {
          result = plugin(prop);
          if (result) return result;
        }
      },
    };
    return new Proxy(function () {}, handler) as unknown as T;
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
