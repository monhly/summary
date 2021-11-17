//高级类型
// implements可以使用implements来坚持类是否满足特定的interface,如果一个类不能正确实现它,则会发出错误
// interface Pingable{
//     ping():void
// }
// class Son implements Pingable{
//     ping(): void {
//         console.log("ping");
//     }
    
// }
//此时会出现错误,在Ball中缺少ping属性
// class Ball implements Pingable{
//     pang(){
//         console.log("ping");
//     }
//     ping(): void {
//         console.log("pong的ping");
//     }
    
// }
// let padder :Pingable=new Son
// console.log(padder);
// console.log(padder instanceof Son);



//可以为null的类型
// 类型检测器认为,null和undefined可以赋值给任何类型, null与undefined 是所有其他类型的一个有效值.
// let str:string
// str=null
// str=undefined
// console.log(str);



//类型别名
/**
 * 类型别名会给一个类型起个新名字,类型别名有时候和接口很像,但是可以作用于原始值,联合类型,元祖以及其他任何你需要手写的类型
 * 
 */
type Name=string;
type NameFunc=()=>string

function getName(n:NameFunc|Name):Name{
    if(typeof n==="string"){
        return n
    }else{
        return n()
    }

}
console.log(getName("111"),getName(()=>"sadsa"));
//接口和类型的区分:
//1.接口创建了一个新的名字，可以在其它任何地方使用。 类型别名并不创建新名字—比如，错误信息就不会使用别名
type Alias = { num: number }
interface Interface {
    num: number;
}
//2.另一个重要区别是类型别名不能被 extends和 implements