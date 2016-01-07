var React = require('react')
var ReactDOM = require('react-dom')
var {Router,Route,Link,IndexRoute} = require('react-router')
var $ = require('jquery')
var AppContainerWrapper = require('./components/AppContainerWrapper')
var Home = require('./components/Home')
var route = (
    <Router >
        <Route path="/" component={AppContainerWrapper}>
            <IndexRoute component={Home}/>
        </Route>
    </Router>
)
ReactDOM.render(route, $('#react-root')[0])