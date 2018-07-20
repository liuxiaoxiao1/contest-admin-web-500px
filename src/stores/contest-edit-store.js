/**
 * Created by liuxiaoxiao1 on 2018/3/1.
 */
import React from 'react';
import {observable, useStrict, action, runInAction, extendObservable} from 'mobx'
import Util from '../utils/web-utils'
import uuid from 'uuid/v1'
import ContestApi from '../lib/Api/ContestApi'
import assign from 'object-assign'
import { message } from "antd/lib/index"
import _ from 'lodash'


useStrict(true);

let uuid_theme = 0; //每次新增的时候
let uuid_theme_extrinfo = 0; //主题信息页面的 额外信息的uuid

let uuid_prize_category = 0; //奖项分类的uuid




//这个权当做 字段说明的吧 没啥卵用 不想删了
let ContestEditCurItemInit = {
    "warmupEndTime": '',
    "webType": '', //Web端详情页样式;0-背景图，1-主视觉
    "rating": '', // 列表页排序权重：0~10;0普通 值越高排名越高
    "recommendation": '',
    "visionColor": "",//主视觉颜色
    "title": "",
    "listShow": '',//列表页是否显示0：不显示;1：显示
    "appType": '',//app端详情页样式;0-背景图，1-主视觉
    "hostType": '',//主办方展示方式 0-名称；1-logo
    "createdTime": '',
    "contestCategory": "",//大赛级别：contest:大赛;activity：活动 （默认）;collection：有奖征集
    "hostUnit": "",
    "warmupTime": '',
    "id": "",
    "state": '',
    "openTime": '',
    "hostLogo": {  // 主办方 logo
        "p1": "",
        "baseUrl": "",
        "id": ""
    },
    "openEndTime": '',
    "webDetailUrl": {  //web 详情页头图
        "p1": "",
        "baseUrl": "",
        "id": ""
    },
    "appUrl": {  //app列表
        "p1": "",
        "baseUrl": "",
        "id": ""
    },
    "appDetailUrl": {  //app 详情页头图
        "p1": "",
        "baseUrl": "",
        "id": ""
    },
    "judgeTime": '',
    "version": '',
    "tags": "",
    "publicityTime": '',
    "publicityEndTime": '',
    "refer": "",
    "webUrl": {  //web 大赛列表id
        "p1": "",
        "baseUrl": "",
        "id": ""
    },
    "domainName": "",
    "subtitle": "", //副标题
    "contestType": 0,  // 0 普通赛 1邀请赛
    "contestProperty": {
        "autoToTribe": false,
        "openMsg": "",
        "detailsShow": 0,
        "showConfigJson": {
            "prizeTribe": {
                "groupNames": "",
                "publicityShow": false,
                "collectShow": false,
                "finishShow": false,
                "prepareShow": false,
                "displayName": "获奖部落",
                "name": "prizeTribe",
                "alias": "",
                "outLink": false,
                "outLinkUrl": "",
                "reviewShow": false
            },
            "selectWorks": {
                "groupNames": "",
                "publicityShow": false,
                "collectShow": true,
                "finishShow": false,
                "prepareShow": false,
                "displayName": "入围作品",
                "name": "selectWorks",
                "alias": "",
                "outLink": false,
                "outLinkUrl": "",
                "reviewShow": false
            },
            "prizeUser": {
                "groupNames": "用户颁奖",
                "publicityShow": false,
                "collectShow": false,
                "finishShow": true,
                "prepareShow": false,
                "displayName": "获奖摄影师",
                "name": "prizeUser",
                "alias": "",
                "outLink": false,
                "outLinkUrl": "",
                "reviewShow": false
            },
            "prizeWorks": {
                "groupNames": "作品颁奖,作品入选",
                "publicityShow": false,
                "collectShow": false,
                "finishShow": true,
                "prepareShow": false,
                "displayName": "获奖作品",
                "name": "prizeWorks",
                "alias": "",
                "outLink": false,
                "outLinkUrl": "",
                "reviewShow": false
            },
            "myWorks": {
                "groupNames": "",
                "publicityShow": false,
                "collectShow": true,
                "finishShow": true,
                "prepareShow": false,
                "displayName": "我的作品",
                "name": "myWorks",
                "alias": "",
                "outLink": false,
                "outLinkUrl": "",
                "reviewShow": true
            },
            "selectUser": {
                "groupNames": "",
                "publicityShow": false,
                "collectShow": true,
                "finishShow": false,
                "prepareShow": false,
                "displayName": "入围摄影师",
                "name": "selectUser",
                "alias": "",
                "outLink": false,
                "outLinkUrl": "",
                "reviewShow": false
            },
            "allWorks": {
                "groupNames": "",
                "publicityShow": false,
                "collectShow": true,
                "finishShow": true,
                "prepareShow": false,
                "displayName": "全部作品",
                "name": "allWorks",
                "alias": "",
                "outLink": false,
                "outLinkUrl": "",
                "reviewShow": true
            },
            "allUser": {
                "groupNames": "",
                "publicityShow": false,
                "collectShow": false,
                "finishShow": false,
                "prepareShow": false,
                "displayName": "参赛用户",
                "name": "allUser",
                "alias": "",
                "outLink": false,
                "outLinkUrl": "",
                "reviewShow": false
            },
            "introduction": {
                "groupNames": "",
                "publicityShow": false,
                "collectShow": true,
                "finishShow": true,
                "prepareShow": true,
                "displayName": "活动简介",
                "name": "introduction",
                "alias": "",
                "outLink": false,
                "outLinkUrl": "",
                "reviewShow": true
            }
        },
        "hostId": "",
        "closeMsg": "",
        "warmupMsg": "",
        "otherDescr": "",
        "prizeMsg": "",
        "intro": "",
        "inviteCode": "",
        "numberLimit": "",
        "createdTime": "",
        "publicityMsg": "",
        "id": "",
        "judgeMsg": ""
    },
    "judgeEndTime": '',

}

