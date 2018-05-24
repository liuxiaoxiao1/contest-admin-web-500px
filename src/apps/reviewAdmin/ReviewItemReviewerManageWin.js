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
import ReviewerManageStore from '../../stores/reviewTaskItemReviewerManage'

import Loading from '../../components/Loading'

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
            ReviewerManageStore.cancelReviewerByItem(data);

        }else {
            //做设置动作
            //data.isReviewer = true
            ReviewerManageStore.setReviewerByItem(data);
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


class ReviewerItem extends React.Component {
    constructor(props) {
        super(props)
    }
    render () {
        const { item } = this.props;
        let userInfo = ''
        if(this.props.type === 'candidate') {
            userInfo = item;
        }else{
            userInfo = item.user;
        }
        return (
            <div className="reviewer-manage-item">
                <UserAvatar {...{
                    userInfo: userInfo,
                    classStr: 'reviewer-item-container'
                }}/>
                <ReviewerActionBtn {...{
                    item: item
                }}/>

            </div>
        )
    }
}
ReviewerItem.propTypes = {
    item: PropTypes.object,
    type: PropTypes.string // candidate|selected   因为待选  和 已选用户信息位置的不同，需要区分下类型
}


@observer
class ReviewItemReviewerManageWin  extends  React.Component {
    constructor (props) {
        super(props);
        this.state = {
            confirmLoading: false,
            page: 0,
            size: 20,
            data: {
                source: ReviewerManageStore.source,
                target: ReviewerManageStore.target
            }
        }
    }

    confirmEdit = (e) => {


    }

    static propTypes = {
        taskItem: PropTypes.object
    }

    static defaultProps = {
        taskItem: {}
    }

    componentDidMount() {
        // if(this.props.visible) {
        //     ReviewerManageStore.getSourceData();
        //     ReviewerManageStore.getTargetData();
        // }

    }
    componentDidUpdate() {
        // if(this.props.visible) {
        //     ReviewerManageStore.getSourceData();
        //     ReviewerManageStore.getTargetData();
        // }
    }

    componentWillUnmount() {
        console.log(33333);

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
                destroyOnClose={true}
            >
                <div className="head-container clearfix">
                    <CommonSearchCmp { ...{
                        placeHolder: '搜索作者昵称或者作者ID',
                        onSearchClick: function (val) {
                            ReviewerManageStore.setSourceSearchValue(val);
                            ReviewerManageStore.getInitSourceData();
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
                                item.isReviewer = false;
                                return (
                                    <ReviewerItem {...{
                                        key: item.id,
                                        type:'candidate',
                                        item: item
                                    }}/>
                                )
                            })
                        }
                        {
                            sourceData.hasNext ? (
                                <Loading {...{
                                    winNode: '.source-main-content-wrapper',
                                    onClick: ReviewerManageStore.getSourceData
                                }}/>
                                ) : ''
                        }

                    </div>
                    <div className="target-main-content-wrapper">
                        {
                            targetData.items.map(function (item, index) {
                                item.isReviewer = true;
                                return (
                                    <ReviewerItem {...{
                                        key: item.id,
                                        type:'selected',
                                        item: item
                                    }}/>
                                )
                            })
                        }
                        {
                            targetData.hasNext ? (
                                    <Loading {...{
                                        winNode: '.target-main-content-wrapper',
                                        onClick: ReviewerManageStore.getTargetData
                                    }}/>
                                ) : ''
                        }
                    </div>

                </div>



            </Modal>

        )

    }
}



export default ReviewItemReviewerManageWin;
