import React from 'react';
import PropTypes from 'prop-types'
import Styled from 'styled-components'
import { Modal, InputNumber, Switch, Input, Button, message } from 'antd'
import { autobind } from 'core-decorators'

import ContestUtil from '../../../utils/contestUtil'





import ExcellentWorkSetting from './ExcellentWorkSetting'
// import ExcellentUserSetting from './ExcellentUserSetting'
import ContestTribeMapSetting from './ContestTribeMapSetting'


import ContestStore from '../../../stores/contest-store'
import MessageApi from '../../../lib/Api/MessageApi'

import './AdminActionSelect.scss'


import { useStrict } from 'mobx'
import { observer } from 'mobx-react'

const confirm = Modal.confirm;

const MAIN_WEB_HOST = process.env.REACT_APP_MAIN_WEB_HOST;



useStrict(true);

function showDeleteConfirm(item) {
    let attentionTxt = '';
    let attentionTitle = '';

    if(item.contestContestedCount) {
        attentionTxt = '这个比赛已有投稿作品，如果删除，会给所有参赛者发送消息，确认要删除这个比赛么？';
        attentionTitle = '删除大赛';
    }else {
        attentionTitle = '确认要删除这个比赛吗？';
    }



    this.props.clickCallback(false);



    //TODO: 这个里面的提示信息还要根据是否有作品分别处理
    confirm({
        title: attentionTitle,
        content: attentionTxt,
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk() {
            //TODO: 调用store中方法移除掉数据 ->  调用contestAPI 执行删除操作，待验证，先注释最后验证
            // ContestStore.deleteContest(item).then((response) => {
            //     let resData = response.data;
            //     if(resData.status == '200') {
            //         message.success('修改成功');
            //     }
            // });

        },
        onCancel() {
        },
    });
}


