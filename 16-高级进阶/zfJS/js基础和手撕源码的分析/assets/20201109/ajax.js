var _ = (function () {
    var getProto = Object.getPrototypeOf;
    var class2type = {};
    var toString = class2type.toString;
    var hasOwn = class2type.hasOwnProperty;
    var fnToString = hasOwn.toString;
    var ObjectFunctionString = fnToString.call(Object);

    [
        "Boolean",
        "Number",
        "String",
        "Symbol",
        "Function",
        "Array",
        "Date",
        "RegExp",
        "Object",
        "Error"
    ].forEach(function (name) {
        class2type["[object " + name + "]"] = name.toLowerCase();
    });

    function toType(obj) {
        if (obj == null) {
            return obj + "";
        }
        return typeof obj === "object" || typeof obj === "function" ?
            class2type[toString.call(obj)] || "object" :
            typeof obj;
    }

    function isPlainObject(obj) {
        var proto,
            Ctor,
            type = toType(obj);
        if (!obj || type !== "object") {
            return false;
        }
        proto = getProto(obj);
        if (!proto) {
            return true;
        }
        Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
        return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
    }

    function isEmptyObject(obj) {
        var keys = [
            ...Object.keys(obj),
            ...Object.getOwnPropertySymbols(obj)
        ];
        return keys.length === 0 ? true : false;
    }

    function isFunction(obj) {
        return typeof obj === "function" && typeof obj.nodeType !== "number";
    };

    function isWindow(obj) {
        return obj != null && obj === obj.window;
    };

    function isArrayLike(obj) {
        var length = !!obj && "length" in obj && obj.length,
            type = toType(obj);
        if (isFunction(obj) || isWindow(obj)) {
            return false;
        }
        return type === "array" || length === 0 ||
            typeof length === "number" && length > 0 && (length - 1) in obj;
    }

    function shallowClone(obj) {
        let type = toType(obj),
            Ctor = obj.constructor;
        if (/^(symbol|bigint)$/i.test(type)) return Object(obj);
        if (/^(regexp|date)$/i.test(type)) return new Ctor(obj);
        if (/^error$/i.test(type)) return new Ctor(obj.message);
        /* if (/^function$/i.test(type)) {
            return function () {
                return obj.call(this, ...arguments);
            };
        } */
        if (/^(object|array)$/i.test(type)) {
            let keys = [...Object.keys(obj), ...Object.getOwnPropertySymbols(obj)],
                result = new Ctor();
            each(keys, (index, key) => {
                result[key] = obj[key];
            });
            return result;
        }
        return obj;
    }

    function deepClone(obj, cache = new Set()) {
        let type = toType(obj),
            Ctor = obj.constructor;
        if (!/^(object|array)$/i.test(type)) return shallowClone(obj);
        if (cache.has(obj)) return obj;
        cache.add(obj);
        let keys = [
                ...Object.keys(obj),
                ...Object.getOwnPropertySymbols(obj)
            ],
            result = new Ctor();
        each(keys, (index, key) => {
            result[key] = deepClone(obj[key], cache);
        });
        return result;
    }

    function merge(obj1, obj2) {
        obj1 != null ? obj1 = deepClone(obj1) : null;
        obj2 != null ? obj2 = deepClone(obj2) : null;
        let isPlain1 = isPlainObject(obj1),
            isPlain2 = isPlainObject(obj2);
        if (!isPlain1) return obj2;
        if (!isPlain2) return obj1;
        [
            ...Object.getOwnPropertyNames(obj2),
            ...Object.getOwnPropertySymbols(obj2)
        ].forEach(key => {
            obj1[key] = merge(obj1[key], obj2[key]);
        });
        return obj1;
    }

    function each(obj, callback) {
        var length, i = 0;
        if (isArrayLike(obj)) {
            length = obj.length;
            for (; i < length; i++) {
                if (callback.call(obj[i], i, obj[i]) === false) {
                    break;
                }
            }
        } else {
            var keys = [
                ...Object.getOwnPropertyNames(obj),
                ...Object.getOwnPropertySymbols(obj)
            ];
            for (; i < keys.length; i++) {
                var key = keys[i],
                    value = obj[key];
                if (callback.call(value, key, value) === false) {
                    break;
                }
            }
        }
        return obj;
    }

    return {
        toType,
        isPlainObject,
        isEmptyObject,
        isFunction,
        isWindow,
        isArrayLike,
        merge,
        each
    };
})();

