/*
 * EC(G)
 *   变量提升:
 *     var foo; 
 */
var foo = 'hello';
(function (foo) {
    /*
     * EC(ANY)
     *   作用域链:<EC(ANY),EC(G)>
     *   形参赋值:foo='hello'
     *   变量提升:
     *     var foo; 「无需重复声明」
     */
    console.log(foo); //=>'hello'
    // A||B：A为真返回A的值，A为假返回B的值
    // A&&B：A为真返回B的值，A为假返回A的值
    // ||和&&同时出现的时候，&&的优先级是高于||
    var foo = foo || 'world'; //foo='hello'
    console.log(foo); //=>'hello'
})(foo); //自执行函数(立即执行函数)执行：传递实参 'hello'
console.log(foo); //=>'hello'