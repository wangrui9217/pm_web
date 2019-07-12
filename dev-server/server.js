var serverCreater = require('./serverCreater.js')
var config = require('./config.js')

serverCreater({baseURL: config.DEV_BASE_URL})
