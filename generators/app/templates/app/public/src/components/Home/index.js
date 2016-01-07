require('./style.scss')
var React = require('react')
var ReactDOM = require('react-dom')
var Reflux = require('reflux')
var {HomeActions,HomeStore} = require('../../models/HomeModel')
var moment = require('moment')
var ec = require('echarts')
var SplitButton = require('react-bootstrap/lib/SplitButton')
var MenuItem = require('react-bootstrap/lib/MenuItem')
var {timeList} = require('../../utils/dict')
//var {Select}=require('@alife/lba-common')
require('echarts/chart/bar')
require('echarts/chart/line')
var Home = React.createClass({
    mixins: [Reflux.connectFilter(HomeStore, 'data', function (data) {
        data.incomeList = this.fillNullIncome(data.incomeList)
        return data
    })],
    getInitialState(){
        return {
            data: {
                incomeList: []
            },
            time: 7
        }
    },
    getDefaultProps(){
        return {}
    },


    componentWillMount(){
        this.search()
    },
    search(){
        HomeActions.getAll({
            userId: '1',
            startDate: moment().add(-this.state.time, 'd').format('YYYYMMDD'),
            endDate: moment().add(-1, 'd').format('YYYYMMDD')
        })
    },
    //如果某些日期没有收入，服务端返回的incomeList中没有这天的数据，在incomeList中补充缺少的数据，其中balance的值为'-'
    fillNullIncome(incomeList){
        for (var i = this.state.time; i > 0; --i) {
            var date = moment().add(-i, 'd').format('YYYYMMDD')
            var income = incomeList[this.state.time - i]
            if (income && income.date === date) {
                continue
            } else {
                incomeList = [].concat(
                    incomeList.slice(0, this.state.time - i),
                    {date, balance: '-'},
                    incomeList.slice(this.state.time - i, incomeList.length)
                )
            }
        }
        return incomeList
    },
    updateTime(event, value) {
        this.state.time = value
        this.search()
    },

    componentDidMount(){
        this.renderChart()
    },
    componentDidUpdate(){
        this.renderChart()
    },
    renderChart(){

        var lineChart = ec.init(this.refs.lineChartNode)
        var incomeList = this.state.data.incomeList || []
        var option = {
            tooltip: {
                show: true,
                trigger: 'axis'
            },
            legend: {
                data: ['收入']
            },
            noDataLoadingOption: {
                text: '暂无数据',
                x: 'center',
                y: 'center'
            },
            xAxis: [
                {
                    axisLine: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    },
                    type: 'category',
                    boundaryGap: false,
                    data: incomeList.map((income)=> {
                        return moment(income.date, 'YYYYMMDD').format('MM-DD')
                    })
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    axisLabel: {
                        formatter: '{value} 元'
                    }
                }
            ],
            series: [
                {
                    name: '收入',
                    type: 'line',
                    itemStyle: {
                        normal: {
                            color: '#0091ff',
                            areaStyle: {type: 'default', color: '#e5f4ff'},
                            //lineStyle: {type: 'solid', color: '#0091ff'}
                        }
                    },
                    data: incomeList.map((income)=> {
                        return income.balance
                    })
                }
            ]
        }
        lineChart.setOption(option)
    },
    changeDate(event, value){
        debugger
    },
    render(){
        //<div>
        //    <p>今日更新</p>
        //    <span className="number">2</span>
        //</div>
        //<div>
        //<p>待审核</p>
        //<span className="number">0</span>
        //    </div>
        //        <div>
        //            <p>未通过</p>
        //            <span className="number">1</span>
        //        </div>
        var alert
        if (!this.state.closeAlert) {
            alert = (
                <div className="alert alert-warning alert-lba" role="alert">
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close"
                            onClick={()=>{this.setState({closeAlert:true})}}>
                        <span>&times;</span>
                    </button>
                    为了更好为您服务，请务必填写真实有效信息
                </div>
            )
        }


        return (
            <div className="home">
                {alert}
                <div>
                    <div className="card income">
                        <div className="card-container">
                            <div>
                                <p>收入</p>
                                <span className="number">{this.state.data.totalIncome}元</span>
                            </div>
                        </div>
                    </div>
                    <div className="card statistics">
                        <div className="card-container">
                            <div>
                                <p>有效资源位</p>
                                <span className="number">{this.state.data.validResource || '0'}</span>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="panel panel-lba ">
                    <div className="panel-heading">
                        <span>整体情况</span>

                        <div className="heading-right">
                            <SplitButton pullRight bsStyle="default"
                                         title={timeList.getText(this.state.time)}
                                         id={`split-button-basic-1`}
                                         onSelect={this.updateTime}>
                                {
                                    timeList.map((time, i)=> {
                                        return (<MenuItem eventKey={time.value} key={i}>{time.text}</MenuItem>)
                                    })
                                }
                            </SplitButton>
                        </div>
                    </div>
                    <div className="panel-body">
                        <div className="row left-border index-row">
                            <div className="col-lg-4">
                                <p>昨日收入</p>
                                <span>{this.state.data.lastDayIncome || '0'}元</span>
                            </div>
                            <div className="col-lg-4">
                                <p>本月收入</p>
                                <span>{this.state.data.thisMonthIncome || '0'}元</span>
                            </div>
                            <div className="col-lg-4">
                                <p>上月收入</p>
                                <span>{this.state.data.lastMonthIncome || '0'}元</span>
                            </div>
                        </div>
                        <div className="row left-border chart-row">
                            <div className="chart-title">过去{this.state.time}天时段报表</div>
                            <div className="chart-container" ref="lineChartNode"></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
})
module.exports = Home