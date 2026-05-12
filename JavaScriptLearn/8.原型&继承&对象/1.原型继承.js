// 在其他编程语言中通常会用继承系统，使用接口或类进行实现，核心目的是方便地扩展类和更好地进行抽象。
// 在 JS 中有实现类似功能的机制——原型！

// 每个对象都会有一个隐藏的属性 —— [[Prototype]]，该属性要么为 null 要么为一个对象！
// 当访问对象的属性时，对象中没有要访问的属性，就会去调用 [[Prototype]] 对象上的对应属性。
// 一个对象只有唯一一个 [[Prototype]] 属性，但可以一个接着一个地往上引用对象，形成一条链条！称之为“原型链”。
let animal = {
    eats: true
};
let rabbit = {
    jumps: true
};

rabbit.__proto__ = animal; // 设置 rabbit.[[Prototype]] = animal
console.log(rabbit.eats, typeof null);

// 尽管原型链可以很长，但是不能形成一个循环！
// 使用 __proto__ 是过时的，现代化的写法是使用 Object.getPrototypeOf/Object.setPrototypeOf 两个方法。

// 在对象的方法中 this 是十分常见的！在之前已经说过，this 的值只与调用方法关联。
// 我们来分析一下下面的对象的 this 使用情况吧。
// animal 有一些方法
let animal2 = {
    walk() {
        if (!this.isSleeping) {
            alert(`I walk`);
        }
    },
    sleep() {
        this.isSleeping = true;
    }
};

let rabbit2 = {
    name: "White Rabbit",
    __proto__: animal2
};
// rabbit 的原型是 animal2.
// 在 rabbit 对象上调用 sleep.
// this 指向的是 rabbit，所以 rabbit 会被赋予一个 isSleeping 属性，而原型对象并没有收到影响。
rabbit2.sleep();
console.log(rabbit2, animal2);

// 再来分析一下访问器属性。
// admin 的原型是 user，让 admin 调用 fullName，显然 admin 对象没有这个 get 访问器属性，所以编译器会去查找原型 user！
// ok，在 user 中找到了，在 get 的 fullName 中会用到 this.name 和 this.surname，但是 admin 中没有，所以会随着原型链去找 user 中的 name 和 surname.
// 显然成功找到了！得到结果。

// 那使用 set 访问器属性呢？
// 同理，会在 admin 对象中设置 name 和 surname 属性，不会影响到 user 对象！
// 所以，方法是共享的，但对象状态不是。
let user = {
    name: "John",
    surname: "Smith",

    set fullName(value) {
        [this.name, this.surname] = value.split(" ");
    },

    get fullName() {
        return `${this.name} ${this.surname}`;
    }
};

let admin = {
    __proto__: user,
    isAdmin: true
};

console.log(admin.fullName); // John Smith (*)

// setter triggers!
admin.fullName = "Alice Cooper"; // (**)

// for..in 循环会迭代继承的属性。
for (let key in admin) {
    console.log(key);
}

// 如果这不是我们想要的，并且我们想排除继承的属性，那么这儿有一个内建方法 obj.hasOwnProperty(key)：如果 obj 具有自己的（非继承的）名为 key 的属性，则返回 true。
for (let key in admin) {
    if(admin.hasOwnProperty(key)) {
        console.log(`${key} is ownered`);
    }else{
        console.log(`${key} isn't ownered`);
    }
}

// 几乎所有其他键/值获取方法，例如 Object.keys 和 Object.values 等，都会忽略继承的属性。
//
// 它们只会对对象自身进行操作。不考虑 继承自原型的属性。

// 总结
// 在 JavaScript 中，所有的对象都有一个隐藏的 [[Prototype]] 属性，它要么是另一个对象，要么就是 null。
// 我们可以使用 obj.__proto__ 访问它（历史遗留下来的 getter/setter，这儿还有其他方法，很快我们就会讲到）。
// 通过 [[Prototype]] 引用的对象被称为“原型”。
// 如果我们想要读取 obj 的一个属性或者调用一个方法，并且它不存在，那么 JavaScript 就会尝试在原型中查找它。
// 写/删除操作直接在对象上进行，它们不使用原型（假设它是数据属性，不是 setter）。
// 如果我们调用 obj.method()，而且 method 是从原型中获取的，this 仍然会引用 obj。因此，方法始终与当前对象一起使用，即使方法是继承的。
// for..in 循环在其自身和继承的属性上进行迭代。所有其他的键/值获取方法仅对对象本身起作用。