@observer
class AdminActionSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: this.props.item,
            ratingVisible: false,
            listShowVisible: false,
            activeVisible: false,
            confirmRatingLoading: false,
            confirmListShowLoading: false,
            confirmActiveLoading: false,
            excellentWorkVisible: false,
            excellentUserVisible: false,
            contestTribeSettingVisible: false


        }
    }
    static propTypes = {
        item: PropTypes.object,
        clickCallback: PropTypes.func  //要将popover框 关掉
    }
    static defaultProps = {
        item: {}
    }
    componentDidMount () {

    }


    /**
     * 弹出模态框的时候需要设置一下 当前contest
     * @param contestItem
     */
    setCurContest() {
        ContestStore.setData(this.props.item);

    }

    /**
     * 控制各个 modal框的显示
     * @param modalKey modal框类型
     */
    @autobind
    showModal(modalKey) {
        let temp = {};
        this.setCurContest();
        temp[modalKey] = true;
        this.setState(temp)

        this.props.clickCallback(false);

    }

    /**
     * 控制各个 modal框隐藏
     * @param modalKey modal框类型
     */
    @autobind
    handleCancelModal(modalKey) {
        let temp = {}
        temp[modalKey] = false;
        this.setState(temp)
    }


    @autobind
    handleRatingOk(value) {
        let me = this;
        let ratingValue = this.refs['rating-data'].inputNumberRef.state.value;

        //let _curObj = _.assign(item, {rating: value});

        if(ratingValue == this.props.item.rating) {
            me.handleCancelModal('ratingVisible');
            return '';
        }
        me.setState({
            confirmRatingLoading: true
        })
        ContestStore.setCurContestRating(this.props.item, ratingValue).then((response) => {
            let resData = response.data;
            if(resData.status == '200') {
                message.success('修改成功');
                me.handleCancelModal('ratingVisible');
            }else {
                //展示错误信息
                me.setState({
                    confirmRatingLoading: false
                })
                message.error(resData.message);
            }
        });



    }

    @autobind
    handleListShowOk() {
        let me = this;
        let listShow = this.refs['switch-list-show'].rcSwitch.state.checked;

        //let _curObj = _.assign(item, {listShow: listShow});
        //TODO: 下发跟新数据请求 with ContestApi
        if(listShow == this.props.item.listShow) {
            me.handleCancelModal('listShowVisible');
            return '';
        }
        me.setState({
            listShowVisibleLoading: true
        })
        ContestStore.setCurContestListShow(this.props.item, listShow).then((response) => {
            let resData = response.data;
            if(resData.status == '200') {
                message.success('修改成功');
                me.handleCancelModal('listShowVisible');
            }
        });

    }


    @autobind
    handleOnlineOk() {
        let me = this;
        let _online = this.refs['switch-online'].rcSwitch.state.checked;

        //let _curObj = _.assign(item, {listShow: listShow});
        //TODO: 下发跟新数据请求 with ContestApi
        if(_online == this.props.item.online) {
            me.handleCancelModal('activeVisible');
            return '';
        }
        me.setState({
            activeVisibleLoading: true
        })
        ContestStore.setCurContestOnline(this.props.item, _online).then((response) => {
            let resData = response.data;
            if(resData.status == '200') {
                message.success('修改成功');
                me.handleCancelModal('activeVisible');
            }
        });
    }

    @autobind
    gotoPresentPrize() {
        let item = this.props.item;

        // console.log('{...this.props}', this.props);
        let curProps = ContestStore.getRouteProps();
        console.log('{...this.props}', curProps);
        curProps.history.push(`/present/${item.id}/prize`);

        //把登录的校验单独拿出来了
        // if(!loggedInAuthorized) {
        //     props.history.push('/login', {goBack: true})
        // }






    }

    @autobind
    editContest() {
        let item = this.props.item;
        let curProps = ContestStore.getRouteProps();
        curProps.history.push(`/contest?id=${item.id}`);

    }


    @autobind
    sendMsgToWeChat() {
        let item = this.props.item;


        console.log('contest item ', item);

        this.props.clickCallback(false);

        confirm({
            title: '是否确认发送站内信',
            content: '',
            okText: '确定',
            okType: 'danger',
            cancelText: '我再想想',
            onOk() {
                var detailUrl = `${MAIN_WEB_HOST}${ContestUtil._getDetailUrl(item)}`;

                //TODO: des里应该是后面的信息，但是 contestProperty却没有返回，暂且用名字代替！  --- <des>${item.contestProperty.intro}</des>

                var msgTpl = `<msg><title>${item.title}</title><des>${item.title}</des><url>${detailUrl}</url><picUrl>${item.appUrl ? item.appUrl.p1 : item.webUrl.p1}</picUrl></msg>`;
                var msgContent = `{"m_uiMessageType": 49,"m_nsToUsr": "1645907588@chatroom", "m_nsContent": "${msgTpl}"}`;


                console.log('msgContent', msgContent);
                return '';

                MessageApi.sendMessageToWechat(msgContent).then((response) => {
                    let resData = response.data;
                    if(resData.status == '200') {
                        message.success('发送成功');
                    }else {
                        message.error('服务器错误');
                    }
                });

            },
            onCancel() {
            },
        });


    }







    render() {
        const { item } = this.state;
        let me = this;
        let ContainerDiv = Styled.div`
            width: 160px;
            text-align: center;
            cursor: pointer;
            
            .select__item {
                height: 40px;
                line-height: 40px;
                font-size:14px;
                transition: all .2s ease-out,color .2s ease-out;
                &.active, &:hover{
                    background-color:#0099E5;
                    color:#fff;
                }
                
            }
        `
        //使用styled-components 取antd组件值的时候不太好操作 这里使用的是非约束组件
        const InputNumberS = Styled(InputNumber)`
            &.ant-input-number {
                margin-top: 20px 
            }
        `



        return (

            <div>
                <ContainerDiv className="select-region">
                    <div className="select__item" onClick={me.editContest}>
                        修改比赛内容
                    </div>
                    <div className="select__item" onClick={me.showModal.bind(me, 'ratingVisible')}>
                        权重修改
                    </div>
                    <div className="select__item" onClick={me.showModal.bind(me, 'listShowVisible')}>
                        在/不在列表页显示
                    </div>
                    <div className="select__item" onClick={me.showModal.bind(me, 'activeVisible')}>
                        冻结/激活
                    </div>
                    <div className="select__item" onClick={me.showModal.bind(me, 'excellentWorkVisible')}>
                        设置优秀作品
                    </div>
                    <div className="select__item" onClick={me.showModal.bind(me, 'excellentUserVisible')}>
                        设置优秀摄影师
                    </div>
                    <div className="select__item" onClick={me.gotoPresentPrize}>
                        颁奖
                    </div>
                    <div className="select__item" onClick={showDeleteConfirm.bind(me, item)}>
                        删除比赛
                    </div>
                    <div className="select__item" onClick={me.showModal.bind(me, 'contestTribeSettingVisible')}>
                        显示在部落活动
                    </div>
                    <div className="select__item" onClick={me.sendMsgToWeChat.bind(me)}>
                        发送上线通知到微信
                    </div>

                </ContainerDiv>

                <Modal
                    title=""
                    visible={this.state.ratingVisible}
                    width={400}
                    confirmLoading={this.state.confirmRatingLoading}
                    onOk={this.handleRatingOk}
                    onCancel={this.handleCancelModal.bind(this, 'ratingVisible')}
                    okText={'保存'}
                    cancelText={'取消'}
                    destroyOnClose
                >
                    <div className="content-wrapper">
                        <div className="setting-title">
                            权重值（0~10）
                        </div>
                        <InputNumber ref="rating-data" className="rating" min={0} max={10} size="large"
                                      defaultValue={item.rating} />
                    </div>
                </Modal>


                <Modal
                    title=""
                    visible={this.state.listShowVisible}
                    width={400}
                    confirmLoading={this.state.confirmListShowLoading}
                    onOk={this.handleListShowOk}
                    onCancel={this.handleCancelModal.bind(this, 'listShowVisible')}
                    okText={'保存'}
                    cancelText={'取消'}
                    destroyOnClose
                >
                    <div className="content-wrapper">
                        <div className="setting-txt--common">
                            是否在活动列表页显示
                        </div>
                        <Switch ref="switch-list-show" checkedChildren="是" unCheckedChildren="否"
                                defaultChecked={(!!item.listShow || false)} className={'switch-list-show'} />
                    </div>
                </Modal>

                <Modal
                    title=""
                    visible={this.state.activeVisible}
                    width={400}
                    confirmLoading={this.state.confirmActiveLoading}
                    onOk={this.handleOnlineOk}
                    onCancel={this.handleCancelModal.bind(this, 'activeVisible')}
                    okText={'保存'}
                    cancelText={'取消'}
                    destroyOnClose
                >
                    <div className="content-wrapper">
                        <div className="setting-txt--common">
                            是否激活
                        </div>
                        <Switch ref="switch-online" checkedChildren="激活" unCheckedChildren="冻结"
                                defaultChecked={(item.online === undefined) ? true : item.online} className={'switch-item-active'} />
                    </div>
                </Modal>

                <Modal
                    title="设置优秀作品"
                    visible={this.state.excellentWorkVisible}
                    width={600}
                    //confirmLoading={this.state.excellentWork}
                    onOk={this.handleListShowOk}
                    onCancel={this.handleCancelModal.bind(this, 'excellentWorkVisible')}
                    okText={'保存'}
                    cancelText={'取消'}
                    footer={null}
                    destroyOnClose
                >
                    <ExcellentWorkSetting resourceType={'works'} key={'works'}/>

                </Modal>


                <Modal
                    title="设置优秀摄影师"
                    visible={this.state.excellentUserVisible}
                    width={600}
                    //confirmLoading={this.state.excellentWork}
                    onOk={this.handleListShowOk}
                    onCancel={this.handleCancelModal.bind(this, 'excellentUserVisible')}
                    okText={'保存'}
                    cancelText={'取消'}
                    footer={null}
                    destroyOnClose
                >
                    <ExcellentWorkSetting resourceType={'user'} key={'user'}/>

                </Modal>





                <Modal
                    title="请选择"
                    visible={this.state.contestTribeSettingVisible}
                    width={400}
                    //confirmLoading={this.state.excellentWork}
                    onOk={this.handleListShowOk}
                    onCancel={this.handleCancelModal.bind(this, 'contestTribeSettingVisible')}
                    okText={'保存'}
                    cancelText={'取消'}
                    footer={null}
                    className={'contest-tribe-map-modal'}
                    destroyOnClose
                >
                    <ContestTribeMapSetting />

                </Modal>




            </div>

        )
    }


}


export default AdminActionSelect;