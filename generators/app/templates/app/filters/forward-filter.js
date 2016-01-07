var route = require('koa-route')
var httpProxy = require('http-proxy')
var proxy = httpProxy.createProxyServer({})
var errorLogger = require('../utils/log').errorLogger
var thunkify = require('thunkify')
var proxyWeb = thunkify(proxy.web).bind(proxy)
app.use(route.get(/^\/f\//, forward))
app.use(route.post(/^\/f\//, forward))
function*forward() {
    this.url = this.url.replace(/\/f/, '')
    yield proxyWeb(this.req, this.res, {target: 'http://10.218.138.6:22222/'})//'http://100.69.207.111:18081/amap-api-boss-srv'})
}