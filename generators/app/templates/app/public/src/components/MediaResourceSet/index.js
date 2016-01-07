require('./style.scss')
var React = require('react')
var ReactDOM = require('react-dom')
var Reflux = require('reflux')
var {MediaResourceStore,MediaResourceActions,mediaResourceConstraints} = require('../../models/MediaResourceModel')
var Breadcrumb = require('react-bootstrap/lib/Breadcrumb')
var BreadcrumbItem = require('react-bootstrap/lib/BreadcrumbItem')
var DropdownButton = require('react-bootstrap/lib/DropdownButton')
var MenuItem = require('react-bootstrap/lib/MenuItem')
var Grid = require('react-bootstrap/lib/Grid')
var Row = require('react-bootstrap/lib/Row')
var Col = require('react-bootstrap/lib/Col')
var Panel = require('react-bootstrap/lib/Panel')
var Input = require('../Input')
var validate = require('validate.js')
var {costTypeList,adTypeList,materialTypeList,resourceStatusList}=require('../../utils/dict')
var MediaResourceSet = React.createClass({
    mixins: [
        Reflux.connectFilter(MediaResourceStore, 'industryList', function (data) {
            return data.industryList
        })
    ],
    getInitialState(){
        return {
            mediaResource: {
                name: '',
                size: '',
                billing_type: 'CPM',
                show_type: '',
                material_type: [],
                ban_keyword: [],
                ban_industry: []
            },
            toSubmit: false,
            industryList: []
        }
    },
    submit(){
        this.setState({
            toSubmit: true
        })
        MediaResourceActions.addMediaResource(this.state.mediaResource)
    },
    componentDidMount(){
        MediaResourceActions.getIndustryList()
    },
    selectAdType(adType){
        return (event)=> {
            if (!adType.active) {
                return
            }
            this.state.mediaResource.show_type = adType.value
            this.forceUpdate()
        }
    },
    deleteKeyword(keyword){
        var {mediaResource}=this.state
        mediaResource.ban_keyword = mediaResource.ban_keyword.filter((item)=> {
            return item !== keyword
        })
        this.forceUpdate()
    },
    toggleMaterialType(materialType){
        return (event)=> {
            var {mediaResource}=this.state
            if (!materialType.active) {
                return
            }
            if (mediaResource.material_type.indexOf(materialType.value) === -1) {
                mediaResource.material_type.push(materialType.value)
            } else {
                mediaResource.material_type = mediaResource.material_type.filter((item)=> {
                    return item !== materialType.value
                })
            }
            this.forceUpdate()
        }
    },
    addKeyword(){
        var {mediaResource}=this.state
        var keyword = this.refs.keywordInput.value
        if (!keyword) {
            return
        }
        if (mediaResource.ban_keyword.indexOf(keyword) === -1) {
            mediaResource.ban_keyword.push(keyword)
            this.state.keyword = ''
        }
        this.forceUpdate()
    },
    toggleSelectIndustry(industry){
        industry.selected = !industry.selected
        if (industry.children) {
            industry.children.forEach((subIndustry)=> {
                subIndustry.selected = industry.selected
            })
        }
        if (industry.parent) {
            industry.parent.selected = industry.parent.children.every((item)=> {
                return item.selected
            })
        }
        this.forceUpdate()
    },
    toggleOpen(industry){
        industry.open = !industry.open
        this.forceUpdate()
    },
    addIndustry(){
        var {industryList,mediaResource}=this.state
        industryList.forEach((industry)=> {
            if (industry.selected) {
                mediaResource.ban_industry.push(industry)
            } else {
                industry.children && industry.children.forEach((subIndustry)=> {
                    if (subIndustry.selected) {
                        mediaResource.ban_industry.push(subIndustry)
                    }
                })
            }
        })
        var filteredIndustry = []
        mediaResource.ban_industry.forEach((industry)=> {
            if (!industry.parent && filteredIndustry.indexOf(industry) === -1) {
                filteredIndustry.push(industry)
            }
        })
        mediaResource.ban_industry.forEach((industry)=> {
            if (industry.parent && filteredIndustry.indexOf(industry.parent) === -1 && filteredIndustry.indexOf(industry) === -1) {
                filteredIndustry.push(industry)
            }
        })
        mediaResource.ban_industry = filteredIndustry
        this.forceUpdate()
    },
    removeIndustry(industry){
        var {mediaResource}=this.state
        mediaResource.ban_industry = mediaResource.ban_industry.filter((item)=> {
            return industry.name !== item.name
        })
        this.forceUpdate()
    },
    render() {
        var treeList = this.state.industryList.map((industry, i)=> {
            var open = industry.open ? 'open' : ''
            var icon = industry.open ? 'minus' : 'plus'
            var selected = industry.selected ? 'selected' : ''
            return (
                <li className={`has-children ${open}`} key={i}>
                    <span className={`glyphicon glyphicon-${icon}`}
                          onClick={()=>{this.toggleOpen(industry)}}></span>
                    <span
                        className={`${selected} text`}
                        onClick={()=>{this.toggleSelectIndustry(industry)}}>
                        {industry.name}
                    </span>
                    <ul>
                        {industry.children.map((subIndustry, i)=> {
                            var selected = subIndustry.selected ? 'selected' : ''
                            return (
                                <li key={i}>
                                    <span
                                        className={`${selected} text`}
                                        onClick={()=>{this.toggleSelectIndustry(subIndustry)}}>
                                        {subIndustry.name}
                                    </span>
                                </li>
                            )
                        })}
                    </ul>
                </li>
            )
        })
        var {mediaResource}=this.state
        return (
            <div>
                <Breadcrumb>
                    <BreadcrumbItem href="#/">
                        投放
                    </BreadcrumbItem>
                    <BreadcrumbItem active>
                        新建资源位
                    </BreadcrumbItem>
                </Breadcrumb>

                <div className="panel panel-lba">
                    <div className="panel-heading">新建资源位</div>
                    <div className="panel-body">
                        <form className="form-lba form-post" noValidate>
                            <Input
                                type="text"
                                value={mediaResource.name}
                                placeholder="广告位名称"
                                label="广告位名称*"
                                help="广告位名称为必填字段"
                                openValidate={this.state.toSubmit}
                                groupClassName="group-class"
                                labelClassName="label-class"
                                constraint={mediaResourceConstraints.name}
                                onChange={(event)=>{mediaResource.name=event.target.value; this.forceUpdate()} }/>

                            <div className="form-group">
                                <label>计费方式*</label>
                                <DropdownButton title={mediaResource.billing_type||'CPM'} id="costTypeId">
                                    {
                                        costTypeList.map((costType, i)=> {
                                            return (
                                                <MenuItem eventKey={costType.value} active={!!costType.active} key={i}
                                                          disabled={!costType.active}>
                                                    {costType.text}
                                                </MenuItem>
                                            )
                                        })
                                    }
                                </DropdownButton>
                            </div>
                            <div className="form-group">
                                <label className="control-label">广告栏位类别*</label>

                                <div className='inline-block'>
                                    {
                                        adTypeList.map((adType, i)=> {
                                            var disabled = adType.active ? '' : 'disabled'
                                            var checked = adType.value === mediaResource.show_type ? 'checked' : ''
                                            return (
                                                <label key={i}
                                                       onClick={this.selectAdType(adType)}
                                                       className={`radio-inline ${disabled} ${checked}`}
                                                    >
                                                    <input type="radio"
                                                           value={adType.value}/>
                                                    <span>{adType.text}</span>
                                                </label>
                                            )
                                        })
                                    }
                                    <span
                                        className="help-block">
                                        {this.state.toSubmit ? validate.single(mediaResource.show_type, mediaResourceConstraints.show_type) : ''}
                                    </span>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>素材类型*</label>

                                <div className='inline-block'>
                                    {
                                        materialTypeList.map((materialType, i)=> {
                                            var disabled = materialType.active ? '' : 'disabled'
                                            var checked = mediaResource.material_type.indexOf(materialType.value) !== -1 ? 'checked' : ''
                                            return (
                                                <label className={`checkbox-inline-lba ${checked} ${disabled}`}
                                                       key={i}
                                                       onClick={this.toggleMaterialType(materialType)}>
                                                    <span className="checkbox-lba"></span>
                                                    <span
                                                        className={`feedback ${checked?'glyphicon glyphicon-ok':''}`}>
                                                    </span>
                                                    <span>{materialType.text}</span>
                                                </label>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className="form-group">
                                <label>屏蔽关键字</label>
                                <input type="text" className="form-control" ref="keywordInput"
                                       value={this.state.keyword}
                                       onChange={(event)=>{this.setState({keyword:event.target.value})}}
                                    />
                                <input className={`btn btn-primary margin-left-15 ${this.state.keyword?'':'disabled'}`}
                                       onClick={this.addKeyword}
                                       value="添加"
                                       type="button"/>

                                <div className="keyword-container">
                                    {
                                        mediaResource.ban_keyword.map((keyword, i)=> {
                                            return (
                                                <div className="keyword" key={i}>
                                                    <span className="text">{keyword}</span>
                                                    <span className="glyphicon glyphicon-remove"
                                                          onClick={()=>{this.deleteKeyword(keyword)}}
                                                          aria-hidden="true"></span>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className="form-group">
                                <label>屏蔽行业</label>

                                <div className="industry-container">
                                    <div>
                                        <div className="inline-block left-section">
                                            <Panel header="行业分类">
                                                <div className="tree">
                                                    <ul>
                                                        {treeList}
                                                    </ul>
                                                </div>
                                            </Panel>
                                        </div>
                                        <div className="inline-block middle-section">
                                            <input type="button" className="btn btn-default" value="添加"
                                                   onClick={this.addIndustry}/>
                                        </div>
                                        <div className="inline-block right-section">
                                            <Panel header={`已选择${mediaResource.ban_industry.length}个行业`}>
                                                <div className="industry-selected-container">
                                                    {
                                                        mediaResource.ban_industry.map((industry, i)=> {
                                                            return (
                                                                <div className="industry-selected" key={i}>
                                                                    <span>{industry.name}</span>
                                                                <span className="glyphicon glyphicon-remove"
                                                                      aria-hidden="true"
                                                                      onClick={()=>{this.removeIndustry(industry)}}
                                                                    ></span>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </Panel>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="panel-footer clearfix">
                        <button type="submit" className="btn btn-default btn-lg float-right" onClick={this.submit}>保存
                        </button>
                    </div>
                </div>
            </div>
        )
    }
})
module.exports = MediaResourceSet

