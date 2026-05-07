// 字符串也是一种常用的数据类型，并且十分重要！
// 表示字符串字面值有 3 种方式，最习惯的是 '' 和 ""，现代化的表示是 ``.
// 三者都可以转换特殊字符，比如 \n \t 等，后者则可以直接进行输入并可以使用 ${} 语法放入 JS 表达式，是最方便的！
// 特殊字符较多，我们只用记住常用的即可，当需要使用时，可以谷歌或者使用 AI.
let s1 = "Hello\nWorld!";
const a = "World!";
let s2 = `Hello ${a}`;
let s3 = `Hello
World!`;
console.log('s1:' + s1);
console.log('s2:' + s2);
console.log('s3:' + s3);

// 当我们需要输出一个和特殊字符一样的字面字符时，需要使用到转义字符（\）！
// 有个特殊的地方，如果使用 '' 包裹整个字符串，则在里面可以直接使用 ""，而不用使用转义字符，反之亦然。
console.log('\\n \'');

// JS 中的字符串是不可变的，意味着初始化了一个字符串，就无法对其修改，除非重新分配一个内存，重新对该内存赋值。
let str = "Hello World!";
// 此处的修改不会造成任何影响
str[0] = 'G';
console.log(str[0]);

// 字符串类似于数组，一个字符串也有着一些有用的属性！
let s4 = "Hello World!";
console.log('字符串s4的长度为：' + s4.length);
// 使用 [] 访问对应位置上的字符是现代化的方式，若访问的位置不存在字符则返回 undefine.
console.log(s4[2], s4[s4.length]);

// 字符串可以由 for ... of 进行遍历，由此可见，在将 string 包装后，JS 编译器实现了其迭代方法。
console.log("遍历一遍s4：");
for (let char of s4) {
    console.log(char);
}

// toLowerCase() 和 toUpperCase() 顾名思义是将字符串中的字母转换大小写。
console.log("s4转换为大写：" + s4.toUpperCase());
console.log("s4转换为小写：" + s4.toLowerCase());

// 在字符串中查找子字符串也是很常见的一种情景，在 JS 中，已经内置了这个方法了！
// 第一个参数是需要查找的子字符串，第二个参数是从对应的索引开始查找。若存在，则返回子字符串在主字符串中开始的索引，否则，返回 -1.
console.log(s4.indexOf("l", 0));
console.log(s4.lastIndexOf("ld", s4.length - 1));

// 但是上述两个函数只会返回第一次找到的子字符串，如果我们需要查找主字符串中的所有子字符串，就需要我们优化一下逻辑。
// 这里只优化 indexOf 函数，另一个的逻辑是类似的，甚至可以说是相同的。
function findAllSubstrings(str, substring, start) {
    if (str.length === 0 || str.indexOf(substring) === -1 || str.length <= start) {
        return false;
    }
    let pos = start === undefined ? 0 : start;
    while (1) {
        let start = str.indexOf(substring, pos);
        // 如果 str 中不存在 substring 了，则直接退出循环。
        if (start === -1) {
            break;
        }
        console.log(`在索引 ${start} 处存在一个 ${substring}.`);
        pos = start + 1;
    }

    return true;
}

console.log(findAllSubstrings(str, 'l', 0));

// indexOf 在查找到子字符串不在主字符串中时，返回的是 -1，在判断时需要注意，不能让其直接放在判断条件中，不然可能导致错误。
// 比如找到了子字符串，但是索引的位置是 0，则明明是找到的，但是判断条件为假！
// 在这里可以使用取反的技巧（~）！
// 为什么取反就行呢？数值在内存是以补码的形式存储的，而补码只对负数生效。
// 其中的关系是 -n = ~n + 1，所以有 ~n = -(n + 1)，这样 -1 取反后就得到 0，所以可以直接作为判断依据了！
if (!~"hello".indexOf("9")) {
    console.log("不存在子字符串！");
}

// 更为现代的函数是 includes，这个只返回 true 或 false.
console.log("hello".includes("llo"));

// 获取子字符串的函数有 substring slice substr.
// 具体的使用方法直接参考手册说明则可。
let s5 = s4.substring(2);
console.log(s5);

// 字符串还有许多有用的方法，比如 trim repeat 等，在使用时直接查看 IDE 中的说明则可知晓，功能十分浅显易懂！