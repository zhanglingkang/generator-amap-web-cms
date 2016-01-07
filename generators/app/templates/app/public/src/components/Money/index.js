var React = require('react')
var ReactDOM = require('react-dom')
class Money extends React.Component {
    constructor(props) {
        super(props)
    }

    static defaultProps = {}
    state = {}

    render() {
        return (
            <div>我是money</div>
        )
    }


}
module.exports = Money