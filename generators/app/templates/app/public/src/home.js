var React = require('react')
var ReactDOM = require('react-dom')
var {Router,Route,Link,IndexRoute} = require('react-router')
var AppWrapper = require('./components/AppWrapper')
var Home = require('./components/Home')
var route = (
    <Router >
        <Route path="/" component={AppWrapper}>
            <IndexRoute component={Home}/>
        </Route>
    </Router>
)
ReactDOM.render(route, document.getElementById('react-root'))
