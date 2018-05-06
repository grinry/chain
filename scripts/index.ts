import { expect } from 'chai';

interface Animal {
    walk();
}
export class Human implements Animal {
    private name: string;
    private lib = expect;
    constructor(name) {
        this.name = name;
    }
    walk() {
        return this.name + ' walks ' + this.lib.fail('s');
    }
}

const human = new Human('John');
human.walk();
// human.walk();
// human.walk();
// human.walk();
