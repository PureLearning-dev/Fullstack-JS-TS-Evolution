// 在 JS 中，每个函数都有一个 prototype 属性。
// 当使用 new F 时，会将得到的对象实例的 [[Prototype]] 指向 prototype 属性的对象。
let animal = {
    eats: true
};

function Rabbit(name) {
    this.name = name;
}
// 将 Rabbit 的 prototype 令为 animal，则使用 new Rabbit 得到的对象的 __proto__ 会是 animal.
Rabbit.prototype = animal;
console.log(new Rabbit("兔子").__proto__ === animal);
// F.prototype 属性仅在 new F 被调用时使用，它为新对象的 [[Prototype]] 赋值。
//
// 如果在创建之后，F.prototype 属性有了变化（F.prototype = <another object>），那么通过 new F 创建的新对象也将随之拥有新的对象作为 [[Prototype]]，但已经存在的对象将保持旧有的值。

// 默认的 "prototype" 是一个只有属性 constructor 的对象，属性 constructor 指向函数自身。
function Dog() {}
console.log(Dog.prototype.constructor === Dog);

// 我们可以使用 constructor 属性来创建一个新对象，该对象使用与现有对象相同的构造器。
// 当我们有一个对象，但不知道它使用了哪个构造器（例如它来自第三方库），并且我们需要创建另一个类似的对象时，用这种方法就很方便。
function Pig(name) {
    this.name = name;
}

let pig1 = new Pig("猪坚强");
// 利用对象继承的构造器进行创建新的对象。
let pig2 = new pig1.constructor("猪大海");
console.log(pig1, pig2);

// JavaScript 自身并不能确保正确的 "constructor" 函数值。
// 如果我们将整个默认 prototype 替换掉，那么其中就不会有 "constructor" 了。
function Cat() {}
Cat.prototype = {
    jumps: true
};

let cat = new Cat();
console.log(cat.constructor === Cat); // false

// 因此，为了确保正确的 "constructor"，我们可以选择添加/删除属性到默认 "prototype"，而不是将其整个覆盖：
function Human() {}
Human.prototype.sayHello = function () {
    console.log("Hello");
}

console.log(new Human().constructor === Human);

// 或者，也可以手动重新创建 constructor 属性：
Human.prototype = {
    constructor: Human,
    sayHello: function () {
        console.log("Hello");
    }
}

console.log(Human.prototype.constructor === Human);

// 总结
// 在本章中，我们简要介绍了为通过构造函数创建的对象设置 [[Prototype]] 的方法。稍后我们将看到更多依赖于此的高级编程模式。
//
// 一切都很简单，只需要记住几条重点就可以清晰地掌握了：
//
// F.prototype 属性（不要把它与 [[Prototype]] 弄混了）在 new F 被调用时为新对象的 [[Prototype]] 赋值。
// F.prototype 的值要么是一个对象，要么就是 null：其他值都不起作用。
// "prototype" 属性仅当设置在一个构造函数上，并通过 new 调用时，才具有这种特殊的影响。
// 在常规对象上，prototype 没什么特别的：
//
// let user = {
//   name: "John",
//   prototype: "Bla-bla" // 这里只是普通的属性
// };
// 默认情况下，所有函数都有 F.prototype = {constructor：F}，所以我们可以通过访问它的 "constructor" 属性来获取一个对象的构造器。