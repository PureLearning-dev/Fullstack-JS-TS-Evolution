// WeakMap 和 WeakSet 的贡献在于不会影响 gc.

// 常规的 Map 中如果存在对象作为 key，则就算将对象的引用令为 null，对象还是不会被 gc.
let obj = {
    name: "Tom",
};
let map = new Map();
map.set(obj, "我是Tom");

obj = null;
// map 中的 kv 对还是不会被 gc.
console.log(map);

// 使用 WeakMap，则当 k 被令为 null 后，其在 map 中对应的 kv 就会被 gc.
// 但是使用 WeakMap 的话，其 k 必须是对象！且不再支持迭代以及 keys()，values() 和 entries() 方法。所以没有办法获取 WeakMap 的所有键或值。

// WeakMap 的使用场景。
// 1. 跟随对象的额外的私有数据。
// 存储的数据只与具体的对象有关！k 用该对象表示则可。
// 2. 缓存。
// 缓存关于严格绑定对象的缓存数据。

// 上述场景如果不实用 WeakMap，则每次对象变量为 null 时，都要处理 Map，在工程上是一个非常大的工作量。

// WeakSet 和 WeakMap 类似，不支持迭代！支持 add，has 和 delete 方法。

// 总结
// WeakMap 是类似于 Map 的集合，它仅允许对象作为键，并且一旦通过其他方式无法访问这些对象，垃圾回收便会将这些对象与其关联值一同删除。
//
// WeakSet 是类似于 Set 的集合，它仅存储对象，并且一旦通过其他方式无法访问这些对象，垃圾回收便会将这些对象删除。
//
// 它们的主要优点是它们对对象是弱引用，所以被它们引用的对象很容易地被垃圾收集器移除。
//
// 这是以不支持 clear、size、keys、values 等作为代价换来的……
//
// WeakMap 和 WeakSet 被用作“主要”对象存储之外的“辅助”数据结构。一旦将对象从主存储器中删除，如果该对象仅被用作 WeakMap 或 WeakSet 的键，那么该对象将被自动清除。