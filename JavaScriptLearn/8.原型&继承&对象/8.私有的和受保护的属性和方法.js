// 将一个复杂的实现逻辑封装到内部，向外提供简单的接口，是面向对象编程中一个十分重要的方式。
// 特别是在维护和构建大型项目时，而为了让内部实现的一些接口不能被外部访问。
// 就需要使用到私有和受保护的数据和方法。

class CoffeeMachine {
    waterAmount = 0; // 内部的水量

    constructor(power) {
        this.power = power;
        console.log((`Created a coffee-machine, power: ${power}`));;
    }

}

let coffeeMachine = new CoffeeMachine(100);
coffeeMachine.waterAmount = 200;
console.log(coffeeMachine);

// 上述类中的属性和方法都可以被很容易的进行修改。
// 在 JS 中，受保护的属性通常以下划线 _ 作为前缀。这不是在语言级别强制实施的，但是程序员之间有一个众所周知的约定，即不应该从外部访问此类型的属性和方法。
// 然后使用 getter setter 函数对属性进行操作！
// 受保护的字段是可以被继承的。上述使用 _ 可视为受保护的属性。

class CoffeeMachine2 {
    _waterAmount = 0;

    set waterAmount(value) {
        if (value < 0) {
            value = 0;
        }
        this._waterAmount = value;
    }

    get waterAmount() {
        return this._waterAmount;
    }

    constructor(power) {
        this._power = power;
    }

}

// 创建咖啡机
let coffeeMachine2 = new CoffeeMachine2(100);

// 加水
coffeeMachine2.waterAmount = -10; // _waterAmount 将变为 0，而不是 -10
console.log(coffeeMachine2);

// 私有属性和方法应该以 # 开头。它们只在类的内部可被访问。
// 马上就会被加到规范中的已完成的 JavaScript 提案，它为私有属性和方法提供语言级支持。

class CoffeeMachine3 {
    #waterLimit = 200;

    #fixWaterAmount(value) {
        if (value < 0) return 0;
        if (value > this.#waterLimit) return this.#waterLimit;
    }

    setWaterAmount(value) {
        this.#waterLimit = this.#fixWaterAmount(value);
    }
}

let coffeeMachine3 = new CoffeeMachine3();

// 不能从类的外部访问类的私有属性和方法
// coffeeMachine3.#fixWaterAmount(123); // Error
// coffeeMachine3.#waterLimit = 1000; // Error

// 私有的和公开的不会发生冲突！
// 如果我们继承自 CoffeeMachine3，那么我们将无法直接访问 #waterAmount。我们需要依靠 waterAmount getter/setter。
// 依靠的 getter/setter 就是对外暴露的公开接口。

// 但是在许多情况下，这种限制太严重了。如果我们扩展 CoffeeMachine，则可能有正当理由访问其内部。这就是为什么大多数时候都会使用受保护字段，即使它们不受语言语法的支持。

// 总结
// 就面向对象编程（OOP）而言，内部接口与外部接口的划分被称为 封装。
//
// 它具有以下优点：
//
// 保护用户，使他们不会误伤自己
// 想象一下，有一群开发人员在使用一个咖啡机。这个咖啡机是由“最好的咖啡机”公司制造的，工作正常，但是保护罩被拿掉了。因此内部接口暴露了出来。
//
// 所有的开发人员都是文明的 —— 他们按照预期使用咖啡机。但其中的一个人，约翰，他认为自己是最聪明的人，并对咖啡机的内部做了一些调整。然而，咖啡机两天后就坏了。
//
// 这肯定不是约翰的错，而是那个取下保护罩并让约翰进行操作的人的错。
//
// 编程也一样。如果一个 class 的使用者想要改变那些本不打算被从外部更改的东西 —— 后果是不可预测的。
//
// 可支持性
// 编程的情况比现实生活中的咖啡机要复杂得多，因为我们不只是购买一次。我们还需要不断开发和改进代码。
//
// 如果我们严格界定内部接口，那么这个 class 的开发人员可以自由地更改其内部属性和方法，甚至无需通知用户。
//
// 如果你是这样的 class 的开发者，那么你会很高兴知道可以安全地重命名私有变量，可以更改甚至删除其参数，因为没有外部代码依赖于它们。
//
// 对于用户来说，当新版本问世时，应用的内部可能被进行了全面检修，但如果外部接口相同，则仍然很容易升级。
//
// 隐藏复杂性
// 人们喜欢使用简单的东西。至少从外部来看是这样。内部的东西则是另外一回事了。
//
// 程序员也不例外。
//
// 当实施细节被隐藏，并提供了简单且有据可查的外部接口时，总是很方便的。
//
// 为了隐藏内部接口，我们使用受保护的或私有的属性：
//
// 受保护的字段以 _ 开头。这是一个众所周知的约定，不是在语言级别强制执行的。程序员应该只通过它的类和从它继承的类中访问以 _ 开头的字段。
// 私有字段以 # 开头。JavaScript 确保我们只能从类的内部访问它们。
// 目前，各个浏览器对私有字段的支持不是很好，但可以用 polyfill 解决。