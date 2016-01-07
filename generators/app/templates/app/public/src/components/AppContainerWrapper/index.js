var React = require('react')
var ReactDOM = require('react-dom')
var {AppContainer,Header,leftNav}=require('@alife/amap-web-cms-ui')

var menuList = [
	{
		name: '首页',
		path: '/home'
	},
	{
		name: '菜单1',
		path: '/menu1'
	},
	{
		name: '菜单2',
		path: '/menu2'
	}
]
var AppContainerWrapper = React.createClass({
		render(){
			return (
				<AppContainer>
					<Header>
						cms系统
					</Header>
					<LeftNav menuList={menuList}>
					</leftNav>
					{this.props.children}
				</AppContainer>
			)
		}
	}
)
module.exports = AppContainerWrapper