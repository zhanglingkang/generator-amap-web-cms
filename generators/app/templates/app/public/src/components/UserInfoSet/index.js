var React = require('react')
var ReactDOM = require('react-dom')
class UserInfoSet extends React.Component {
    constructor(props) {
        super(props)
    }

    static defaultProps = {}
    state = {}

    render() {
        return (
            <div>
                <div className="panel panel-lba ">
                    <div className="panel-heading">基本信息</div>
                    <div className="panel-body">
                        <form className="form-lba">
                            <div className="form-group">
                                <label>应用名称*</label>
                                <input type="email" className="form-control"
                                       placeholder="应用名称"/>
                            </div>
                            <div className="form-group">
                                <label>应用包名*</label>
                                <input type="password" className="form-control"
                                       placeholder="应用包名"/>
                            </div>
                            <div className="form-group">
                                <label>下载地址</label>
                                <input type="text" className="form-control"/>

                                <p className="help-block">Example block-level help text here.</p>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" Check me out/>
                                </label>
                            </div>
                            <button type="submit" className="btn btn-default">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

}
module.exports = UserInfoSet
