const { VM } = require('vm2');
const loader = require('./services/code-loader.service');
require('module');
const vm = new VM({
    timeout: 1000,
    sandbox: {
        require: require,
        module: module,
        exports,
    },
    // compiler: (code) => {
    //     console.log(ts.transpile(code));
    //     return ts.transpile(code);
    // }
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
    const code = loader('../../scripts/index.ts');

    const result = vm.run(code);
    console.log('Result: ', result);
} catch (error) {
    console.error(error);
}
