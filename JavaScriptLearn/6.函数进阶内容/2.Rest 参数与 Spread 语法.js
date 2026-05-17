// 在 JavaScript 中，很多内建函数都支持传入任意数量的参数。

// 数组很好作为这样参数的实参，但是数组和具体的值是不同的，我们可以使用一个 ... 语法进行拆解，使其满足输入要求。

// Rest 参数 ...
// 在 JavaScript 中，无论函数是如何定义的，你都可以在调用它时传入任意数量的参数。
function add(a, b) {
    return a + b;
}

console.log(add(1, 2, 3, 4));
// 传入任意参数后，并不会报错，而只是会使用函数需要的前几个对应的参数。

// 我们可以在函数定义中声明一个数组来收集参数。语法是这样的：...变量名，这将会声明一个数组并指定其名称，其中存有剩余的参数。这三个点的语义就是“收集剩余的参数并存进指定数组中”。
function multi(a, b, ...rest) {
    let val = 1;
    for (let i of rest) {
        val *= i;
    }
    return a * b * val;
}

console.log(multi(1, 2, 3, 4));

// Rest 参数必须放到参数列表的末尾，不然的话，根本无法确定 Rest 参数到底有几个。
// 有一个名为 arguments 的特殊类数组对象可以在函数中被访问，该对象以参数在参数列表中的索引作为键，存储所有参数。
function showName() {
    console.log(arguments);
    console.log((arguments.length));
    console.log((arguments[0]));
    console.log((arguments[1]));

    // 它是可遍历的
    // for(let arg of arguments) alert(arg);
}

showName("Julius", "Caesar");

showName("Ilya");

// 尽管 arguments 是一个类数组，也是可迭代对象，但它终究不是数组。它不支持数组方法，因此我们不能调用 arguments.map(...) 等方法。

// 箭头函数没有 "arguments"，如果我们在箭头函数中访问 arguments，访问到的 arguments 并不属于箭头函数，而是属于箭头函数外部的“普通”函数。

// 我们刚刚看到了如何从参数列表中获取数组，有时候我们也需要做与之相反的事。
// 这种写法被称为 Spread 语法。
let arr = [3, 5, 1];

console.log((Math.max(...arr))); // NaN

// 我们可以用 spread 语法这样操作任何可迭代对象。

// Spread 语法内部使用了迭代器来收集元素，与 for..of 的方式相同。

// 使用 spread 语法也可以做复制对象的事情（译注：是进行浅拷贝）。
let brr = [1, 2, 3];

let brrCopy = [...brr]; // 将数组 spread 到参数列表中
                        // 然后将结果放到一个新数组

// 两个数组中的内容相同吗？
console.log((JSON.stringify(brr) === JSON.stringify(brrCopy))); // true

// 两个数组相等吗？
console.log((brr === brrCopy)); // false（它们的引用是不同的）

// 修改我们初始的数组不会修改副本：
brr.push(4);
console.log((brr)); // 1, 2, 3, 4
console.log((brrCopy)); // 1, 2, 3

let obj = { a: 1, b: 2, c: 3 };

let objCopy = { ...obj }; // 将对象 spread 到参数列表中，然后将结果返回到一个新对象

// 两个对象中的内容相同吗？
alert(JSON.stringify(obj) === JSON.stringify(objCopy)); // true

// 两个对象相等吗？
alert(obj === objCopy); // false (not same reference)

// 修改我们初始的对象不会修改副本：
obj.d = 4;
alert(JSON.stringify(obj)); // {"a":1,"b":2,"c":3,"d":4}
alert(JSON.stringify(objCopy)); // {"a":1,"b":2,"c":3}

// 总结
// 当我们在代码中看到 "..." 时，它要么是 rest 参数，要么是 spread 语法。
//
// 有一个简单的方法可以区分它们：
//
// 若 ... 出现在函数参数列表的最后，那么它就是 rest 参数，它会把参数列表中剩余的参数收集到一个数组中。
// 若 ... 出现在函数调用或类似的表达式中，那它就是 spread 语法，它会把一个数组展开为列表。
// 使用场景：
//
// Rest 参数用于创建可接受任意数量参数的函数。
// Spread 语法用于将数组传递给通常需要含有许多参数的函数。
// 我们可以使用这两种语法轻松地互相转换列表与参数数组。
//
// 旧式的 arguments（类数组且可迭代的对象）也依然能够帮助我们获取函数调用中的所有参数。