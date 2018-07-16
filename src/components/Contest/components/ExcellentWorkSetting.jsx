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

import './AdminActionSelect.scss'


import { useStrict } from 'mobx'
import { observer } from 'mobx-react'



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
        resourceType: PropTypes.string //  'works' | 'user'
    }
    static defaultProps = {
        resourceType: 'works'
    }
    componentDidMount () {
        ContestStore.getSelectedList(this.props.resourceType);
    }


    /**
     * 添加优秀作品 或 摄影师
     * @param index
     */
    saveExcellentWork(index) {
        //TODO:调用大赛store  API完成 设置为优秀作品操作
        //action code

        let curItems = this.state.localItems;

        //操作成功后要删除  本地数据
        ContestStore.updateSelect(this.props.resourceType, curItems[index].data, 'add', () => {
            let curItems = this.state.localItems;
            curItems.splice(index, 1);

            this.setState({
                localItems: curItems
            })
        });

    }

    /**
     * 删除优秀作品 或 摄影师
     * @param index
     */
    deleteExcellentWork(itemId) {
        //调用大赛store  API完成 设置为优秀作品操作

        ContestStore.updateSelect(this.props.resourceType, itemId, 'remove');

    }


    /**
     * 删除本地优秀作品
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
            data: ''
        });
        this.setState({
            localItems:curItems
        })
    }


    @autobind
    localItemChange(index, event) {
        console.log('cur item value', event.target.value);
        let curItems = this.state.localItems;
        curItems[index].data = event.target.value;

        this.setState({
            localItems: curItems
        })


    }





    render() {
       let me = this;
       const { items, loaded } = (this.props.resourceType == 'works') ? ContestStore.curWorkItemPrize
           : ContestStore.curUsersPrize;


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
                            <div className="prize-row" key={index}>
                                <div className="item-id item-show">{item}</div>
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