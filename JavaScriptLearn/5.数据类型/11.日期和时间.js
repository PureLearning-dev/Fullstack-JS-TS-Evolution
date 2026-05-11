// 让我们来学习一个新的内建对象：日期（Date）。该对象存储日期和时间，并提供了日期/时间的管理方法。
// 我们可以使用它来存储创建/修改时间，测量时间，或者仅用来打印当前时间。

// 创建一个 Date 对象。
// 这个 Data 构造函数有几种形式！但都很简单，目的是返回一个表示当前时间的 Date 对象，参数是为了更好的形容指定的当下时间。

// 不带参数，则返回一个表示现在时间的 date 对象。
let now = new Date();
console.log(now);

// 带一个数值参数（毫秒为单位），返回的是一个距离 1970 年 1 月 1 日 UTC+0 之后的参数时间之后的时间。
let stand = new Date(0);
let next = new Date(1000 * 60 * 60 * 24 * 30);
console.log(stand, next);

// 带一个字符串参数，则会对其进行解析。
let date = new Date("2026.4.3");
console.log(date);

// Date 中可以带有多个参数，从左到右依次是 year, month, date, hours, minutes, seconds, ms.
// 只有 year 和 month 是必须的，其他参数如果不传值，则直接使用的是默认值。

// 应当注意的是，year 传入时一定保持传入 4 位值（虽然可以传入 2 位，但这是一种容易出错的方式）！
// month 是从 0 到 11 的，0 表示 1 月，后面以此类推。

// Date 对象获取具体信息的函数如下：

// 获取年份（4 位数）。
let year = now.getFullYear();
// 获取月份，从 0 到 11。
let month = now.getMonth();
// 获取当月的具体日期，从 1 到 31，这个方法名称可能看起来有些令人疑惑。
let day = now.getDate()
// 获取一周中的第几天，从 0（星期日）到 6（星期六）。第一天始终是星期日，在某些国家可能不是这样的习惯，但是这不能被改变。
let week = now.getDay();
// 获取相应的时间组件，顾名思义，就不再调用下面的方法了。
// getHours()，getMinutes()，getSeconds()，getMilliseconds()。
console.log(`${year}-${month}-${day}, today is ${week}`);

// 使用参数进行初始化时，会自动校准时间，在使用 set 方法进行设置时也会。
// 这样的好处是我们不用再进行麻烦的时间转换和校验了，只用计算设置则可。
let date2 = new Date(2013, 0, 35);
console.log(date2);

// 将 Date 对象转换为数字时，得到的是其对应的时间戳，和 getTime 得到的结果是一样的。
console.log(now.getTime(), +now);

// 由于这个特性，Date 对象可以进行运算。
let start = new Date(); // 开始测量时间

// do the job
for (let i = 0; i < 100000; i++) {
    let doSomething = i * i * i;
}

let end = new Date(); // 结束测量时间

console.log(end - start);

// 如果只是想测量时间间隔的话，可以使用 Date.now 方法，这个方法不会创建 Date 对象，速度更快！

// Date.parse(str) 方法可以从一个字符串中读取日期。
//
// 字符串的格式应该为：YYYY-MM-DDTHH:mm:ss.sssZ，其中：
//
// YYYY-MM-DD —— 日期：年-月-日。
// 字符 "T" 是一个分隔符。
// HH:mm:ss.sss —— 时间：小时，分钟，秒，毫秒。
// 可选字符 'Z' 为 +-hh:mm 格式的时区。单个字符 Z 代表 UTC+0 时区。
// 简短形式也是可以的，比如 YYYY-MM-DD 或 YYYY-MM，甚至可以是 YYYY。
//
// Date.parse(str) 调用会解析给定格式的字符串，并返回时间戳（自 1970-01-01 00:00:00 起所经过的毫秒数）。如果给定字符串的格式不正确，则返回 NaN。

let ms = Date.parse('2012-01-26T13:51:50.417-07:00');
console.log(ms);

let date3 = new Date(ms);
console.log(date3);

// 总结
// 在 JavaScript 中，日期和时间使用 Date 对象来表示。我们不能单独创建日期或时间，Date 对象总是同时创建两者。
// 月份从 0 开始计数（对，一月是 0）。
// 一周中的某一天 getDay() 同样从 0 开始计算（0 代表星期日）。
// 当设置了超出范围的组件时，Date 会进行自动校准。这一点对于日/月/小时的加减很有用。
// 日期可以相减，得到的是以毫秒表示的两者的差值。因为当 Date 被转换为数字时，Date 对象会被转换为时间戳。
// 使用 Date.now() 可以更快地获取当前时间的时间戳。
// 和其他系统不同，JavaScript 中时间戳以毫秒为单位，而不是秒。
//
// 有时我们需要更加精准的时间度量。JavaScript 自身并没有测量微秒的方法（百万分之一秒），但大多数运行环境会提供。例如：浏览器有 performance.now() 方法来给出从页面加载开始的以毫秒为单位的微秒数（精确到毫秒的小数点后三位）：
//
// alert(`Loading started ${performance.now()}ms ago`);
// // 类似于 "Loading started 34731.26000000001ms ago"
// // .26 表示的是微秒（260 微秒）
// // 小数点后超过 3 位的数字是精度错误，只有前三位数字是正确的
// Node.js 可以通过 microtime 模块或使用其他方法。从技术上讲，几乎所有的设备和环境都允许获取更高精度的时间数值，只不过不是使用 Date 对象。