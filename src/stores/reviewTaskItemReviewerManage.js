/**
 * Created by liuxiaoxiao1 on 2018/3/1.
 */
import React from 'react';
import {message} from 'antd'
import {observable, useStrict, action, runInAction} from 'mobx';
import {Ajax} from '../utils/utils'
import Util from '../utils/web-utils'
import ReviewTaskItem from './reviewListAdmin'
import assign from 'object-assign'

useStrict(true);

var ReviewTaskItemReviewerInitData =
    {
        source: {
            page: 0,
            size: 20,
            hasNext: true,
            search: '',
            items: []
        },
        target: {
            page: 0,
            size: 20,
            hasNext: true,
            items:[]
        }
    }

let tempData = assign({}, ReviewTaskItemReviewerInitData)


class ReviewerListStore {
    @observable source = tempData.source;
    @observable target = tempData.target;



    @action setSourceSearchValue(searchVal) {
        this.source.search = searchVal;
    }

    //获取初始化数据，取待选用户集合数据
    @action getInitSourceData = () => {
        this.source.page = 0;
        this.source.items = [];
        this.source.hasNext = true

        this.getSourceData();
    }

    //取待选用户集合数据，支持分页
    @action getSourceData = () => {
        let getParams = {
            review_task_id: ReviewTaskItem.curItem.id,
            page: ++this.source.page,
            size: this.source.size,
        }
        if(this.source.search) {
            getParams.search = this.source.search;
        }
        Ajax.get('/api/admin/reviewer/candidate', getParams).then(action((resData) => {
            runInAction(() => {
                let _source = this.source;
                if (resData.data.length) {
                    _source.items = [..._source.items, ...resData.data];
                    if(resData.data.length < _source.size) {
                        _source.hasNext = false;
                    }else {
                        _source.hasNext = true;
                    }

                } else {
                    _source.hasNext = false;
                }
            })

        }))
    }
    //初始化数据，取已设定用户集合数据
    @action getTargetData = () => {
        //下面拼链接   异步后的数据更改需要再用action包起来
        Ajax.get('/api/admin/reviewer', {
            review_task_id: ReviewTaskItem.curItem.id,
            page: ++this.target.page,
            size: this.target.size,
        }).then(action((resData) => {
            runInAction(() => {
                let _target = this.target;
                if (resData.data.length) {
                    _target.items = [..._target.items, ...resData.data];
                    if(resData.data.length < _target.size) {
                        _target.hasNext = false;
                    }else {
                        _target.hasNext = true;
                    }
                } else {
                    _target.hasNext = false;
                }
            })
        }))
    }

    //添加评委
    @action setReviewerByItem = (data) => {
        //这里先在客户端做数据更改操作
        let dataIndex = this.source.items.findIndex(item => item.id == data.id);
        this.source.items.splice(dataIndex, 1);

        data.isReviewer = true;



        let postData = {
            reviewTaskId: ReviewTaskItem.curItem.id,
            userId: data.id  //用户id
        }

        Ajax.postJson('/api/admin/reviewer', postData).then((resData) => {
            runInAction(() => {
                if (!Util.isEmptyObj(resData)) {
                    resData.user = data
                    this.target.items.push(resData);
                    message.success('添加评委成功')
                } else {
                    //错误信息处理
                }
            })


        })
    }
    //取消评委
    @action cancelReviewerByItem = (data) => {
        //这里先在客户端做数据更改操作
        let dataIndex = this.target.items.findIndex(item => item.id == data.id);
        this.target.items.splice(dataIndex, 1);

        data.isReviewer = false;
        this.source.items.push(data.user);


        let postData = {}
        //data.id 是评委id
        Ajax.delete('/api/admin/reviewer/' + data.id).then((resData) => {
            if (!Util.isEmptyObj(resData)) {
                message.success('取消评委成功')
            } else {
                //错误信息处理
            }

        })
    }



    @action initAllData = () => {
        console.log(8787878);
        this.source = assign({}, ReviewTaskItemReviewerInitData.source);
        this.target = assign({}, ReviewTaskItemReviewerInitData.target);
        console.log('this source', this.source);
    }


}

const ReviewerList = new ReviewerListStore();


export default ReviewerList;

