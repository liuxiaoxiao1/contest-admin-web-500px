/**
 * Created by liuxiaoxiao1 on 2018/2/28.
 */
import React from 'react';
import assign from 'object-assign';
import Button from '../ui/Button'
import {Progress, Pagination, Modal, message} from 'antd'
import {Ajax} from '../../utils/utils'
import { autobind } from 'core-decorators'
import './ReviewImagesList.less'
import PropTypes from 'prop-types'


import ReviewImgsList from '../ReviewImgsList'
import Loading from '../Loading'


import Util from '../../utils/web-utils'


import {
    REVIEW_DETAIL_TAB_CONFIRM,
    REVIEW_DETAIL_TAB_WAIT,
    REVIEW_DETAIL_TAB_NON_REVIEWED
} from '../../constants'

const confirm = Modal.confirm;


class ReviewImagesList extends React.PureComponent {
    constructor(props) {
        super(props);

        console.log('xxl-match', this.props.match);
        this.state = {
            curTask: {

            },
            page: 1,
            size: 20,
            items: [],
            loaded: false,
            totalCount: '',
            searchKey: '',
            hasNext: true,
            curTab: REVIEW_DETAIL_TAB_NON_REVIEWED //0:已确认(可能是入选的，也可能是淘汰的) 1：待定 2：未评
        }
    }

    componentDidMount() {
        this.getTaskDetail();
        this._getData();
    }

    componentDidUpdate() {

    }

    getTaskDetail() {
        let me = this;
        let taskId = me.props.match.params.id;

        Ajax.get('/api/review_task/' + taskId, true).then((resData) => {
            console.log('resData', resData);
            if(resData && !resData.status) {
                me.setState({
                    curTask: resData
                })
            }else if(resData.status == 404){

            }
        })

    }


    submitClick() {
        var me = this;
        let curTask = this.state.curTask;

        if(curTask.reviewTask.reviewItemLimitReach && (curTask.reviewItemProgress < curTask.reviewTask.reviewItemLimit)) {
            Modal.info({
                title: '提示',
                cancelText: '取消',
                okText: '好的',
                content: (
                    <div className="submit-info-content">
                        尊敬的评委，本次评审任务要求完成足量作品的入选/淘汰才可提交，您目前完成了
                        <span className="info-num">{curTask.reviewItemProgress}/{curTask.reviewTask.reviewItemLimit}</span>，辛苦您了
                    </div>
                ),
                onOk() {

                },
            });
        }else {
            Modal.confirm({
                title: '提示',
                cancelText: '取消',
                okText: '好的',
                content: (
                    <div className="submit-info-content">
                        尊敬的评委，请注意，您的评审结果一旦提交就无法撤回，请谨慎操作，确认提交么？
                    </div>
                ),
                onOk() {
                    me.submitTask()
                },
            });
        }



    }

    submitTask() {
        let me = this;
        let taskId = me.props.match.params.id;

        Ajax.post('/api/review_task/' + taskId + '/submit', {}, true).then((resData) => {
            console.log('submit task', resData);
            //200 这个后台反馈方案需要研究下
            if(typeof resData == 'undefined') {
                me.props.history.push('/review-list-my')
            }
        })


        // confirm({
        //     title: '提示',
        //     content: '尊敬的评委，请注意，您的评审结果一旦提交就无法撤回，请谨慎操作，确认提交么？',
        //     okText: '是',
        //     okType: 'primary',
        //     cancelText: '否',
        //     onOk() {
        //         console.log('OK');
        //         //TODO: 提交任务
        //         Ajax.post('/api/review_task/' + taskId + '/submit', {}, true).then((resData) => {
        //             console.log('submit task', resData);
        //             if(99) {
        //
        //             }
        //
        //         })
        //
        //         me.props.history.push('/review-list-my')
        //
        //
        //
        //     },
        //     onCancel() {
        //         console.log('Cancel');
        //     },
        // });

    }

    /**
     * 取数据
     * @private
     * @param dataType 同tabIndex //0:已确认(可能是入选的，也可能是淘汰的) 1：待定 2：未评;  0=read未评 1=select入选 2=eliminate淘汰 3=wait 待定
     */
    _getData() {
        //TODO: 取数据  xiaoxiaoliu 做到加載當前页的数据了
        let me = this;
        let item = this.state.curTask.reviewTask;
        let dataType = '';
        console.log('this.state.curTabthis.state.curTab', this.state.curTab);
        switch (this.state.curTab) {
            case REVIEW_DETAIL_TAB_CONFIRM: {
                //再根据任务类型区分
                if (item.reviewTaskType === 0) {
                    dataType = 1
                } else {
                    dataType = 2
                }
                break;
            }
            case REVIEW_DETAIL_TAB_WAIT: {
                dataType = 3;
                break;
            }
            case REVIEW_DETAIL_TAB_NON_REVIEWED: {
                dataType = 0;
                break;
            }

        }


        //加一个过渡状态
        this.setState({
            loaded: false
        })

        Ajax.get('/api/review_task/' + this.props.match.params.id + '/review_item', {
            vote_type: dataType, //0=select 1=eliminate 2=wait TODO: 参数不够
            page: this.state.page,
            size: this.state.size
        }).then((resData) => {

            console.log('resData', resData);

            if(resData.data.length) {
                let tempData = [...resData.data];
                this.setState({
                    items: tempData,
                    totalCount: resData.totalRecord,
                    loaded: true
                    //hasNext: true
                })
            }else {
                this.setState({
                    loaded: true
                })
            }

        })
    }

