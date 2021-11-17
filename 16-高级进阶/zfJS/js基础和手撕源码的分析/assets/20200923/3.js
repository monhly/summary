/*
 * EC(G)
 *   变量提升
 *     var a;
 *     var obj;
 *     fn = 0x000; [[scope]]:EC(G) 
 */
var a = 1;
var obj = { //obj = 0x001;
    name: "tom"
};

function fn() {
    /* 
     * EC(FN)
     *   作用域链:<EC(FN),EC(G)>
     *   形参赋值:--
     *   变量提升:
     *     var a2;
     */
    var a2 = a; //私有a2=1
    obj2 = obj; //window.obj2=0x001;
    a2 = a; //私有a2=1
    obj2.name = "jack"; //把全局0x001堆内存中的name修改为'jack'
}
fn();
console.log(a); //=>1
console.log(obj); //=>{name:'jack'}