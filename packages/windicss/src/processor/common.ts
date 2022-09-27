import {
  applyVariant,
  buildRules,
  createRules,
  escapeCSS,
  CSSRules,
  dedupRules,
  StyleObject,
  SymbolData,
  VariantBuilder,
  isStyleArray,
  isStyleObject,
  unify,
} from "@windijs/helpers";
import { hash, hasKey } from "@windijs/shared";

export interface ExtractorConfig<T extends Record<string, object> = {}> {
  utilities: T;
  variants: Record<string, VariantBuilder>;
  extractors: Extractor[];
  separator: string;
  variantSeparator: string;
}

export type Generator = (result: RegExpExecArray, groups?: Record<string, string | undefined>) => StyleObject | StyleObject[] | undefined;

export type UtilityData = { $className: string };

export type Extractor = [RegExp, (config: ExtractorConfig) => Generator];

export const BaseRule = /(^|\s)(?<important>!)?(?<variants>(\w+:)*)/gm;

export function getNestedObject<T extends object>(root: T, paths: string[]): unknown {
  return paths.reduce((obj: object, key) => {
    const v = obj[key as keyof typeof obj];
    if (v == null) throw new Error(`Object has no attribute '${key}'.`);
    return v;
  }, root);
}

export function setUtilityName(utility: StyleObject, className: string) {
  const data = utility[SymbolData];
  if (data != null) (utility[SymbolData] as UtilityData).$className = className;
  else utility[SymbolData] = { $className: className };
  return utility;
}

export function buildCSS(utilities: StyleObject[]) {
  const rules: CSSRules = [];

  for (const utility of utilities) rules.push(...createRules(applyVariant(utility), "." + ((utility[SymbolData] as UtilityData) ?? {}).$className));

  return buildRules(dedupRules(rules));
}

export function extendRegex(raw: RegExp, append: RegExp) {
  return new RegExp(raw.source + append.source, raw.flags);
}

export function generateUtilities(config: ExtractorConfig, ident: string, props: string[]) {
  const styles: StyleObject[] = [];

  if (hasKey(config.utilities, ident)) {
    const utility = getNestedObject(config.utilities[ident], props);
    if (isStyleArray(utility)) styles.push(...(utility as StyleObject[]));
    else if (isStyleObject(utility)) styles.push(utility);
  }

  return styles;
}

export function generateVariants(config: ExtractorConfig, styles: StyleObject[], variants: string[]) {
  return variants
    .map(k => {
      if (hasKey(config.variants, k)) return config.variants[k];
      throw new Error(`Unrecognizable variant '${k}'.`);
    })
    .reduceRight((prev, variant) => variant(...prev), styles);
}

export function extractGroup(
  groups: Record<string, string | undefined>,
  config: ExtractorConfig,
  extend: true
): { ident: string; props: string[]; variants: string[]; important: boolean } & Record<string, string | undefined>;
export function extractGroup(groups: Record<string, string | undefined>, config: ExtractorConfig, extend: false): Record<string, string | undefined>;
export function extractGroup(groups: Record<string, string | undefined>, config: ExtractorConfig, extend = false) {
  const ident = groups.ident;
  if (!ident) throw new Error(`Unrecognizable utility '${ident}'`);
  if (!extend) return groups;

  return {
    ...groups,
    ident,
    props: groups.props?.split(config.separator).filter(Boolean) ?? [],
    variants: groups.variants?.split(config.variantSeparator).filter(Boolean),
    important: groups.important == null,
  };
}

export class Processor {
  config: ExtractorConfig;
  constructor(config: ExtractorConfig) {
    this.config = config;
  }

  extract(src: string) {
    let result: RegExpExecArray | null = null;
    const styles: StyleObject[] = [];
    const extractors = this.config.extractors.map(([regex, fn]) => [regex, fn(this.config)] as [RegExp, Generator]);

    for (const [regexp, extractor] of extractors)
      do {
        result = regexp.exec(src);
        if (result) {
          const style = extractor(result, result.groups);
          const name = escapeCSS(result[0].trim());
          if (Array.isArray(style)) styles.push(...style.map(i => setUtilityName(i, name)));
          else if (style) styles.push(setUtilityName(style, name));
        }
      } while (result != null);

    return styles;
  }

  interpret(src: string) {
    return buildCSS(this.extract(src));
  }

  compile(src: string, outputClassName?: string) {
    const styles = this.extract(src);

    return unify(
      "." +
        (outputClassName ??
          "windi-" +
            hash(
              styles
                .map(i => ((i[SymbolData] as UtilityData) ?? {}).$className)
                .sort()
                .join()
            )),
      styles
    );
  }
}
