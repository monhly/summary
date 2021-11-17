var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
//一.类的使用 TS的类中和ES6的类是一样的
var Persons = /** @class */ (function () {
    function Persons(name, age) {
        this.name = name;
        this.age = age;
    }
    //私有的
    Persons.prototype.save = function () {
        console.log("定义的实例属性和方法");
    };
    Persons.save = function () { };
    return Persons;
}());
var HC = /** @class */ (function (_super) {
    __extends(HC, _super);
    function HC(name, age) {
        return _super.call(this, name, age) || this;
    }
    return HC;
}(Persons));
var pre = new Persons("li", 20);
console.log(pre);
//不可在外部进行使用
console.log(pre.age);
console.log(pre.save);
//二. 类属性修饰符
/**
 * public(公开的)
 * 如果使用public来修饰属性,表示这个属性石公开的,可以在类的内部使用,也可以在子类中使用
 *
 * protected(受保护的)
 * 表示此方法可以在类的内部使用,也可以在子类中使用
 *
 * private(私有的)
 * 如果使用的是private来修饰方法,表示此方法是私有的,只可以在类的内部使用
 *
 * readonly(只读的)
 *
 *
 */
//三.类的可选属性和参数属性
//可选属性:接口中的可选属性是一样的,可传可不传的属性
var isCon = /** @class */ (function () {
    function isCon() {
    }
    //在ts中如果定义了实例属性,name就必须在构造函数中进行使用,否则就会报错
    isCon.prototype.setData = function (name, age) {
        this.name = name;
        this.age = age;
    };
    return isCon;
}());
//参数属性:
//四:类的存储器
var IsPre = /** @class */ (function () {
    function IsPre() {
        this._age = 0;
    }
    Object.defineProperty(IsPre.prototype, "age", {
        set: function (val) {
            console.log("进入了set方法");
            this._age = val;
            console.log(this._age);
        },
        enumerable: false,
        configurable: true
    });
    return IsPre;
}());
var pp = new IsPre();
console.log(pp.age = 398);
