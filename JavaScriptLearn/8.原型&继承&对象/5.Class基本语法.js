// 将之前学习过的原型&继承进一步地抽象，可以得到类这个概念。
// 基本语法是：
//
// class MyClass {
//   // class 方法
//   constructor() { ... }
//   method1() { ... }
//   method2() { ... }
//   method3() { ... }
//   ...
// }
//
// 然后使用 new MyClass() 来创建具有上述列出的所有方法的新对象。
//
// new 会自动调用 constructor() 方法，因此我们可以在 constructor() 中初始化对象。
// 在构造函数外部创建的函数会在对象的原型中！其实所谓的 class 也是一个函数。
// 换句话说，构造函数外部定义的函数会被方法 F.prototype 中。

class User {

    constructor(name) {
        // 调用 setter
        this.name = name;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        if (value.length < 4) {
            console.log(("Name is too short."));;
            return;
        }
        this._name = value;
    }

}

console.log(typeof User);
// get set 函数显然是在构造函数之前就已经完成了，并且这个是挂在原型上的！
// 这里可以总结一下：
// 挂在原型还是挂在对象实例上看其是方法还是属性（类字段），若是方法则挂在原型上，否则挂在对象实例上。
let user = new User("John");
console.log((user.name)); // John

user = new User(""); // Name is too short.

// JS 中的 class 不只是语法糖，他在内部和原型还是有着巨大的不同。
// 1. 首先，通过 class 创建的函数具有特殊的内部属性标记 [[IsClassConstructor]]: true。因此，它与手动创建并不完全相同。
// 函数可以不使用 new，但是 class 必须使用 new 来创建。
// 2. 类方法不可枚举。 类定义将 "prototype" 中的所有方法的 enumerable 标志设置为 false。
// 这很好，因为如果我们对一个对象调用 for..in 方法，我们通常不希望 class 方法出现。
// 3. 类总是使用 use strict。 在类构造中的所有代码都将自动进入严格模式。

// 类可以被传递（可以作为函数参数、变量、函数返回值等等），包括在初始化时，这种情况下的任何创建都可以是匿名的。
let l = class {
    constructor(name) {
        this.name = name;
    }
    sayHello() {
        console.log("Hello");
    }
}

let Jay = new l("Tom Jay");
Jay.sayHello();

// 就算被传递，也可以拥有类的名字，但是这个名字只能在内部访问。

// class 也可以计算属性名称，使用 [].
class Test {
    ['s' + 'b']() {
        console.log("sb");
    }
}

// 类字段，也就是不在构造器中的属性，这个会被挂在对象实例中。
// 为了不丢失 this，可以在 class 中使用 属性 + 剪头函数。
// 箭头函数的 this 只与定义的位置有关！

// 总结
// 基本的类语法看起来像这样：
//
// class MyClass {
//   prop = value; // 属性
//
//   constructor(...) { // 构造器
//     // ...
//   }
//
//   method(...) {} // method
//
//   get something(...) {} // getter 方法
//   set something(...) {} // setter 方法
//
//   [Symbol.iterator]() {} // 有计算名称（computed name）的方法（此处为 symbol）
//   // ...
// }
// 技术上来说，MyClass 是一个函数（我们提供作为 constructor 的那个），而 methods、getters 和 setters 都被写入了 MyClass.prototype。