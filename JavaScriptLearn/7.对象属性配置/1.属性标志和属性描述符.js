// 我们知道，对象可以存储属性。
//
// 到目前为止，属性对我们来说只是一个简单的“键值”对。但对象属性实际上是更灵活且更强大的东西。
//
// 在本章中，我们将学习其他配置选项，在下一章中，我们将学习如何将它们无形地转换为 getter/setter 函数。

// 属性标志。
// 对象属性（properties），除 value 外，还有三个特殊的特性（attributes），也就是所谓的“标志”：
//
// writable — 如果为 true，则值可以被修改，否则它是只可读的。
// enumerable — 如果为 true，则会被在循环中列出，否则不会被列出。
// configurable — 如果为 true，则此属性可以被删除，这些特性也可以被修改，否则不可以。
// 我们创建的属性上述的三种标志默认都为 true.

// 平常我们都看不到这些标志，要观察到这些标志的话，需要使用 Object.getOwnPropertyDescriptor 方法。
let obj = {
    name: "Tom",
}
// 返回的是一个包含值和所有标志的对象。
console.log(Object.getOwnPropertyDescriptor(obj, "name"));

// 如果我们要修改一个属性的值或者标志，可以使用 Object.defineProperty 方法。
Object.defineProperty(obj, "name", {
    value: "Jack",
    // writable: false,
});
console.log(Object.getOwnPropertyDescriptor(obj, "name"));

// 如果 Object.defineProperty 中的 p 参数在对象中不存在，则会根据我们传入的值进行创建！
// 并且在标志没设置时，使用默认值 false.
Object.defineProperty(obj, "age", {
    value: 22,
})
console.log(Object.getOwnPropertyDescriptor(obj, "age"));

// obj 的 age 现在是不可写的，我们尝试修改，并不会对原对象造成影响，除非再次使用 Object.getOwnPropertyDescriptor 覆盖元属性标志。
obj.age = 30;
console.log(obj.age);

// 在对象中一些属性我们希望不被枚举，可以配置 enumerable 为 false.
let obj2 = {
    name: "M",
    toString() {
        return `I am ${this.name}`;
    }
}

// toString 会被枚举，但是我们并不希望将 toString 枚举出来。
for(let key in obj2) {
    console.log(key);
}

// 将标志修改一下就可以达到目的了。
Object.defineProperty(obj2, "toString", {
    enumerable: false,
});

for(let key in obj2) {
    console.log(key);
}

// 不可配置，是不允许修改既定的对象属性 k 或者其他配置相关的信息，但是可以修改对应的对象的 v（需要在可写的条件下）。
// 有个需要注意的点是对于不可配置的属性，我们可以将 writable: true 更改为 false，从而防止其值被修改（以添加另一层保护）。但无法反向行之。
// 可以认为可以将配置调整为更为严格，而不能调整为更加宽松。

// Object.defineProperties 方法可以一次性配置多个属性的值和标志。
Object.defineProperties(obj2,{
   age: {
       value: 30,
       enumerable: true,
       writable: true,
       configurable: false
   }
});

// 对应的获取所有属性的值和标志的方法是 Object.getOwnPropertyDescriptors.
console.log(Object.getOwnPropertyDescriptors(obj2));

// 结合上述可以配置和获取多个属性的方法，可以实现复制对象完成属性的功能！包括对象中的 Symbol 和属性标志。
let obj3 = {};
let cloneObj2 = Object.defineProperties(obj3, Object.getOwnPropertyDescriptors(obj2));
console.log(obj3 === cloneObj2, cloneObj2 === obj2);

// 属性描述符在单个属性的级别上工作。
//
// 还有一些限制访问 整个 对象的方法：
//
// Object.preventExtensions(obj)
// 禁止向对象添加新属性。
// Object.seal(obj)
// 禁止添加/删除属性。为所有现有的属性设置 configurable: false。
// Object.freeze(obj)
// 禁止添加/删除/更改属性。为所有现有的属性设置 configurable: false, writable: false。
// 还有针对它们的测试：
//
// Object.isExtensible(obj)
// 如果添加属性被禁止，则返回 false，否则返回 true。
// Object.isSealed(obj)
// 如果添加/删除属性被禁止，并且所有现有的属性都具有 configurable: false则返回 true。
// Object.isFrozen(obj)
// 如果添加/删除/更改属性被禁止，并且所有当前属性都是 configurable: false, writable: false，则返回 true。
// 这些方法在实际中很少使用。