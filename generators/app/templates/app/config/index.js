var _ = require('underscore')
var commonConfig = {
  viewsDir: path.join(__dirname, '../views/dist')
}
var config = _.extend(commonConfig, require('./config'))
module.exports = config
