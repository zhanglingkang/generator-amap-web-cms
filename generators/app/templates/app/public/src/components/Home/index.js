var React = require('react')
var ReactDOM = require('react-dom')
var Reflux = require('reflux')
var {HomeActions,HomeStore} = require('../../models/HomeModel')
var Home = React.createClass({
    mixins: [Reflux.connectFilter(HomeStore, 'data', function (data) {
        return data
    })],
    getInitialState(){
        return {}
    },
    getDefaultProps(){
        return {}
    },


    componentWillMount(){
        this.search()
    },
    search(){
        HomeActions.getAll({})
    },

    render(){
        return (
            <div>
                Home
            </div>
        )
    }
})
module.exports = Home
