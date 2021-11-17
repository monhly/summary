//枚举的使用
/**
 * 使用枚举可以定义一些带名字的常量
 * ts支持数字和基于字符串的枚举
 */
var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 1] = "Up";
    Direction[Direction["Down"] = 2] = "Down";
    Direction[Direction["Low"] = 3] = "Low";
})(Direction || (Direction = {}));
var a = Direction;
console.log(a.Down, a.Low);