let ContestNewInitData = {
    "category": "",
    "warmupEndTime": "",
    "webType": 0,
    "rating": 0,
    "recommendation": "",
    "visionColor": "",
    "title": "",
    "listShow": "",
    "appType": 0,
    "hostType": 0,
    "createdTime": "",
    "contestCategory": "",
    "hostUnit": "",
    "warmupTime": "",
    "id": "",
    "state": "101", //暂时先传101
    "openTime": '',
    "openEndTime": '',
    "hostLogo": {
        baseUrl: "",
        id: ''
    },
    "webDetailUrl": {
        baseUrl: "",
        id: ''
    },
    "appDetailUrl": {
        baseUrl: "",
        id: ''
    },
    "webUrl": {
        baseUrl: "",
        id: ''
    },
    "appUrl": {
        baseUrl: "",
        id: ''
    },
    "judgeTime": "",
    "version": "",
    "tags": "",
    "publicityTime": '',
    "publicityEndTime": '',
    "refer": "",
    "domainName": "",
    "subtitle": "",
    "contestType": 1,
    "contestProperty": {
        "id": '',  //大赛id
        "openMsg": "",
        "closeMsg": "",
        "judgeMsg": "",
        "prizeMsg": "",
        "publicityMsg": "",
        "closeMsg": "",
        "inviteCode": "",
        "numberLimit": '',
        "intro": '' //app端详情页提示信息
    },
    "judgeEndTime": "",
    "resourceCategory": "",

}

//大赛主题
let themeFormInitData = {
    "template": "",
    "defaultCategory": "",
    "outLink": false,
    "photo": false,
    "workSource": '',
    "groupPhoto": false,
    "video": false,
    "tags": "",
    "coverUrl": "",
    "contestId": "",
    "uploadInfo": [

    ],
    "name": "",
    "id": "",
    "graphic": false
}

//defaultShow 是目前后台没有返回的字段；另一种方案是，另外一个字段(与目前返回字段的父级 同级的一个字段)
// defaultPage:{prepare: 'introduction' | 'selectedUser' | ...}
// 或者 别用true false  用数字去表示 1 2 3
let columnSetInitData = {
    "prizeTribe": {
        "groupNames": "",
        "publicityShow": 1,
        "collectShow": 1,
        "finishShow": 1,
        "prepareShow": 1,
        "displayName": "获奖部落",
        "name": "prizeTribe",
        "alias": "",
        "outLink": 1,
        "outLinkUrl": "",
        "reviewShow": 1,
    },
    "selectWorks": {
        "groupNames": "",
        "publicityShow": 1,
        "collectShow": 1,
        "finishShow": 1,
        "prepareShow": 1,
        "displayName": "入围作品",
        "name": "selectWorks",
        "alias": "",
        "outLink": 2,
        "outLinkUrl": "",
        "reviewShow": 1,
    },
    "prizeUser": {
        "groupNames": "用户颁奖",
        "publicityShow": 1,
        "collectShow": 1,
        "finishShow": 1,
        "prepareShow": 1,
        "displayName": "获奖摄影师",
        "name": "prizeUser",
        "alias": "",
        "outLink": 1,
        "outLinkUrl": "",
        "reviewShow": 1

    },
    "prizeWorks": {
        "groupNames": "作品颁奖,作品入选",
        "publicityShow": 1,
        "collectShow": 1,
        "finishShow": 1,
        "prepareShow": 1,
        "displayName": "获奖作品",
        "name": "prizeWorks",
        "alias": "",
        "outLink": 1,
        "outLinkUrl": "",
        "reviewShow": 1,
        "defaultShow": ['prepare', 'collection', 'review', 'finish']
    },
    "myWorks": {
        "groupNames": "",
        "publicityShow": 1,
        "collectShow": 1,
        "finishShow": 1,
        "prepareShow": 1,
        "displayName": "我的作品",
        "name": "myWorks",
        "alias": "",
        "outLink": 1,
        "outLinkUrl": "",
        "reviewShow": 1,
        "defaultShow": ['prepare', 'collection', 'review', 'display']
    },
    "selectUser": {
        "groupNames": "",
        "publicityShow": 1,
        "collectShow": 1,
        "finishShow": 1,
        "prepareShow": 1,
        "displayName": "入围摄影师",
        "name": "selectUser",
        "alias": "",
        "outLink": 1,
        "outLinkUrl": "",
        "reviewShow": 1,
        "defaultShow": ['prepare', 'collection', 'review', 'display']
    },
    "allWorks": {
        "groupNames": "",
        "publicityShow": 1,
        "collectShow": 1,
        "finishShow": 1,
        "prepareShow": 1,
        "displayName": "全部作品",
        "name": "allWorks",
        "alias": "",
        "outLink": 1,
        "outLinkUrl": "",
        "reviewShow": 1,
        "defaultShow": ['prepare', 'collection', 'display', 'finish']
    },
    "allUser": {
        "groupNames": "",
        "publicityShow": 1,
        "collectShow": 1,
        "finishShow": 1,
        "prepareShow": 1,
        "displayName": "参赛用户",
        "name": "allUser",
        "alias": "",
        "outLink": 1,
        "outLinkUrl": "",
        "reviewShow": 1,
        "defaultShow": ['prepare', 'review', 'display', 'finish']
    },
    "introduction": {
        "groupNames": "",
        "publicityShow": 1,
        "collectShow": 1,
        "finishShow": 1,
        "prepareShow": 1,
        "displayName": "活动简介",
        "name": "introduction",
        "alias": "",
        "outLink": 1,
        "outLinkUrl": "",
        "reviewShow": 1,
        "defaultShow": ['collection', 'review', 'display', 'finish']
    }
}


