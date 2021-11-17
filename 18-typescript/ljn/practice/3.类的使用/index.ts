//一.类的使用 TS的类中和ES6的类是一样的
class Persons{
    public name:string
    protected age:number
    constructor(name:string,age:number){
        this.name=name
        this.age=age
    }
    //私有的
    private save():void{
        console.log("定义的实例属性和方法");
    }
    //定义静态属性
    static food:string
    //只读属性
    readonly onlyread:string
    static save():void{}
}
 class  HC extends Persons {
     constructor(name,age) {
         super(name,age)
     }

 }
var pre=new Persons("li",20)
console.log(pre);
//不可在外部进行使用
// console.log(pre.age);
// console.log(pre.save);
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
class isCon{
    name:string;
    //可选属性
    age?:number;
    //在ts中如果定义了实例属性,name就必须在构造函数中进行使用,否则就会报错
    setData(name:string,age:number){
        this.name=name
        this.age=age
    }
}
//参数属性:


//四:类的存储器
//通过getter/setter来截取成员对象的访问
class IsPre{
    // 对于截取的属性进行_的设置
    private _age:number=0
    set age(val:number){
        console.log("进入了set方法");
        this._age=val
        console.log(this._age);
    }
}

let pp=new IsPre
console.log(pp.age=398);


//五.抽象类
/**
 * 抽象类是专门用于定义那些不希望被外界直接创建的类
 * 抽象类一般用于定义基类
 * 抽象类和接口一般用于约束子类
 */
/**
 * 接口和类的区别:
 * 接口中只能定义约束,不能定义具体的实现
 * 抽象类中既可以定义约束,又可以定义具体实现
 */
abstract class abSt{
        abstract str:string;
        abstract say():void;
}
//抽象类不能被实例,只能在子类中进行继承,同时规定继承的属性必须和抽象类保持一致
class Childs extends abSt{
    str: string;
    say(): void {
        
    }
}

//类和接口实现
interface PersonIter{
    name:string;
    say():void
}
//类实现接口
class isPlr implements PersonIter{
    name: string;
    say(): void {
        
    }
}

//接口继承类(继承类中所有的属性和方法),但是只会继承声明,不会继承实现
/**
 * 注意事项:如果接口继承汇总的类中包含了protected的属性和方法,那么就只有这个类的子类才能实现这个接口
 */

class perIs{
    protected age:number
    name:string;
    say():void{}
}
interface Pers extends perIs{
    gender():void
}
//基于implements继承的接口和类都必须在子类中继承
class Childss extends perIs implements Pers{
    gender(): void {
        
    }
    name: string;
    say(): void {
        
    }
}





//六.泛型类
class Ca<T> {
   array:T[]
   add(value:T):T{
       return value
   }
}

//七.接口合并现象
//当我们定义了多喝同名的接口的时候,多个接口的内容会自动合并
interface Testface{
    name:string
}
interface Testface{
    age:string
}
class TP implements Testface {
    name: string;
    age: string;
}