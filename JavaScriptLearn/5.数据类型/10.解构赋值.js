// JavaScript 中最常用的两种数据结构是 Object 和 Array。

// 对象是一种根据键存储数据的实体。
// 数组是一种直接存储数据的有序列表。
// 但是，当我们把它们传递给函数时，函数可能不需要整个对象/数组，而只需要其中一部分。

// 解构赋值 是一种特殊的语法，它使我们可以将数组或对象“拆包”至一系列变量中。有时这样做更方便。

// 解构操作对那些具有很多参数和默认值等的函数也很奏效。


// 1. 数组解构，数组解构是通过数据的顺序进行解构的。
// 解构赋值并不会对解构的对象造成任何影响，只是将对象中的数据复制到对应的变量中。
let name = ["刘", "杰"];
let [first, second] = name;
console.log(first, second);
// 上面的解构语法等价于：
// let first = name[0];
// let second = name[1];

// 当字符串拆分和解构语法结合时，会显得十分优雅。
let [firstName, secondName] = "John Doe".split(" ");
console.log(firstName, secondName);

// 在使用解构时，等号右侧可以是任何可迭代对象！比如字符串。
let [a, b, c] = "FGB";
console.log(a, b, c);
// 等号左侧可以使用任何“可以被赋值的”东西。
let user = {};
[user.name, user.surname] = "John Smith".split(' ');
console.log('user:', user);

// 使用 Object.entries 得到一个二维数组，然后再结合解构语法得到对应的 kv 值，可以使用这样的方式遍历一个对象的键值对。
for(let [k, v] of Object.entries(user)) {
    console.log(k, v);
}
// 同理，Map 也可以这样进行迭代。

// 使用解构语法的一个经典应用就是交换数值。
r = 10;
g = 20;

([r, g] = [g, r]);
console.log(r, g);

// 当数组中的元素多于左侧的变量的话，左侧的最后一个变量可以使用 ...variable 表示，变量是右侧数组中剩余的元素形成的数组。
let [a1, ...b1] = [1, 2, 3];
console.log(a1, b1);

// 左侧的变量如果更多的话，并且在没有默认值的情况下，会被自动赋值为 undefine.
// 可以对左侧的变量给予默认值，这个默认值只会在没有数据匹配时使用！
let [a2, b2] = [];
console.log(a2, b2);

let [a3, , b3, c3 = () => 9] = [3, 4, 5];
console.log(a3, b3, c3);

// 2. 对象解构，对象解构是按照对象的层次和名称进行解构的。
let {title, description} = {
    title: "Hello World",
    description: "JS Learn",
};
// 上面的也可以写为下面的形式，两者是等价的。
// let {description, title} = {
//     title: "Hello World",
//     description: "JS Learn",
// };
console.log(title, description);

// 当然也可以自定义变量名称！使用 : 进行，后面是自定义变量名称，前面是对象中的属性名。
// 同时也可以赋予默认值！和上面的语法一样。
let {name: all, secname: one, surname: two, end: three = "Hello"} = {
    name: "John Smith",
    surname: "John",
    secname: "Smith",
};

// 对象中也可以使用 ...rest 语法，得到的 rest 是一个剩余的属性构成的对象！
let obj = {
    name: "John Smith",
    surname: "John",
    lastname: "Smith",
    location: "四川",
};

let {name: allName, surname, ...other} = obj;
console.log(allName, surname, other);

// 解构嵌套对象
let options = {
    size: {
        width: 100,
        height: 200
    },
    items: ["Cake", "Donut"],
    extra: true
};

// 为了清晰起见，解构赋值语句被写成多行的形式
let {
    size: { // 把 size 赋值到这里
        width,
        height
    },
    items: [item1, item2], // 把 items 赋值到这里
    title1 = "Menu" // 在对象中不存在（使用默认值）
} = options;

console.log(title1, description);

// 在传入函数参数时，使用对象解构是非常方便且优雅的！
// 如果不使用对象解构，则当函数有许多个参数并且其中有许多参数不同传值时，是十分难看的。

// 在函数参数中使用解构语法，可以使用任何解构时可以用到的语法！
function showMenu({title = "Untitled", width = 200, height = 100, items = []}) {
    console.log(title, width, height, items);
}

showMenu({
    title: "我的博客",
    items: [1, 2, 3, 4, 5],
});

// 如果在调用 showMenu 时不传入任何值，会导致报错，为了防止这种情况，我们可以放置一个默认值 {}.
// function showMenu({title = "Untitled", width = 200, height = 100, items = []} = {}) {
//     console.log(title, width, height, items);
// }

// 总结
// 解构赋值可以简洁地将一个对象或数组拆开赋值到多个变量上。
//
// 解构对象的完整语法：
//
// let {prop : varName = default, ...rest} = object
// 这表示属性 prop 会被赋值给变量 varName，如果没有这个属性的话，就会使用默认值 default。
//
// 没有对应映射的对象属性会被复制到 rest 对象。
//
// 解构数组的完整语法：
//
// let [item1 = default, item2, ...rest] = array
// 数组的第一个元素被赋值给 item1，第二个元素被赋值给 item2，剩下的所有元素被复制到另一个数组 rest。
//
// 从嵌套数组/对象中提取数据也是可以的，此时等号左侧必须和等号右侧有相同的结构。