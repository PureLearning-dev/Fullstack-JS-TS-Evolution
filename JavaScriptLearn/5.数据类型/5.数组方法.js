// 数组对象除了上一篇中的添加删除方法，还提供了许多实用的方法，在一篇中，我们就来实践一下！

// splice 是操作数组的“瑞士军刀”，适合绝大多数的需要处理数组元素的场景——插入、删除、添加。
let arr = [1, 2, 3, 4, 5];
// 从索引为 1 的地方删除 1 个元素，直接操作元数组，返回的是删除的元素。
arr.splice(1, 1);
console.log(arr);

// 如果存在更多的参数，则是在前面删除的基础上添加参数中的元素。
arr.splice(0, 1, 1, 1, 4);
console.log(arr);

// 当我们只需要添加时，就可以将 deleteCount 令为 0.
arr.splice(0, 0, 2, 4, 5);
arr.splice(arr.length, 0, 2, 4, 5);
// 并且 splice 中的参数可以为负数，表示从后往前的第 -start 个位置。
arr.splice(-1, 0, 2, 4, 5);
console.log(arr);

// 想获得一个新的数组，可以使用 slice 方法。
// 该方法中有两个参数，第一个是其实索引，第二个是结束索引的后一个索引。
// 第二个参数可以不写，表示直接到最后一个元素，参数可以为负数，与之前的情况类似。
let brr = [1, 2, 3, 4, 5].slice(2, 4);
console.log(brr);

// 将多个数组或元素拼接得到一个新数组，contact.
// 在 contact 中放入数组，则数组中的每一个元素都会被添加到调用这个函数的数组中，不放入数组，则直接添加。
let total = [1, 2].concat(3, 4, [5, 6]);
console.log(total);
let total2 = total.concat({
    age: 22,
    name: "liujie",
})

console.log(total2);

// 并不是将对象中的每个 key 对应的 value 放入到数组中，而是直接将对象放入到数组中了。
// 如果想使用上述的功能，只用添加对象的 Symbol.isConcatSpreadable 属性 + 实现 length + key 用 0，1... 实现则可。

let human = {
    0: 21,
    1: "gongyuan",
    [Symbol.isConcatSpreadable]: true,
    length: 2,
}
let total3 = total2.concat(human);
console.log(total3);

// 遍历整个数组，并对每个遍历到的元素执行一个函数。
// 参数可以是一个普通函数，也可以是一个箭头函数。

// 会将 forEach 中的三个参数全部输出。
// 三个参数分别是 element index array.
console.log("使用forEach输出：");
brr.forEach(console.log);

// 数组也有 indexOf lastIndexOf 和 includes 三个函数，用法与字符串的三个同名函数一致！

// 数组的 find 和 findIndex 函数，find 是查找第一个满足条件的数组元素，后者是查找第一个满足条件的数组元素的索引。
// 注意是查找的第一个，找到了就不再往后找了。
// filter 是 find 的高级版，可以找所有满足条件的数组元素。他们的参数都和 forEach 的一样，下面我就只举 filter 的使用方法。
let humans = [
    {
        name: "小明",
        age: 12,
    },
    {
        name: "小红",
        age: 22,
    },
    {
        name: "小绿",
        age: 18
    }
];

let adult = humans.filter((human) => human.age >= 18);
console.log(adult);

// 转换数组的方法 map，可以将数组中的元素替换为执行过函数后的结果，这个方法十分常用！
let numbers = [1, 2, 3, 4, 5];
let fixedNumber = numbers.map(number => number * 2);
console.log(fixedNumber, numbers);

// 排序方法，sort.
// 这个方法默认数组元素为字符，所以如果数组中为 number，可能得到的结果不尽人意。
// 为了解决这个问题，我们需要自定义一个 compare 函数（也可以是其他名字）。
function compare(a, b) {
    console.log(a + "<>" + b);
    if (a > b) return 1;
    if (a === b) return 0;
    if (a < b) return -1;
}

let compareNumber = [2, 3, 1, 5, 4];
console.log(compareNumber.sort(compare));

// reverse 方法，可以颠倒数组中的元素。
let crr = [1, 2, 3, 4, 5];
console.log(crr.reverse());

// 字符串中具有特定意义的字符串和数组之间可以相互转换，比如："Liu, Wang, Li"，我们想得到由 ' 隔开的姓氏，可以使用字符串对象提供的 split 函数。
// 当有 ["Liu", "Wang", "Li"]，想得到由数组中的各个字符串拼接的大字符串，我们可以使用数组提供的 join 函数。
let names = "Liu, Wang, Li".split(',');
console.log(names);

let strNames = names.join(',');
console.log(strNames);

// 通过遍历整个数组的元素，让整个数组经过一系列操作得到最后一个结果的方法 reduce.
// 底层是通过迭代实现的，每次迭代的结果作为新的迭代的初始值，直到最后！
// 如果初始值不指定的话，则默认使用数组的第一个元素作为初始值，直接进入第二次迭代！
let drr = [1, 2, 3, 4, 5];
console.log(drr.reduce((a, b) => a + b), 0);

// 我们知道 数组 是一种特殊的对象，所以在使用 typeof 时，无法对对象和数组进行区分。
// 得到的结果都是 object，要区分的话，需要使用 Array.isArray(value).
console.log(Array.isArray([]));
console.log(Array.isArray({}));

// 数组的各种方法，除了 sort 外，都有一个最后的 thisArg 参数，这个参数是传递上下文的，替换回调函数中的 this.
// 但是也可以不使用上面的方式进行传入上下文——直接将对象作为回调函数传入则可。
let army = {
    minAge: 18,
    maxAge: 27,
    canJoin(user) {
        return user.age >= this.minAge && user.age < this.maxAge;
    }
};

let users = [
    {age: 16},
    {age: 20},
    {age: 23},
    {age: 30}
];

// 找到 army.canJoin 返回 true 的 user
let soldiers = users.filter(army.canJoin, army);
console.log(soldiers);

// 不使用上述实现的方法。
let soldiers2 = soldiers.filter(human => army.canJoin(human));
console.log(soldiers2);