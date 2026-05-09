// JSON 是为了方便地传输对象而发明的。
// 对象在不同的环境中，其内存格式是不同的，所以我们不能直接传输对象。
// 而字符解析是统一的，所以我们可以在传输时将对象转换为字符串（ JSON 规定数值、布尔和数组不用转换为字符串），接受后又解析为对象，这就是 JSON 最重要的应用。
// 补充：不同机器之间还可以传输二进制流。

let obj = {
    name: "刘杰",
    age: 22,
    sex: "男",
};

// 可以看出使用 stringify 得到的是一个 string.
// 这个过程称为序列化。
console.log(typeof JSON.stringify(obj), JSON.stringify(obj));

// JSON 这个规则规定，对于函数、undefine、Symbol 自动忽略——这三种都不会进行转换。
let test = JSON.stringify({
    sayHello() {
        console.log('Hello');
    },
    name: undefined,
    [Symbol.isConcatSpreadable]: true,
})
// 输出的是一个 {}，里面的内容都被忽略了。
console.log(test);

// JSON.stringify 进行转换的对象可以有嵌套结构，但是不能有循环引用。
let meetup = {
    title: "Conference",
    room: {
        number: 23,
        participants: ["john", "ann"]
    }
};

console.log("meetup: " + JSON.stringify(meetup));

// 下面的循环引用就会发生错误，stringify 根本就找不到底。
// let room = {
//     number: 23
// };
//
// let meetup = {
//     title: "Conference",
//     participants: ["john", "ann"]
// };
//
// meetup.place = room;       // meetup 引用了 room
// room.occupiedBy = meetup; // room 引用了 meetup
//
// JSON.stringify(meetup);

// 当出现循环引用也可以进行处理，stringify 其实有三个参数，大多数情况只需要使用第一个参数，出现循环引用可以使用第二个参数，第三个参数是用于格式化的，表示缩进的空格数。
let room = {
    number: 23
};

let meetup2 = {
    title: "Conference",
    participants: ["john", "ann"]
};

meetup2.place = room;       // meetup 引用了 room
room.occupiedBy = meetup2; // room 引用了 meetup

console.log(JSON.stringify(meetup2, (k, v) =>{
    // 将 room 中的 occupiedBy 属性去掉，则打破循环引用。
    // 可以看出，这个函数会被递归调用，要转换的对象的每一对 kv 都会被使用该函数。
    // 该作用域中的 this 指向的是包含 kv 的对象。
    if (k === "occupiedBy") {
        return undefined;
    }
    return v;
}, 2));

// 将字符串转换为对象。
// 这个过程称为反序列化。
let stringObj = JSON.stringify(obj);
console.log(typeof JSON.parse(stringObj), JSON.parse(stringObj));

// 在将字符串转换为对象时，可能也需要对 kv 进行操作，此时可以使用 parse 的第二个参数，和之前的 stringify 的逻辑一致！
let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';

let meetup3 = JSON.parse(str, function(key, value) {
    if (key === 'date') return new Date(value);
    return value;
});

// 如果不使用第二个参数将对应的时间字符串转换为 Date 对象，下面的调用会直接报错！
console.log( meetup3.date.getDate() );

// Date 对象实现了 toJSON，所以他会自动返回合适的形式，如果我们在对象中实现了该方法，也可以自定义返回的格式。
let cup = {
    size: 'big',
    price: '20',
    toJSON() {
        return `size is ${this.size} and price is ${this.price}`;
    }
};

let table = {
    size: 'mid',
    water: cup,
};

// 在 stringify 中使用时，water 属性对应的值自动调用 toJSON 方法。
console.log(JSON.stringify(table));

// 总结
// JSON 是一种数据格式，具有自己的独立标准和大多数编程语言的库。
// JSON 支持 object，array，string，number，boolean 和 null。
// JavaScript 提供序列化（serialize）成 JSON 的方法 JSON.stringify 和解析 JSON 的方法 JSON.parse。
// 这两种方法都支持用于智能读/写的转换函数。
// 如果一个对象具有 toJSON，那么它会被 JSON.stringify 调用。