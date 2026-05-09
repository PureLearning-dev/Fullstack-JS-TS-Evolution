// Map 和 Set 是一组更加有力的数据结构，分别代表着映射和集合！
// Map 中可以有多对 kv 值，一个 k 对应一个 v，通过 k 可以快速找到对应的 v. Map 和对象类似，但是 Map 的 k 可以是任何值（不会像对象那样将 k 自动转为字符串）。
// Set 中存在不重复出现的值。

// Map 的相关函数。
// 创建一个 Map 数据结构，可以传入一个迭代对象。
let map = new Map();
// 设置一对 kv. set 方法是一个链式的，每次调用返回 map 本身。
map.set("liujie", {
    age: 22,
    sex: "male",
    location: "四川",
});
// 通过 key 查找 value.
console.log(map.get("liujie"));
// 判断 map 中是否存在要查找的 k.
console.log(map.has("liujie"));
// 删除 map 中的 kv 值，只能通过 k 进行删除。
map.delete("liujie");
console.log(map.has("liujie"));
// 清空 map.
map.clear();
// 获取 map 中的 kv 对数。
console.log(map.size);

// 在对象中是不能将一个对象作为 k 的，但是 Map 中可以！
// 在对象中使用对象作为 k 时，会自动将作为 k 的对象转换为 "[object Object]"，但实现 toString 方法指定转换的结果也行，只是我们一般不会这样做。
// Map 中将对象作为 k 时，不会！并且 NaN 也可以作为 k.

// 遍历 Map 可以分别对 key value 和 (key, value) 三个部分分别遍历，分别使用不同的方法得到对应的可迭代对象。
let iteMap = new Map();
iteMap.set(1, "一")
.set(2, "二")
.set(3, "三");

let keys = iteMap.keys();
console.log(keys);
let values = iteMap.values();
console.log(values);
let kvs = iteMap.entries();
for (let k of kvs) {
    console.log(k);
}
// 可以直接对 Map 使用 for of，JS 编译器会自动调用 entries.
for (let k of iteMap) {
    console.log(k);
}

// Map 中也存在 forEach 方法。
iteMap.forEach((v, k, map) => {
    console.log(k, v, map);
});

// 上述的 Map 初始化为空，那如果我们有一些数据需要初始化，应该传入什么格式的数据呢？
// 官方文档上写的是需要传入可迭代对象，我们思考一下，Map 是 kv 形式的，必然要有一个 k，一个 v，并且是一对的，这样看来对象是非常符合的。
// 对象的属性名为 k，值为 v。除此之外，还可以是一个 2 列的数组。
let initMap1 = new Map([
    ["1", "hello"],
    ["age", 22],
    ["name", "刘杰"],
]);
console.log(initMap1);

// 如果要传入对象，首先得调用 Object.entries 将对象转为一个可迭代对象，这个可迭代对象其实就是一个二维数组。
let initMap2 = new Map(Object.entries({
    "city": "四川",
    "history": 4000,
}));
console.log(initMap2);

// 相反的，我们也可以通过 Map 得到一个对象！使用 Object.fromEntries.
let obj = Object.fromEntries(initMap1);
console.log(obj);

// Set 相关函数。
// 创建一个 Set 数据结构，可以传入一个迭代对象.
let set = new Set();
// 添加元素，set 中的元素是不会重复的。
set.add('小明')
    .add('小红')
    .add('小天')
    .add('小明');
console.log(set);
// 删除元素。
set.delete('小红');
// 判断是否存在查找的元素。
console.log(set);
console.log(set.has('小明'));
// 获取 set 中的元素个数。
console.log(set.size);
// 清空 set 中的元素。
set.clear()
console.log(set)

// Set 的 api 和 Map 是兼容的，就不再赘述了。

