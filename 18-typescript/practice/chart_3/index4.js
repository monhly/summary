//高级类型
// implements可以使用implements来坚持类是否满足特定的interface,如果一个类不能正确实现它,则会发出错误
// interface Pingable{
//     ping():void
// }
// class Son implements Pingable{
//     ping(): void {
//         console.log("ping");
//     }
function getName(n) {
    if (typeof n === "string") {
        return n;
    }
    else {
        return n();
    }
}
console.log(getName("111"), getName(function () { return "sadsa"; }));
