/**
 * Created by liuxiaoxiao1 on 2018/2/28.
 */
import React from 'react';
import Button from '../../components/ui/Button'
import {Modal} from 'antd'
import PropTypes from 'prop-types'
import CommonSearchCmp from '../../components/ui/SearchInput/SearchInput'
import UserAvatar from '../../components/UserAvatar'
import { observer } from 'mobx-react'
import ReiewerManageStore from '../../stores/reviewTaskItemReviewerManage'
import './reviewerManageWin.less'


class ReviewerActionBtn extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            item: this.props.item
        }
    }
    _clickAction = () => {
        let data = this.state.item;
        if(data.isReviewer) {
            //做取消动作
            //data.isReviewer = false
            ReiewerManageStore.cancelReiviewerByItem(data);

        }else {
            //做设置动作
            //data.isReviewer = true
            ReiewerManageStore.setReiviewerByItem(data);
        }

        // this.setState({
        //     item: data
        // })

    }

    //这里处理取消/设置操作   成功后给予一定的提示
    _postAction(flag) {

    }

    render () {
        const {item} = this.state;
        let showTxt = '设为评委';
        let className = 'btn-action';
        if(item.isReviewer) {
            className += ' selected'
            showTxt = '取消评委'
        }else {
            className += ' normal'
        }

        return (
            <div className={className} onClick={this._clickAction.bind(this)}>
                {showTxt}
            </div>
        )
    }
}
ReviewerActionBtn.propTypes = {
    item: PropTypes.object
}


class ReviwerItem extends React.Component {
    constructor(props) {
        super(props)
    }
    render () {
        const { item } = this.props;
        return (
            <div className="reviewer-manage-item">
                <UserAvatar {...{
                    userInfo: item,
                    classStr: 'reviewer-item-container'
                }}/>
                <ReviewerActionBtn {...{
                    item: item
                }}/>

            </div>
        )
    }
}
ReviwerItem.propTypes = {
    item: PropTypes.object
}


@observer
class ReviewAdminItem  extends  React.Component {
    constructor (props) {
        super(props);
        this.state = {
            confirmLoading: false,
            page: 0,
            size: 20,
            data: {
                source: ReiewerManageStore.source,
                target: ReiewerManageStore.target
            }
        }
    }

    confirmEdit = (e) => {


    }

    render () {
        const { item, visible, handleCancel } = this.props;
        const { confirmLoading } = this.state;
        const sourceData = this.state.data.source;
        const targetData = this.state.data.target;
        return (

            <Modal
                title="选择评委"
                visible={visible}
                closable={true}
                maskClosable={false}
                onCancel={handleCancel}
                onOk={this.confirmEdit}
                confirmLoading={confirmLoading}
                cancelText="取消"
                okText="确认"
                footer={false}
                width={640}
                wrapClassName="reviewer-manage-modal"
            >
                <div className="head-container clearfix">
                    <CommonSearchCmp {...{
                        placeHolder: '搜索作者昵称或者作者ID',
                        onSearchClick: function () {
                            console.log(9998898989);
                        },
                        classObj: {
                            'source-container-head': true
                        },
                        //onSearchKeyChange: me._onSearchKeyChange,
                        needSearchBtn: false
                    }}/>

                    <div className="target-container-head">
                        已添加的评委
                    </div>

                </div>

                <div className="main-content-container celarfix">
                    <div className="source-main-content-wrapper">
                        {
                            sourceData.items.map(function (item, index) {
                                return (
                                    <ReviwerItem {...{
                                        key: item.id,
                                        item: item
                                    }}/>
                                )
                            })
                        }

                    </div>
                    <div className="target-main-content-wrapper">
                        {
                            targetData.items.map(function (item, index) {
                                return (
                                    <ReviwerItem {...{
                                        key: item.id,
                                        item: item
                                    }}/>
                                )
                            })
                        }
                    </div>

                </div>



            </Modal>

        )

    }
}



export default ReviewAdminItem;
