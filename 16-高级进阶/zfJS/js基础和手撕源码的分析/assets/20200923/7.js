/* {
    function foo() {}
    foo = 1;
}
console.log(foo); */

/* {
    let foo = 1;
    function foo() {}; //Uncaught SyntaxError: Identifier 'foo' has already been declared
} */

/* debugger;
{
    function foo() {}
    foo = 1;
    function foo() {}
}
console.log(foo); */

/* {
    function foo() {}
    foo = 1;
    function foo() {}
    foo = 2;
    console.log(foo); //私有2
}
console.log(foo); //全局1 */