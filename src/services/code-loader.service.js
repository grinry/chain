const fs = require('fs');
const ts = require('typescript');

const vmRequire = require;
vmRequire.extensions['.ts'] = (module, filename) => {
    module.exports = ts.transpile(fs.readFileSync(filename, 'utf8'));
    console.log(module.exports);
};

module.exports = vmRequire;