/*
 * ??????Promise????????????ajax???
 *   + ??????axios?????????????????????
 *   + XMLHttpRequest
 * 
 * ???????????????
 *   ajax([config])
 *   ajax(url,[config])
 *   ajax.get/head/options/delete([url],[config])
 *   ajax.post/put([url],[data],[config])
 *   ajax.all([promise array])
 * 
 * ???????????????
 *   + ???????????????
 *   + ajax.defaults.xxx ?????????????????????
 *   + ajax([config]) ????????????????????????
 *   + ajax.create([config]) ??????????????????
 * {
 *    baseURL:'',
 *    url:'',
 *    method:'get',
 *    transformRequest:function(data){return data;}, ????????????????????????????????????
 *    headers:{
 *       common:{},
 *       get:{},
 *       ...
 *       'Content-Type':'application/json'
 *    },
 *    params:{},  URL???????????????????????????URL????????????
 *    cache:true, GET?????????????????????????????????????_=????????????
 *    data:{}, ????????????????????????
 *    timeout:0, ????????????????????????
 *    withCredentials:false, ???????????????????????????????????????
 *    responseType:'json',  ?????????????????????????????????????????? 'stream', 'document', 'json', 'text'
 *    validateStatus: function (status) {
 *       return status >= 200 && status < 300; // default
 *    }
 * }
 * 
 * ????????????
 *   InterceptorManager
 *   + ???????????????  ajax.interceptors.request.use(function(config){})
 *   + ???????????????  ajax.interceptors.response.use(function(response){},function(reason){})
 * 
 * ??????ajax???????????????????????????promise??????
 *   + response
 *     + data ????????????????????
 *     + status ?????????
 *     + statusText ??????????????????
 *     + headers ???????????????
 *     + request XHR????????????
 *   + reason
 *     + response
 *     + message
 *     + ...
 */
