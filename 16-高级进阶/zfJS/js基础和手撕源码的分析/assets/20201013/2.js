/* JQ中关于数据类型检测的源码 */
var getProto = Object.getPrototypeOf; //获取实例的原型对象
var class2type = {};
var toString = class2type.toString; //Object.prototype.toString 检测数据类型
var hasOwn = class2type.hasOwnProperty; //Object.prototype.hasOwnProperty
var fnToString = hasOwn.toString; //Function.prototype.toString 把函数转换字符串
var ObjectFunctionString = fnToString.call(Object); //"function Object() { [native code] }"

// 循环数据中的每一项：建立数据类型检测的映射表
//  + [object Boolean]/[object Number]/[object String]都是为了处理基于”构造函数“创建的基本数据值的引用类型值，最后期许检测出来的结果依然是"boolean"/"number"/"string"
//  typeof new Number(10) -> "object"
//  toString.call(new Number(10)) -> "[object Number]"
[
    "Boolean",
    "Number",
    "String",
    "Symbol",
    "Function",
    "Array",
    "Date",
    "RegExp",
    "Object",
    "Error",
    "GeneratorFunction"
].forEach(function (name) {
    class2type["[object " + name + "]"] = name.toLowerCase();
});

// 检测数据类型的公共方法
function toType(obj) {
    // null/undefined
    if (obj == null) {
        return obj + "";
    }
    // 如果是引用数据类型（包含:new Number(10)这种），则基于Object.prototype.toString来检测（拿检测的结果到之前建立的映射表中去匹配查找，找到对象的小写数据类型）；而基本数据类型，之前排除了null/undefined，剩下的基于typeof即可解决！
    return typeof obj === "object" || typeof obj === "function" ?
        class2type[toString.call(obj)] || "object" :
        typeof obj;
}

// 检测是否为一个函数
var isFunction = function isFunction(obj) {
    // Support: Chrome <=57, Firefox <=52
    // In some browsers, typeof returns "function" for HTML <object> elements
    // (i.e., `typeof document.createElement( "object" ) === "function"`).
    // We don't want to classify *any* DOM node as a function.
    return typeof obj === "function" && typeof obj.nodeType !== "number";
};

// 检测是否为window
var isWindow = function isWindow(obj) {
    // window.window===window 所有符合这个特点的对象就是浏览器的window对象
    // null/undefined无法进行成员访问
    return obj != null && obj === obj.window;
};

// 检测是否为数组或者类数组
function isArrayLike(obj) {
    // length:要不然是false(不存在或者没有length属性)，要不然是length的属性值
    // type:检测出来的数据类型
    var length = !!obj && "length" in obj && obj.length,
        type = toType(obj);

    // 如果是函数或者window直接返回false，因为：函数或者window也都有length属性
    if (isFunction(obj) || isWindow(obj)) {
        return false;
    }

    // type === "array" -> 数组
    // length === 0 -> 有length属性，值是零「空的类数组」
    // typeof length === "number" && length > 0 -> length属性值大于零(非空类数组)
    // (length - 1) in obj -> 最大索引也存在，我们认为其是按照索引递增的(不一定准确)
    return type === "array" || length === 0 ||
        typeof length === "number" && length > 0 && (length - 1) in obj;
}

// 检测是否为一个纯粹的对象 => {}  数组对象/正则对象等都不算
function isPlainObject(obj) {
    var proto,
        Ctor,
        type = toType(obj);

    // 不存在或者检测数据类型的结果都不是object，那么一定不是纯粹的对象
    if (!obj || type !== "object") {
        return false;
    }

    // 不存在原型的情况:Object.create(null)
    proto = getProto(obj);
    if (!proto) {
        return true;
    }

    // 获取当前值原型对象上的constructor「获取它的构造函数」
    Ctor = hasOwn.call(proto, "constructor") && proto.constructor;

    // 有构造函数，并且构造函数需要直接是Object才可以：排除了NodeList/自定类的实例等内容，只有它的原型直接是Object.prototype的才可以  => ObjectFunctionString===fnToString.call(Object)
    return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
}

// 检测是否为一个空对象
/* function isEmptyObject(obj) {
    var name;
    // for in遍历的时候，可以遍历到自己在内置类原型上扩展的方法
    // 并且它无法遍历Symbol的属性值
    for (name in obj) {
        return false;
    }
    return true;
} */
// Object.prototype.AA = 100;
// let obj = {};
// console.log(isEmptyObject(obj)); //false

// let obj = {
//     [Symbol()]: 100
// };
// console.log(isEmptyObject(obj)); //true

function isEmptyObject(obj) {
    var keys = [
        ...Object.getOwnPropertyNames(obj),
        ...Object.getOwnPropertySymbols(obj)
    ];
    return keys.length === 0;
}
Object.prototype.AA = 100;
let obj = {};
console.log(isEmptyObject(obj)); //true

obj = {
    [Symbol()]: 100
};
console.log(isEmptyObject(obj)); //false