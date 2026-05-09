// 可迭代（Iterable） 对象是数组的泛化。这个概念是说任何对象都可以被定制为可在 for..of 循环中使用的对象。
// 这部分学习之后，可以对 JS 中可迭代的数据结构有更加清晰的认知！

// 当对此对象使用 let of 会直接报错，但是数组这个对象又可以迭代，那么说明对象中必然有一个控制能够迭代的开关。
// let obj = {
//     name: "Llo",
//     age: 32,
// }
//
// for(let value of obj){
//     console.log(value);
// }

// 如果要让一个对象可迭代，需要实现一个内建的 Symbol.iterator 方法。
// 这个方法需要返回一个迭代器——一个含有 next 的对象。当使用 for ... of 时，需要下一个数据时，就会调用迭代器的 next 方法。
// next 返回的数据也是有具体的格式的！{done: Boolean, value: any}.

// 现在我们实现迭代 range 输出从 from 到 to 的所有数值。
let range = {
    from: 1,
    to: 10,
}

range[Symbol.iterator] = function () {
    return {
        // 声明迭代器的当前值和结束值。
        current: this.from,
        end: this.to,

        // 在这里说明一下 this 的指向。
        // 首先抓住一点，this 只与调用方相关，与在什么位置或其他因素无关。
        // Symbol.iterator 这个属性对应的函数是在 range 对象上被调用的，所以 return 中的 this 指向的是 range 对象。
        // next 函数是在 for ... of 中的迭代器上被调用的，所以 next 中的 this 指向的就是其所在的迭代器。
        next: function () {
            if(this.current > this.end) {
                return {
                    done: true,
                };
            }else {
                return {
                    done: false,
                    value: this.current++,
                };
            }
        }
    }
}

for (let i of range) {
    console.log(i);
}

// 上面实现的迭代器和迭代对象是分离的，我们可以将其合在一起。
let range2 = {
    start: 1,
    end: 5,
    // 调用生成迭代器的方法让调用的对象拥有一个 current 属性，并返回调用对象——此时也是迭代器。
    [Symbol.iterator]: function () {
        this.current = this.start;
        return this;
    },
    // 迭代器需要一个 next 方法。
    next() {
        if(this.current > this.end) {
            return {
                done: true,
            }
        }else {
            return {
                done: false,
                value: this.current++,
            }
        }
    }
};

for (let i of range2) {
    console.log(i);
}

// 那么上面两种方式有什么区别呢？答案是，后者不可能同时在对象上运行两个 for..of 循环了，因为 current 是对象的属性，属于共享的。
// 但是两个并行的 for..of 是很罕见的，即使在异步情况下。
// 前者只要使用 for..of 进行迭代，则会开篇一个新的迭代器对象，所以无所谓运行几个 for..of 循环。

// 我们可以实现一个无限迭代器，将上限令为 Infinity 则可，使用 break 停止迭代。

// for..of 是自动调用 [Symbol.iterator] 和 next 方法，当然我们也可以显示地进行调用。
// 显示地进行调用可以更加灵活地控制执行流程和逻辑。

console.log('显示调用迭代器');
// 1. 得到一个迭代器
let iter = range[Symbol.iterator]();
// 2. 从迭代器中不断地获取值
while(true) {
    let next = iter.next();
    if(next.done) {
        break;
    }
    console.log(next.value);
}

// 可迭代（iterable）和类数组（array-like）
// 这两者虽然感觉是类似的，但是有着本质上的不同！
// Iterable 如上所述，是实现了 Symbol.iterator 方法的对象。
// Array-like 是有索引和 length 属性的对象，所以它们看起来很像数组。

// 所以，一个可迭代对象也许不是类数组对象。反之亦然，类数组对象可能不可迭代，也可以同时都是。

// 可惜的是，上述两种对象都不能使用数组对象提供的大量好用的方法。
// 为了让它们可以使用，可以将它们转换为数组！使用 Array.from 方法。

let arrRange = Array.from(range);
console.log(arrRange);

// 总结
// 可以应用 for..of 的对象被称为 可迭代的。
//
// 技术上来说，可迭代对象必须实现 Symbol.iterator 方法。
// obj[Symbol.iterator]() 的结果被称为 迭代器（iterator）。由它处理进一步的迭代过程。
// 一个迭代器必须有 next() 方法，它返回一个 {done: Boolean, value: any} 对象，这里 done:true 表明迭代结束，否则 value 就是下一个值。
// Symbol.iterator 方法会被 for..of 自动调用，但我们也可以直接调用它。
// 内建的可迭代对象例如字符串和数组，都实现了 Symbol.iterator。
// 字符串迭代器能够识别代理对（surrogate pair）。（译注：代理对也就是 UTF-16 扩展字符。）
// 有索引属性和 length 属性的对象被称为 类数组对象。这种对象可能还具有其他属性和方法，但是没有数组的内建方法。
//
// 如果我们仔细研究一下规范 —— 就会发现大多数内建方法都假设它们需要处理的是可迭代对象或者类数组对象，而不是“真正的”数组，因为这样抽象度更高。
//
// Array.from(obj[, mapFn, thisArg]) 将可迭代对象或类数组对象 obj 转化为真正的数组 Array，然后我们就可以对它应用数组的方法。可选参数 mapFn 和 thisArg 允许我们将函数应用到每个元素。