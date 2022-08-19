import { Bundle, ScriptTarget, SourceFile, TransformerFactory, createPrinter, createSourceFile, transform } from "typescript";

/**
 * Quickly use typescript transformer to convert the source code.
 * @param src Souce Code of TypeScript
 * @param transformers Typescript Transformers
 * @returns Transformed Code
 */
export function useTransformer (src: string, ...transformers: (TransformerFactory<SourceFile>)[]): string;
export function useTransformer (src: string, ...transformers: (TransformerFactory<SourceFile | Bundle>)[]): string;
export function useTransformer (src: string, ...transformers: (TransformerFactory<any>)[]): string {
  const printer = createPrinter();
  const source = createSourceFile("useTransform.ts", src, ScriptTarget.ESNext, true);
  const result = transform(source, transformers);
  const transformedSourceFile = result.transformed[0] as SourceFile;
  return printer.printFile(transformedSourceFile);
}
