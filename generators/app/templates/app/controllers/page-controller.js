var route = require('koa-route')
var React = require('react')
require('node-jsx').install({
  extension: '.jsx'
})
app.use(route.get('/home', function*(next) {
  yield this.render('home', {
    title: '首页'
  })
}))
app.use(route.get('/generalize', function*(next) {
  yield this.render('generalize', {
    title: '推广'
  })
}))
app.use(route.get('/report', function*(next) {
  yield this.render('report', {
    title: 'report'
  })
}))
app.use(route.get('/money', function*(next) {
  yield this.render('money', {
    title: '财务'
  })
}))
app.use(route.get('/tools', function*(next) {
  yield this.render('tools', {
    title: '工具'
  })
}))
