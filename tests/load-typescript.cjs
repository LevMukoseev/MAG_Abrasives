const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');

// Compile pure application modules in memory without adding a test runner dependency.
const cache = new Map();
function loadTypeScript(filename) {
  const absolute = path.resolve(__dirname, '..', filename);
  if (cache.has(absolute)) return cache.get(absolute).exports;
  const module = { exports: {} };
  cache.set(absolute, module);
  const compiled = ts.transpileModule(fs.readFileSync(absolute, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
    fileName: absolute,
  }).outputText;
  const resolve = (name) => {
    if (!name.startsWith('@/') && !name.startsWith('.')) return require(name);
    const candidate = name.startsWith('@/')
      ? path.resolve(__dirname, '..', 'src', name.slice(2))
      : path.resolve(path.dirname(absolute), name);
    if (/\.(cjs|js)$/.test(candidate)) return require(candidate);
    const source = ['.ts', '.tsx'].map((extension) => candidate + extension).find(fs.existsSync);
    if (!source) throw new Error(`Cannot resolve test module ${name}`);
    return loadTypeScript(path.relative(path.resolve(__dirname, '..'), source));
  };
  const evaluate = vm.runInThisContext(`(function(require, module, exports) {${compiled}\n})`, { filename: absolute });
  evaluate(resolve, module, module.exports);
  return module.exports;
}

module.exports = { loadTypeScript };
