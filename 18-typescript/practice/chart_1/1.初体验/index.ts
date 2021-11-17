
let num: number = 10
let str: string = "string"
//联合类型
let nul: null | undefined = null

//any类型 
let anys: any = ''
console.log(num, str)
anys = 1
anys = undefined
console.log(nul)
nul = undefined
console.log(nul, anys)

//unknow类型,标识未知类型,不能将unknow类型的值赋值给其他变量
let e: unknown;
let strs: string
// strs = e //此时会出现报错的处理 不能将unknown赋值给string类型
// 解决:
// 1.进行类型判断
// if (typeof e === 'string') {
//     strs = e
// }
//2.进行类型的断言
// str = e as string
// strs = <string>e



// void类型 表示没有返回值 
function fnk(): void {
    //return 1
}
//never  表示永远不会返回结果 (异常报错)
function fns(): never {
    throw new Error('报错了')
}

//js的复杂类型:
/**
 * 指定对象中属性的类型
 */
let obj: {
    name: string,
    age?: number, //可选参数
    //可以添加任意的属性类型  (不用声明可以直接进行赋值 操作)
    [propName: string]: any
}
obj = {
    name: 'ada',
    age: 22,
    state: false,
    isnull: null,
    isUndef: undefined
}


/**
 * 函数 设置函数结构的类型声明
 */
let func: (a: number, b: number) => number


/**
 * 数组 
 */
let straArr: string[]
let numArr: Array<number>




/**
 * 元祖:固定长度的数组   
 * 语法[类型]
 */
let h: [string, number] //设定固定长度的数组
h = ['sda', 22,]



/**
 * 枚举 :enum
 * 
 */
enum Gender {
    Male = 0,
    Female = 1
}
let i: {
    gener: Gender
}
i = {
    gener: Gender.Female
}
