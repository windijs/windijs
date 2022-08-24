"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _sucrase = require('sucrase');

function getTransforms(filename) {
  if (filename.endsWith(".js") || filename.endsWith(".jsx")) {
    return ["flow", "jsx", "imports", "jest"];
  } else if (filename.endsWith(".ts")) {
    return ["typescript", "imports", "jest"];
  } else if (filename.endsWith(".tsx")) {
    return ["typescript", "jsx", "imports", "jest"];
  }
  return null;
}

// this is compatible to the one that is required by Jest, using the type from here:
// https://github.com/mozilla/source-map/blob/0.6.1/source-map.d.ts#L6-L12


 function process(
  src,
  filename,
) {
  const transforms = getTransforms(filename);
  if (transforms !== null) {
    const {code, sourceMap} = _sucrase.transform.call(void 0, src, {
      transforms,
      sourceMapOptions: {compiledFilename: filename},
      filePath: filename,
    });
    const mapBase64 = Buffer.from(JSON.stringify(sourceMap)).toString("base64");
    const suffix = `//# sourceMappingURL=data:application/json;charset=utf-8;base64,${mapBase64}`;
    // sourceMappingURL is necessary for breakpoints to work in WebStorm, so
    // include it in addition to specifying the source map normally.
    return {code: `${code}\n${suffix}`, map: sourceMap};
  } else {
    return {code: src};
  }
} exports.process = process;

exports. default = {process};
