var React = require('react')
var ReactDOM = require('react-dom')
var {Router,Route,Link,IndexRoute} = require('react-router')
var AppWrapper = require('./components/AppWrapper')
var Menu1 = require('./components/Menu1')
var route = (
    <Router>
        <Route path="/" component={AppWrapper}>
            <IndexRoute component={Menu1}/>
        </Route>
    </Router>
)
ReactDOM.render(route, document.getElementById('react-root'))
