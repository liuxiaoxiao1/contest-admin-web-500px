/**
 *  这个组件
 */

import React from 'react';
import PropTypes from 'prop-types'
import Styled from 'styled-components'
import { Input, Button } from 'antd'
import { autobind } from 'core-decorators'
import assign from 'object-assign'
import ContestApi from '../../../lib/Api/ContestApi'


import Loading from '../../../components/Loading/Loading_new'


import ContestStore from '../../../stores/contest-store'
import ContestPrizeConfigStore from '../../../stores/contest-present-prize-store'


import { useStrict } from 'mobx'
import { observer } from 'mobx-react'

import './PresentPrize.scss'


useStrict(true);


let uuid_work_item = 0; //本地数据的uuid 处理数据删除时不能及时更新的问题

@observer
class ExcellentWorkSetting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //存储未下发的数据  主要为了ui 交互上的区分，有无输入框
            localItems: []

        }
    }
    static propTypes = {
        prizeItemObj: PropTypes.object.isRequired//  具体的奖项信息
    }
    static defaultProps = {
        resourceType: {}
    }
    componentDidMount () {

        ContestPrizeConfigStore.getPrizeRecordList(this.props.prizeItemObj.id);
    }


    /**
     * 添加获奖作品 或 摄影师
     * @param index
     */
    saveExcellentWork(index) {
        //TODO:调用大赛store  API完成 设置为优秀作品操作
        //action code

        let curItems = this.state.localItems;

        //操作成功后要删除  本地数据
        ContestPrizeConfigStore.addPrizeRecord(this.props.prizeItemObj.id, curItems[index].resourceId, () => {
            let curItems = this.state.localItems;
            curItems.splice(index, 1);

            this.setState({
                localItems: curItems
            })
        });

    }

    /**
     * 删除获奖作品 或 摄影师
     * @param index
     */
    deleteExcellentWork(item) {
        //调用大赛store  API完成 设置为优秀作品操作

        ContestPrizeConfigStore.deletePrizeRecord(item.id);

    }


    /**
     * 删除本地获奖作品 或 摄影师
     * @param index
     */
    deleteLocalExcellentWork(index) {
        //TODO:调用大赛store  API完成 设置为优秀作品操作
        //action code

        let curItems = this.state.localItems;
        curItems.splice(index, 1);

        this.setState({
            localItems: curItems
        })

    }


    @autobind
    addLocalItem() {
        let curItems = this.state.localItems;
        curItems.push({
            uuid: ++uuid_work_item,
            resourceId: ''
        });
        this.setState({
            localItems:curItems
        })
    }


    @autobind
    localItemChange(index, event) {
        console.log('cur item value', event.target.value);
        let curItems = this.state.localItems;
        curItems[index].resourceId = event.target.value;

        this.setState({
            localItems: curItems
        })


    }





    render() {
       let me = this;
       const { items, loaded } = ContestPrizeConfigStore.curContestPrizeRecord;


       const { localItems } = this.state;


        if(!loaded) {
            return <Loading isJustUi={true}/>;
        }


        console.log('cur items', items);





        return (

            <div className="content-present-prize">

                {/* 已经添加过的数据 */}
                {
                    items.map((item, index) => {

                        return (
                            <div className="prize-row" key={item.id}>
                                <div className="item-id item-show">{item.resourceId}</div>
                                {/*  这个地方的保存其实永远没有机会调用，就不写回调了 */}
                                <Button type="primary" ghost className={'present-btn'} disabled>保存</Button>
                                <Button type="danger" ghost  onClick={me.deleteExcellentWork.bind(me, item)}>删除</Button>
                            </div>
                        )
                    })
                }

                {/* 本地需要添加的数据 */}
                {
                    localItems.map((item, index) => {

                        return (
                            <div className="prize-row" key={item.uuid}>
                                <Input placeholder="输入id" className={'item-id'} onChange={me.localItemChange.bind(me, index)}/>
                                <Button type="primary" ghost className={'present-btn'} onClick={me.saveExcellentWork.bind(me, index)}>保存</Button>
                                <Button type="danger" ghost onClick={me.deleteLocalExcellentWork.bind(me, index)}>删除</Button>
                            </div>
                        )

                    })
                }


                <Button type="primary" ghost className={'present-btn'} style={{marginBottom: '20px'}} onClick={me.addLocalItem}>增加</Button>

            </div>

        )
    }


}


export default ExcellentWorkSetting;