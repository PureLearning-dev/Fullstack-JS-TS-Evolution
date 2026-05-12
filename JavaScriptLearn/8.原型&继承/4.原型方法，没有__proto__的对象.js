// __proto__ 是定义在 Object.prototype 上的一个访问器属性！
console.log(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__'));;

// __proto__ 不被反对的唯一的用法是在创建新对象时，将其用作属性：{ __proto__: ... }.
// 其余情况，都推荐使用现代化的方式进行设置和获取原型。

// JS 解释器提供了一个创建对象时指定原型、属性和标志的方法 —— Object.create(proto, [descriptors])，利用给定的 proto 作为 [[Prototype]] 和可选的属性描述来创建一个空对象。
let animal = {
    eats: true
};

// 创建一个以 animal 为原型的新对象
let rabbit = Object.create(animal); // 与 {__proto__: animal} 相同

console.log(rabbit.eats); // true

console.log(Object.getPrototypeOf(rabbit) === animal); // true

Object.setPrototypeOf(rabbit, {}); // 将 rabbit 的原型修改为 {}

// Object.create 方法更强大，因为它有一个可选的第二参数：属性描述器。
let animal1 = {
    eats: true
};

let rabbit1 = Object.create(animal1, {
    jumps: {
        value: true
    }
});

console.log(rabbit1.jumps); // true

// 我们可以使用 Object.create 来实现比复制 for..in 循环中的属性更强大的对象克隆方式：
let clone = Object.create(
    Object.getPrototypeOf(animal),
    Object.getOwnPropertyDescriptors(animal)
);

// 从技术上来讲，我们可以在任何时候 get/set [[Prototype]]。但是通常我们只在创建对象的时候设置它一次，自那之后不再修改：rabbit 继承自 animal，之后不再更改。
//
// 并且，JavaScript 引擎对此进行了高度优化。用 Object.setPrototypeOf 或 obj.__proto__= “即时”更改原型是一个非常缓慢的操作，因为它破坏了对象属性访问操作的内部优化。因此，除非你知道自己在做什么，或者 JavaScript 的执行速度对你来说完全不重要，否则请避免使用它。

// 如果我们要将 __proto__ 作为一个普通属性进行复制，一般情况下是不能达到我们的目标的，因为 __proto__ 是原型上的 getter/setter 方法。
// 为了解决这个问题，我们可以使用 Map 进行存储，同时也可以使用 Object.create(null) 创造一个原型是 null 的对象。
// Object.create(null) 创建了一个空对象，这个对象没有原型（[[Prototype]] 是 null）。
// 这样的对象称为 “very plain” 或 “pure dictionary” 对象，因为它们甚至比通常的普通对象（plain object）{...} 还要简单。
// 缺点是这样的对象没有任何内建的对象的方法。
let obj = Object.create(null);
obj['__proto__'] = "Hello";
console.log(obj);

// 请注意，大多数与对象相关的方法都是 Object.something(...)，例如 Object.keys(obj) —— 它们不在 prototype 中，因此在 “very plain” 对象中它们还是可以继续使用。

// 总结
// 要使用给定的原型创建对象，使用：
//
// 字面量语法：{ __proto__: ... }，允许指定多个属性
// 或 Object.create(proto, [descriptors])，允许指定属性描述符。
// Object.create 提供了一种简单的方式来浅拷贝对象及其所有属性描述符（descriptors）。
//
// let clone = Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));
// 设置和访问原型的现代方法有：
//
// Object.getPrototypeOf(obj) —— 返回对象 obj 的 [[Prototype]]（与 __proto__ 的 getter 相同）。
// Object.setPrototypeOf(obj, proto) —— 将对象 obj 的 [[Prototype]] 设置为 proto（与 __proto__ 的 setter 相同）。
// 不推荐使用内建的 __proto__ getter/setter 获取/设置原型，它现在在 ECMA 规范的附录 B 中。
//
// 我们还介绍了使用 Object.create(null) 或 {__proto__: null} 创建的无原型的对象。
//
// 这些对象被用作字典，以存储任意（可能是用户生成的）键。
//
// 通常，对象会从 Object.prototype 继承内建的方法和 __proto__ getter/setter，会占用相应的键，且可能会导致副作用。原型为 null 时，对象才真正是空的。