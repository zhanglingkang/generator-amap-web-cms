require('./style.scss')
var React = require('react')
var ReactDOM = require('react-dom')
class Tools extends React.Component {
    constructor(props) {
        super(props)
    }

    static defaultProps = {}
    state = {}
    toUrl = (url)=> {
        return ()=> {
            location = url
        }
    }

    render = ()=> {
        return (
            <div>
                <div className="card">
                    <div className="card-container">
                        <span className="glyphicon glyphicon-volume-up icon" aria-hidden="true"></span>

                        <div>
                            <h4>通知设置</h4>
                            <span>多种消息通道设置</span>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-container">
                        <span className="glyphicon glyphicon-user icon" aria-hidden="true"></span>

                        <div>
                            <h4>账号信息</h4>
                            <span>账号信息查看与维护</span>
                        </div>
                    </div>
                </div>
                <div className="card" onClick={this.toUrl('#/userInfoSet')}>
                    <div className="card-container">
                        <span className="glyphicon glyphicon-user icon" aria-hidden="true"></span>

                        <div>
                            <h4>帮助中心</h4>
                            <span>官方权威解答，答疑解惑</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


}
module.exports = Tools