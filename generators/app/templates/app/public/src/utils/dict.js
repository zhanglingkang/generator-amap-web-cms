const timeList = [
    {
        text: '昨日',
        value: 1
    },
    {
        text: '过去3天',
        value: 3
    },
    {
        text: '过去7天',
        value: 7
    },
    {
        text: '过去1个月',
        value: 30
    },
]
const costTypeList = [
    {
        text: 'CPC',
        value: 'CPC'
    },
    {
        text: 'CPM',
        value: 'CPM',
        active: true
    },
    {
        text: 'CPT',
        value: 'CPT'
    },
    {
        text: 'CPA',
        value: 'CPA'
    }
]
const adTypeList = [
    {
        text: 'Banner',
        value: 'Banner',
        active: true
    },
    {
        text: 'push广告',
        value: 'push广告',
        active: true
    },
    {
        text: 'Feed',
        value: 'Feed',
        active: true
    },
    {
        text: '互动屏',
        value: '互动屏',
        active: false
    },
    {
        text: '弹窗广告',
        value: '弹窗广告',
        active: false
    },
    {
        text: '视频广告',
        value: '视频广告',
        active: false
    }
]
const materialTypeList = [
    {
        text: '图片',
        value: '图片',
        active: true
    },
    {
        text: '文字',
        value: '文字',
        active: true
    }
]
const resourceStatusList = [
    {
        text: '推广中',
        value: '0',
    },
    {
        text: '暂停',
        value: '1',
    }
]
var methods = {
    getText(value){
        return this.getOption(value).text
    },
    getOption(value){
        var result = {}
        this.some(item=> {
            if (item.value === value) {
                result = item
                return true
            }
        })
        return result
    },
    getValue(text){
        var result = ''
        this.some(item=> {
            if (item.text === text) {
                result = item.value
                return true
            }
        })
        return result
    }
}
methods.__proto__ = Array.prototype
timeList.__proto__ = methods
costTypeList.__proto__ = methods
adTypeList.__proto__ = methods
materialTypeList.__proto__ = methods
resourceStatusList.__proto__ = methods
module.exports = {
    timeList,
    costTypeList,
    adTypeList,
    materialTypeList,
    resourceStatusList
}