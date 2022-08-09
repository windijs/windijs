import type { CSSDimension, CSSFlex, CSSPercentage } from "types";

// TODO: should return object, like CSSPercentage/CSSDimension...
// TODO: support multiple add/sub/mul/div

export function sub (left: string | number | CSSDimension | CSSFlex | CSSPercentage, right: string | number | CSSDimension | CSSFlex | CSSPercentage) {
  if (typeof left === "object" && typeof right === "object") {
    if (left.type === right.type) return (left.value - right.value) + (left.type === "percent" ? "%" : left.type);
  }
  return left + " - " + right;
}

export function add (left: string | number | CSSDimension | CSSFlex | CSSPercentage, right: string | number | CSSDimension | CSSFlex | CSSPercentage) {
  if (typeof left === "object" && typeof right === "object") {
    if (left.type === right.type) return (left.value + right.value) + (left.type === "percent" ? "%" : left.type);
  }
  return left + " + " + right;
}

export function mul (left: string | number | CSSDimension | CSSFlex | CSSPercentage, right: string | number | CSSDimension | CSSFlex | CSSPercentage) {
  if (typeof left === "number" && typeof right === "object") return (left * right.value) + (right.type === "percent" ? "%" : right.type);
  if (typeof left === "object" && typeof right === "number") return (left.value * right) + (left.type === "percent" ? "%" : left.type);
  if (typeof left === "number" && typeof right === "number") return (left * right) + "";
  return left + " * " + right;
}

export function div (left: string | number | CSSDimension | CSSFlex | CSSPercentage, right: string | number | CSSDimension | CSSFlex | CSSPercentage) {
  if (typeof left === "object" && typeof right === "number") return (left.value / right) + (left.type === "percent" ? "%" : left.type);
  if (typeof left === "number" && typeof right === "number") return (left / right) + "";
  return left + " / " + right;
}

const WindiPrecision = 10;

export function prec (n: number) {
  return +n.toFixed(WindiPrecision);
}
