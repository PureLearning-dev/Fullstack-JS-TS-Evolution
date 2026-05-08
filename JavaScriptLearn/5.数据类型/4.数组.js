// 数组这个数据结构被创造的目的是为了“更好地管理和操作有序集合”。
// 有序集合常见的有 一组数字、一组用户等相关的数据，需要注意的是 JS 和其他静态编程语言不通，数组中可以存放不同类型的数据。

// 创建一个空数组的 JS 语法有两种。
let users = Array();
let numbers = [];
console.log('users:' + users, 'numbers:' + numbers);

// 通常情况下，我们都是用 [] 初始化一个空数组，当然也可以在初始化时添加一些数据。
let goods = ['Apple', 'Orange', 'Banana'];
console.log(goods);

// 因为是有序集合，我们可以通过变量去获取特定位置上的数据，位置从 0 开始。
console.log(goods[1])

// 可以看出数组也是一种对象，所以可以对其中的内容进行修改并通过变量进行访问。
console.log(typeof users);
users[0] = 'Admin';
users[1] = 'Liujie';
console.log(users);

// 数组中可以存放不同类型的值，甚至是函数，并且可以得到函数进行调用。
users[users.length] = {
    name: 'Xiaofei',
    sex: 'man',
    age: 18
};

users[users.length] = function (a, b) {
    console.log(a + b);
}

console.log(users);
users[users.length - 1](4, 3)

// 使用 at 获取数组位置上的数据，对于 [index] 的形式，index 不能为负数，否则返回 undefine，但是 at 可以，使用负数时，表示的是从后面往前数的第 -index 的数据。
let arr = [1, 2, 3, 4];
console.log(arr.at(-1), arr.at(2));

// JS 为我们提供了许多操作数组的函数，进一步简便了我们对数组的抽象！
// JS 中的数组可以视为一个双端队列，两头都有进入和退出的函数，可以便于我们将数组抽象为队列或栈。
let queue = [];
// push 从末尾添加数据。
queue.push(1, 2, 3, 4);
console.log("添加了[1, 2, 3, 4]的队列中的内容：" + queue);
// shift 从头部移除数据。
queue.shift();
console.log("移除首部第一个元素的队列中的内容：" + queue);
// unshift 添加数据到头部。
queue.unshift(3);
console.log("首部添加一个元素的队列中的内容：" + queue);

let stack = [];
stack.push(1, 2, 3, 4, 5);
// pop 从末尾移除数据。
stack.pop();
console.log(stack.toString());

// 数组的本质也是一个对象，其中也存在有用的属性，比如：length.
// 使用 [index] 中的 index 本质是对象的 key！JS 编译器在正常使用数组时深度优化了数组存储结构，让我们对数组的操作更快！
// 但是如果我们像使用对象那样或者不正常使用数组，这样的优化就会消失！
// 上面的那些添加、移除的操作都会修改数组的 length 属性，当我们需要清空数组时，也可以直接令 length 为 0.

// 错误使用示范。
let errorUse = [];

// 1.制造空洞。
errorUse[0] = 0;
errorUse[200] = 1;

// 2.创建属性。
errorUse.age = 1;

// 3.倒序填入。
errorUse[199] = 0;
errorUse[198] = 1;

// 4. ...

// 类似的还有许多，但是我们只需要遵循一点！使用数组时，将数组视为一组有序的数据，并且尽量不要像使用对象那样使用它则可（使用 JS 为数组优化过的操作函数）！

// 因为数组是一种特殊的对象，当判断两个数组中的内容是否相同时，不要使用 ==，也不要使用比较运算符，因为 JS 编译器会像对待对象那样对待数组。
console.log([0] == [0]);
console.log([] == 0);