let prizeCateInitData = {
    "prizeTribe": {
        "groupNames": "",
        "publicityShow": false,
        "collectShow": false,
        "finishShow": false,
        "prepareShow": false,
        "displayName": "获奖部落",
        "prizes": [],
        "name": "prizeTribe",
        "alias": "",
        "outLink": false,
        "outLinkUrl": "",
        "reviewShow": false
    },
    "selectWorks": {
        "groupNames": "",
        "publicityShow": false,
        "collectShow": true,
        "finishShow": false,
        "prepareShow": false,
        "displayName": "入围作品",
        "name": "selectWorks",
        "alias": "",
        "outLink": false,
        "outLinkUrl": "",
        "reviewShow": false
    },
    "prizeUser": {
        "groupNames": "用户颁奖",
        "publicityShow": false,
        "collectShow": false,
        "finishShow": true,
        "prepareShow": false,
        "displayName": "获奖摄影师",
        "prizes": [
            {
                "contestId": "c283cdfee5094706b6799f7933da62ea",
                "groupName": "用户颁奖",
                "level": 0,
                "count": 0,
                "name": "一等奖",
                "createdTime": 1528355201000,
                "id": "6a67af3cd443404ea58277e3899b7c58",
                "contestShowName": "prizeUser",
                "title": "一等奖"
            },
            {
                "contestId": "c283cdfee5094706b6799f7933da62ea",
                "groupName": "用户颁奖",
                "level": 1,
                "count": 0,
                "name": "二等奖",
                "createdTime": 1528355200000,
                "id": "7b502222624447668f2e385786a0a570",
                "contestShowName": "prizeUser",
                "title": "二等奖"
            },
            {
                "contestId": "c283cdfee5094706b6799f7933da62ea",
                "groupName": "用户颁奖",
                "level": 2,
                "count": 0,
                "name": "三等奖",
                "createdTime": 1528355199000,
                "id": "504f13bede594ab7a8b89cbaebd422c2",
                "contestShowName": "prizeUser",
                "title": "三等奖"
            }
        ],
        "name": "prizeUser",
        "alias": "",
        "outLink": false,
        "outLinkUrl": "",
        "reviewShow": false
    },
    "prizeWorks": {
        "groupNames": "作品颁奖,作品入选",
        "publicityShow": false,
        "collectShow": false,
        "finishShow": true,
        "prepareShow": false,
        "displayName": "获奖作品",
        "prizes": [
            {
                "contestId": "c283cdfee5094706b6799f7933da62ea",
                "groupName": "作品颁奖",
                "level": 0,
                "count": 0,
                "name": "一等奖",
                "createdTime": 1528355206000,
                "id": "3f68a144834f428aad2480597f17fc2a",
                "contestShowName": "prizeWorks",
                "title": "一等奖"
            },
            {
                "contestId": "c283cdfee5094706b6799f7933da62ea",
                "groupName": "作品颁奖",
                "level": 1,
                "count": 0,
                "name": "二等奖",
                "createdTime": 1528355205000,
                "id": "f0f4f18030bb4cbfa2a4b0d1fb35eb33",
                "contestShowName": "prizeWorks",
                "title": "二等奖"
            },
            {
                "contestId": "c283cdfee5094706b6799f7933da62ea",
                "groupName": "作品颁奖",
                "level": 2,
                "count": 0,
                "name": "三等奖",
                "createdTime": 1528355204000,
                "id": "6c48cc9a051f4fdfac7ecb46d4954c5a",
                "contestShowName": "prizeWorks",
                "title": "三等奖"
            },
            {
                "contestId": "c283cdfee5094706b6799f7933da62ea",
                "groupName": "作品入选",
                "level": 3,
                "count": 0,
                "name": "优秀奖",
                "createdTime": 1528355203000,
                "id": "2b4197179f00469aa7ca2fee722e53c2",
                "contestShowName": "prizeWorks",
                "title": "优秀奖"
            },
            {
                "contestId": "c283cdfee5094706b6799f7933da62ea",
                "groupName": "作品入选",
                "level": 4,
                "count": 0,
                "name": "参与奖",
                "createdTime": 1528355202000,
                "id": "07366217b4a94d46bf64e80d8fd1c46d",
                "contestShowName": "prizeWorks",
                "title": "参与奖"
            }
        ],
        "name": "prizeWorks",
        "alias": "",
        "outLink": false,
        "outLinkUrl": "",
        "reviewShow": false
    },
    "myWorks": {
        "groupNames": "",
        "publicityShow": false,
        "collectShow": true,
        "finishShow": true,
        "prepareShow": false,
        "displayName": "我的作品",
        "name": "myWorks",
        "alias": "",
        "outLink": false,
        "outLinkUrl": "",
        "reviewShow": true
    },
    "selectUser": {
        "groupNames": "",
        "publicityShow": false,
        "collectShow": true,
        "finishShow": false,
        "prepareShow": false,
        "displayName": "入围摄影师",
        "name": "selectUser",
        "alias": "",
        "outLink": false,
        "outLinkUrl": "",
        "reviewShow": false
    },
    "allWorks": {
        "groupNames": "",
        "publicityShow": false,
        "collectShow": true,
        "finishShow": true,
        "prepareShow": false,
        "displayName": "全部作品",
        "name": "allWorks",
        "alias": "",
        "outLink": false,
        "outLinkUrl": "",
        "reviewShow": true
    },
    "allUser": {
        "groupNames": "",
        "publicityShow": false,
        "collectShow": false,
        "finishShow": false,
        "prepareShow": false,
        "displayName": "参赛用户",
        "name": "allUser",
        "alias": "",
        "outLink": false,
        "outLinkUrl": "",
        "reviewShow": false
    },
    "introduction": {
        "groupNames": "",
        "publicityShow": false,
        "collectShow": true,
        "finishShow": true,
        "prepareShow": true,
        "displayName": "活动简介",
        "name": "introduction",
        "alias": "",
        "outLink": false,
        "outLinkUrl": "",
        "reviewShow": true
    }
}

let guideStore = {
    totalStep: 4,
    curStep: 2,
    showTxt: ['基本信息', '征集主题', '状态栏目', '奖项设置']
}


let newPrizeCateData = {
    key: '', //获奖目标  实际上的奖项分组依据  prizeUsers  prizeWorks
    uuid: '',
    targetKey: '',
    data: {
        "groupName": "",
        "name":"",
        prizes: [{
            name: '',
            uuid: uuid()
        }]
    }
}


