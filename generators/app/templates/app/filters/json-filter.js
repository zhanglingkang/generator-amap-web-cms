var bodyParser = require('koa-bodyparser')
var _ = require('underscore')
app.use(bodyParser())
app.use(function*(next) {
    yield next
    if (_.isObject(this.body) && typeof this.body.pipe !== 'function') {
        this.body = JSON.stringify(this.body)
    }
})