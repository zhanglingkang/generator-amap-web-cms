var React = require('react')
var ReactDOM = require('react-dom')
class Report extends React.Component {
    constructor(props) {
        super(props)
    }

    static defaultProps = {}
    state = {}

    render() {
        return (
            <div>我是Report</div>
        )
    }


}
module.exports = Report