var http = require('../utils/http')
var Reflux = require('reflux')
var HomeActions = Reflux.createActions([
    'getAll'
])
var HomeStore = Reflux.createStore({
    data: {},
    listenables: [HomeActions],
    onGetAll(condition){
        http.get('/f/media/finance', condition).then((data)=> {
            this.trigger(data)
        })
    }
})
module.exports = {
    HomeActions,
    HomeStore
}