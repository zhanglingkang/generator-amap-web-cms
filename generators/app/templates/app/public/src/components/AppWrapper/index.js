require('./style.scss')
var React = require('react')
var ReactDOM = require('react-dom')
var {App,Header,LeftNav}=require('@alife/amap-web-cms-ui')
var logo = require('./logo.png')
var menuList = [
    {
        name: '首页',
        path: '/home'
    },
    {
        name: '菜单1',
        path: '/menu1'
    },
]
var AppWrapper = React.createClass({
        render(){
            return (
                <App>
                    <Header>
                        <div className="left">
                            <span><img className="logo" src={logo}/></span>
                            <span>xxx</span>
                            <span className="split">|</span>
                            <span>管理平台</span>
                        </div>
                        <div className="right">
                            <div>
                                <span>路人甲</span>
                                <span><a className="logout" href="">退出</a></span>
                            </div>
                        </div>
                    </Header>
                    <LeftNav menuList={menuList}>
                    </LeftNav>
                    {this.props.children}
                </App>
            )
        }
    }
)
module.exports = AppWrapper