class ContestListStore {
    @observable curItem = {
        "category": "",
        "warmupEndTime": "",
        "webType": 0,
        "rating": 0,
        "recommendation": "",
        "visionColor": "",
        "title": "",
        "listShow": "",
        "appType": 0,
        "hostType": 0,
        "createdTime": "",
        "contestCategory": "",
        "hostUnit": "",
        "warmupTime": "",
        "id": "",
        "state": "101", //暂时先传101
        "openTime": '',
        "openEndTime": '',
        "hostLogo": {
            baseUrl: "",
            id: ''
        },
        "webDetailUrl": {
            baseUrl: "",
            id: ''
        },
        "appDetailUrl": {
            baseUrl: "",
            id: ''
        },
        "webUrl": {
            baseUrl: "",
            id: ''
        },
        "appUrl": {
            baseUrl: "",
            id: ''
        },
        "judgeTime": "",
        "version": "",
        "tags": "",
        "publicityTime": '',
        "publicityEndTime": '',
        "refer": "",
        "domainName": "",
        "subtitle": "",
        "contestType": 1,
        "contestProperty": {
            "id": '',  //大赛id
            "openMsg": "",
            "closeMsg": "",
            "judgeMsg": "",
            "prizeMsg": "",
            "publicityMsg": "",
            "closeMsg": "",
            "inviteCode": "",
            "numberLimit": '',
            "intro": '' //app端详情页提示信息
        },
        "judgeEndTime": "",
        "resourceCategory": "",

    };
    @observable guideStore = guideStore;


    //当前大赛的主题信息
    @observable themes = [
        {
            "template": "photoAndGroup",
            "defaultCategory": "",
            "outLink": false,
            "photo": true,
            "workSource": '',
            "groupPhoto": false,
            "video": false,
            "tags": "",
            "coverUrl": "",
            "uploadInfo": [

            ],
            "createTime": '',
            "name": "",
            "id": "",  //TODO: 第一次是不需要传的
            "graphic": false
        }]

    //当前大赛栏目设置
    @observable columnSetting = {
        "prizeTribe": {
            "groupNames": "",
            "publicityShow": false,
            "collectShow": false,
            "finishShow": false,
            "prepareShow": false,
            "displayName": "获奖部落",  // web不用这个字段作为标签，会自己去定义，跟key进行关联
            "name": "prizeTribe",
            "alias": "获奖部落",
            "outLink": false,
            "outLinkUrl": "",
            "reviewShow": false,
        },
        "selectWorks": {
            "groupNames": "",
            "publicityShow": false,
            "collectShow": false,
            "finishShow": false,
            "prepareShow": false,
            "displayName": "优秀作品",
            "name": "selectWorks",
            "alias": "优秀作品",
            "outLink": false,
            "outLinkUrl": "",
            "reviewShow": false,
        },
        "prizeUser": {
            "groupNames": "",
            "publicityShow": false,
            "collectShow": false,
            "finishShow": false,
            "prepareShow": false,
            "displayName": "获奖摄影师",
            "name": "prizeUser",
            "alias": "获奖摄影师",
            "outLink": false,
            "outLinkUrl": "",
            "reviewShow": false,
        },
        "prizeWorks": {
            "groupNames": "",
            "publicityShow": false,
            "collectShow": false,
            "finishShow": false,
            "prepareShow": false,
            "displayName": "获奖作品",
            "name": "prizeWorks",
            "alias": "获奖作品",
            "outLink": false,
            "outLinkUrl": "",
            "reviewShow": false,
        },
        "myWorks": {
            "groupNames": "",
            "publicityShow": true,
            "collectShow": true,
            "finishShow": true,
            "prepareShow": true,
            "displayName": "我的作品",
            "name": "myWorks",
            "alias": "我的作品",
            "outLink": false,
            "outLinkUrl": "",
            "reviewShow": true,
        },
        "selectUser": {
            "groupNames": "",
            "publicityShow": false,
            "collectShow": false,
            "finishShow": false,
            "prepareShow": false,
            "displayName": "优秀摄影师",
            "name": "selectUser",
            "alias": "优秀摄影师",
            "outLink": false,
            "outLinkUrl": "",
            "reviewShow": false,
        },
        "allWorks": {
            "groupNames": "",
            "publicityShow": true,
            "collectShow": true,
            "finishShow": true,
            "prepareShow": true,
            "displayName": "全部作品",
            "name": "allWorks",
            "alias": "全部作品",
            "outLink": false,
            "outLinkUrl": "",
            "reviewShow": true,
        },
        "allUser": {
            "groupNames": "",
            "publicityShow": false,
            "collectShow": false,
            "finishShow": false,
            "prepareShow": false,
            "displayName": "参赛用户",
            "name": "allUser",
            "alias": "参赛用户",
            "outLink": false,
            "outLinkUrl": "",
            "reviewShow": false,
        },
        "introduction": {
            "groupNames": "",
            "publicityShow": true,
            "collectShow": true,
            "finishShow": true,
            "prepareShow": true,
            "displayName": "简介",
            "name": "introduction",
            "alias": "简介",
            "outLink": false,
            "outLinkUrl": "",
            "reviewShow": true
        }
    }

    //初始化：所有阶段的默认页面都是简介页面
    @observable defaultPage = {
        "101": "introduction",
        "102": "introduction",
        "103": "introduction",
        "104": "introduction",
        "106": "introduction"
    }

