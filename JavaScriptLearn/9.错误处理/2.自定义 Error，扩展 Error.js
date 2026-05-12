// JS 内置的 Error 对象在大多数时候并不能满足我们的使用，所有我们需要对 Error 进行扩展！
// JavaScript 允许将 throw 与任何参数一起使用，所以从技术上讲，我们自定义的 error 不需要从 Error 中继承。但是，如果我们继承，那么就可以使用 obj instanceof Error 来识别 error 对象。因此，最好继承它。

// 扩展一个无效数据的 Error 对象。
class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationError";
    }
}

// 用法
function readUser(json) {
    let user = JSON.parse(json);

    if (!user.age) {
        throw new ValidationError("No field: age");
    }
    if (!user.name) {
        throw new ValidationError("No field: name");
    }

    return user;
}

// try..catch 的工作示例

try {
    let user = readUser('{ "age": 25 }');
} catch (err) {
    // 这里除了使用 instanceof 关键词，还可以使用 err.name 的值进行判断！
    if (err instanceof ValidationError) {
        console.log("Invalid data: " + err.message); // Invalid data: No field: name
    } else if (err instanceof SyntaxError) { // (*)
        console.log(("JSON Syntax Error: " + err.message));;
    } else {
        throw err; // 未知的 error，再次抛出 (**)
    }
}

// 优化 name 属性，优雅地赋值为 Function 的 name 属性。
class MyError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}

class ValidationError2 extends MyError { }

class PropertyRequiredError extends ValidationError2 {
    constructor(property) {
        super("No property: " + property);
        this.property = property;
    }
}

// name 是对的
console.log((new PropertyRequiredError("field").name));; // PropertyRequiredError


// 包装异常。
// 将低级别的异常包装为更加抽象的高级别异常，在一个具体的任务中只抛出高级别的异常，更加详细的 error 信息存放到 cause 中。
class ReadError extends Error {
    constructor(message, cause) {
        super(message);
        this.cause = cause;
        this.name = 'ReadError';
    }
}

class ValidationError extends Error { /*...*/ }
class PropertyRequiredError extends ValidationError { /* ... */ }

function validateUser(user) {
    if (!user.age) {
        throw new PropertyRequiredError("age");
    }

    if (!user.name) {
        throw new PropertyRequiredError("name");
    }
}

function readUser(json) {
    let user;

    try {
        user = JSON.parse(json);
    } catch (err) {
        if (err instanceof SyntaxError) {
            throw new ReadError("Syntax Error", err);
        } else {
            throw err;
        }
    }

    try {
        validateUser(user);
    } catch (err) {
        if (err instanceof ValidationError) {
            throw new ReadError("Validation Error", err);
        } else {
            throw err;
        }
    }

}

try {
    readUser('{bad json}');
} catch (e) {
    if (e instanceof ReadError) {
        alert(e);
        // Original error: SyntaxError: Unexpected token b in JSON at position 1
        alert("Original error: " + e.cause);
    } else {
        throw e;
    }
}

// 总结
// 我们可以正常地从 Error 和其他内建的 error 类中进行继承。我们只需要注意 name 属性以及不要忘了调用 super。
// 我们可以使用 instanceof 来检查特定的 error。但有时我们有来自第三方库的 error 对象，并且在这儿没有简单的方法来获取它的类。那么可以将 name 属性用于这一类的检查。
// 包装异常是一项广泛应用的技术：用于处理低级别异常并创建高级别 error 而不是各种低级别 error 的函数。在上面的示例中，低级别异常有时会成为该对象的属性，例如 err.cause，但这不是严格要求的。