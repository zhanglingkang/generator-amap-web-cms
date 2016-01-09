var Reflux = require('reflux')
var HomeActions = Reflux.createActions([
    'getAll'
])
var HomeStore = Reflux.createStore({
    data: {},
    listenables: [HomeActions],
    onGetAll(condition){
        setTimeout(()=> {
            this.trigger([
                {
                    name: 'a',
                    text: 'a'
                },
                {
                    name: 'b',
                    text: 'b'
                }
            ])
        })
    }
})
module.exports = {
    HomeActions,
    HomeStore
}
