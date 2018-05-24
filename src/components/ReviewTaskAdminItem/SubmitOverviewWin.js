/**
 * Created by liuxiaoxiao1 on 2018/2/28.
 */
import React from 'react';
import {Modal} from 'antd'
import PropTypes from 'prop-types'
import UserAvatar from '../../components/UserAvatar'
import { Ajax, Parse } from '../../utils/utils'
import Loading from '../../components/Loading'

import './SubmitOverviewWin.less'
import common from '../../utils/index'



class ReviwerItem extends React.Component {
    constructor(props) {
        super(props)
    }
    render () {
        const { item } = this.props;
        if(!item.submittedAt) {
            return '';
        }

        return (
            <div className="reviewer-manage-item">
                <UserAvatar {...{
                    userInfo: item.user,
                    classStr: 'reviewer-item-container'
                }}/>
                <div className='item-txt'>
                    {common.formatDatetimeByDot(item.submittedAt)}
                </div>

            </div>
        )
    }
}
ReviwerItem.propTypes = {
    item: PropTypes.object
}


class ReviewAdminItem  extends  React.Component {
    constructor (props) {
        super(props);
        this.state = {
            page: 0,
            size: 20,
            data: [],
            hasNext: true
        }
    }

    componentDidMount(){
        //this._getData();
    }
    componentDidUpdate () {
        let me = this;


    }

    _loadData () {
        //TODO: 取数据
        let curTask = this.props.item;
        let me = this;
        Ajax.get('/api/admin/reviewer',
            {
                review_task_id: curTask.id,
                page: ++me.state.page,
                size: me.state.size
            }
            ).then((resData) => {

            console.log('res reviewer', resData);



            if(resData.data.length) {
                let tempData = [...this.state.data, ...resData.data];
                this.setState({
                    data: tempData,
                    hasNext: true
                })
            }else {
                this.setState({
                    hasNext: false
                })
            }

        })
    }



    render () {
        const { item, visible, handleCancel } = this.props;
        const sourceData = this.state.data;
        return (

            <Modal
                title="评委提交情况"
                visible={visible}
                closable={true}
                maskClosable={false}
                onCancel={handleCancel}
                cancelText="取消"
                okText="确认"
                footer={false}
                width={400}
                destroyOnClose={true}
                wrapClassName="reviewer-submit-overview-modal"
            >
                <div className="head-container clearfix">
                    <div className="source-container-head">
                        评委
                    </div>

                    <div className="target-container-head">
                        提交时间
                    </div>

                </div>

                <div className="main-content-container celarfix">
                    <div className="source-main-content-wrapper">
                        {
                            sourceData.map(function (item, index) {
                                return (
                                    <ReviwerItem {...{
                                        key: item.id,
                                        item: item
                                    }}/>
                                )
                            })
                        }
                        {
                            this.state.hasNext ? (
                                    <Loading {...{
                                        winNode: '.source-main-content-wrapper',
                                        onClick: this._loadData.bind(this),
                                        isShow: this.state.hasNext
                                    }}/>
                                ) : ''
                        }

                    </div>


                </div>



            </Modal>

        )

    }
}
ReviewAdminItem.propTypes = {
    item: PropTypes.object
}


export default ReviewAdminItem;
