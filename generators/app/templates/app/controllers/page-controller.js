var route = require('koa-route')
app.use(function*(next) {
    if (/^\//.test(this.path)) {
        yield this.render(this.path.substring(1))
    }
})


