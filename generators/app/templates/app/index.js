var koa = require('koa')
var app = global.app = koa()
var xtplApp = require('xtpl/lib/koa')
var loggerMap = require('./utils/log')
var config = require('./config')
var errorLogger = loggerMap.errorLogger
require('./filters')
require('./controllers')
xtplApp(app, {
    views: config.viewsDir
})
app.on('error', function (err) {
    errorLogger.error(err)
})
process.on('uncaughtException', function (err) {
    errorLogger.error('uncaught-', err)
})

var port = 6001
app.listen(port)
console.log(`server started at ${port}`)
