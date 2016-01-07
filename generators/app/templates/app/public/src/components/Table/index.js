require('./style.scss')
var React = require('react')
var ReactDOM = require('react-dom')
var {Table, Column, Cell} = require('fixed-data-table')
var $ = require('jquery')
var SelfAdaptionTable = React.createClass({
    getInitialState() {
        this.pageSectionHeight = 80
        return this.props2State()
    },
    componentWillReceiveProps(props){
        var state = this.props2State(props)
        this.state.width = state.width
        this.state.height = state.height
    },
    props2State(props){
        props = props || this.props
        return {
            width: props.width || 0,
            height: props.height || 0//表格高度
        }
    },
    updateWidthAndHeight(){
        var container = ReactDOM.findDOMNode(this.refs.container)
        var state = {}
        if (!this.state.width) {
            state.width = parseInt(getComputedStyle(container).width)
            console.log(state.width)
        }
        if (!this.state.height) {
            //state.height = parseInt(getComputedStyle(container.parentElement).height)
            //if (this.isNeedPage()) {
            //    state.height -= this.pageSectionHeight
            //}
            //if (!state.height || state.height <= 0) {
            //    console.warn('请传递height或者包含Table的父元素的height不能为空')
            //}
            state.height = this.props.rowsCount * this.props.rowHeight + this.props.headerHeight + 2
        }
        if (state.width > 0 || state.height > 0) {
            this.setState(state)
        }
    },
    componentDidMount() {
        this.updateWidthAndHeight()
        if (!this.props.width || !this.props.height) {
            $(window).on('resize', this.resize)
        }

    },
    componentWillUnmount(){
        $(window).off('resize', this.resize)
    },
    resize(){
        this.setState({
            width: 0,
            height: 0
        })
    },
    componentDidUpdate(){
        this.updateWidthAndHeight()
    },
    _onColumnResizeEndCallback(newColumnWidth, columnKey) {
        this.setState(({columnWidths}) => ({
            columnWidths: {
                //...columnWidths,
                [columnKey]: newColumnWidth
            }
        }))
    },
    isNeedPage(){
        return this.props.page && this.props.total && this.props.pageSize
    },
    toPage(page){
        if (this.props.toPage) {
            this.props.toPage(page)
        }
    },
    getPageLiList(){
        var {page,pageSize,total}=this.props
        var totalPage = parseInt((total + pageSize - 1) / pageSize)
        var pageList = []
        if (!totalPage || totalPage < 1) {
            return
        }

        function pushPage(page) {
            if (pageList.indexOf(page) === -1) {
                var lastPage = pageList[pageList.length - 1]
                if (!$.isNumeric(lastPage) || !$.isNumeric(page) || page > lastPage) {
                    pageList.push(page)
                }
            }
        }

        if (totalPage >= 1) {
            pushPage(1)
        }
        if (totalPage >= 2) {
            pushPage(2)
        }
        if (page <= 5) {
            for (let i = 1; i <= 5 && i <= totalPage; i++) {
                pushPage(i)
            }
        }
        if (pageList[pageList.length - 1] + 1 < page - 2) {
            pushPage('first...')
        }
        if (page + 5 > totalPage) {
            for (let i = totalPage - 5 > 0 ? totalPage - 5 : 1; i <= totalPage; ++i) {
                pushPage(i)
            }
        }
        if (page - 2 > 0) {
            pushPage(page - 2)
        }
        if (page - 1 > 0) {
            pushPage(page - 1)
        }
        if (page > 0) {
            pushPage(page)
        }
        if (page + 1 <= totalPage) {
            pushPage(page + 1)
        }
        if (page + 2 <= totalPage) {
            pushPage(page + 2)
        }
        if (page + 2 + 1 < totalPage - 1) {
            pushPage('second...')
        }
        if (totalPage - 1 > 0) {
            pushPage(totalPage - 1)
        }
        if (totalPage > 0) {
            pushPage(totalPage)
        }
        var liList = []
        liList.push(
            <li key={Math.random()} className={page===1?'disabled':''}>
                <a aria-label="Previous" onClick={()=>this.toPage(page-1)}>
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
        )
        pageList.forEach((pageNum, index)=> {
            if (/first|second/.test(pageNum)) {
                liList.push(
                    <li key={index}>
                        <a>...</a>
                    </li>
                )
            } else {
                liList.push(
                    <li key={index} className={page === pageNum ? 'active' : ''}>
                        <a onClick={()=>this.toPage(pageNum)}>{pageNum}</a>
                    </li>
                )
            }
        })
        liList.push(
            <li key={Math.random()} className={page===totalPage?'disabled':''}>
                <a aria-label="Next" onClick={()=>this.toPage(page+1)}>
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
        )
        return liList
    },

    getWidthAndHeight(){
        return {
            width: this.props.width || this.state.width || 0,
            height: this.props.height || this.state.height || 0
        }
    },

    render() {
        var table
        var {height,width}=this.getWidthAndHeight()
        if (width > 0 && height > 0) {
            table = (
                <Table {...this.props}
                    onColumnResizeEndCallback={this._onColumnResizeEndCallback}
                    width={width}
                    height={height}
                    >
                    {this.props.children}
                </Table>
            )
        }
        var pageSection
        if (this.isNeedPage()) {
            //<div style={{marginRight:"15px"}}>总共
            //    <span style={{fontStyle:"italic",margin:"0 5px"}}>{this.props.total}</span>条记录
            //</div>
            pageSection = (
                <section className="page-section"
                         style={{padding:"0 15px",height:this.pageSectionHeight,maxHeight:this.pageSectionHeight}}>
                    <nav>
                        <ul className="pagination">
                            {this.getPageLiList()}
                        </ul>
                    </nav>
                </section>
            )
        }
        return (
            <div ref="container" className="table-container">
                {table}
                {pageSection}
            </div>
        )
    }
})
module.exports = SelfAdaptionTable