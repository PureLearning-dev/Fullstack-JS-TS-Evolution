// "prototype" 属性在 JavaScript 自身的核心部分中被广泛地应用。所有的内建构造函数都用到了它。

// Object[[Prototype]] -> Object.prototype.
// Object.prototype 里存在着许多内置方法。
console.log(Object.prototype.constructor == Object);

// 调用一个空对象的 toString 方法，可以得到相应的结果。
// 这是为什么呢？说明对象有个原型 —— Object.prototype，其中包含了许多内置的方法！
let obj = {};
console.log(obj.toString());

// 通过对象和函数都可以访问到 Object.prototype.
console.log(obj.__proto__ == Object.prototype);

// 在 Object.prototype 中没有更高层次的原型了！指向的是 null.
console.log(Object.prototype.__proto__);

// 其他内建对象，像 Array、Date、Function 及其他，都在 prototype 上挂载了方法。
// 可供其所有对象实例进行调用！

// 例如，当我们创建一个数组 [1, 2, 3]，在内部会默认使用 new Array() 构造器。因此 Array.prototype 变成了这个数组的 prototype，并为这个数组提供数组的操作方法。这样内存的存储效率是很高的。
// 按照规范，所有的内建原型顶端都是 Object.prototype。这就是为什么有人说“一切都从对象继承而来”。
console.log([].__proto__ == Array.prototype);
console.log([].__proto__.__proto__ == Object.prototype);
console.log(Object.prototype.__proto__);

// 原始数据在调用方法和属性时，会进行自动包装！
// 特殊值 null 和 undefined 比较特殊。它们没有对象包装器，所以它们没有方法和属性。并且它们也没有相应的原型。

// 原生的原型是可以被修改的。例如，我们向 String.prototype 中添加一个方法，这个方法将对所有的字符串都是可用的：
String.prototype.show = function () {
    console.log(this.toString());
};

"Hello".show();
// 在开发的过程中，我们可能会想要一些新的内建方法，并且想把它们添加到原生原型中。但这通常是一个很不好的想法。
// 内置对象是全局的，直接修改原型可能会覆盖同名的方法！

// 上述的机制可以很好地从原型中借用方法。
// 这指我们从一个对象获取一个方法，并将其复制到另一个对象，一些原生原型的方法通常会被借用。
let obj1 = {
    0: "Hello",
    1: "world!",
    length: 2,
};

obj1.join = Array.prototype.join;

console.log( obj1.join(', ') );
// 内建的方法 join 的内部算法只关心正确的索引和 length 属性。它不会检查这个对象是否是真正的数组。许多内建方法就是这样。

// 总结
// 所有的内建对象都遵循相同的模式（pattern）：
// 方法都存储在 prototype 中（Array.prototype、Object.prototype、Date.prototype 等）。
// 对象本身只存储数据（数组元素、对象属性、日期）。
// 原始数据类型也将方法存储在包装器对象的 prototype 中：Number.prototype、String.prototype 和 Boolean.prototype。只有 undefined 和 null 没有包装器对象。
// 内建原型可以被修改或被用新的方法填充。但是不建议更改它们。唯一允许的情况可能是，当我们添加一个还没有被 JavaScript 引擎支持，但已经被加入 JavaScript 规范的新标准时，才可能允许这样做。