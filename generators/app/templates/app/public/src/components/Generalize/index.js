require('./style.scss')
var React = require('react')
var ReactDOM = require('react-dom')
var Reflux = require('reflux')
var {MediaResourceStore,MediaResourceActions} = require('../../models/MediaResourceModel')
var {Column,Cell}=require('fixed-data-table')
var Button = require('react-bootstrap/lib/Button')
var ButtonToolbar = require('react-bootstrap/lib/ButtonToolbar')
var Table = require('../Table')
var {costTypeList,adTypeList,materialTypeList,resourceStatusList}=require('../../utils/dict')
var {Switch}=require('@alife/lba-common')
var Generalize = React.createClass({
    mixins: [Reflux.connectFilter(MediaResourceStore, 'resourceData', function (data) {
        return data.mediaResourceData
    })],
    getInitialState(){
        return {
            resourceData: {
                resourceList: []
            },
            searchForm: {
                searchedName: '',
                page: '1'
            }
        }
    },
    getDefaultProps(){
        return {}
    },
    componentDidMount(){
        this.search()
    },
    toPage(page){
        this.state.searchForm.page = page
        this.search()
    },
    updateStatus(id, status){
        status = status ? '0' : '1'
        MediaResourceActions.updateResourceStatus.triggerAsync({
            id,
            status
        }).then(()=> {
            this.search()
        })

    },
    searchedNameChange(event){
        this.state.searchForm.searchedName = event.target.value
        this.search()
    },
    search(){
        MediaResourceActions.getAll(this.state.searchForm)
    },
    render() {
        var {totalCount,page,pageSize,resourceList} = this.state.resourceData
        var rowHeight = 45
        var headerHeight = 50
        return (

            <div>
                <div className="panel panel-lba ">
                    <div className="panel-heading">
                        <span>广告位列表</span>
                    </div>
                    <div className="panel-body">
                        <section className="search-section">
                            <form className="form-lba">
                                <div className="form-group">
                                    <label>广告位名称</label>
                                    <input type="text" className="form-control"
                                           onChange={this.searchedNameChange}
                                           placeholder="广告位名称"/>
                                </div>
                            </form>
                            <Button bsStyle="primary"
                                    onClick={()=>{location.hash='#/mediaResourceSet'}}>
                                创建资源位
                            </Button>
                        </section>
                        <Table
                            total={parseInt(totalCount)}
                            page={parseInt(page)}
                            pageSize={parseInt(pageSize)}
                            toPage={this.toPage}
                            rowsCount={resourceList.length}
                            rowHeight={rowHeight}
                            onRowDoubleClick={this.onRowDoubleClick}
                            headerHeight={headerHeight}>
                            <Column
                                header={<Cell>广告位Id</Cell>}
                                fixed={true}
                                //isResizable={true}
                                flexGrow={1}
                                cell={props => (
                                             <Cell {...props}>
                                                  {resourceList[props.rowIndex].id}
                                               </Cell>
                                          )}
                                width={180}
                                >
                            </Column>
                            <Column


                                header={<Cell>广告位名称</Cell>}
                                fixed={true}
                                flexGrow={1}
                                //isResizable={true}
                                cell={props => (
                                             <Cell {...props}>
                                                  {resourceList[props.rowIndex].name}
                                               </Cell>
                                          )}
                                width={180}
                                >
                            </Column>
                            <Column
                                header={<Cell>广告栏位</Cell>}
                                fixed={true}
                                flexGrow={1}
                                //isResizable={true}
                                cell={props => (
                                             <Cell {...props}>
                                                  {resourceList[props.rowIndex].show_type}
                                               </Cell>
                                          )}
                                width={180}
                                >
                            </Column>
                            <Column
                                header={<Cell>计费方式</Cell>}
                                fixed={true}
                                flexGrow={1}
                                //isResizable={true}
                                cell={props => (
                                             <Cell {...props}>
                                                  {resourceList[props.rowIndex].billing_type}
                                               </Cell>
                                          )}
                                width={180}
                                >
                            </Column>
                            <Column
                                header={<Cell>当前状态</Cell>}
                                fixed={true}
                                flexGrow={1}
                                //isResizable={true}
                                cell={props => (
                                             <Cell {...props}>
                                                <div>
                                                  <span className="resource-status">{resourceStatusList.getText(resourceList[props.rowIndex].status)}</span>
                                                  <Switch status={resourceList[props.rowIndex].status==0}
                                                   onToggle={(status)=>{this.updateStatus(resourceList[props.rowIndex].id,status)}}>
                                                  </Switch>
                                                 </div>
                                               </Cell>
                                          )}
                                width={180}
                                >
                            </Column>
                            <Column
                                header={<Cell>操作</Cell>}
                                fixed={true}
                                flexGrow={1}
                                //isResizable={true}
                                cell={props => (
                                             <Cell {...props}>
                                                  <div>

                                                  </div>
                                               </Cell>
                                          )}
                                width={180}
                                >
                            </Column>
                        </Table>
                    </div>
                </div>

            </div>
        )
    }
})
module.exports = Generalize