    //当前大赛奖项设置
    // 说明: 1. 后台返回的数据不太合理，对于奖项设置返回数组更好些, 这里只存储后台返回的原始数据，实际界面展示用下面的prizeItems
    //  2. 下面有专门的格式化数据 函数
    @observable prizeCategories = {
        "prizeTribe": {
            "groupNames": "获奖部落",
            "publicityShow": false,
            "collectShow": false,
            "finishShow": false,
            "prepareShow": false,
            "displayName": "获奖部落",
            "prizes": [],
            "name": "prizeTribe",
            "alias": "",
            "outLink": false,
            "outLinkUrl": "",
            "reviewShow": false
        },
        "selectWorks": {
            "groupNames": "入围作品",
            "publicityShow": false,
            "collectShow": true,
            "finishShow": false,
            "prepareShow": false,
            "displayName": "入围作品",
            "name": "selectWorks",
            "alias": "",
            "outLink": false,
            "outLinkUrl": "",
            "reviewShow": false
        },
        "prizeUser": {
            "groupNames": "用户颁奖",
            "publicityShow": false,
            "collectShow": false,
            "finishShow": true,
            "prepareShow": false,
            "displayName": "获奖摄影师",
            "prizes": [],
            "name": "prizeUser",
            "alias": "获奖摄影师",
            "outLink": false,
            "outLinkUrl": "",
            "reviewShow": false
        },
        "prizeWorks": {
            "groupNames": "作品颁奖,作品入选",
            "publicityShow": false,
            "collectShow": false,
            "finishShow": true,
            "prepareShow": false,
            "displayName": "获奖作品",
            "prizes": [],
            "name": "prizeWorks",
            "alias": "获奖作品",
            "outLink": false,
            "outLinkUrl": "",
            "reviewShow": false
        },
        "myWorks": {
            "groupNames": "",
            "publicityShow": false,
            "collectShow": true,
            "finishShow": true,
            "prepareShow": false,
            "displayName": "我的作品",
            "name": "myWorks",
            "alias": "我的作品",
            "outLink": false,
            "outLinkUrl": "",
            "reviewShow": true
        },
        "selectUser": {
            "groupNames": "",
            "publicityShow": false,
            "collectShow": true,
            "finishShow": false,
            "prepareShow": false,
            "displayName": "优秀摄影师",
            "name": "selectUser",
            "alias": "优秀摄影师",
            "outLink": false,
            "outLinkUrl": "",
            "reviewShow": false
        },
        "allWorks": {
            "groupNames": "",
            "publicityShow": false,
            "collectShow": true,
            "finishShow": true,
            "prepareShow": false,
            "displayName": "全部作品",
            "name": "allWorks",
            "alias": "全部作品",
            "outLink": false,
            "outLinkUrl": "",
            "reviewShow": true
        },
        "allUser": {
            "groupNames": "",
            "publicityShow": false,
            "collectShow": false,
            "finishShow": false,
            "prepareShow": false,
            "displayName": "参赛用户",
            "name": "allUser",
            "alias": "参赛用户",
            "outLink": false,
            "outLinkUrl": "",
            "reviewShow": false
        },
        "introduction": {
            "groupNames": "",
            "publicityShow": true,
            "collectShow": true,
            "finishShow": true,
            "prepareShow": true,
            "displayName": "活动简介",
            "name": "introduction",
            "alias": "活动简介",
            "outLink": true,
            "outLinkUrl": "",
            "reviewShow": true
        }
    }


    //实际界面展示用 数据
    @observable prizeItems = []



    @action newContest = () => {
        this.curItem = assign({}, ContestNewInitData);
    }


    /**
     * 将后台返回的对象数据转化为界面用数据，方便后续操作
     * @param originalPrizeData
     */
    @action formatPrizeData = () => {

        let me = this;
        let prizeCate = me.prizeCategories;

        let prizeCategories = [];
        //按颁奖对象分，理论上最多有两种大分组： 1.摄影师 2.作品  （部落的暂时不处理）
        //根据prizes数组长度来判断是否 有该分组
        if (prizeCate.prizeUser.prizes.length) {
            //let _data = prizeCate.prizeUser;
            let _items = prizeCate.prizeUser.prizes;


            //后台接口的数据结构设计要为 这么复杂的数据处理负责
            //TODO: 恶心的逻辑处理来了，要根据groupNames来判断 颁奖给人的是否有多个分组

            if(prizeCate.prizeUser.groupNames) {
                let groups = prizeCate.prizeUser.groupNames.split(',');

                //先将所有奖项按照 各自的groupName分组
                //用key来区分小分组
                let _groupPrizeItems = {};
                for (let j = 0, len = _items.length; j < len; j++) {
                    //每一个奖项都要添加上uuid, 在删除的时候使用
                    _items[j].uuid = uuid();
                    if(_groupPrizeItems[_items[j].groupName]) {
                        _groupPrizeItems[_items[j].groupName].push(_items[j]);
                    }else {
                        _groupPrizeItems[_items[j].groupName] = [_items[j]];
                    }
                }


                //来填充具体奖项了
                for(let i = 0,l = groups.length;i < l; i++) {
                    prizeCategories.push({
                        key: groups[i],
                        uuid: ++uuid_prize_category,
                        targetKey: 'prizeUser',
                        //prizes 先置空，随后的奖项遍历的时候 再归类填充进来
                        data: {
                            groupName: groups[i],
                            prizes: _groupPrizeItems[groups[i]]
                        }
                    })

                    // prizeCategories.push({
                    //     key: 'prizeUser',
                    //     data: _data
                    // })

                }

            }

            // prizeCategories.prizeUser = prizeCate.prizeUser;
        }


        //这里和上面 是可以合并处理的，为避免不太好读懂，就不合并了
        if (prizeCate.prizeWorks.prizes.length) {
            //let _data = prizeCate.prizeWorks;
            let _items = prizeCate.prizeWorks.prizes;

            //后台接口的数据结构设计 要为这么复杂的数据处理负责
            //TODO: 恶心的逻辑处理来了，要根据groupNames来判断 颁奖给人的是否有多个分组

            if(prizeCate.prizeWorks.groupNames) {
                let groups = prizeCate.prizeWorks.groupNames.split(',');

                //先将所有奖项按照 各自的groupName分组
                //用key来区分小分组
                let _groupPrizeItems = {}
                for (let j = 0, len = _items.length; j < len; j++) {
                    //每一个奖项都要添加上uuid, 在删除的时候使用
                    _items[j].uuid = uuid();
                    if(_groupPrizeItems[_items[j].groupName]) {
                        _groupPrizeItems[_items[j].groupName].push(_items[j]);
                    }else {
                        _groupPrizeItems[_items[j].groupName] = [_items[j]];
                    }
                }

                //来填充具体奖项了
                for(let i = 0,l = groups.length;i < l; i++) {
                    prizeCategories.push({
                        key: groups[i],
                        uuid: ++uuid_prize_category,
                        targetKey: 'prizeWorks',
                        //prizes 先置空，随后的奖项遍历的时候 再归类填充进来
                        data: {
                            groupName: groups[i],
                            prizes: _groupPrizeItems[groups[i]]
                        }
                    })
                }
            }


        }

        //这里还可以做一下优化，其他字段不需要处理了
        me.prizeItems = prizeCategories;

    }

