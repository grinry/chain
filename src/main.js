const { VM } = require('vm2');
const fs = require('fs');
const path = require('path');
const ts = require('typescript');

const vmRequire = require;
vmRequire.extensions['.ts'] = (module, filename) => {
    // console.log(module, filename);
    // const code = ts.transpile(fs.readFileSync(filename, 'utf8'));
    const code = fs.readFileSync(filename, 'utf8');
    console.log(code);
    module.exports = code;
};
const vm = new VM({
    timeout: 1000,
    sandbox: {
        require: require,
        module: module,
    },
    compiler: (code) => {
        console.log(ts.transpile(code));
        return ts.transpile(code);
    }
});

try {
    // const code = `
    // enum Num {
    //  Zero = 0,
    //  One = 1,
    //  Two = 2
    // }
    // interface Being {}
    // class Human implements Being {
    //     num: Num;
    //     constructor(num: Num) {
    //         this.num = num;
    //         return this.num;
    //     }
    // }
    //
    // const human = new Human(Num.One);
    // `;
    const code = require('../scripts/index.ts');

    const result = vm.run(code);
    console.log('Result: ', result);
} catch (error) {
    console.error(error);
}
