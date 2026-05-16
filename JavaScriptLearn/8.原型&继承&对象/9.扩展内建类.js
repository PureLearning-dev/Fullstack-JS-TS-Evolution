// 给 PowerArray 新增了一个方法（可以增加更多）
class PowerArray extends Array {
    isEmpty() {
        return this.length === 0;
    }
}

let arr = new PowerArray(1, 2, 5, 10, 50);
console.log((arr.isEmpty())); // false

// 内建的方法例如 filter，map 等 —— 返回的正是子类 PowerArray 的新对象。它们内部使用了对象的 constructor 属性来实现这一功能。
// 不是返回 Array，而是返回实现的子类是一个很好的结果，因为这样我们又可以在结果上调用我们增加的方法了。

let filteredArr = arr.filter(item => item >= 10);
console.log((filteredArr)); // 10, 50
(filteredArr.isEmpty()); // false

// 如果我们希望像 map 或 filter 这样的内建方法返回常规数组，我们可以在 Symbol.species 中返回 Array
class PowerArray2 extends Array {
    isEmpty() {
        return this.length === 0;
    }

    // 内建方法将使用这个作为 constructor
    static get [Symbol.species]() {
        return Array;
    }
}

let arr2 = new PowerArray2(1, 2, 5, 10, 50);
console.log((arr2.isEmpty())); // false

// filter 使用 arr.constructor[Symbol.species] 作为 constructor 创建新数组
let filteredArr2 = arr2.filter(item => item >= 10);

// filteredArr 不是 PowerArray，而是 Array
// console.log((filteredArr2.isEmpty())); // Error: filteredArr.isEmpty is not a function

// 其他集合，例如 Map 和 Set 的工作方式类似。它们也使用 Symbol.species。

// 内建类没有静态方法继承。
// 这和我们所了解的通过 extends 获得的继承相比，这是内建对象之间继承的一个重要区别。
// 因为内建类并没有将子类的函数对象的 [[Prototype]] 指向父类函数对象。