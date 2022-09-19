export function processCode(text: string) {
  return text.replace(/export\s+{[^}]*};?/, "").replace(/import\s*(({[^}]+})|([\w_$]+))\s*from\s*(("[^"]*")|('[^']*'))/g, "var $1 = require($4)");
}