    @autobind
    onPageChange(pageNumber) {
        console.log('pageNumber', pageNumber);
        this.setState({
            page: pageNumber
        },  () => {
            this._getData();
        })
    }


    /**
     * 供大图详情页的翻页使用
     */
    @autobind
    loadPrePage() {
        let _p = --this.state.page;
        let callBack = (res) => {

        }
        this.setState({page: _p}, this._getData());

    }

    /**
     * 供大图详情页的翻页使用
     */
    @autobind
    loadNextPage() {
        let _p = ++this.state.page;
        this.setState({page: _p}, this._getData());

    }


    //具体的对作品的操作方法 1=select入选 2=eliminate淘汰 3=wait 待定
    //TODO: 淘汰的是否需要确认下，目前没确认
    handleWorkAction(itemId, action, summary, callBack) {
        let me = this;
        if(!itemId) {
            return '';
        }
        let params = {
            id: itemId,
            voteType: action
        }
        //let msgStr = '';
        if(summary) {
            params.voteSummary = summary;
        }
        // if(action === 0) {
        //
        // }else if(action === 1) {
        //
        // }else if(action === 2) {
        //
        // }


        Ajax.putJson('/api/review_task/' + this.props.match.params.id + '/review_item', params, true).then((resData) => {
            console.log('resData', resData);
            if(resData && !resData.status) {
                message.success('操作成功');
                //这里需要在客户端 临时性的删除数据，需要判断下 tab与数据操作的一致性，不同则删除该数据，否则不操作
                switch (me.state.curTab) {
                    case REVIEW_DETAIL_TAB_CONFIRM: {
                        //再根据任务类型区分
                        if (action === 1 || action === 2) {
                            return ''
                        }
                        break;
                    }
                    case REVIEW_DETAIL_TAB_WAIT: {
                        if (action === 3) {
                            return ''
                        }
                        break;
                    }
                    case REVIEW_DETAIL_TAB_NON_REVIEWED: {
                        if (action === 0) {
                            return ''
                        }
                        break;
                    }
                }



                //过滤掉已经操作的作品
                let itemTemp = assign([], this.state.items);
                let filterArray = itemTemp.filter((item, index) => {
                    return item.id != itemId;
                })

                let curTask = assign({}, this.state.curTask);
                if((action == 1) || (action == 2)) {
                    curTask.reviewItemProgress += 1;
                }

                //Begin: Bug fix #4630, 入选/淘汰 列表-->待定后，要将进度更新 -1 20180502
                if((me.state.curTab == REVIEW_DETAIL_TAB_CONFIRM) && (action === 3)) {
                    curTask.reviewItemProgress -= 1;
                }
                //End: Bug fix #4630, 入选/淘汰 列表-->待定后，要将进度更新 -1 20180502


                me.setState({
                    items: filterArray,
                    curTask: curTask
                })


                if(typeof callBack == 'function') {
                    callBack();
                }

            }
        })

    }

    


    //确认操作的方法：可以是入选 可以是淘汰   0=read未评 1=select入选 2=eliminate淘汰 3=wait 待定
    confirmAction(itemId, summary = '', callBack) {
        console.log('itemID', itemId);
        let me = this;
        let item = this.state.curTask.reviewTask;
        let action = 1; // 入选
        if (item.reviewTaskType === 1) {
            action = 2; // 淘汰
        }
        if(typeof callBack == 'function') {
            //目前主要用于关闭掉评论窗口
            this.handleWorkAction(itemId, action, summary, callBack);
        }else {
            this.handleWorkAction(itemId, action, summary);
        }


    }

    //待定操作  1=select入选 2=eliminate淘汰 3=wait 待定
    waitAction(itemId) {
        this.handleWorkAction(itemId, 3);
    }


    /**
     * 切换tab的时候
     * @param tabIndex
     */
    onTabChange(tabIndex) {
        let me = this;
        if (tabIndex === me.state.curTab) {
            return
        }

        //初始化原数据
        this.setState({
            page: 1,
            size: 20,
            items: [],
            loaded: false,
            mainContentLoaded: false,
            totalCount: '',
            searchKey: '',
            hasNext: true,
            curTab: tabIndex,
        }, this._getData)
    }


