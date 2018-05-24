/**
 * Created by liuxiaoxiao1 on 2018/2/28.
 */
import React from 'react';
import { Link } from 'react-router-dom'
import Button from '../../components/ui/Button'
import {Modal, message} from 'antd'
import { Ajax } from '../../utils/utils'
import Util from '../../utils/web-utils'
import ReviewItemReviewerManageWin from './ReviewItemReviewerManageWin'
import ReviewerSubmitOverviewWin from '../../components/ReviewTaskAdminItem/SubmitOverviewWin'
import assign from 'object-assign'

import { useStrict } from 'mobx';
import { observer } from 'mobx-react';


import ReviewListAdmin from '../../stores/reviewListAdmin'
import ReviewerManageStore from '../../stores/reviewTaskItemReviewerManage'

const confirm = Modal.confirm;

useStrict(true)

@observer
class ReviewAdminItem  extends  React.Component {
    constructor (props) {
        super(props);
        this.state = {
            item: this.props.item,
            reviewerWinVisible: false,
            reviewSubmitOverViewVisible: false
        }
    }

    taskStateSwitch() {
        var me = this;
        let curItem = this.state.item;
        let curStatus = this.state.item.status || 0;
        let msgInfo = '确认开启';
        if(curStatus == 0) {
            msgInfo = '确认停用？'
            curStatus = 1;
        }else {
            msgInfo = '确认开启？'
            curStatus = 0;
        }

        //TODO: 改成直接切换任务状态，否则showString 更新不同步，需要解决下
        let tempTaskItem = assign({}, curItem);
        console.log('curStatus', curStatus);
        tempTaskItem.status = curStatus;
        ReviewListAdmin.setData(tempTaskItem);
        ReviewListAdmin.editTask().then((resData) => {
            if(!Util.isEmptyObj(resData)) {
                message.success('操作成功');
                me.setState({
                    item: tempTaskItem
                })

            }else {
                message.error('服务器错误')
            }

        });

        // confirm({
        //     title: msgInfo,
        //     content: '',
        //     okText: '确定',
        //     cancelText: '取消',
        //     onOk() {
        //         //TODO: 切换任务状态
        //         let tempTaskItem = assign({}, curItem);
        //         console.log('curStatus', curStatus);
        //         tempTaskItem.status = curStatus;
        //         ReviewListAdmin.setData(tempTaskItem);
        //         ReviewListAdmin.editTask().then((resData) => {
        //             if(!Util.isEmptyObj(resData)) {
        //                 message.success('操作成功');
        //                 me.setState({
        //                     item: tempTaskItem
        //                 })
        //             }else {
        //                 message.error('服务器错误')
        //             }
        //
        //         });
        //     },
        //     onCancel() {
        //         console.log('Cancel');
        //     },
        // });

    }

    _deleteTask = () => {
        let curTask = this.state.item;

        confirm({
            title: '确定要删除此任务么？',
            content: '',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                if(curTask && curTask.id) {
                    ReviewListAdmin.deleteTask(curTask).then((resData) => {
                        console.log('delete data', resData)
                        if(!resData) {
                            message.success('删除成功');
                            ReviewListAdmin.getList(ReviewListAdmin.reviewLists.page);
                            return '';
                        }
                        if(resData.status && (resData.status == 404)) {
                            message.error('该任务不存在或者已被删除');
                        }
                    });
                }
            },
            onCancel() {
                console.log('Cancel');
            },
        });


    }
    _showReviewerWin () {
        ReviewListAdmin.setData(this.props.item);
        this.setState({
            reviewerWinVisible: true
        })
    }
    _showReviewerSubmitOverviewWin () {
        this.setState({
            reviewSubmitOverViewVisible: true
        })
    }
    handleReviewerWinCancel = () => {
        this.setState({
            reviewerWinVisible: false,
        });
        //TODO: 未解决 关闭后需要清掉数据 或者在下次打开的时候清掉原数据,
        ReviewerManageStore.initAllData();
    }
    handleSubmitOverviewWinCancel = () => {
        //该一段代码试试效果
        this.setState({
            reviewSubmitOverViewVisible: false,
        });
    }

    render () {
        const { editTask } = this.props;
        const { item, reviewerWinVisible, reviewSubmitOverViewVisible } = this.state;

        let showString = '';
        let mouseHoverTxt = '';
        let mouseOutTxt = ''; //值等同showString

        if(item.status == 0) {
            showString = '已启用';
            mouseHoverTxt = '暂停';
        }else {
            showString = '已暂停';
            mouseHoverTxt = '启用';
        }

        console.log('showString', showString);

        return (

            <div>
                <div className="item-line clearfix">
                    <div className="item-main-region">
                        <span className="item-title">
                            {item.name}
                        </span>
                        <div className="item-main-content">
                            <Button {...{
                                classnames: 'button-action',
                                isNeedBgc: false,
                                showString: '添加评委',
                                clickFunction: this._showReviewerWin.bind(this)
                            }}></Button>
                            <Button {...{
                                classnames: 'button-action',
                                isNeedBgc: false,
                                showString: '评委提交情况',
                                clickFunction: this._showReviewerSubmitOverviewWin.bind(this)
                            }}></Button>
                            <Link to={'/review-summary/' + item.id} className="button-action">
                                <Button {...{
                                    classnames: 'button-action',
                                    isNeedBgc: false,
                                    showString: '汇总结果',
                                }}></Button>
                            </Link>

                            <Button {...{
                                key: new Date().getTime(),
                                classnames: 'button-action',
                                isNeedBgc: false,
                                mouseHoverTxt: mouseHoverTxt,
                                mouseOutTxt: showString,
                                showString: showString,
                                clickFunction: this.taskStateSwitch.bind(this),
                            }}></Button>

                        </div>


                    </div>
                    <div className="item-action-region">
                                <span className="action-txt" onClick={editTask.bind(this)}>
                                    编辑任务
                                </span>
                        <span className="segment-line-vertical"></span>
                        <span className="action-txt" onClick={this._deleteTask.bind(this)}>
                                    删除任务
                                </span>

                    </div>

                </div>

                <ReviewItemReviewerManageWin {...{
                    key: new Date().getTime(), //TODO: 暂时没找到每个modal框不更新的原因，所以就用更改key来暂时的解决了
                    visible: reviewerWinVisible,
                    handleCancel: this.handleReviewerWinCancel,
                    taskItem: ReviewListAdmin.curItem,

                }}/>

                <ReviewerSubmitOverviewWin {...{
                    key: 1 + new Date().getTime(), //TODO: 暂时没找到每个modal框不更新的原因，所以就用更改key来暂时的解决了
                    visible: reviewSubmitOverViewVisible,
                    item: this.props.item,
                    handleCancel: this.handleSubmitOverviewWinCancel
                }} />


            </div>

        )

    }
}



export default ReviewAdminItem;
