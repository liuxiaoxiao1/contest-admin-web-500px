/**
 * Created by liuxiaoxiao1 on 2018/7/13.
 * 大赛颁奖
 *
 */
import React from 'react';
import {observable, useStrict, action, runInAction} from 'mobx';

import { message } from 'antd'
import assign from 'object-assign'

import ContestApi from '../lib/Api/ContestApi'

useStrict(true);

var ContestPrizeCateConfig =
    {
        loaded: false,
        data: {
            "prizeUser": {
                "groupNames": "",
                "publicityShow": false,
                "collectShow": false,
                "finishShow": true,
                "prepareShow": false,
                "displayName": "",
                "prizes": [
                    {
                        "contestId": "",
                        "groupName": "",
                        "level": 0,
                        "count": 0,
                        "name": "",
                        "createdTime": '',
                        "id": "",
                        "contestShowName": "prizeUser",
                        "title": ""
                    }],
                "name": "prizeUser",
                "alias": "",
                "outLink": false,
                "outLinkUrl": "",
                "reviewShow": false
            },
            "prizeWorks": {
                "groupNames": "",
                "publicityShow": false,
                "collectShow": false,
                "finishShow": true,
                "prepareShow": false,
                "displayName": "",
                "prizes": [
                    {
                        "contestId": "",
                        "groupName": "",
                        "level": 0,
                        "count": 0,
                        "name": "",
                        "createdTime": '',
                        "id": "",
                        "contestShowName": "prizeWorks",
                        "title": ""
                    }
                    ],
                "name": "prizeWorks",
                "alias": "",
                "outLink": false,
                "outLinkUrl": "",
                "reviewShow": false
            },
        },

    }



let prizeCate = {
    "groupName": "",
    "key": "", // prizeUser | prizeWorks
    "prizes": [],
}

var ContestPrizeCateConfigFormat =
    {
        // loaded: false,
        data: []  //所有奖项分组放在一起
    }


//这个奖项记录 只是某一个奖项的记录，奖项会动态的变化
// 这个数据也会动态的变化为不同奖项的 数据
var ContestPrizeRecordList =
    {
        loaded: false,
        items: []
    }


class ContestPrizeConfig {
    //大赛奖项配置信息
    @observable curContestPrizeConfig = assign({}, ContestPrizeCateConfig);

    //格式化后的奖项设置
    @observable curContestPrizeConfigFormat = assign({}, ContestPrizeCateConfigFormat);


    //大赛某个奖项的 获奖记录数据
    @observable curContestPrizeRecord = assign({}, ContestPrizeRecordList);


    /**
     * 格式化 奖项分组信息，主要是根据 groupNames 拆分 分组
     */
    @action formatContestPrizeConfig = () => {

        //颁奖对象是人的
        if(this.curContestPrizeConfig.data.prizeUser.prizes.length) {
            let _groupsNames = this.curContestPrizeConfig.data.prizeUser.groupNames.split(',');

            //遍历所有奖项的时候，用于分组
            let _prizeItemsGroup = {

            };

            //归类分组的逻辑
            for(let i = 0,l = this.curContestPrizeConfig.data.prizeUser.prizes.length; i < l; i++) {
                let _item = this.curContestPrizeConfig.data.prizeUser.prizes[i];

                if(_prizeItemsGroup[_item.groupName]) {
                    _prizeItemsGroup[_item.groupName].push(_item);
                }else {
                    _prizeItemsGroup[_item.groupName] = [_item];
                }
            }

            //根据已经分好组的奖项，填充回来
            for(let i = 0,l = _groupsNames.length; i < l; i++) {

                this.curContestPrizeConfigFormat.data.push({
                    "groupName": _groupsNames[i],
                    "key": "prizeUser", // prizeUser | prizeWorks
                    "prizes": _prizeItemsGroup[_groupsNames[i]],
                });
            }


        }

        //颁奖对象是作品的
        if(this.curContestPrizeConfig.data.prizeWorks.prizes.length) {
            let _groupsNames = this.curContestPrizeConfig.data.prizeWorks.groupNames.split(',');

            //遍历所有奖项的时候，用于分组
            let _prizeItemsGroup = {

            };

            //归类分组的逻辑
            for(let i = 0,l = this.curContestPrizeConfig.data.prizeWorks.prizes.length; i < l; i++) {
                let _item = this.curContestPrizeConfig.data.prizeWorks.prizes[i];

                if(_prizeItemsGroup[_item.groupName]) {
                    _prizeItemsGroup[_item.groupName].push(_item);
                }else {
                    _prizeItemsGroup[_item.groupName] = [_item];
                }
            }

            //根据已经分好组的奖项，填充回来
            for(let i = 0,l = _groupsNames.length; i < l; i++) {
                this.curContestPrizeConfigFormat.data.push({
                    "groupName": _groupsNames[i],
                    "key": "prizeWorks", // prizeUser | prizeWorks
                    "prizes": _prizeItemsGroup[_groupsNames[i]],
                });
            }

        }



    }


