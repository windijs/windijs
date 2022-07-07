export class Utility<T = {}> {
  private plugins: ((key: string) => any)[];

  constructor () {
    this.plugins = [];
  }

  public use<U> (plugin: (key: string) => U): Utility<T & U> {
    this.plugins.push(plugin);
    return this as unknown as Utility<T & U>;
  }

  public init (): T {
    const plugins = this.plugins;
    const handler: ProxyHandler<{}> = {
      get (target, prop: string, receiver) {
        let result;
        for (const plugin of plugins) {
          result = plugin(prop);
          if (result) return result;
        }
      },
    };
    return new Proxy({}, handler) as unknown as T;
  }
}
