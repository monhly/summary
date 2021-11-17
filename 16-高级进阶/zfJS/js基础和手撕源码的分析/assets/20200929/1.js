/*
 * 编程语言
 *   OOP面向对象
 *      + java
 *      + python
 *      + C++
 *      + php
 *      + C#(ASP.NET)
 *      + javascript -> Node.js
 *      + ...
 *   POP面向过程 
 *      + C
 * 
 * HTML和CSS是标记语言
 *   + less/sass/stylus：CSS预编译语言，让CSS具备面向对象编程的特点
 *   + 写完的代码无法被浏览器直接识别，需要编译后（编译成为正常的CSS）在浏览器中渲染
 * 
 * 什么是面向对象编程？
 *   + 对象：泛指，万物皆对象（JS中所有我们学习研究和开发的都是对象 「研究对象」）
 *   + 类：对“对象”的一个细分，按照对应的功能特点，分成我们的大类和小类「类别」
 *   + 实例：某个类别中具体的事物
 *   + 关于类的“封装、继承、多态”
 *     + 封装：把实现某个功能的代码封装到函数中，起到“低耦合高内聚”的作用
 *     + 继承：子类及子类的实例继承了父类中的属性和方法
 *     + 多态：函数的重载（方法名字相同，但是传递参数的个数或者类型不同，识别为两个不同的方法 -> 后台语言有这个特征，但是JS中不存在严格意义上的重载）和重写（子类重写父类的方法）
 * 
 * JS就是基于“面向对象”思想设计的编程语言
 *   + 本身存在很多“内置类”
 *      + 每一个数据类型都有一个自己所属的内置类
 *      + 获取的元素集合或者节点集合也是有自己的类 HTMLCollection / NodeList
 *      + 每一个元素标签都有自己所属的类
 *      + ......
 *   + 我们学习JS：拿出某个类的一个实例去研究和学习，当前实例研究明白后，那么当前实例所属类下的其他实例，也具备这些特点...
 */

// 后台语言中基于函数的重载可以减轻一个业务逻辑的复杂度和抗压能力
/* publick void sum(int n,int m,Boolean flag){

}
publick void sum(int n,int m){
    
}
publick void sum(String n,String m){
    
} */
/* function sum(x, y, flag) {}
function sum(x, y) {}  //只会保留最后一个函数:JS中的重载是，一个函数基于传递实参不同，实现不同的业务逻辑处理
sum(10, 20, true);
sum(10, 20);
sum('10', '20'); */