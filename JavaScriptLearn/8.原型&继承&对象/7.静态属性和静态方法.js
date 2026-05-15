// 我们还可以为整个类分配一个方法。这样的方法被称为 静态的（static）。
//
// 在一个类的声明中，它们以 static 关键字开头。

// 这实际上跟直接将其作为属性赋值的作用相同。
class User {
    static staticMethod() {
        console.log((this === User));;
    }
}

User.staticMethod(); // true

// 上述代码等价于：
// class User {}
//
// User.staticMethod = function () {
//     console.log((this === User));;
// }

// 通常，静态方法用于实现属于整个类，但不属于该类任何特定对象的函数。
// 在静态方法中的 this 指向的是对象本身，而不是实例。
class Article {
    constructor(title, date) {
        this.title = title;
        this.date = date;
    }

    static createTodays() {
        // 记住 this = Article
        return new this("Today's digest", new Date());
    }
}

// 静态方法可以在类上调用，而不是在单个对象上。
// 意思就是不能在对象实例上进行调用静态方法。

// 静态属性与静态方法的作用和使用方法类似。

// 静态属性和方法是可被继承的。

let article = Article.createTodays();

console.log((article.title)); // Today's digest

class Animal {
    static planet = "Earth";

    constructor(name, speed) {
        this.speed = speed;
        this.name = name;
    }

    run(speed = 0) {
        this.speed += speed;
        console.log((`${this.name} runs with speed ${this.speed}.`));;
    }

    static compare(animalA, animalB) {
        return animalA.speed - animalB.speed;
    }

}

// 继承于 Animal
class Rabbit extends Animal {
    hide() {
        console.log((`${this.name} hides!`));;
    }
}

let rabbits = [
    new Rabbit("White Rabbit", 10),
    new Rabbit("Black Rabbit", 5)
];

rabbits.sort(Rabbit.compare);

rabbits[0].run(); // Black Rabbit runs with speed 5.

console.log((Rabbit.planet)); // Earth

// Rabbit extends Animal 创建了两个 [[Prototype]] 引用：
//
// Rabbit 函数原型继承自 Animal 函数。
// Rabbit.prototype 原型继承自 Animal.prototype。
// 结果就是，继承对常规方法和静态方法都有效。

class Animal {}
class Rabbit extends Animal {}

// 对于静态的
console.log((Rabbit.__proto__ === Animal)); // true

// 对于常规方法
console.log((Rabbit.prototype.__proto__ === Animal.prototype)); // true

// 总结
// 静态方法被用于实现属于整个类的功能。它与具体的类实例无关。
//
// 举个例子， 一个用于进行比较的方法 Article.compare(article1, article2) 或一个工厂（factory）方法 Article.createTodays()。
//
// 在类声明中，它们都被用关键字 static 进行了标记。
//
// 静态属性被用于当我们想要存储类级别的数据时，而不是绑定到实例。
//
// 语法如下所示：
//
// class MyClass {
//   static property = ...;
//
//   static method() {
//     ...
//   }
// }
// 从技术上讲，静态声明与直接给类本身赋值相同：
//
// MyClass.property = ...
// MyClass.method = ...
// 静态属性和方法是可被继承的。
//
// 对于 class B extends A，类 B 的 prototype 指向了 A：B.[[Prototype]] = A。因此，如果一个字段在 B 中没有找到，会继续在 A 中查找。