    @action setData = (curItem) => {
        this.curItem = assign(this.curItem, curItem);
    };

    @action overrideData = (curItem) => {
        this.curItem = curItem;
    }

    /**
     * 根据大赛id获取大赛信息
     * @param id
     */
    @action getContestInfo = (id) => {

        ContestApi.getContest(id).then((resData) => {

            console.log('cur contest data', resData);

            if(resData.data.status == '200') {
                runInAction(() => {
                    if(!resData.data.data.hostLogo) {


                        console.log(88888888888);

                        resData.data.data.hostLogo = {
                            baseUrl: "",
                            id: '',
                            p1: ''
                        }
                    }
                    this.curItem = resData.data.data;

                    console.log('this.curItem', this.curItem);

                })
            }



        })
    }


    /**
     * 第一步 基本信息配置：根据界面表单数据组织下发逻辑
     * @param curContestId  当前大赛id 用于判断当前操作是新建还是 更新
     * @param values 下发的参数
     * @param history
     * @param errorCallBack 接口报错后的回调
     */
    @action prepareUpdateContestParams = (values, history, errorCallBack) => {
        let me = this;

        let _postParam = this.curItem;
        let curContestId = this.curItem.contestProperty.id;

        _postParam = {
            ..._postParam,
            ...values,
            openTime: values['openTime'].valueOf(),
            openEndTime: values['openEndTime'].valueOf(),
            publicityTime: values['publicityTime'].valueOf(),
            publicityEndTime: values['publicityEndTime'].valueOf(),
            resourceCategory: values['resourceCategory'].join(','),
            contestType: values['contestType'] ? 1 : 0,
            hostLogo: this.curItem.hostLogo,
            webUrl: this.curItem.webUrl,
            appUrl: this.curItem.appUrl,
            webDetailUrl: this.curItem.webDetailUrl,
            appDetailUrl: this.curItem.appDetailUrl,
        }


        //用lodash递归赋值
        _postParam = _.merge(_postParam, {
            contestProperty: {
                openMsg: values['openMsg'],
                judgeMsg: values['judgeMsg'],
                prizeMsg: values['prizeMsg'],
                publicityMsg: values['publicityMsg'],
                closeMsg: values['closeMsg'],
                intro: values['attentionApp'],
                detailsShow: 0  // 这个是控制邀请赛是否可以围观的
            }
        });


        // add params if necessary

        //if need to show host logo
        if(values['hostType'] === 1) {
            _postParam.hostLogo =  this.curItem.hostLogo;
        }

        //邀请赛
        if(values['contestType']) {
            _postParam.contestProperty = assign(_postParam.contestProperty, {
                inviteCode: values['inviteCode'],
                numberLimit: values['numberLimit'],
            })
        }

        //根据判断 调用新建或者更新大赛信息的Api, 如果是更新的话需要
        let postParams = {
            jsonData: JSON.stringify(_postParam)
        }

        //如果是 更新大赛
        if(curContestId) {
            postParams['contestId'] = curContestId;
        }



        console.log('basic post postParams',  postParams);


        ContestApi.newOrUpdateContest(postParams).then((resData) => {
            console.log('resData', resData);

            //请求成功
            if(resData.data.status == 200) {
                runInAction(() => {

                    let msg = '';
                    let stateObj = {};

                    //编辑大赛
                    if(curContestId) {
                        msg = '大赛信息更新成功';
                        stateObj = {contestId: resData.data.contestId}
                    }else {
                        //新建大赛

                        msg = '大赛基本信息配置成功';
                        me.curItem.contestProperty.id = resData.data.contestId;

                        console.log(887777788,  me.curItem.contestProperty.id);
                    }

                    //设置大赛主题信息
                    let themeData = resData.data.data;

                    //这里要给主题分类里的 附加信息添加key，否则删除的时候，信息根据索引去展示会错乱（主题信息不用添加，因为后台有生成主题的id）
                    for(let i = 0,l = themeData.length; i<l; i++) {
                        let curThemeUploadInfo = themeData[i].uploadInfo;
                        if(curThemeUploadInfo.length) {
                            for(let j = 0,l = curThemeUploadInfo.length; j<l; j++) {
                                curThemeUploadInfo[j].id = ++uuid_theme_extrinfo;
                            }
                        }
                    }
                    me.themes = themeData;

                    message.success(msg);
                    //跳转到 大赛主题信息
                    history.push('/contest/theme?id=' + resData.data.contestId, stateObj);

                })



            }else {
                if(curContestId) {
                    message.error('大赛更新失败');
                }else {
                    message.error('大赛创建失败');
                }
                if(typeof errorCallBack == 'function') {
                    errorCallBack();
                }
            }


        });

    }


    /**
     * 删除根据主题示例图 通过主题索引
     * @param index
     */
    @action deleteExampleUrlByIndex = (index) => {
        this.themes[index].coverUrl = '';
    }



    /**
     * 新建或者更新大赛:  暂时不用，直接在组件中调用了API
     * @param params
     */
    // @action createOrUpdateContest = (postParams) => {
    //     ContestApi.newOrUpdateContest(postParams).then((resData) => {
    //         if(resData.status == 200) {
    //             message.success('This is a message of success');
    //         }
    //
    //     });
    // }


    /**
     * 通过key更新 curItem
     * @param key
     * @param value
     */
    @action setKeyValue = (key, value) => {
        //hostLogo 这个字段在编辑的时候 没有，需要

        console.log('this.curItem key', key);
        console.log('this.curItem value', value);

        this.curItem[key] = value;

        // if(!this.curItem[key]) {
        //     console.log(77777);
        //     extendObservable(this.curItem, {
        //         [key]: value
        //     });
        //
        //     console.log('this.curItem[key] 22', this.curItem[key]);
        //
        // }else {
        //     this.curItem[key] = value;
        // }

    }

    //初始化数据
    @action initData = () => {
        this.curItem = ContestEditCurItemInit;
    }


    //删除任务
    @action deleteContest = (contestItem) => {
        var me = this;
        let curList = me.contestList.items;

        let array = curList.filter(function (item) {
            return item.id !== contestItem.id;
        });

        me.contestList.items = array;

    }

