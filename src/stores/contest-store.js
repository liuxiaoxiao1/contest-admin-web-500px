/**
 * Created by liuxiaoxiao1 on 2018/3/1.
 * 大赛管理相关的store
 *
 */
import React from 'react';
import {observable, useStrict, action, runInAction} from 'mobx';

import { message } from 'antd'

import Util from '../utils/web-utils'
import assign from 'object-assign'

import ContestApi from '../lib/Api/ContestApi'

useStrict(true);

var ContestListInit =
    {
        items: [],
        totalRecord: 0,
        totalPage: 0,
        hasNext: true,
        loaded: false, //TODO真是环境要改过来
        // page: 0,
        // size: 20,
    }

var ContestListAdminCurItemInit = {
    id: '',
    name: ''
}


class ContestListStore {
    @observable contestList = assign({}, ContestListInit);
    @observable curItem = ContestListAdminCurItemInit;
    //入围/优秀 作品
    @observable curWorkItemPrize = {
        items:[],
        loaded: false
    };

    //入围/优秀 摄影师
    @observable curUsersPrize = {
        items:[],
        loaded: false
    };

    @observable _routeProps = null;


    /**
     * 主要为了取全局的history以及 match.params
     * @param routeProps
     */
    @action setRouteProps = (routeProps) => {
        this._routeProps = routeProps;
    }
    @action getRouteProps = () => {
        return this._routeProps;
    }

    @action setData = (curItem) => {
        this.curItem = assign(this.curItem, curItem);
    };

    @action overrideData = (curItem) => {
        this.curItem = curItem;
    }


    @action getList = (page) => {
        var me = this;
        me.contestList.loaded = false;

        ContestApi.getContestList(page, me.contestList.size).then((res)=> {
            runInAction(()=> {
                me.contestList.items = res.data.data;
                me.contestList.loaded = true;
                me.contestList.totalRecord = res.data.iTotalRecords;

                // me.reviewLists.items = res.data;
                // me.reviewLists.totalRecord = res.totalRecord;
                // me.reviewLists.totalPage = res.totalPage;
                // me.reviewLists.loaded = true;

            })
        })


        // Ajax.get('/contest/v4/back/list',
        //     {
        //         page: page,
        //         size: me.contestList.size
        //     }
        // ).then((res) => {
        //     runInAction(()=> {
        //         console.log('res--xx', res);
        //         me.contestList.items = res.data;
        //         me.contestList.loaded = true;
        //
        //         // me.reviewLists.page = page;
        //         // me.reviewLists.items = res.data;
        //         // me.reviewLists.totalRecord = res.totalRecord;
        //         // me.reviewLists.totalPage = res.totalPage;
        //         // me.reviewLists.loaded = true;
        //
        //     })
        // })

    }


    //删除任务
    @action deleteContest = (contestItem) => {
        var me = this;
        let curList = me.contestList.items;

        //TODO: API 删除  待验证
        return new Promise((resolve, reject) => {
            ContestApi.deleteContest(contestItem.id).then( (resData) => {
                runInAction(() => {
                    let array = curList.filter(function (item) {
                        return item.id !== contestItem.id;
                    });

                    me.contestList.items = array;

                    resolve(resData);
                })
            });
        })




    }

    /**
     *
     * @param id 大赛id
     * @param key
     * @param value
     * @private
     */
     _changeAttrByContestId = (id, key, value) => {
        let me = this;

        console.log(`xiaoxiaoliu-${id}` + key,  value);

        let curList = me.contestList.items;

        for(let i = 0,l = curList.length; i<l; i++) {
            let item = curList[i];
            if(item.id == id) {
                item[key] = value;
                return '';
            }
        }

    }

    /**
     * @param contestItem
     * @param value
     * @returns {Promise}
     */

    @action setCurContestRating = (contestItem,  value) => {
        let me = this;

        return new Promise((resolve, reject) => {
            ContestApi.setContestRating(contestItem.id, value).then( (resData) => {
                runInAction(() => {
                    if(resData.data.status == '200') {
                        me._changeAttrByContestId(contestItem.id, 'rating', value);
                        this.curItem['rating'] = value;
                    }

                    resolve(resData);
                })
            });
        })


    }


    /**
     * 列表是否显示
     * @param contestItem
     * @param value
     * @returns {Promise}
     */
    @action setCurContestListShow = (contestItem,  value) => {
        let me = this;

        return new Promise((resolve, reject) => {
            ContestApi.setContestListShow(contestItem.id, value).then( (resData) => {
                runInAction(() => {
                    me._changeAttrByContestId(contestItem.id, 'listShow', value);
                    this.curItem['listShow'] = value;
                    resolve(resData);
                })
            });
        })
    }

    /**
     * 是否激活
     * @param contestItem
     * @param value
     * @returns {Promise}
     */
    @action setCurContestOnline = (contestItem, value) => {
        let me = this;

        return new Promise((resolve, reject) => {
            ContestApi.setContestOnline(contestItem.id, value).then( (resData) => {
                runInAction(() => {
                    me._changeAttrByContestId(contestItem.id, 'online', value);
                    this.curItem['online'] = value;
                    resolve(resData);
                })
            });
        })
    }




    /**
     * 设置优秀作品 和 优秀摄影师
     */


    /**
     * 获取优秀作品或者优秀摄影师列表
     * @param type  优秀作品或者优秀摄影师  user | works
     * @param contestId  当前大赛id
     */
    @action getSelectedList = (type) => {
        let contestId = this.curItem.id;


        ContestApi.getContestSelectList(contestId, type, 1, 200).then((resData) => {
            console.log('resData', resData);
            runInAction(() => {
                if(resData.data.status == '200') {
                    if(type === 'works') {
                        this.curWorkItemPrize.loaded = true;
                        this.curWorkItemPrize.items = resData.data.data;
                    }else if(type === 'user') {
                        this.curUsersPrize.loaded = true;
                        this.curUsersPrize.items = resData.data.data;
                    }

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

const ContestListAdmin = new ContestListStore();



export default ContestListAdmin;

