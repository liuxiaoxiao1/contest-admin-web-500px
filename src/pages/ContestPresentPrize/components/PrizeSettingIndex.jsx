/**
 * Created by liuxiaoxiao1 on 2018/2/28.
 */
import React from 'react';
import { Modal, Select, Button } from 'antd';
import styled, { css } from 'styled-components'

import Loading from '../../../components/Loading/Loading_new'

import { useStrict } from 'mobx'
import { observer } from 'mobx-react'


import './PrizeSettingIndex.scss'
import Util from "../../../utils/web-utils";
import qs from "qs";
import ContestEditStore from "../../../stores/contest-edit-store";
import ContestPrizeConfigStore from '../../../stores/contest-present-prize-store'

import PresentPrize from './PresentPrize'



useStrict(true)




@observer
class ContestList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            prizeSettingVisible: false,
            curPrize: {}
        }
    }
    componentDidMount() {

        console.log('contest preset prize');

        console.log('cur history =', this.props);

        //TODO: 读取大赛信息
        let curContestId = this.props.match.params.id;

        if(curContestId) {
            this.setState({
                contestId: curContestId
            })
            //获取大赛基本信息
            ContestEditStore.getContestInfo(curContestId);
        }

        //获取大赛奖项配置信息
        if(curContestId) {
            ContestPrizeConfigStore.getCurContestPrizeConfig(curContestId);
        }





    }


    handleCancel = () => {

    }

    presentPrize(prizeData) {

        this.setState({
            curPrize: prizeData
        })

        this.showModal('prizeSettingVisible')
    }


    showModal(modalKey) {
        let temp = {};

        temp[modalKey] = true;
        this.setState(temp)


    }

    handleCancelModal(modalKey) {
        let temp = {}
        temp[modalKey] = false;
        this.setState(temp)
    }





    render() {
        let me = this;


        //const { items, loaded } = ContestStore.curItem;
        const CurContest = ContestEditStore.curItem;
        const { data, loaded } = ContestPrizeConfigStore.curContestPrizeConfig;



        if(!loaded) {
            return <Loading isJustUi={true}/>;
        }







        return (
            <div className="main-body edit-page-container">
                <div className="content-title">{CurContest.title}</div>

                <div className="content-main-container">
                    {
                        data.prizeWorks ? (
                            <div className="content-per-container" key={'prizeWorks'}>
                                <div className="content-per-title">
                                    {data.prizeWorks.groupNames}
                                </div>
                                <div className="content-per-note">奖项对象：作品</div>

                                <div className="content-items-container">
                                    {
                                        data.prizeWorks.prizes.map((item, index) => {

                                            return (<div className="content-item" key={index}>
                                                <div className="item-title">{item.title}</div>
                                                <Button type="primary" ghost className={'action-btn'} size={'large'}
                                                        onClick={this.presentPrize.bind(this, item)}>颁奖</Button>
                                            </div>)
                                        })
                                    }

                                </div>
                            </div>
                        ) : ''

                    }


                    {
                        data.prizeUser ? (
                            <div className="content-per-container" key={'prizeUser'}>
                                <div className="content-per-title">
                                    {data.prizeUser.groupNames}
                                </div>
                                <div className="content-per-note">奖项对象：摄影师</div>

                                <div className="content-items-container">
                                    {
                                        data.prizeUser.prizes.map((item, index) => {

                                            return (<div className="content-item" key={index}>
                                                <div className="item-title">{item.title}</div>
                                                <Button type="primary" ghost className={'action-btn'} size={'large'}
                                                        onClick={this.presentPrize.bind(this, item)}>颁奖</Button>
                                            </div>)
                                        })
                                    }

                                </div>
                            </div>
                        ) : ''

                    }


                </div>


                <Modal
                    title={`${this.state.curPrize.title} 颁奖`}
                    visible={this.state.prizeSettingVisible}
                    width={600}
                    //confirmLoading={this.state.excellentWork}
                    onOk={this.handleListShowOk}
                    onCancel={this.handleCancelModal.bind(this, 'prizeSettingVisible')}
                    okText={'保存'}
                    cancelText={'取消'}
                    footer={null}
                    destroyOnClose
                >
                    <PresentPrize {...{
                        prizeItemObj: this.state.curPrize,
                        key: this.state.curPrize.id
                    }}/>

                </Modal>




            </div>
        );
    }
}

export default ContestList;
