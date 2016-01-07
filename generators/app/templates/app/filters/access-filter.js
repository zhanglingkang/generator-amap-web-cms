var logger = require('../utils/log').accessLogger
app.use(function*(next) {
    var userName = 'guest'
    var session = this.session || {}
    var user = session.user
    if (user && user.lastName) {
        userName = user.lastName
    }
    logger.info(userName + '-' + this.originalUrl)
    yield next
})