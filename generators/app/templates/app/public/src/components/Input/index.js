var React = require('react')
var ReactDOM = require('react-dom')
var Input = require('react-bootstrap/lib/Input')
var validate = require('validate.js')
var SelfInput = React.createClass({
    getInitialState(){
        return {
            bsStyle: '',
            startValidation: false
        }
    },
    componentWillMount(){
        this.validate()
    },
    componentWillReceiveProps(props){
        this.validate(props)
    },
    componentDidMount(){

    },
    componentDidUpdate(){

    },
    validate(props){
        props = props || this.props
        if (props.openValidate === undefined && !this.state.startValidation) {
            return
        }
        if (props.openValidate === false) {
            this.setState({
                bsStyle: ''
            })
            return
        }
        var result = validate.single(props.value, this.props.constraint)
        if (result && result[0]) {
            //this.props.help = result[0]
            //this.props.bsStyle = 'has-error'
            this.setState({
                help: result[0],
                bsStyle: 'error'
            })
        } else {
            this.setState({
                bsStyle: ''
            })
        }
    },
    render(){
        var {...others}=this.props
        if (this.state.bsStyle) {
            others.bsStyle = this.state.bsStyle
        }
        return (
            <Input
                {...others}
                onBlur={()=>{this.state.startValidation=true;this.validate();}}
                help={this.state.help}
                />
        )
    }
})
module.exports = SelfInput