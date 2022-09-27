import { BaseRule, extendRegex, extractGroup, Extractor, ExtractorConfig, generateUtilities, generateVariants } from "./common";

export function utilityGenerator<T extends Record<string, object>>(config: ExtractorConfig<T>) {
  function generate(result: RegExpExecArray, groups: Record<string, string | undefined> = {}) {
    const { ident, props, variants } = extractGroup(groups, config, true);
    // TODO: support important

    const styles = generateUtilities(config, ident, props);
    return variants ? generateVariants(config, styles, variants) : styles;
  }

  return generate;
}

export const UtilityRule = extendRegex(BaseRule, /(?<ident>\w+)(?<props>(-\w+)*)(?=[\s'"`]|$)/);

export const UtilityExtractor: Extractor = [UtilityRule, utilityGenerator];
