import { compress } from "brotli";
import { readFileSync } from "fs";

const file = readFileSync("dist/index.js");
const compressed = compress(file);
const compressedSize = (compressed.length / 1024).toFixed(2) + "kb";
// eslint-disable-next-line no-console
console.log(`brotli: ${compressedSize}`);
