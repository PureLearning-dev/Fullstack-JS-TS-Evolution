// 对于普通对象，下列这些方法是可用的：
// Object.keys(obj) —— 返回一个包含该对象所有的键的数组。
// Object.values(obj) —— 返回一个包含该对象所有的值的数组。
// Object.entries(obj) —— 返回一个包含该对象所有 [key, value] 键值对的数组。

// 上述的方法和 Map 中的三个经典方法一样的逻辑。

let user = {
    name: "John",
    age: 30,
    [Symbol("id")]: 1,
};

// 遍历所有的值
for (let value of Object.values(user)) {
    console.log(value);
}

// 这些方法和 for ... in 一样，会忽略对象中的 Symbol 属性，但是 JS 也提供了可以获取对象 Symbol 属性的方法。
// Object.getOwnPropertySymbols 只会返回由对象的 Symbol 组成的数组。
console.log(Object.getOwnPropertySymbols(user));

// Reflect.ownKeys 会返回所有的 k，包括 Symbol.
console.log(Reflect.ownKeys(user));

// 我们还想在对象上使用数组提供的好用的方法。
// 先使用 Object.entries 将对象转换为数组，通过数组的方法进行操作后，再使用 Object.fromEntries 转换为对象。
let prices = {
    banana: 1,
    orange: 2,
    meat: 4,
};

let doublePrices = Object.fromEntries(
    // 将价格转换为数组，将每个键/值对映射为另一对
    // 然后通过 fromEntries 再将结果转换为对象
    Object.entries(prices).map(entry => [entry[0], entry[1] * 2])
);

console.log(doublePrices.meat); // 8