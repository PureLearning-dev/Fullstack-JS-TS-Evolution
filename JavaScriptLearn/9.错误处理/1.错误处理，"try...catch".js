// 不管你多么精通编程，有时我们的脚本总还是会出现错误。可能是因为我们的编写出错，或是与预期不同的用户输入，或是错误的服务端响应以及其他数千种原因。
//
// 通常，如果发生错误，脚本就会“死亡”（立即停止），并在控制台将错误打印出来。
//
// 但是有一种语法结构 try...catch，它使我们可以“捕获（catch）”错误，因此脚本可以执行更合理的操作，而不是死掉。

// 使用 try catch 语法，如果 try 包裹的代码块出现错误，则会抛出，并被 catch 捕获，用于处理。
// 如果 try 包裹的代码没有错误，则 catch 中的逻辑就会被忽略。
try {
    console.log("没有错误");
} catch (error) {
    console.error(`这里的代码直接被忽略 ${error}`);
}

try {
    console.log('开始执行 try 中的内容');  // (1) <--
    lalala; // error，变量未定义！
    console.log('try 的末尾（未执行到此处）');  // (2)
} catch (err) {
    console.log(`出现了 error！${err}`); // (3) <--
}

// 要使得 try...catch 能工作，代码必须是可执行的。换句话说，它必须是有效的 JavaScript 代码。
//
// 如果代码包含语法错误，那么 try..catch 将无法正常工作，例如含有不匹配的花括号：
//
// try {
//   {{{{{{{{{{{{
// } catch (err) {
//   alert("引擎无法理解这段代码，它是无效的");
// }
// JavaScript 引擎首先会读取代码，然后运行它。在读取阶段发生的错误被称为“解析时间（parse-time）”错误，并且无法恢复（从该代码内部）。这是因为引擎无法理解该代码。
//
// 所以，try...catch 只能处理有效代码中出现的错误。这类错误被称为“运行时的错误（runtime errors）”，有时被称为“异常（exceptions）”。

// 如果在“计划的（scheduled）”代码中发生异常，例如在 setTimeout 中，则 try...catch 不会捕获到异常：
//
// try {
//   setTimeout(function() {
//     noSuchVariable; // 脚本将在这里停止运行
//   }, 1000);
// } catch (err) {
//   alert( "不工作" );
// }
// 因为 try...catch 包裹了计划要执行的函数，该函数本身要稍后才执行，这时引擎已经离开了 try...catch 结构。
//
// 为了捕获到计划的（scheduled）函数中的异常，那么 try...catch 必须在这个函数内：
//
// setTimeout(function() {
//   try {
//     noSuchVariable; // try...catch 处理 error 了！
//   } catch {
//     alert( "error 被在这里捕获了！" );
//   }
// }, 1000);

// try 中发生错误，会将错误封装为一个 Error 对象！
// 对于所有内建的 error，error 对象具有两个主要属性：
// name
// Error 名称。例如，对于一个未定义的变量，名称是 "ReferenceError"。
// message
// 关于 error 的详细文字描述。
// 还有其他非标准的属性在大多数环境中可用。其中被最广泛使用和支持的是：
// stack
// 当前的调用栈：用于调试目的的一个字符串，其中包含有关导致 error 的嵌套调用序列的信息。

// 如果我们不需要 error 的详细信息，catch 也可以忽略它：
//
// try {
//   // ...
// } catch { // <-- 没有 (err)
//   // ...
// }

// 在任何可能抛出错误的地方都要规范的使用捕获错误的机制，在 catch 中可以干的事情是很多的！
// 可以输出错误，也可以将信息发送给日志机器，甚至可以再次执行。

// 我们可以自己控制抛出错误的时机，使用 throw 关键字，后面通常抛出一个 Error 对象。
// 但 throw 后其实可以跟任意的数据。
// 对于内建的 error（不是对于其他任何对象，仅仅是对于 error），name 属性刚好就是构造器的名字。message 则来自于参数（argument）。

let json = '{ "age": 30 }'; // 不完整的数据

try {

    let user = JSON.parse(json); // <-- 没有 error

    if (!user.name) {
        throw new SyntaxError("数据不全：没有 name"); // (*)
    }

    console.log( user.name );

} catch(err) {
    console.log("JSON Error: " + err); // JSON Error: 数据不全：没有 name
}

// try...catch 结构可能还有一个代码子句（clause）：finally。
//
// 如果它存在，它在所有情况下都会被执行：
//
// try 之后，如果没有 error，
// catch 之后，如果有 error。

try {
    console.log(('try'));;
} catch (err) {
    console.log(('catch'));;
} finally {
    console.log(('finally'));;
}

// 如果我们使用 let 在 try 块中声明变量，那么该变量将只在 try 块中可见，显而易见的，try 后面跟着的是可以开启新的作用域。
// 在 try 中有一个 return。在这种情况下，finally 会在控制转向外部代码前被执行。
// 没有 catch 子句的 try...finally 结构也很有用。当我们不想在原地处理 error（让它们掉出去吧），但是需要确保我们启动的处理需要被完成时，我们应当使用它。

// 全局 catch.
// 这是用于捕获没有被正常捕获的错误的机制，防止程序死亡，尽管没有在规范中，但各个环境都使用了该机制。
// Node.JS 有 process.on("uncaughtException")。
// 在浏览器中，我们可以将一个函数赋值给特殊的 window.onerror 属性，该函数将在发生未捕获的 error 时执行。

// 总结
// try...catch 结构允许我们处理执行过程中出现的 error。从字面上看，它允许“尝试”运行代码并“捕获”其中可能发生的 error。
//
// 语法如下：
//
// try {
//   // 执行此处代码
// } catch (err) {
//   // 如果发生 error，跳转至此处
//   // err 是一个 error 对象
// } finally {
//   // 无论怎样都会在 try/catch 之后执行
// }
// 这儿可能会没有 catch 或者没有 finally，所以 try...catch 或 try...finally 都是可用的。
//
// Error 对象包含下列属性：
//
// message —— 人类可读的 error 信息。
// name —— 具有 error 名称的字符串（Error 构造器的名称）。
// stack（没有标准，但得到了很好的支持）—— Error 发生时的调用栈。
// 如果我们不需要 error 对象，我们可以通过使用 catch { 而不是 catch (err) { 来省略它。
//
// 我们也可以使用 throw 操作符来生成自定义的 error。从技术上讲，throw 的参数可以是任何东西，但通常是继承自内建的 Error 类的 error 对象。下一章我们会详细介绍扩展 error。
//
// 再次抛出（rethrowing）是一种错误处理的重要模式：catch 块通常期望并知道如何处理特定的 error 类型，因此它应该再次抛出它不知道的 error。
//
// 即使我们没有 try...catch，大多数执行环境也允许我们设置“全局” error 处理程序来捕获“掉出（fall out）”的 error。在浏览器中，就是 window.onerror。