function dataFormate(time) {
  // 获取time
  const dt = new Date(time)
  const y = dt.getFullYear()
  const m = dt.getMonth() + 1
  const d = dt.getDate()
  // 获取时分秒
  const hh = perZero(dt.getHours())
  const mm = perZero(dt.getMinutes())
  const ss = perZero(dt.getSeconds())
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
}
function perZero(num) {
  if (num < 10) {
    return '0' + num
  }
  return num
}
// 使用正则进行转义
function replce_str(status) {
  let str = /<|>|"|&/g
  return status.replace(str, function (val) {
    switch (val) {
      case '<':
        return '&lt'
    }
  })
}
module.exports = {
  dataFormate,
  replce_str,
}
