import { escapeCSS, StyleObject } from "@windijs/helpers";
import { ExtractorConfig, setSelector, generateUtilities, generateVariants } from "./common";

export function attributifyExtractor<T extends Record<string, object>>(config: ExtractorConfig<T>) {
  function build(result: RegExpExecArray, groups: Record<string, string | undefined> = {}) {
    const ident = groups.ident ?? "class";
    const variants = groups.variants?.split(config.variantSeparator).filter(Boolean);
    const important = groups.important == null;
    const attrs = (groups.attrs ?? "").split(" ").filter(Boolean);
    let props: string[] = [];
    const styles: StyleObject[] = [];
    const equal = attrs.length === 1 ? "=" : "~=";

    for (const attr of attrs) {
      props = attr.split(config.separator).filter(Boolean) ?? [];
      styles.push(...generateUtilities(config, ident, props).map(i => setSelector(i, `[${escapeCSS(result[2])}${equal}"${attr}"]`)));
    }

    return variants ? generateVariants(config, styles, variants) : styles;
  }

  return {
    rule: new RegExp(
      `(^|\\s)(${config.attributify?.prefix || ""}(?<important>!)?(?<variants>([\\w-]+:)*)(?<ident>\\w+))\\s*=\\s*(["'](?<attrs>.*?)["'])`,
      "gm"
    ),
    build,
  };
}
