/* let str = "zhufengpeixunzhoulaoshi";
let obj = {};
[].forEach.call(str, char => {
	if (typeof obj[char] !== "undefined") {
		obj[char]++;
		return;
	}
	obj[char] = 1;
});
let max = 1,
	res = [];
for (let key in obj) {
	let item = obj[key];
	item > max ? max = item : null;
}
for (let key in obj) {
	let item = obj[key];
	if (item === max) {
		res.push(key);
	}
}
console.log(`出现次数最多的字符是：${res}，出现了${max}次`); */

/* let str = "zhufengpeixunzhoulaoshi";
str = str.split('').sort((a, b) => a.localeCompare(b)).join('');
// console.log(str);//=>"aeefghhhiilnnoopsuuuxzz"
let reg = /([a-zA-Z])\1+/g;
let ary = str.match(reg);
// console.log(ary); //=>["ee", "hhh", "ii", "nn", "oo", "uuu", "zz"]
ary.sort((a, b) => b.length - a.length);
// console.log(ary); //=>["hhh", "uuu", "ee", "ii", "nn", "oo", "zz"]
let max = ary[0].length,
	res = [ary[0].substr(0, 1)];
for (let i = 1; i < ary.length; i++) {
	let item = ary[i];
	if (item.length < max) {
		break;
	}
	res.push(item.substr(0, 1));
}
console.log(`出现次数最多的字符是：${res}，出现了${max}次`); */

/* let str = "zhufengpeixunzhoulaoshi",
	max = 0,
	res = [],
	flag = false;
str = str.split('').sort((a, b) => a.localeCompare(b)).join('');
for (let i = str.length; i > 0; i--) {
	let reg = new RegExp("([a-zA-Z])\\1{" + (i - 1) + "}", "g");
	str.replace(reg, (content, $1) => {
		res.push($1);
		max = i;
		flag = true;
	});
	if (flag) break;
}
console.log(`出现次数最多的字符：${res}，出现了${max}次`);
 */