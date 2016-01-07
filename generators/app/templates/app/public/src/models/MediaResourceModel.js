var http = require('../utils/http')
var Reflux = require('reflux')
var $ = require('jquery')
var RefluxPromise = require('reflux-promise')
var validate = require('validate.js')
Reflux.use(RefluxPromise(window.Promise))
validate.validators.presence.message = '不能为空'
const mediaResourceConstraints = {
    name: {
        presence: true,
    },
    billing_type: {
        presence: true,
    },
    show_type: {
        presence: true,
    },
    material_type: {
        presence: true,
    }
}
var MediaResourceActions = Reflux.createActions([
    'getAll',
    'getIndustryList',
    'addMediaResource',
    {
        updateResourceStatus: {asyncResult: true}
    },
])
var MediaResourceStore = Reflux.createStore({
    data: {},
    listenables: [MediaResourceActions],
    onGetAll(condition){
        http.get('/f/media-resource/select', condition).then((data)=> {
            this.data.mediaResourceData = data
            this.trigger(this.data)
        })
    },
    onGetIndustryList(condition){
        http.get('/f/tag-industry/list', condition).then((data)=> {
            this.data.industryList = data
            this.data.industryList.forEach((industry)=> {
                industry.children && industry.children.forEach((subIndustry)=> {
                    subIndustry.parent = industry
                })
            })
            this.trigger(this.data)
        })
    },
    onUpdateResourceStatus({id,status}){
        http.post('/f/media-resource/save', {
            id,
            status
        }).then((data)=> {
            MediaResourceActions.updateResourceStatus.completed(data)
        })
    },
    onAddMediaResource(mediaResource){
        if (validate(mediaResource, mediaResourceConstraints)) {
            mediaResource = $.extend({}, mediaResource)
            mediaResource.ban_industry = mediaResource.ban_industry.map(industry=>industry.name).join()
            mediaResource.ban_keyword = mediaResource.ban_keyword.join()
            mediaResource.material_type = mediaResource.material_type.join()
            http.post('/f/media-resource/save', mediaResource).then((data)=> {
                //this.data.industryList = data
                //this.data.industryList.forEach((industry)=> {
                //    industry.children && industry.children.forEach((subIndustry)=> {
                //        subIndustry.parent = industry
                //    })
                //})
                //this.trigger(this.data)
            })
        }
    }
})
module.exports = {
    MediaResourceActions,
    MediaResourceStore,
    mediaResourceConstraints
}