    @action setContestTags = (val) => {
        this.curItem.tags = val;
    }



    /****  ***/
    /**** 大赛主题信息设置 ***/
    /****  ***/

    @action setContestThemeTags = (index, tags) => {
        let curThemes = this.themes;
        curThemes[index].tags = tags;
    }

    /**
     * 通过主题索引删除主题
     * @param themeIndex
     */
    @action deleteTheme = (themeIndex) => {
        this.themes.splice(themeIndex, 1);
    }


    /**
     * 添加主题
     */
    @action addTheme = () => {
        let tempTheme = assign({}, themeFormInitData);
        tempTheme.id = ++uuid_theme;
        this.themes = [...this.themes, tempTheme]
    }

    /**
     * 通过key更新 主题中的一级字段
     * @param key
     * @param value
     */
    @action setThemeKeyValue = (themeIndex, key, value) => {
        this.themes[themeIndex][key] = value;
    }


    /**
     * 通过key更新 主题中的二级字段
     * @param key
     * @param value
     */
    @action setThemeExtroInfoKeyValue = (themeIndex, infoIndex, key, value) => {
        this.themes[themeIndex].uploadInfo[infoIndex][key] = value;
    }

    /**
     * 根据主题索引和附加信息索引 删除
     * @param themeIndex
     * @param keyIndex
     * @private
     */
    @action deleteUploadInfo = (themeIndex, keyIndex) => {
        this.themes[themeIndex].uploadInfo.splice(keyIndex, 1);
    }


    /**
     * 添加附加信息
     * @param themeIndex
     * @param keyIndex
     * @private
     */
    @action addUploadInfo = (themeIndex) => {
        this.themes[themeIndex].uploadInfo.push({
            "id": ++uuid_theme_extrinfo,
            "name":"",
            "type":'',
            "content":""
        });
    }


    /**
     * 更新大赛主题信息
     */
    @action updateContestThemePost = (history, errorCallBack) => {
        let me = this;
        let _postParam = this.themes;
        let curContestId = this.curItem.contestProperty.id;



        if(!curContestId) {
            message.warning('大赛不存在，请从第一步开始编辑');
            if(typeof errorCallBack == 'function') {
                errorCallBack();
            }
            //这里其实应该 自动回到第一步
            return '';
        }

        ContestApi.updateContestThemes({
            contestId: curContestId,
            jsonData: JSON.stringify(_postParam)
        }).then((resData) => {

            console.log('resData', resData);

            if(resData.data.status == '200') {
                let columnData = resData.data.data;
                let defaultPage = resData.data.defaultTab;

                //新建大赛的时候  两个值（栏目状态和默认页面）是空 就不要赋值了，取本地的默认值： （目前这种情况不存在了）
                if(!Util.isEmptyObj(columnData)) {
                    me.columnSetting = columnData;
                }
                if(!Util.isEmptyObj(defaultPage)) {
                    me.defaultPage = defaultPage;
                }


                message.success('主题信息更新成功');
                //跳转到 大赛栏目设置
                history.push('/contest/column?id=' + resData.data.contestId, {})
            }else {
                message.success('大赛设置失败');
                if(typeof errorCallBack == 'function') {
                    errorCallBack();
                }
            }






        })

    }




    /****  ***/
    /**** 大赛栏目设置 ***/
    /****  ***/



    /**
     * 更新别名
     * @param key
     * @param value
     */
    @action updateAliasByKey = (key, value) => {
        this.columnSetting[key].displayName = value;
    }


    /**
     * 设置下拉框选项
     * @param key
     * @param inputKey
     * @param value
     */
    @action updateSelectSetting = (key, inputKey, value) => {
        let _cvalue = value;

        //这个只是表示 这个阶段要展示改页面
        if(value == 3) {
            _cvalue = true;
        }
        this.columnSetting[key][inputKey] = _cvalue;

        //3 是且默认，还要给相应的默认页面赋值
        if(value == 3) {
            let inputkeyToValue = {
                prepareShow: '101',
                collectShow: '102',
                reviewShow: '103',
                finishShow: '104'
            }

            let stage = inputkeyToValue[inputKey];

            console.log('*******');
            console.log('stage', stage);
            console.log('key', key);

            this.defaultPage[stage] = key;

        }
    }

    /**
     * 更新大赛栏目设置
     * @param history
     */
    @action updateContestColumnPost = (history, errorCallBack) => {
        let me = this;
        let _postParam = this.columnSetting;
        let defaultPage = this.defaultPage;
        let curContestId = this.curItem.contestProperty.id;


        console.log('********');
        console.log('contestId', curContestId);
        console.log('jsonData', _postParam);
        console.log('defaultPage', defaultPage);


        if(!curContestId) {
            message.warning('大赛不存在，请从第一步开始编辑');
            //这里其实应该 自动回到第一步
            if(typeof errorCallBack == 'function') {
                errorCallBack();
            }
            return '';
        }

        ContestApi.updateContestColumns({
            contestId: curContestId,
            jsonData: JSON.stringify(_postParam),
            defaultTab: JSON.stringify(defaultPage)
        }).then((resData) => {

            console.log('resData', resData);

            if(resData.data.status == 200) {
                me.prizeCategories = resData.data.data;
                message.success('状态栏目更新成功');
                //跳转到 大赛奖项设置界面
                history.push('/contest/prize?id=' + resData.data.contestId, {})

            }else {
                message.error('大赛设置失败');
                if(typeof errorCallBack == 'function') {
                    errorCallBack();
                }
            }



        })
    }


    /****  ***/
    /**** 奖项分类设置 ***/
    /****  ***/


    /**
     * 删除奖项分类
     * @param prizeCategoryIndex
     */
    @action deletePrizeCategory = (prizeCategoryIndex) => {
        this.prizeItems.splice(prizeCategoryIndex, 1);
    }

    /**
     * 通过key来改变奖项分组的名字
     * @param i
     * @param event
     */
    @action updatePrizeCateName = (i, name) => {
        this.prizeItems[i].data.groupName = name;
    }


