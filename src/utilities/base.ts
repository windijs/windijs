// TODO: support more complex plugin api, like allow both get and set

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

export class Utility<T = {}> {
  private plugins: {
    get: ((uid: string, p: string) => any)[];
    apply?: ((thisArg: any, argArray: any[]) => any)[];
    construct?: ((argArray: any[], newTarget: Function) => object)[];
    defineProperty?: ((p: string, attributes: PropertyDescriptor) => boolean)[];
    deleteProperty?: ((p: string) => boolean)[];
    getOwnPropertyDescriptor?: ((p: string) => PropertyDescriptor | undefined)[];
    getPrototypeOf?: (() => object | null)[];
    has?: ((p: string) => boolean)[];
    isExtensible?: (() => boolean)[];
    ownKeys?: (() => ArrayLike<string>)[];
    preventExtensions?: (() => boolean)[];
    set?: ((p: string, value: any) => boolean)[];
    setPrototypeOf?: ((v: object | null) => boolean)[];
  };

  private root: Object;
  readonly uid: string;

  constructor (uid: string) {
    this.uid = uid;
    this.root = {};
    this.plugins = {
      get: [],
    };
  }

  public use<U> (plugin: ((uid: string, prop: string) => U) | { get: (uid: string, prop: string) => U; default?: Object }): Utility<T & U> {
    if (typeof plugin === "function") {
      this.plugins.get.push(plugin);
    } else {
      if (plugin.default) this.root = plugin.default;
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
        for (const plugin of plugins) {
          result = plugin(uid, prop);
          if (result) return result;
        }
      },
    };
    return new Proxy(this.root, handler) as unknown as T;
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
