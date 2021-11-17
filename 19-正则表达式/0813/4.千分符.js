~ function () {
	/*
	 * formatTime：时间字符串的格式化处理
	 *   @params
	 *     templete:[string] 我们最后期望获取日期格式的模板
	 *     模板规则:{0}->年  {1~5}->月日时分秒
	 *   @return
	 *     [string]格式化后的时间字符串
	 *  by zhufengpeixun on 2019/08/13
	 */
	function formatTime(templete = "{0}年{1}月{2}日 {3}时{4}分{5}秒") {
		let timeAry = this.match(/\d+/g);
		return templete.replace(/\{(\d+)\}/g, (...[, $1]) => {
			let time = timeAry[$1] || "00";
			return time.length < 2 ? "0" + time : time;
		});
	}

	/* 
	 * queryURLParams：获取URL地址问号和面的参数信息（可能也包含HASH值）
	 *   @params
	 *   @return
	 *     [object]把所有问号参数信息以键值对的方式存储起来并且返回
	 * by zhufengpeixun on 2019/08/13
	 */
	function queryURLParams() {
		let obj = {};
		this.replace(/([^?=&#]+)=([^?=&#]+)/g, (...[, $1, $2]) => obj[$1] = $2);
		this.replace(/#([^?=&#]+)/g, (...[, $1]) => obj['HASH'] = $1);
		return obj;
	}

	/* 
	 * millimeter：实现大数字的千分符处理
	 *   @params
	 *   @return
	 *     [string]千分符后的字符串
	 * by zhufengpeixun on 2019/08/13
	 */
	function millimeter() {
		return this.replace(/\d{1,3}(?=(\d{3})+$)/g, content => content + ',');
	}
	
	/* 扩展到内置类String.prototype上 */
	["formatTime", "queryURLParams", "millimeter"].forEach(item => {
		String.prototype[item] = eval(item);
	});
}();

let num = "15628954"; //=>"15,628,954" 千分符
console.log(num.millimeter());
num = "112345678256874"; //=>"12,345,678,256,874"
console.log(num.millimeter());

// 把字符串倒过来加
/* num = num.split('').reverse().join('');
for (let i = 2; i < num.length - 1; i += 4) {
	let prev = num.substring(0, i + 1),
		next = num.substring(i + 1);
	num = prev + "," + next;
}
num = num.split('').reverse().join('');
console.log(num); */