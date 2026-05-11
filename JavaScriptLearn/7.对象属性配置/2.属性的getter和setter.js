// 有两种类型的对象属性。
//
// 第一种是 数据属性。我们已经知道如何使用它们了。到目前为止，我们使用过的所有属性都是数据属性。
//
// 第二种类型的属性是新东西。它是 访问器属性（accessor property）。它们本质上是用于获取和设置值的函数，但从外部代码来看就像常规属性。

// 访问器是一种 特殊的属性——底层是函数，可以提供非常灵活的赋值和获取的逻辑。
// 可以在字面值中使用 set 和 get 进行声明，也可以使用 Object.defineProperty.
let obj = {
    firstName: "John",
    lastName: "Doe",
    set fullName(data) {
        [this.firstName, this.lastName] = data.split(" ");
    },
    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }
}

// 调用 set.
obj.fullName = "刘 杰";
console.log(obj.firstName, obj.lastName);
// 调用 get.
console.log(obj.fullName);

// 访问器属性的描述符与数据属性的不同。
//
// 对于访问器属性，没有 value 和 writable，但是有 get 和 set 函数。
//
// 所以访问器描述符可能有：
//
// get —— 一个没有参数的函数，在读取属性时工作，
// set —— 带有一个参数的函数，当属性被设置时调用，
// enumerable —— 与数据属性的相同，
// configurable —— 与数据属性的相同。

console.log(Object.getOwnPropertyDescriptors(obj));

// 使用访问器属性时，可以自定义一些校验或者其他逻辑，使得获取和赋值更加灵活可变。
// 使用 _ 后接变量时，规定为外部不直接调用得到该属性，而是通过访问器进行获取和设置，当然这只是规定而已，如果非要进行调用也是可以得到对应值的。
let user = {
    get name() {
        return this._name;
    },

    set name(value) {
        if (value.length < 4) {
            console.log("Name is too short, need at least 4 characters");
            return;
        }
        this._name = value;
    }
};

user.name = "Pete";
console.log(user.name); // Pete

user.name = ""; // Name 太短了……

// 访问器的一大用途是，它们允许随时通过使用 getter 和 setter 替换“正常的”数据属性，来控制和调整这些属性的行为。
// 这样的特性，可以让属性兼容性变得非常强！
function User(name, birthday) {
    this.name = name;
    this.birthday = birthday;

    // 年龄是根据当前日期和生日计算得出的
    Object.defineProperty(this, "age", {
        get() {
            let todayYear = new Date().getFullYear();
            return todayYear - this.birthday.getFullYear();
        }
    });
}

// 上面的构造器 User 会在每个实例中都构建一个 age 访问器属性，我们可以把这个访问器属性提升到原型中，这样所有实例都共享同一个访问器属性了，内存占用较少。

