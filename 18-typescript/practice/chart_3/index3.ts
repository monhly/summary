//枚举的使用
/**
 * 使用枚举可以定义一些带名字的常量
 * ts支持数字和基于字符串的枚举
 */
enum Direction{
    Up=1,
    Down,
    Low
    //默认从1开始增加
}
let a=Direction
console.log(a.Down,a.Low);