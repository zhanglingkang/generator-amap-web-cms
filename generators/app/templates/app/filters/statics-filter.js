var staticServer = require('koa-static')
var path = require('path')
var route = require('koa-route')
//app.use(route.get('/app.html', function*(next) {
//    this.body = 'url不正确'
//}))
//app.use(function*(next) {
//    yield next
//    if (/\.(js|css|woff2)$/.test(this.url)) {
//        var nextMonth = new Date()
//        nextMonth.setMonth(nextMonth.getMonth() + 1)
//        this.response.set({
//            'Cache-Control': 'max-age=1209600',
//            'Expires': nextMonth
//        })
//    }
//})
//app.use(route.get(/^\/?$/, function*(next) {
//    if (this.session.user) {
//        this.url = '/app.html'
//    }
//    yield next
//}))
app.use(staticServer(path.join(path.dirname(require.main.filename), './public/dist')))
