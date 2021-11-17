/*
/!*
 * EC(G)
 *   变量提升
 *     var test; 
 *!/
var test = (function (i) {
    /!*
     * 自执行函数执行 EC(ANY) 「闭包」
     *    作用域链:<EC(ANY),EC(G)>
     *    形参赋值:i=2
     *    变量提升:--
     *!/
    return function () {
        /!*
         * EC(TEST)
         *    作用域链:<EC(TEST),EC(ANY)>
         *    初始arguments: {0:5,length:1...}
         *    形参赋值:--
         *    变量提升:--   
         *!/
        alert(i *= 2); //-> i = i*2  i是EC(ANY)闭包中的
    } //-> return 0x001; [[scope]]:EC(ANY)
})(2);
// test = 0x001;
test(5);
*/


var x = 5,
    y = 6;

function func() {
    x += y;
    func = function (y) {
        console.log(y + (--x));
    };
    console.log(x, y);
}
func(4);
func(3);
console.log(x, y);