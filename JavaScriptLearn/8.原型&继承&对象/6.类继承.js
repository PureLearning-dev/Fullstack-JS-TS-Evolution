// 类继承可以让一个类基于另一个类进行扩展（可以在现有功能之上创建新功能），是面向对象的一个十分重要的特性。
class Animal {
    constructor(name) {
        this.speed = 0;
        this.name = name;
    }
    run(speed) {
        this.speed = speed;
        console.log((`${this.name} runs with speed ${this.speed}.`));;
    }
    stop() {
        this.speed = 0;
        console.log((`${this.name} stands still.`));;
    }
}

let animal = new Animal("My animal");
console.log(animal);

class Rabbit extends Animal {
    hide() {
        console.log(`${this.name} hide`);
    }
}

let rabbit = new Rabbit("My rabbit");
rabbit.hide();
// 可以访问父类中定义的方法。
rabbit.run(100);
rabbit.stop();

// 使用 extends 关键字，会将对应 class 原型的 [[Prototype]] 指向父类。
// 然后对象在访问父类原型中的方法时，在自己类原型上没有找到对应的方法时，就会沿着 [[Prototype]] 找到父类原型的方法，从而调用到正确的方法了。
//
// 例如，要查找 rabbit.run 方法，JavaScript 引擎会进行如下检查：
//
// 查找对象 rabbit（没有 run）。
// 查找它的原型，即 Rabbit.prototype（有 hide，但没有 run）。
// 查找它的原型，即（由于 extends）Animal.prototype，在这儿找到了 run 方法。

// 类语法不仅允许指定一个类，在 extends 后可以指定任意表达式。
// 这个意思是 extends 后接任何能求值出一个构造函数的表达式都可以。

// 1. 函数调用
function getAnimalClass() {
    return Animal;
}
class Dog extends getAnimalClass() {}

// 2. 三元表达式
let isWild = true;
class Cat extends (isWild ? Tiger : HouseCat) {}

// 3. 工厂函数
class Dog extends animalFactory('dog') {
    // animalFactory('dog') 返回一个类，extends 拿到这个返回值
}

// 4. 条件判断
function getBase() {
    if (isBrowser) return BrowserAnimal;
    if (isNode) return NodeAnimal;
    return Animal;
}
class Dog extends getBase() {}

// 还可以更加复杂。
// 定义一个 mixin：给任意类加上"飞"的能力
let CanFly = (Base) => class extends Base {
    fly() {
        console.log(`${this.name} 飞起来了`);
    }
};

// 定义一个 mixin：加上"游泳"的能力
let CanSwim = (Base) => class extends Base {
    swim() {
        console.log(`${this.name} 游起来了`);
    }
};

// 基础类
class Animal {
    constructor(name) {
        this.name = name;
    }
}

// 组合！extends 后面是一个函数调用
class Duck extends CanFly(CanSwim(Animal)) {}
//               ↑ 表达式，返回一个经过了两次 mixin 的类

let donald = new Duck("唐老鸭");
donald.fly();   // "唐老鸭 飞起来了"
donald.swim();  // "唐老鸭 游起来了"

// 子类可以重写父类中的方法，只用在子类中定义一个和父类中方法一样名字的方法则可，原理是在沿着原型链找方法时，执行第一个找到的方法。
// 但是在很多时候，我们并不希望完全重写父类的方法。
//
// Class 为此提供了 "super" 关键字。
//
// 执行 super.method(...) 来调用一个父类方法。
// 执行 super(...) 来调用一个父类 constructor（只能在我们的 constructor 中）。

// super 不是普通的变量查找，它依赖于函数的 [[HomeObject]] 内部属性，而箭头函数没有这个属性，所以会往外层借。
// 这样的箭头函数是可以的，其没有 super（没有 [[HomeObject]] 属性），在外层找，也就是 stop 中，stop 中的 super 显然可以直接调用父类中的方法。
class Rabbit extends Animal {
    stop() {
        setTimeout(() => super.stop(), 1000); // 1 秒后调用父类的 stop
    }
}

// 匿名函数就不行。
// 其中的 [[HomeObject]] 属性为 undefine，找不到 super。
class Rabbit extends Animal {
    stop() {
        // 意料之外的 super
        setTimeout(function() { super.stop() }, 1000);
    }
}
// 继承类的 constructor 必须调用 super(...)，并且 (!) 一定要在使用 this 之前调用。
// 因为使用 class 创建对象和之前学习的函数是不同的。
// 派生构造器具有特殊的内部属性 [[ConstructorKind]]:"derived"。这是一个特殊的内部标签。
//
// 该标签会影响它的 new 行为：
//
// 当通过 new 执行一个常规函数时，它将创建一个空对象，并将这个空对象赋值给 this。
// 但是当继承的 constructor 执行时，它不会执行此操作。它期望父类的 constructor 来完成这项工作。
// 因此，派生的 constructor 必须调用 super 才能执行其父类（base）的 constructor，否则 this 指向的那个对象将不会被创建。并且我们会收到一个报错。
class Animal {

    constructor(name) {
        this.speed = 0;
        this.name = name;
    }

    // ...
}

class Rabbit extends Animal {

    constructor(name, earLength) {
        super(name);
        this.earLength = earLength;
    }

    // ...
}

// 现在可以了
let rabbit = new Rabbit("White Rabbit", 10);
alert(rabbit.name); // White Rabbit
alert(rabbit.earLength); // 10

// 类字段是这样初始化的：
//
// 对于基类（还未继承任何东西的那种），在构造函数调用前初始化。
// 对于派生类，在 super() 后立刻初始化。

// 这样的初始化顺序，可能会造成一些难以理解的结果。
class Animal {
    name = 'animal';

    constructor() {
        alert(this.name); // (*)
    }
}

class Rabbit extends Animal {
    name = 'rabbit';
}

new Animal(); // animal
new Rabbit(); // animal
// 输出的都是 animal，有点反直觉！
// 其中的原因就是字段的初始化顺序，调用子类进行初始化时，因为没有构造函数，相当于直接调用父类的构造函数。
// 父类是一个基类，所以会在构造函数之前初始化属性，然后类进行构造，调用父类的构造方法，会去 alert this.name，但是子类并没有，所以就会去父类找

// 总结
// 想要扩展一个类：class Child extends Parent：
// 这意味着 Child.prototype.__proto__ 将是 Parent.prototype，所以方法会被继承。
// 重写一个 constructor：
// 在使用 this 之前，我们必须在 Child 的 constructor 中将父 constructor 调用为 super()。
// 重写一个方法：
// 我们可以在一个 Child 方法中使用 super.method() 来调用 Parent 方法。
// 内部：
// 方法在内部的 [[HomeObject]] 属性中记住了它们的类/对象。这就是 super 如何解析父方法的。
// 因此，将一个带有 super 的方法从一个对象复制到另一个对象是不安全的。
// 补充：
//
// 箭头函数没有自己的 this 或 super，所以它们能融入到就近的上下文中，像透明似的。