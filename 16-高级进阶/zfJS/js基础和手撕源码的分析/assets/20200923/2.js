/*
 * EC(G) 
 *   变量提升:
 *     var i;
 *     A = 0x000; [[scope]]:EC(G)
 *     var y;
 *     B = 0x001; [[scope]]:EC(G)
 */
var i = 0;

function A() {
    /*
     * EC(A1) 「闭包」
     *   作用域链:<EC(A1),EC(G)>
     *   形参赋值:--
     *   变量提升:
     *     var i; 
     *     x = 0x100; [[scope]]:EC(A1)
     */
    var i = 10;

    function x() {
        /*
         * EC(X1) 
         *   作用域链:<EC(X1),EC(A1)>
         *   形参赋值:--
         *   变量提升:--
         */
        /*
         * EC(X2) 
         *   作用域链:<EC(X2),EC(A1)>
         *   形参赋值:--
         *   变量提升:--
         */
        console.log(i); //10 10
    }
    return x; //return 0x100;
}
var y = A(); //y=0x100;
y();

function B() {
    /* 
     * EC(B)
     *   作用域链:<EC(B),EC(G)>
     *   形参赋值:--
     *   变量提升:
     *     var i;
     */
    var i = 20;
    y();
}
B();
// 函数执行，它的上级作用域(上下文)是谁，和函数在哪执行是没有关系的，“只和在哪创建有关系”：在哪创建的，它的[[scope]]就是谁，也就是它的上级上下文就是谁！！