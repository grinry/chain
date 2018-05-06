interface Animal {
    walk();
}
class Human implements Animal {
    private name: string;
    constructor(name) {
        this.name = name;
    }
    walk() {
        return this.name + ' walks';
    }
}

const human = new Human('John');
human.walk();
human.walk();
human.walk();
human.walk();
