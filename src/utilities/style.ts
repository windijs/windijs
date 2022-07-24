import { GeneralCSSData, Handler } from "../types";
import * as units from "../helpers/unit";
import * as funcs from "../helpers/funcs";
import { useProxy } from "../helpers/proxy";
import { css } from "./base";

export function styleProperty () {
  const build = (prop: string, value: string) => css({ [prop]: value });

  return (prop => useProxy(value => {
    if (value === "var") return (name: string, defaultValue?: string | undefined) => build(prop, funcs.$var(name, defaultValue));
    if (value in funcs) return (...args: any[]) => build(prop, ((funcs as { [key: string]: Function })[value])(...args));
    if (value === "in") return useProxy(v => build(prop, units.$in[+v].toString()));
    if (value in units && value !== "color") return useProxy(v => build(prop, (units as any)[value][v].toString()));
    return build(prop, value);
  })) as Handler<GeneralCSSData>;
}
