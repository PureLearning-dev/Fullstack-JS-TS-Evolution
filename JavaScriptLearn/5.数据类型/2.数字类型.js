// 数字在计算机方面是最常见的一种数据表示方式了，在什么时候都能看到。
// JS 中的常规数字遵循 64 位 IEEE-754 格式！这种格式是存在最大值(2^{53}-1)与最小值(-(2^{53}-1))，如果在这个范围之外的话，就会出现错误，所以 JS 引入了 Bigint 类型。
// Bigint 类型可以表示任意大小的数值。

// 如果数字很大或者很小，使用常规的字面值并不好表示，比如 10000000000000000000000000000000.
// 类比我们小学学习的“科学计数法”，在 JS 中也可以，上述的数值可以使用 1e31 表示，e 后面的数字 a 表示 e 前面的数值乘上 10^a，这个 a 可以是负数！

// 当然，偶尔使用数值字面值时，也可能会因为 0 太多导致分不清 0 的个数，所以 JS 中还存在一种语法糖 "_" ，比如 1000000 和 1_000_000 是一致的。

// JS 中内置了 十六进制、八进制和二进制的数字表示，十六进制是"0x..."，八进制是"0o..."，二进制是"0b..."，其余进制表示可以通过 parseInt 函数达到。
// 也可以使用 toString(radix) 函数，返回对应的 radix 进制的字符串表示，radix 默认是 10，可以填写的范围是 2 ～ 36.

// 下面是三种实现转换的方式
let ten = 8;
let a = ten.toString(8)
console.log(a);

console.log((10).toString(2));

console.log(44..toString(16));

console.log(100.93.toString(16));

// 在对数字进行操作时，小数是一个困难的地方，但 JS 为我们内置了好用的函数进行处理。

// 向上舍入
let num = 13.21;
console.log(Math.ceil(num));
// 向下舍入
console.log(Math.floor(num));
// 朝着最近的整数舍入
console.log(Math.round(num));
// 直接去掉小数部分
console.log(Math.trunc(num));

// 上述的函数覆盖了所有关于小数的操作，现在有个任务：将 143.92913 舍入到小数后两位。
// 实现1: 先将数值乘上 100，然后在舍入，最终除以 100.
// 实现2: 使用 toFixed(fractionDigits) 函数，此函数返回到是一个 string，且如果后续的数值不足，它会自动添加 0.

let point = 143.92913;
console.log(Math.round(point * 100) / 100);
console.log(+point.toFixed(2));

// 根据 IEEE-754 的格式，我们知道在 JS 中数值必然存在精度缺失，在下面进行验证。
console.log(0.1 + 0.2 === 0.3);
// 输出的是 false，验证成功。

// 并且如果超过了 IEEE-754 可以表示的范围，会得到一个 Infinity.
console.log(5e1000)

// NaN 表示不是一个数值，并且通过 === 将两个 NaN 进行比较的到的仍是 false！
// 要判断 NaN 和 Infinity 通过内置的判断函数进行。
console.log(isNaN(NaN));
console.log(isFinite(Infinity));
// 两个判断函数重点不同，在不同的情况使用合适的函数即可。

// Object.is 内置方法和 === 类似，都是比较值的，但是有点不同，-0 和 0 判断是 false，NaN 和 NaN 判断是 true.
console.log(-0 === 0, Object.is(-0, 0));
console.log(NaN === NaN, Object.is(NaN, NaN));

// 将字符串转换为数值，常见的方式是使用 Number() 和 +，但是这两种方式是严格的，若要转换的字符串 s 不完全是一个数值，则会返回一个 NaN，s 的前面或者后面存在多个空格字符除外。
// 在更多的情况下，要转换的字符串并不是一个完全的数值！此时我们就需要使用 parseInt 和 parseFloat 进行处理。
// 这两个函数会尽可能的收集可以转换的数值部分，发生 error 导致结束，也会返回的到的数值！但如果第一个字符就导致无法转换会返回一个 NaN.
console.log( parseInt('100px') ); // 100
console.log( parseFloat('12.5em') ); // 12.5
console.log( parseInt('12.3') ); // 12，只有整数部分被返回了
console.log( parseFloat('12.3.4') ); // 12.3，在第二个点出停止了读取

// 上面两个函数还可以指定返回的数值的进制。
console.log( parseFloat('12.3.5'), 8);

// 除了上述的各种基础外，JS 内置了一个 Math 模块，提供了许多方便的函数，如果有关于数值方面的处理，并且上述操作已经不满足时，可以去查询。

function random(min, max) {
    if (max <= min) {
        return min;
    }
    // 先得到整数部分，再得到小数部分
    let integer = min + Math.round(Math.random() * 10) % (max - min);
    let decimal = Math.random();
    return integer + decimal;
}

console.log(random(-1, 9));