    /**
     * 生成一个分类下的奖项，主要是uuid的生成
     */
    creatPrizeItem = () => {


    }
    /**
     * 添加获奖分组，最多添加两类： 摄影师和作品
     * 当有摄影师的时候 添加作品，反之，添加到摄影师下面
     * @returns {string}
     */
    @action addPrizeCate = () => {
        let me = this;
        let tempObj = assign({}, newPrizeCateData, {
            uuid: ++uuid_prize_category
        });
        // tempObj.data.prizes.push({
        //     name: '',
        //     uuid: uuid()
        // })

        this.prizeItems = [...this.prizeItems, assign({}, tempObj)];



        // let prizeUserLength = me.prizeCategories.prizeUser.prizes.length;
        // let prizeWorksLength = me.prizeCategories.prizeWorks.prizes.length;
        //
        // if(prizeUserLength && prizeWorksLength) {
        //     return ''
        // }
        //
        //
        // //两者都没有的时候，随便添加到一个分类（摄影师或者作品）下
        // if(!me.prizeCategories.prizeWorks.prizes.length) {
        //     me.prizeCategories.prizeWorks.prizes = [...me.prizeCategories.prizeWorks.prizes, {
        //         name: ''
        //     }];
        //     // 一次添加一个分类
        //     return ''
        // }
        //
        // if(!me.prizeCategories.prizeUser.prizes.length) {
        //     me.prizeCategories.prizeUser.prizes = [...me.prizeCategories.prizeUser.prizes, {
        //         name: ''
        //     }];
        //     return ''
        // }


    }


    /**
     * 根据原有 cateIndex 更改获奖分组类别
     * @param cateIndex
     * @param value
     */
    @action changePrizeCategory = (cateIndex, value) => {
        this.prizeItems[cateIndex].targetKey = value;
    }


    /**
     * 添加奖项
     * @param cateIndex
     */
    @action addPrizeItem = (cateIndex) => {
        let me = this;
        me.prizeItems[cateIndex].data.prizes = [...me.prizeItems[cateIndex].data.prizes,
            {name: '', uuid: uuid()}]

    }
    /**
     * 根据分组索引和奖项索引删除
     * @param cateIndex 分组索引
     * @param uuid 奖项索引
     */
        //TODO 调试到删除
    @action deletePrizeItem = (cateIndex, uuid) => {

        console.log('itemIndex', uuid);

        this.prizeItems[cateIndex].data.prizes = this.prizeItems[cateIndex].data.prizes.filter((item) => {
            return item.uuid !== uuid
        })
    }

    /**
     * 根据奖项分组索引 奖项索引 更新奖项
     * @param cateIndex
     * @param itemIndex
     * @param value
     */
    @action changePrizeItem = (cateIndex, itemIndex, value) => {
        this.prizeItems[cateIndex].data.prizes[itemIndex].name = value;
        this.prizeItems[cateIndex].data.prizes[itemIndex].title = value;
    }


    /**
     * 更新大赛奖项设置
     * @param history  router 路由对象
     */
    @action updateContestPrizePost = (history, errorCallBack) => {
        let me = this;
        let _postParam = '';
        let curContestId = this.curItem.contestProperty.id;


        console.log('********');
        console.log('contestId', curContestId);


        //再下发数据，先给当前的任务赋值
        let tempParams = {};
        let formData = this.prizeItems;
        //TODO: 这里从store中取数据
        let originalData = this.prizeCategories;


        console.log('formData xiaoxiaoliu', formData);

        //TODO: 做到组装数据了
        originalData.prizeUser.groupNames = '';
        originalData.prizeWorks.groupNames = '';
        let _userGroupNames = [];
        let _worksGroupNames = [];
        let _prizeUserItems = [];
        let _prizeWorksItems = [];


        for(let i = 0,l = formData.length; i<l; i++) {
            let item = formData[i];
            if(item.targetKey == 'prizeUser') {
                 //会在遍历奖项的时候  填充

                // 这里给prizes中的item 添加  level  contestShowName groupName 后台必须要的字段
                for(let i = 0,l = item.data.prizes.length; i<l; i++) {
                    let _item = item.data.prizes[i];
                    _item.level = i;
                    _item.contestShowName = 'prizeUser';
                    _item.groupName = item.data.groupName;
                    _prizeUserItems.push(_item);

                    if(!~_userGroupNames.indexOf(item.data.groupName)) {
                        _userGroupNames.push(item.data.groupName);
                    }
                }

            }else if(item.targetKey == 'prizeWorks') {
                originalData.prizeWorks.prizes = item.data.prizes;

                // 这里给prizes中的item 添加  level  contestShowName groupName 后台必须要的字段
                for(let i = 0,l = item.data.prizes.length; i<l; i++) {
                    let _item = item.data.prizes[i];
                    _item.level = i;
                    _item.contestShowName = 'prizeWorks';
                    _item.groupName = item.data.groupName;
                    _prizeWorksItems.push(_item);

                    if(!~_worksGroupNames.indexOf(item.data.groupName)) {
                        _worksGroupNames.push(item.data.groupName);
                    }
                }


            }


        }

        originalData.prizeUser.groupNames = _userGroupNames.join(',');
        originalData.prizeWorks.groupNames = _worksGroupNames.join(',');

        originalData.prizeUser.prizes = _prizeUserItems;
        originalData.prizeWorks.prizes = _prizeWorksItems;



        console.log('lulululu', originalData);

        // return '';


        if(!curContestId) {
            message.warning('大赛不存在，请从第一步开始编辑');
            if(typeof errorCallBack == 'function') {
                errorCallBack();
            }
            //这里其实应该 自动回到第一步
            return '';
        }

        ContestApi.updateContestPrizeCategories({
            contestId: curContestId,
            jsonData: JSON.stringify(originalData),
        }).then((resData) => {

            console.log('resData', resData);

            if(resData.data.status == 200) {
                message.success('大赛设置成功');
                //跳转到 大赛奖项设置界面
                history.push('/contest-admin', {})

            }else {
                message.success('大赛设置失败');
                if(typeof errorCallBack == 'function') {
                    errorCallBack();
                }
            }



        })
    }




}

const ContestListAdmin = new ContestListStore();


export default ContestListAdmin;

