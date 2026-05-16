// instanceof 操作符用于检查一个对象是否属于某个特定的 class。同时，它还考虑了继承。

class Rabbit {}
let rabbit = new Rabbit();

// rabbit 是 Rabbit class 的对象吗？
console.log((rabbit instanceof Rabbit)); // true

// 它还可以与构造函数一起使用
console.log((new Rabbit() instanceof Rabbit));

// 通常，instanceof 在检查中会将原型链考虑在内。此外，我们还可以在静态方法 Symbol.hasInstance 中设置自定义逻辑。

// obj instanceof Class 算法的执行过程大致如下：
//
// 如果这儿有静态方法 Symbol.hasInstance，那就直接调用这个方法：
//
// 例如：
//
// // 设置 instanceOf 检查
// // 并假设具有 canEat 属性的都是 animal
// class Animal {
//   static [Symbol.hasInstance](obj) {
//     if (obj.canEat) return true;
//   }
// }
//
// let obj = { canEat: true };
//
// console.log(obj instanceof Animal); // true：Animal[Symbol.hasInstance](obj) 被调用
// 大多数 class 没有 Symbol.hasInstance。在这种情况下，标准的逻辑是：使用 obj instanceOf Class 检查 Class.prototype 是否等于 obj 的原型链中的原型之一。
//
// 换句话说就是，一个接一个地比较：
//
// obj.__proto__ === Class.prototype?
// obj.__proto__.__proto__ === Class.prototype?
// obj.__proto__.__proto__.__proto__ === Class.prototype?
// ...
// // 如果任意一个的答案为 true，则返回 true
// // 否则，如果我们已经检查到了原型链的尾端，则返回 false

// 除此之外，还可以使用 objA.isPrototypeOf(objB)，如果 objA 在 objB 的原型链中，则返回 true.
console.log(Rabbit.prototype.isPrototypeOf(rabbit));

// Class 的 constructor 自身是不参与检查的！检查过程只和原型链以及 Class.prototype 有关。
//
// 创建对象后，如果更改 prototype 属性，可能会导致有趣的结果。
Rabbit.prototype = {};

// ...再也不是 rabbit 了！
console.log((rabbit instanceof Rabbit)); // false

let objectToString = Object.prototype.toString;

// 它是什么类型的？
let arr = [];

console.log((objectToString.call(arr))); // [object Array]

// 可以使用特殊的对象属性 Symbol.toStringTag 自定义对象的 toString 方法的行为。

let user = {
    [Symbol.toStringTag]: "User"
};

console.log(({}.toString.call(user))); // [object User]

// 所以，如果我们想要获取内建对象的类型，并希望把该信息以字符串的形式返回，而不只是检查类型的话，我们可以用 {}.toString.call 替代 instanceof。

// 总结
// 让我们总结一下我们知道的类型检查方法：
//
// typeof	原始数据类型	string
// {}.toString	原始数据类型，内建对象，包含 Symbol.toStringTag 属性的对象	string
// instanceof	对象	true/false
// 正如我们所看到的，从技术上讲，{}.toString 是一种“更高级的” typeof。
//
// 当我们使用类的层次结构（hierarchy），并想要对该类进行检查，同时还要考虑继承时，这种场景下 instanceof 操作符确实很出色。