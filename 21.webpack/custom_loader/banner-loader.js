const { getOptions } = require('loader-utils')

module.exports = function (source) {
  getOptions(this)
}
