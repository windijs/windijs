import { GeneralCSSData, Handler } from "../types";
import * as units from "../helpers/unit";
import * as funcs from "../helpers/funcs";
import { useProxy } from "../utils";
import { css } from "./base";

export function styleProperty () {
  const build = (uid: string, prop: string, value: string) => css({
    [prop]: value,
  }, {
    type: "generic",
    uid,
    props: [prop, value],
  });

  return ((uid, prop) => useProxy(value => {
    if (value === "var") return (name: string, defaultValue?: string | undefined) => build(uid, prop, funcs.$var(name, defaultValue));
    if (value in funcs) return (...args: any[]) => build(uid, prop, ((funcs as { [key: string]: Function })[value])(...args));
    if (value === "in") return useProxy(v => build(uid, prop, units.$in[+v].toString()));
    if (value in units && value !== "color") return useProxy(v => build(uid, prop, (units as any)[value][v].toString()));
    return build(uid, prop, value);
  })) as Handler<GeneralCSSData>;
}