    render() {
        if(Util.isObjectEmpty(this.state.curTask)) {
            return <Loading isJustUi={true}/>;
        }
        const {match} = this.props;
        const {curTask:item} = this.state;
        const taskId = match.params.id;
        let me = this;
        let curTab = this.state.curTab;

        let progress = '';
        let totalCount = '';

        let type = '';
        let actionBtnShowStr = '';

        let isWaitPage = false;
        let isConfirmPage = false;
        if(this.state.curTab == REVIEW_DETAIL_TAB_WAIT) {
            isWaitPage = true;
        }
        if(this.state.curTab == REVIEW_DETAIL_TAB_CONFIRM) {
            isConfirmPage = true;
        }


        if (item.reviewTask.reviewTaskType === 0) {
            type = '入选';
            actionBtnShowStr = '入选';
            progress = item.reviewItemProgress;
            totalCount = item.reviewTask.reviewItemLimit;
        } else {
            type = '淘汰';
            actionBtnShowStr = '淘汰';
            //TODO:  需要确认字段有没有返回
            progress = item.reviewItemProgress;
            totalCount = item.reviewTask.reviewItemLimit;
        }
        let realReach = progress; //实际完成的作品数据
        //超过100%了； 要按100%z展示，进度条不能溢出
        if(progress > totalCount) {
            progress = totalCount;
        }


        return (
            <div className="page-wrapper page-review-images ">
                <div className="page-title">
                    {item.name}
                </div>
                <div className="head-container">
                    <div className="item-info-region">
                        <div className="title">
                            <div className="title-item">任务类型</div>
                            <div className="title-item">完成进度</div>
                            <div className="title-item">任务说明</div>
                        </div>
                        <div className="content">
                            <div className="content-item">{type}</div>
                            <div className="content-item" style={{width: '100px'}}>
                                <Progress size='small' percent={progress / totalCount * 100}
                                          format={percent => `${realReach}/${totalCount}`}
                                />
                            </div>
                            <div className="content-item">{item.reviewTask.description}</div>
                        </div>

                    </div>
                    <div className="action-region">
                        {
                            !item.submittedAt ? (
                                    <Button {...{
                                        classnames: 'button-action',
                                        isNeedBgc: true,
                                        showString: '提交',
                                        clickFunction: this.submitClick.bind(this)
                                    }}></Button>
                                ) : ''
                        }

                    </div>
                </div>
                <div className="page-head-nav-region ui-head-nav">
                    <ul>
                        <li className={curTab === REVIEW_DETAIL_TAB_CONFIRM ? "active" : ""}
                            onClick={this.onTabChange.bind(this, REVIEW_DETAIL_TAB_CONFIRM)}>
                           <span>
                              已{type}
                           </span>
                        </li>
                        <li className={curTab === REVIEW_DETAIL_TAB_WAIT ? "active" : ""}
                            onClick={this.onTabChange.bind(this, REVIEW_DETAIL_TAB_WAIT)}>
                            <span>
                                {type}待定
                            </span>
                        </li>
                        <li className={curTab === REVIEW_DETAIL_TAB_NON_REVIEWED ? "active" : ""}
                            onClick={this.onTabChange.bind(this, REVIEW_DETAIL_TAB_NON_REVIEWED)}>
                           <span>
                               未评
                            </span>
                        </li>
                    </ul>
                </div>

                <div className="main-body main-content">
                    <ReviewImgsList {...{
                        confirmAction: me.confirmAction.bind(this),
                        waitAction: me.waitAction.bind(this),
                        items: this.state.items,
                        curTask: item,
                        isWaitPage: isWaitPage,
                        isConfirmPage: isConfirmPage
                    }}/>

                    {
                        !this.state.loaded ? (
                                <Loading isJustUi={true}/>
                            ) : ""
                    }

                    {
                        this.state.items.length ? (
                                <div className="pagination-container">
                                    <Pagination className="ui-pagination pagination-review-images"
                                                showQuickJumper
                                                current={this.state.page}
                                                defaultCurrent={1}
                                                defaultPageSize={this.state.size}
                                                total={this.state.totalCount}
                                                onChange={this.onPageChange}
                                    />
                                </div>
                            ) : ''

                    }

                    {
                        (this.state.items.length && !item.submittedAt) ? (
                                <div className="footer-button-region">
                                    <Button {...{
                                        classnames: 'button-action',
                                        isNeedBgc: true,
                                        showString: '提交',
                                        clickFunction: this.submitClick.bind(this)
                                    }}></Button>
                                </div>
                            ) : ''
                    }


                </div>


            </div>


        )

    }
}


export default ReviewImagesList;
