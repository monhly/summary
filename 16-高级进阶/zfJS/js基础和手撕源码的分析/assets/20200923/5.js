/*
 * EC(G)
 *   变量提升:
 *     var a;
 *     fn = 0x000; [[scope]]:EC(G)
 */
console.log(a); //=>undefined
var a = 12;
function fn() {
    /* 
     * EC(FN)
     *   作用域链:<EC(FN),EC(G)>
     *   形参赋值:--
     *   变量提升:
     *     var a;
     */
    console.log(a); //=>undefined
    var a = 13;
}
fn();
console.log(a); //=>12


/*
 * EC(G)
 *   变量提升:
 *     var a;
 *     fn = 0x000; [[scope]]:EC(G)
 */
console.log(a); //=>undefined
var a = 12;
function fn() {
    /* 
     * EC(FN)
     *   作用域链:<EC(FN),EC(G)>
     *   形参赋值:--
     *   变量提升:--
     */
    console.log(a); //=>12
    a = 13; //全局a=13
}
fn();
console.log(a); //=>13

/*
 * EC(G)
 *   变量提升:
 *     fn = 0x000; [[scope]]:EC(G)
 */
console.log(a); //获取一个变量的值，首先看是否为自己私有变量，不是自己私有的，则按照作用域链查找，看是否为上级上下文的...一直到全局向下文为止！如果全局下也没有这个变量，则继续看window下是否有这个属性，如果也没有这个属性，则直接报错：a is not defined
a = 12;
function fn() {
    console.log(a);
    a = 13;
}
fn();
console.log(a);