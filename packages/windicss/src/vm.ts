import { Expression, Parser, ParserOptions, Value } from "expr-eval";

import { StyleObject } from "@windi/helpers";

type WindiExpression = Expression & { eval(ctx?: Value | undefined): StyleObject[] };

export class Vm<T extends object = {}> extends Parser {
  ctx: T;

  constructor (options?: ParserOptions, ctx?: T) {
    super(options);
    this.ctx = ctx ?? {} as T;
  }

  setContext (ctx: T) {
    this.ctx = ctx;
  }

  parse (src: string): WindiExpression {
    const expr = super.parse("[" + src + "]");

    Reflect.defineProperty(expr, "eval", {
      value: (ctx?: Value | undefined) => {
        return expr.evaluate({ ...this.ctx as object, ...ctx as object });
      },
    });

    return expr as WindiExpression;
  }
}
