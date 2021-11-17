/*
 * EC(G)
 *   变量提升:
 *     var a;
 *     fn = 0x000; [[scope]]:EC(G) 
 */
var a = 1;

function fn(a) {
    /*
     * EC(FN)
     *   作用域链:<EC(FN),EC(G)> 
     *   形参赋值:a=1
     *   变量提升:
     *      var a; 「这一步浏览器会忽略，因为a私有变量已经存在于AO(FN)中了」
     *      a = 0x001; [[scope]]:EC(FN)  「不会重复声明，但是需要重新赋值」
     */
    console.log(a); //=>函数0x001
    var a = 2;
    console.log(a); //=>2
    function a() {
        /* 直接跳过，变量提升已经搞过了 */
    }
    console.log(a); //=>2
}
fn(a); //fn(1)
console.log(a); //=>1