(function () {
    /* ???????????????????????? */
    function Ajax(config) {
        this.config = config;
        this.GETREG = /^(GET|HEAD|OPTIONS|DELETE)$/i;
        return this.send();
    }
    Ajax.prototype = {
        version: '1.0.0',
        constructor: Ajax,
        send() {
            let {
                method,
                validateStatus,
                timeout,
                withCredentials
            } = this.config;
            return new Promise((resolve, reject) => {
                let xhr = new XMLHttpRequest;
                xhr.open(method, this.initURL());
                // ????????????
                xhr.timeout = timeout;
                xhr.withCredentials = withCredentials;
                this.initHeaders(xhr);
                xhr.onreadystatechange = () => {
                    // ???????????????
                    let {
                        readyState,
                        status
                    } = xhr;
                    if (!validateStatus(status)) {
                        // ?????????????????????????????????
                        reject(this.initResult(false, xhr));
                        return;
                    }
                    if (readyState === 4) {
                        // ??????
                        resolve(this.initResult(true, xhr));
                    }
                };
                xhr.onerror = error => {
                    // ?????????????????????????????????????????????????????????response?????????
                    reject({
                        message: error.message
                    });
                };
                xhr.send(this.initData());
            });
        },
        // ???????????????
        initHeaders(xhr) {
            let {
                headers,
                method
            } = this.config;
            let alone = headers[method] || {},
                common = headers['common'] || {};
            delete headers['common'];
            _.each(['get', 'head', 'delete', 'options', 'post', 'put'], (index, item) => {
                delete headers[item];
            });
            common = _.merge(common, alone);
            headers = _.merge(headers, common);
            _.each(headers, (key, value) => {
                xhr.setRequestHeader(key, value);
            });
        },
        // ??????URL
        stringify(params) {
            let str = ``;
            _.each(params, (key, value) => {
                str += `&${key}=${value}`;
            });
            return str.substring(1);
        },
        initURL() {
            let {
                baseURL,
                url,
                method,
                params,
                cache
            } = this.config;
            url = baseURL + url;
            // GET?????????????????????????????? && ??????
            if (this.GETREG.test(method)) {
                params = this.stringify(params);
                if (params) {
                    url += `${url.includes('?')?'&':'?'}${params}`;
                }
                if (!cache) {
                    url += `${url.includes('?')?'&':'?'}_=${Math.random()}`;
                }
            }
            return url;
        },
        // ??????DATA
        initData() {
            let {
                method,
                data,
                transformRequest
            } = this.config;
            if (this.GETREG.test(method)) return null;
            return transformRequest(data);
        },
        // ??????????????????
        getHeaders(xhr) {
            let headersText = xhr.getAllResponseHeaders(),
                headers = {};
            headersText = headersText.split(/(?:\n)/g);
            _.each(headersText, (index, item) => {
                let [key, value] = item.split(': ');
                if (!key) return;
                headers[key] = value;
            });
            return headers;
        },
        initResult(flag, xhr) {
            let response = {
                data: {},
                request: xhr,
                status: xhr.status,
                statusText: xhr.statusText,
                headers: this.getHeaders(xhr),
                config: this.config
            };
            if (flag) {
                let text = xhr.responseText;
                switch (this.config.responseType.toLowerCase()) {
                    case 'json':
                        text = JSON.parse(text);
                        break;
                    case 'stream':
                        text = xhr.response;
                        break;
                    case 'document':
                        text = xhr.responseXML;
                        break;
                }
                response.data = text;
                return response;
            }
            return {
                response,
                message: xhr.statusText
            };
        }
    };

    /* ???????????? */
    // ??????HEADERS?????????
    let headers = {
        common: {
            'Content-Type': 'application/json'
        }
    };
    _.each(['get', 'head', 'delete', 'options', 'post', 'put'], (index, item) => {
        headers[item] = {};
    });

    // ?????????????????????????????????
    let configDefault = {
        baseURL: {
            type: 'string',
            default: ''
        },
        url: {
            type: 'string',
            required: true
        },
        method: {
            type: 'string',
            default: 'get'
        },
        headers: {
            type: 'object',
            default: headers
        },
        params: {
            type: 'object',
            default: {}
        },
        cache: {
            type: 'boolean',
            default: true
        },
        data: {
            type: 'object',
            default: {}
        },
        timeout: {
            type: 'number',
            default: 0
        },
        withCredentials: {
            type: 'boolean',
            default: false
        },
        responseType: {
            type: 'string',
            default: 'json'
        },
        transformRequest: {
            type: 'function',
            default: function (data) {
                if (_.isEmptyObject(data)) return null;
                // ?????????????????????????????????DATA???????????????JSON???????????????????????????
                return JSON.stringify(data);
            }
        },
        validateStatus: {
            type: 'function',
            default: function (status) {
                return status >= 200 && status < 300;
            }
        }
    };

    // ??????????????????
    function initParams(config) {
        // ????????????????????????config???ajax.defaults???????????????????????????
        config = _.merge(ajax.defaults, config);
        // ???????????????????????????????????????????????????????????????????????????????????????
        let params = {};
        _.each(configDefault, (key, rule) => {
            let {
                type,
                required,
                default: defaultValue
            } = rule;
            // ?????????????????????????????????????????????????????? && ????????????
            if (!config.hasOwnProperty(key)) {
                if (required) throw new ReferenceError(`${key} is muse be required!`);
                params[key] = defaultValue;
                return;
            }
            // ????????????????????????????????????????????????????????? && ??????
            if (_.toType(config[key]) !== type) throw new TypeError(`${key} is must be an ${type}!`);
            params[key] = _.merge(defaultValue, config[key]);
        });
        return params;
    }

    /* ????????????????????????API */
    function ajax(url, config) {
        if (_.isPlainObject(url)) config = url;
        if (_.toType(url) === "string") {
            if (!_.isPlainObject(config)) config = {};
            config.url = url;
        }
        config = initParams(config);
        return new Ajax(config);
    }
    // ????????????
    _.each(['get', 'head', 'delete', 'options'], (index, item) => {
        ajax[item] = function (url, config) {
            if (!_.isPlainObject(config)) config = {};
            config.url = url;
            config.method = item;
            return ajax(config);
        };
    });
    _.each(['post', 'put'], (index, item) => {
        ajax[item] = function (url, data, config) {
            if (!_.isPlainObject(config)) config = {};
            config.url = url;
            config.method = item;
            config.data = data;
            return ajax(config);
        };
    });
    ajax['all'] = function all(promiseList) {
        if (!_.isArrayLike(promiseList)) throw new TypeError('promiseList must be an array or likeArray!');
        return Promise.all(promiseList);
    };
    ajax.stringify = Ajax.prototype.stringify;
    // ????????????????????????
    ajax.defaults = {
        headers: headers
    };

    if (typeof window !== "undefined") {
        window.ajax = ajax;
    }
    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = ajax;
    }
})();



// ????????????
ajax.defaults.baseURL = 'http://127.0.0.1:8888';
ajax.defaults.withCredentials = true;
ajax.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
ajax.defaults.transformRequest = data => {
    return ajax.stringify(data);
};

// GET
ajax({
    url: '/user/list',
    params: {
        departmentId: 0,
        search: ''
    },
    cache: false
}).then(response => {
    console.log('OK-->', response);
}).catch(reason => {
    console.log('NO-->', reason);
});

// POST
ajax.post('/user/login', {
    account: 'xxx',
    password: 'xxx'
}).then(response => {
    console.log('OK-->', response);
}).catch(reason => {
    console.log('NO-->', reason);
});