    /**
     * TODO: 获取大赛奖项配置信息
     * @param contestId
     */
    @action getCurContestPrizeConfig = (contestId) => {

        ContestApi.getContestPrizeConfig(contestId, true).then((resData) => {
            console.log('contest prize config resData', resData);

            runInAction(() => {
                if(resData.data.status == '200') {
                    this.curContestPrizeConfig.data = resData.data.data;
                    this.curContestPrizeConfig.loaded = true;

                    //格式化一下 数据
                    this.formatContestPrizeConfig();
                }else {
                    message.error('网络错误，请稍后再试')
                }
            })

        })

    }



    /**
     * 获取 某个奖项的获奖纪录
     * @param prizeId  奖项id
     * @param contestId  当前大赛id
     */
    @action getPrizeRecordList = (prizeId) => {
        ContestApi.getContestPrizeRecordList(prizeId).then((resData) => {
            console.log('resData', resData);
            runInAction(() => {
                if(resData.data.status == '200') {
                    this.curContestPrizeRecord.items = resData.data.data;
                    this.curContestPrizeRecord.loaded = true;
                }
            })
        })
    }


    /**
     * 添加 某个奖项的获奖记录
     * @param prizeId   奖项id
     * @param resId     作品/用户/部落 id
     * @param callBack  添加成功后的回调，需要在添加成功后，移除本地数据
     */
    @action addPrizeRecord = (prizeId, resId, callBack) => {
        ContestApi.addPrizeRecord(prizeId, resId).then((resData) => {
            console.log('resData', resData);

            runInAction(() => {
                if(resData.data.status == '200') {
                    //这里的提示信息忽略了资源类型，比较笼统
                    message.success('添加成功');
                    this.curContestPrizeRecord.items.push(resData.data.prizeRecord);
                    if(typeof callBack == 'function') {
                        callBack();
                    }

                }else if(resData.data.status == '500') {  //TODO: 这里的错误码 有必要再细化一下
                    message.error('添加失败：资源不存在');
                }

            })

        })
    }



    /**
     * 删除 某个奖项的获奖记录
     * @param prizeRecordId   奖项记录id
     * @param resId     作品/用户/部落 id
     * @param callBack  添加成功后的回调，需要在添加成功后，移除本地数据
     */
    @action deletePrizeRecord = (prizeRecordId, callBack) => {

        let curItem = this.curContestPrizeRecord.items.find((item, index)=> {
            return item.id == prizeRecordId
        });


        ContestApi.deletePrizeRecord(prizeRecordId).then((resData) => {
            console.log('resData', resData);


            //TODO: 下面几行是本地测试代码
            // runInAction(() => {
            //     this.curWorkItemPrize.items.push(selectId);
            //     callBack()
            // })
            //
            //
            //
            // return '';


            //下面的判断比较多
            runInAction(() => {
                if(resData.data.status == '200') {

                    message.success('移除成功');
                    this.curContestPrizeRecord.items.remove(curItem);

                }else if(resData.data.status == '500') {  //TODO: 这里的错误码 有必要再细化一下
                    message.error('添加失败：资源不存在');
                }

            })

        })
    }


    /**
     *更新 优秀作品或优秀摄影师
     * @param selectType   user | works   用户或者作品
     * @param selectId
     * @param updateType   add |  remove  添加或者移除
     * @param callBack     添加成功后的回调，需要在添加成功后，移除本地数据
     */
    @action updateSelect = (selectType, selectId, updateType, callBack) => {
        let contestId = this.curItem.id;


        ContestApi.updateSelect(contestId, selectType, selectId, updateType).then((resData) => {
            console.log('resData', resData);



            //TODO: 下面几行是本地测试代码
            // runInAction(() => {
            //     this.curWorkItemPrize.items.push(selectId);
            //     callBack()
            // })
            //
            //
            //
            // return '';


            //下面的判断比较多
            runInAction(() => {
                if(resData.data.status == '200') {
                    // this.curWorkItemPrize.loaded = true;
                    // this.curWorkItemPrize.items = resData.data.data;

                    //这里的提示信息忽略了资源类型，比较笼统
                    if(updateType === 'add') {
                        message.success('添加成功');
                        if(selectType === 'user') {
                            this.curUsersPrize.items.push(selectId);
                            if(typeof callBack == 'function') {
                                callBack();
                            }
                        }else if(selectType === 'works') {
                            this.curWorkItemPrize.items.push(selectId);
                            if(typeof callBack == 'function') {
                                callBack();
                            }
                        }


                    }else if(updateType === 'remove') {
                        message.success('移除成功');
                        if(selectType === 'user') {
                            this.curUsersPrize.items.remove(selectId);
                        }else if(selectType === 'works') {
                            this.curWorkItemPrize.items.remove(selectId);
                        }
                    }

                }else if(resData.data.status == '500') {  //TODO: 这里的错误码 有必要再细化一下
                    if(updateType === 'add') {
                        message.error('添加失败：资源不存在');
                    }else if(updateType === 'remove') {
                        message.error('移除失败：资源不存在');
                    }
                }

            })

        })
    }




}

const ContestPrizeConfigStore = new ContestPrizeConfig();



export default ContestPrizeConfigStore;

