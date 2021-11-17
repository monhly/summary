import QS from 'qs'
var class2type = {}
var toString = class2type.toString
var hasOwn = class2type.hasOwnProperty
var fnToString = hasOwn.toString
var ObjectFunctionString = fnToString.call(Object)
var getProto = Object.getPrototypeOf

var mapType = [
  'Boolean',
  'Number',
  'String',
  'Function',
  'Array',
  'Date',
  'RegExp',
  'Object',
  'Error',
  'Symbol',
  'BigInt',
]
mapType.forEach(function (name) {
  class2type['[object ' + name + ']'] = name.toLocaleLowerCase()
})

var toType = function toType(obj) {
    if (obj == null) {
      return obj + ''
    }
    return typeof obj === 'object' || typeof obj === 'function'
      ? class2type[toString.call(obj)] || 'object'
      : typeof obj
  },
  headers = {
    'Content-Type': 'application/json',
  },
  methodsGET = ['GET', 'DELETE', 'HEAD', 'OPTIONS'],
  methodsPOST = ['POST', 'PUT', 'PATCH'],
  methods = methodsGET.concat(methodsPOST)
//设置参数配置项的校验
let configRule = {
  //type 类型 default 默认值 required 是否为必传项;
  baseURL: {
    type: 'string',
    default: '',
  },
  url: {
    type: 'string',
    required: true,
  },
  method: {
    type: 'string',
    default: 'GET',
  },
  transformRequest: {
    type: 'function',
    default: function (data) {
      try {
        if (toType(data) === 'object') {
          return JSON.stringify(data)
        }
      } catch (error) {}
      return data
    },
  },
  headers: {
    type: 'object',
    default: headers,
  },
  params: {
    type: ['string', 'object'],
    default: {},
  },
  data: {
    type: ['string', 'object'],
    default: {},
  },
  cache: {
    type: 'boolean',
    default: false,
  },
  timeout: {
    type: 'number',
    default: 0,
  },
  withCredentials: {
    type: 'boolean',
    default: false,
  },
  responseType: {
    type: 'string',
    default: 'json',
  },
  validateStatus: {
    type: 'function',
    default(status) {
      return status >= 200 && status < 300
    },
  },
}

