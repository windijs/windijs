import { css, escapeCSS, StyleObject } from "@windijs/helpers";
import { ExtractorConfig, setSelector, generateUtilities, generateVariants } from "./common";

export function attributifyExtractor<T extends Record<string, object>>(config: ExtractorConfig<T>) {
  const utilitiesWithDefaults = Object.fromEntries(
    Object.entries(config.utilities)
      .map(([k, v]) => [k, (v as StyleObject).css])
      .filter(i => i[1] != null)
  );

  function build(result: RegExpExecArray, groups: Record<string, string | undefined> = {}) {
    const ident = groups.ident ?? "class";
    const variants = groups.variants?.split(config.variantSeparator).filter(Boolean) ?? [];
    const important = groups.important == null;
    const attrs = (groups.attrs ?? "").split(" ").filter(Boolean);
    let props: string[] = [];
    const styles: StyleObject[] = [];
    const equal = attrs.length === 1 ? "=" : "~=";
    const variantRegex = new RegExp(`^([\\w-]+${config.variantSeparator})+`);

    if (ident in utilitiesWithDefaults) {
      const defaultCSS = setSelector(css(utilitiesWithDefaults[ident]), `[${ident}]`);
      styles.push(defaultCSS);
    }

    for (const attr of attrs) {
      props = attr.split(config.separator).filter(Boolean) ?? [];
      const propVariants = variantRegex.exec(props[0]);
      if (propVariants) props[0] = props[0].slice(propVariants[0].length);

      styles.push(
        ...generateVariants(
          config,
          generateUtilities(config, ident, props),
          propVariants ? [...variants, ...propVariants[0].split(config.variantSeparator).filter(Boolean)] : variants
        ).map(i => setSelector(i, `[${escapeCSS(result[2])}${equal}"${attr}"]`))
      );
    }

    return styles;
  }

  return {
    rule: new RegExp(
      `(^|\\s)(${config.attributify?.prefix || ""}(?<important>!)?(?<variants>([\\w-]+:)*)(?<ident>\\w+))\\s*=\\s*(["'](?<attrs>.*?)["'])`,
      "gm"
    ),
    build,
  };
}
