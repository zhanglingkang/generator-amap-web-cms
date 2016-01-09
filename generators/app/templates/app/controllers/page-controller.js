var route = require('koa-route')
app.use(function*(next) {
    console.log(this.path.substring(1))
    if (/^\//.test(this.path)) {
        yield this.render(this.path.substring(1))
    }
})


