import type { CallExpressionArgument, LeftHandSideExpression } from "@typescript-eslint/types/dist/generated/ast-spec";

import { parse } from "@typescript-eslint/typescript-estree";

export type Handler = {
  type: string,
  guard?: string,
  arguments: CallExpressionArgument[],
}

let HANDLERS: Handler[] = [];

function analyzeHandler (expr: LeftHandSideExpression) {
  if (expr.type === "CallExpression" && expr.callee.type === "MemberExpression" && expr.callee.property.type === "Identifier") {
    analyzeHandler(expr.callee.object);
    switch (expr.callee.property.name) {
    case "use":
      for (const arg of expr.arguments) {
        if (arg.type === "CallExpression" && arg.callee.type === "Identifier" && arg.callee.name.endsWith("Handler")) {
          HANDLERS.push({ type: arg.callee.name, arguments: arg.arguments });
        }
      }
      break;
    case "case":
      if (expr.arguments[0].type === "Literal" && typeof expr.arguments[0].value === "string" && expr.arguments[1].type === "CallExpression" && expr.arguments[1].callee.type === "Identifier" && expr.arguments[1].callee.name.endsWith("Handler")) {
        HANDLERS.push({ type: expr.arguments[1].callee.name, arguments: expr.arguments[1].arguments, guard: expr.arguments[0].value });
      }
      break;
    }
  }
}

/**
 * Analyze handlers using in utilities, the results can be used to quickly generate .dts file.
 * @param code JavaScript/TypeScript code
 * @returns Utility name and handlers Object
 */
export function analyzeUtilities (code: string) {
  HANDLERS = [];

  const ast = parse(code, { loc: false, range: false });

  let name: string;
  const utilities: Record<string, Handler[]> = {};
  for (const node of ast.body) {
    if (node.type === "ExportNamedDeclaration" && node.declaration?.type === "VariableDeclaration") {
      for (const decl of node.declaration.declarations) {
        if (decl.type === "VariableDeclarator" && decl.id.type === "Identifier") {
          name = decl.id.name;
          HANDLERS = [];
          if (decl.init?.type === "CallExpression" && decl.init.callee.type === "MemberExpression" && decl.init.callee.property.type === "Identifier" && decl.init.callee.property.name === "init") {
            analyzeHandler(decl.init.callee.object);
          }
          utilities[name] = HANDLERS;
        }
      }
    }
  }
  return utilities;
}