//创建执行的类
class Ajax {
  constructor(config) {
    this.config = config
    //执行请求拦截器
    this.config = ajax.interceptors.request.pond[0]
      ? ajax.interceptors.request.pond[0](config)
      : config
    return this.request()
  }
  request() {
    let promise,
      xhr,
      onfilled,
      onrejected,
      self = this
    console.log('this', this)
    let { method, timeout, responseType, validateStatus } = self.config
    //每次请求返回一个promise的实例
    promise = new Promise((resolve, reject) => {
      // 创建xhr请求
      xhr = new XMLHttpRequest()
      xhr.open(method.toUpperCase(), self.handelURL)
      //设置凭证和headers信息
      xhr.timeout = timeout ? timeout : null
      //设置自定义的请求头信息
      self.hadelHead(xhr)
      xhr.onreadystatechange = () => {
        if (!validateStatus(xhr.status)) {
          //报错的状态码
          reject(self.handerResult(xhr, false, 'state'))
          return
        }
        //此时是成功的状态码    head请求是获取响应头信息的,当状态码为2的时候此时就已经获取的响应头的信息
        if (
          xhr.readyState === 4 ||
          (method === 'HEAD' && xhr.readyState === 2)
        ) {
          resolve(self.handerResult(xhr, true, 'timeout'))
          //处理结果
        }
      }
      //设置超时时间
      xhr.ontimeout = function () {
        //请求超时,失败处理
        reject(self.handerResult(xhr, false, 'timeout'))
      }
      //请求中断
      xhr.onabort = function () {
        reject(self.handerResult(xhr, false, 'onabord'))
      }
      xhr.send()
    })
    ;[
      //设置响应拦截器
      onfilled,
      onrejected,
    ] = ajax.interceptors.response.pond
    return promise.then(onfilled, onrejected)
  }
  //处理传入的参数
  handelURL() {
    //    对于传入的参数进行数据的更改
    let self = this,
      { url, baseURL, cache, params, method } = self.config
    //判断传入的url
    if (!/^http(s?):\/\//i.test(url)) url = url + baseURL
    if (params) {
      if (JSON.stringify(params) !== '{}') params = QS.stringify(params)
      url = url + '?' + params
    }
    return url
  }
  //处理body
  handelBody() {
    let self = this,
      { method, data, headers, transformRequest } = self.config
    if (!methodsPOST.includes(method.toUpperCase())) return null
    return transformRequest(data, headers)
  }
  //处理请求头
  hadelHead(xhr) {
    let self = this,
      { method, headers } = self.config
    let methodHEAD = headers[method.toLowerCase()]
    for (const key in headers) {
      if (method.includes(key.toUpperCase())) {
        delete headers[key]
      }
    }
    headers = Object.assign({}, headers, methodHEAD)
    //设置自定义的请求头
    for (const key in headers) {
      xhr.setRequestHeader(key, headers[key])
    }
  }
  // flag 是否成功或者是失败 code:失败成功的类型,status状态码 timeout超时 onabord中断
  handerResult(xhr, flag, code) {
    let self = this,
      response,
      headers = {},
      result = '',
      reason = {},
      { responseType } = self.config
    //   请求超时是没有状态的
    //    如果请求是超时或者是网络终端,此时的response返回的只有reason和code
    if (flag === false && (code === 'timeout' || code === 'onabord')) {
      reason.code = 'net error'
      return reason
    }
    //构建response
    response = {
      status: xhr.status,
      statusText: xhr.statusText,
      xhr,
      config: self.config,
      headers: {},

      body: {},
    }
    //此时获取的都是字符串,有空格和换行,所以需要替换,在使用qs中的parse进行转换
    headers = xhr
      .getAllResponseHeaders()
      .replace(/: /g, '=')
      .replace(/\n\s*/g, '&')

    response.headers = QS.parse(headers)
    //判断是否是错误码的失败
    if (!flag) {
      ;(reason.code = code), (reason.response = response)
      return reason
    }
    //获取主题的信息
    result = xhr.response
    switch (responseType) {
      case 'text':
        result = xhr.responseText
        break
      case 'json':
        result = JSON.parse(xhr.responseText)
        break
      case 'xml':
        result = xhr.responseXML
        break
      default:
        break
    }
    response.data = result
    return response
  }
  //处理传入的url是否进行拼接
  handelParams(params) {
    let str = ''
    for (let key in params) {
      str += `&${key}=${params[key]}`
    }
    return str
  }
}
//基于promise实现axios的封装
const ajax = function ajax(config) {
  // 判断传入的option是否是对象形式
  toType(config) !== 'object' ? (config = {}) : null
  // 把传入的config和设置的默认defaulr进行合并
  config = Object.assign({}, ajax.defaults, config)
  for (const key in configRule) {
    let value = configRule[key],
      { type, required, default: defaultValue } = value
    //判断传入的type类型是否是数组
    // !Array.isArray(type) ? type = [type] : null;
    let configValue = config[key],
      configType = toType(configValue)
    /*
            判断传入的值和默认的值进行比较,
            */
    if (configType === 'undefined') {
      if (required) throw new TypeError(`${key} nust be required!`)
      config[key] = defaultValue
    } else {
      //判断传入值的类型是否正确
      console.log(configType, type)
      if (!type.includes(configType))
        throw new Error(`${key} must be an ${type}`)
      config[key] = configValue
    }
  }
  //执行函数进行调用CLG
  return new Ajax(config)
  // console.log('获取的config', config)
}
//基于循环实现快捷使用
methodsGET.forEach((item) => {
  ajax[item.toLowerCase()] = function (url, config) {
    if (toType(config) !== 'object') config = {}
    config.url = url
    config.method = item
    return ajax(config)
  }
})
methodsPOST.forEach((item) => {
  ajax[item.toLowerCase()] = function (url, data, config) {
    if (toType(config) !== 'object') config = {}
    config.url = url
    config.method = item
    config.data = data
    return ajax(config)
  }
})
//ajax.all基于promise.all实现
ajax.all = function (list) {
  if (!Array.isArray(list)) throw new TypeError(`${list} must be an array!`)
  return Promise.all(list)
}
//全局的公共配置

ajax.default = {
  headers: Object.assign({}, headers),
}
class Interceptors {
  constructor() {
    this.pond = []
  }
  use(onfilled, onrejected) {
    if (typeof onfilled === 'undefined') {
      onfilled = function (result) {
        return result
      }
    }
    if (typeof onrejected === 'undefined') {
      onrejected = function (reason) {
        return new Promise.reject(reason)
      }
    }
    this.pond.push(onfilled)
    this.pond.push(onrejected)
  }
}
ajax.interceptors = {
  request: new Interceptors(),
  response: new Interceptors(),
}
if (typeof window !== 'undefined') window.ajax = ajax
if (typeof module === 'object' && typeof module.exports === 'object')
  module.exports = ajax
