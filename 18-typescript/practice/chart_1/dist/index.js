let num = 10;
let str = "string";
let nul = null;
let anys = '';
console.log(num, str);
anys = 1;
anys = undefined;
console.log(nul);
nul = undefined;
console.log(nul, anys);
let e;
let strs;
function fn() {
}
function fns() {
    throw new Error('报错了');
}
let obj;
obj = {
    name: 'ada',
    age: 22,
    state: false,
    isnull: null,
    isUndef: undefined
};
let func;
let straArr;
let numArr;
let h;
h = ['sda', 22,];
var Gender;
(function (Gender) {
    Gender[Gender["Male"] = 0] = "Male";
    Gender[Gender["Female"] = 1] = "Female";
})(Gender || (Gender = {}));
let i;
i = {
    gener: Gender.Female
};
