// 在 JavaScript 中，我们只能继承单个对象。每个对象只能有一个 [[Prototype]]。并且每个类只可以扩展另外一个类。
// 但在有些时候，我们需要打破这样的限定，比如一个类要使用其他两个或者多个类的方法。

// 有一个概念可以帮助我们，叫做 “mixin”。
//
// 根据维基百科的定义，mixin 是一个类，其方法可被其他类使用，而无需继承。
//
// 换句话说，mixin 提供了实现特定行为的方法，但是我们不单独使用它，而是使用它来将这些行为添加到其他类中。

// 在 JavaScript 中构造一个 mixin 最简单的方式就是构造一个拥有实用方法的对象，以便我们可以轻松地将这些实用的方法合并到任何类的原型中。

// mixin
let sayHiMixin = {
    sayHi() {
        console.log((`Hello ${this.name}`));
    },
    sayBye() {
        console.log((`Bye ${this.name}`));
    }
};

// 用法：
class User {
    constructor(name) {
        this.name = name;
    }
}

// 拷贝方法。
// 将 sayHiMixin 中的所有可遍历的方法拷贝到 User.prototype 中。
Object.assign(User.prototype, sayHiMixin);

// 现在 User 可以打招呼了。
new User("Dude").sayHi(); // Hello Dude!

// 这里没有继承，只有一个简单的方法拷贝。因此，我们可以让 User 在继承另一个类的同时，使用 mixin 来 “mix-in”（混合）其它方法。
class Person {
    constructor(name, age, location) {
        this.name = name;
        this.age = age;
        this.location = location;
    }
}

class Chinese extends Person{
    constructor(name, age, location, school) {
        super(name, age, location);
        this.school = school;
    }
}

let DoMixin = {
    sayHi() {
        console.log((`Hello ${this.name}`));
    }
}

Object.assign(Person.prototype, DoMixin);
new Chinese("Dude").sayHi();

// 现在让我们为实际运用构造一个 mixin。

let eventMixin = {
    /**
     * 订阅事件，用法：
     *  menu.on('select', function(item) { ... }
     */
    on(eventName, handler) {
        if (!this._eventHandlers) this._eventHandlers = {};
        if (!this._eventHandlers[eventName]) {
            this._eventHandlers[eventName] = [];
        }
        this._eventHandlers[eventName].push(handler);
    },

    /**
     * 取消订阅，用法：
     *  menu.off('select', handler)
     */
    off(eventName, handler) {
        let handlers = this._eventHandlers?.[eventName];
        if (!handlers) return;
        for (let i = 0; i < handlers.length; i++) {
            if (handlers[i] === handler) {
                handlers.splice(i--, 1);
            }
        }
    },

    /**
     * 生成具有给定名称和数据的事件
     *  this.trigger('select', data1, data2);
     */
    trigger(eventName, ...args) {
        if (!this._eventHandlers?.[eventName]) {
            return; // 该事件名称没有对应的事件处理程序（handler）
        }

        // 调用事件处理程序（handler）
        this._eventHandlers[eventName].forEach(handler => handler.apply(this, args));
    }
};

// 创建一个 class
class Menu {
    choose(value) {
        this.trigger("select", value);
    }
}
// 添加带有事件相关方法的 mixin
Object.assign(Menu.prototype, eventMixin);

let menu = new Menu();

// 添加一个事件处理程序（handler），在被选择时被调用：
menu.on("select", value => console.log(`Value selected: ${value}`));

// 触发事件 => 运行上述的事件处理程序（handler）并显示：
// 被选中的值：123
menu.choose("123");

// 总结
// Mixin —— 是一个通用的面向对象编程术语：一个包含其他类的方法的类。
//
// 一些其它编程语言允许多重继承。JavaScript 不支持多重继承，但是可以通过将方法拷贝到原型中来实现 mixin。
//
// 我们可以使用 mixin 作为一种通过添加多种行为（例如上文中所提到的事件处理）来扩充类的方法。
//
// 如果 Mixins 意外覆盖了现有类的方法，那么它们可能会成为一个冲突点。因此，通常应该仔细考虑 mixin 的命名方法，以最大程度地降低发生这种冲突的可能性。