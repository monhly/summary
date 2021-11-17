//装饰器的使用
/**
 * 装饰器:是一种特殊种类的声明,可以被附带在一个类声明,方法,访问器,属性或者参数.装饰器的使用形式@expression,expression必须运行在一个运行时的调用的函数,其中包含有关装饰声明的信息.
 * 
 * 通俗来讲装饰器就是一个方法,可以注入到类,方法,属性参数上来拓展类,属性,方法,参数的功能
 * 
 * 常见的装饰器:类装饰器,属性装饰器,方法装饰器,参数装饰器
 * 
 * 装饰器的写法:普通装饰器(无法传参),装饰器工厂(可以传参)
 * 
 * 
 * 
 * 在ts中对单个声明评估多个装饰器的时候,将执行以下的步骤:每个装饰器的表达式都是从上到下计算的,
 * 然后将结果作为函数从上到下调用
 * 
 * 
 * 
 * 总结:装饰器的执行顺序,属性装饰器>>>方法装饰器>>>>方法执行器>>>>类执行器
 * 
 * 
 */
// @experimentalDecorators


//1.类装饰器:(不传参)
// function logClass(params:any){
//     //此时获取的params就是HttpS的构造函数
//     console.log("params",params);
//     params.prototype.httpss="哈哈"
// }
// @logClass
// class HttpS{
//     constructor(){}

// }
// const htp=new HttpS()
// console.log("htp",htp)

// 2.类装饰器(传参)

// function logClass(params:string){
//         return function(target:any){
//             console.log("获取的params",params);
//             console.log("获取的target",target);
//         }
// }
// @logClass("传入的参数")
// class HttpS{
//     constructor(){}

// }
// const htp=new HttpS()


//3.类装饰器对原有类的重构
/**
 * 类装饰器表达式会在运行时当做函数被调用,类的构造函数作为唯一的参数
 * 如果装饰器返回一个值,它会使用提供的构造函数来替换类的声明
 */
// function logClass(target:any){
//     console.log("获取的target",target);
//     //获取到收到的类,对于收到的类进行舒属性的修改,在返回的类中对于原类进行继承,基于继承记性属性的修改
//     return class anmous extends target{
//         apiUrl:string="我是修改后的值";
//         getDate(){
//             console.log("修改后的api值",this.apiUrl);
//         }
//     }
// }

// @logClass
// class Httpss{
//     public apiUrl:string|undefined
//     constructor(){
//         this.apiUrl="我是没有修改的值"
//     }
//     getData(){
//         console.log("this.api",this.apiUrl);
//     }

// }


//属性装饰器


//类专属器
// function logClass(params:string){
//     console.log("获取的params",params);
//     //获取到收到的类,对于收到的类进行舒属性的修改,在返回的类中对于原类进行继承,基于继承记性属性的修改
//     return function(target:any){
//         console.log("获取的target",target);
//     }
// }

// //属性装饰器:
// function logProps(params:string){
//     console.log("获取的params",params);
//     return function(target:any,attr:any){
//         console.log("获取的target",target);
//         console.log("获取的attr",attr);
//         target[attr]=params
//     }
// }



// @logClass("参数传递")
// class Httpss{
//     //属性装饰器,对应下方的装饰器
//     @logProps("属性的值1")
//     //如果有值,会走自己的默认值,如果没有值,则会走自己的在装饰器中赋予的值
//     apiUrl:string|undefined
 
//     constructor(){
      
//     }
//     getData(){
//         console.log("this.api",this.apiUrl);
//     }

// }
// const htps=new Httpss()
// console.log(htps);
// // console.log("htps.apiUrl",htps.apiUrl);
// htps.getData()

//test练习,
// 装饰器的使用
// function testDirector(params:any){
//     return function(target:any){
//         // target.prototype.httpUrl=params
//     }
// }
// function testProps(params){
//     return function(target:any,attr:any){
//         target[attr]=params
//     }
// }
// @testDirector("hahaha")
// class Mon {
//     @testProps("随意传入props")
//    httpUrl:string|undefined
//    getData(){
//        console.log("获取的props",this.httpUrl);
//    }
// }
// const mon=new Mon()
// mon.getData()
// console.log("mon",mon);
//权重:类私有属性>类装饰器>属性装饰器

//方法装饰器:
/**
 * 会被应用到方法的属性描述符上,可以用来监视,修改或者替换方法定义.
 * 方法装饰器会在运行时传入下列三个参数:
 * 1.对于静态成员来说时类的构造函数,对于实例成员来说是类的原型对象
 * 2.成员的名字
 * 3.成员的属性描述符
 * 
 * 
 * 
 */
// function logMethods(params){
//     return function( target:any,methodName:any,descriptor:any){
//         console.log("target",target);
//         console.log("methodName",methodName);
//         console.log("desc",descriptor);
//     }
// }


// class MethodProps{
//     @logMethods("大声道撒多撒所多")
//      getData(){}
// }
// const p=new MethodProps


//方法参数装饰器
/** 
 * 参数装饰器表达式会在运行时当做函数被调用,可以使用参数装饰器为类的圆形增加一些元素数据,传入下列的三个参数:
 * 1.对于静态成员来说是类的构造函数,对于实力成员来说是类的原型对象
 * 2.参数的名字
 * 3.参数在函数参数列表中的索引
 * 
 */
// function Props(params:string) {
//     console.log("params",params);
//         return function(target:any,propsname:any,index:number){
//             console.log("target",target);
//             console.log("propsname",propsname);
//             console.log("index",index);
//         }
// }
// class MethodProps{

//      getData(@Props("uuid")uuid:any){}
// }
// const mo=new MethodProps()
// mo.getData(1111)

//test总结
function classDre(params:any){
    return function(target:any){
        console.log("类装饰器",target);
    }
}
function propClass(params:any) {
    return  function (target:any,attr:any) {
        console.log("属性装饰器");
        target[attr]=params
    }
}
function methodLog(params:any){
    return function(target:any,attr:any,desc:any){
        console.log("方法装饰器");
    }
}
function methodPropLog(params:any){
    return function(target:any,propsName:any,desc:any){
        console.log("方法属性装饰器");
    }
}

@classDre("")
class  AllPro {
    @propClass("test-props")
    testProps:string|undefined
    constructor(parameters) {
    
    }
    @methodLog("test-method")
    getData(@methodPropLog("test-method-props") uid:any){

    }
    
}

const A=new AllPro("")
A.getData("")