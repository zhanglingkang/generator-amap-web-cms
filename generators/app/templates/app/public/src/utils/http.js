var $ = require('jquery')
var CODE = {
    SUCCESSFUL: 0
}
module.exports = {
    get(...args){
        return $.getJSON.apply($, args).then((result)=> {
            if (result.status == CODE.SUCCESSFUL) {
                return result.data
            }
        })
    },
    post(...args){
        return $.post.apply($, args).then((result)=> {
            if (result.status == CODE.SUCCESSFUL) {
                return result.data
            }
        })
    }
}