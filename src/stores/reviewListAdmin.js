/**
 * Created by liuxiaoxiao1 on 2018/3/1.
 */
import React from 'react';
import {observable, useStrict, action, runInAction} from 'mobx';
import {Ajax} from '../utils/utils'
import Util from '../utils/web-utils'
import assign from 'object-assign'

useStrict(true);

var ReviewListAdminDataInit =
    {
        items: [],
        totalRecord: 0,
        totalPage: 0,
        hasNext: true,
        loaded:false,
        page: 0,
        size: 20,
    }

var ReviewListAdminCurItemInit = {
    id: '',
    name: '',
    description: '',
    status: '', //状态： 0=ongoing 1=suspended
    reviewTaskType: '',//类型： 0=selection 1=elimination
    reviewItemLimit: '', //至少一件（选出或者淘汰）
    reviewItemLimitReach: 0, //Whether the review item limit has to be reached before submission, 0=false 1=true
    reviewSummary: 0, //Whether a review summary is required for each review item, 0=false 1=true
    file: {}
}


class ReviewListStore {
    @observable reviewLists = ReviewListAdminDataInit;
    @observable curItem = ReviewListAdminCurItemInit;


    @action setData = (curItem) => {
        this.curItem = assign(this.curItem, curItem);
    };

    @action overrideData = (curItem) => {
        this.curItem = curItem;
    }

    //初始化数据，新建评审任务的时候使用
    @action initData = () => {
        this.curItem = ReviewListAdminCurItemInit;
    }
    @action getList = (page) => {
        var me = this;
        me.reviewLists.loaded = false;
        Ajax.get('/api/admin/review_task',
            {
                page: page,
                size: me.reviewLists.size
            }
        ).then((res) => {
            runInAction(()=> {
                console.log('taskList777', res);
                me.reviewLists.page = page;
                me.reviewLists.items = res.data;
                me.reviewLists.totalRecord = res.totalRecord;
                me.reviewLists.totalPage = res.totalPage;
                me.reviewLists.loaded = true;
            })
        })

    }

    //新建任务
    @action newTask = () => {
        var me = this;
        return new Promise((resolve, reject) => {
            let _postData = new FormData();
            for (let attr in this.curItem) {
                if(attr == 'id') {
                    continue;
                }
                if(attr == 'file' && !Util.isEmptyObj(this.curItem[attr])) {
                    _postData.append(attr, this.curItem[attr]);
                }else if((attr !== 'file') && (this.curItem[attr] !== '') && (typeof this.curItem[attr] != 'undefined')
                    && (this.curItem[attr] != null)) {
                    _postData.append(attr, this.curItem[attr]);
                }
            }

            Ajax.post('/api/admin/review_task', _postData, true, true).then((resData) => {
                console.log('upload resData', resData);
                resolve(resData);
                // runInAction(()=> {
                //
                // })

            })
        })

    }
    //编辑任务
    @action editTask = () => {
        var me = this;
        return new Promise((resolve, reject) => {
            let _postData = new FormData();
            for (let attr in this.curItem) {
                if(attr == 'file' && !Util.isEmptyObj(this.curItem[attr])) {
                    _postData.append(attr, this.curItem[attr]);
                }else if((attr !== 'file') && (this.curItem[attr] !== '') && (typeof this.curItem[attr] != 'undefined')
                    && (this.curItem[attr] != null)) {
                    _postData.append(attr, this.curItem[attr]);
                }
            }

            Ajax.post('/api/admin/review_task/update', _postData, true, true).then((resData) => {
                console.log('update resData', resData);
                resolve(resData);
                // runInAction(()=> {
                //
                // })

            })
        })
    }
    //删除任务
    @action deleteTask = (item) => {
        var me = this;
        return new Promise((resolve, reject) => {

            Ajax.delete('/api/admin/review_task/' + item.id, {id: item.id}, true).then((resData) => {
                resolve(resData)
            })
        })

    }

    @action setTaskType = (val) => {
        this.curItem.reviewTaskType = val;
    }


}

const ReviewListAdmin = new ReviewListStore();

console.log('ReviewListStore.cutItem', ReviewListAdmin.curItem);

export default ReviewListAdmin;

