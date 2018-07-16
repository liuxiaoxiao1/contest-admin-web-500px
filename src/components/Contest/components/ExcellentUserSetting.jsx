import React from 'react';
import PropTypes from 'prop-types'
import Styled from 'styled-components'
import { Modal, InputNumber, Switch, Input, Button } from 'antd'
import { autobind } from 'core-decorators'
import assign from 'object-assign'
import ContestApi from '../../../lib/Api/ContestApi'

import UIButton from '../../ui/Button'

import ContestStore from '../../../stores/contest-store'

import './AdminActionSelect.scss'


import { useStrict } from 'mobx'
import { observer } from 'mobx-react'



useStrict(true);




@observer
class ExcellentUserSetting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    static propTypes = {

    }
    static defaultProps = {

    }
    componentDidMount () {

    }

    saveExcellentWork(workId) {
        //TODO:调用大赛store  API完成 设置为优秀作品操作
        //action code





    }

    /**
     * 添加数据项
     */
    addItem() {

    }






    render() {
       let me = this;





        return (

            <div className="content-present-prize">
                <div className="prize-row">
                    <div className="item-id item-show">{'7078727626748778876764777uyyu232'}</div>
                    <Button type="primary" ghost className={'present-btn'} disabled onClick={me.saveExcellentWork.bind(me, '12345')}>保存</Button>
                    <Button type="danger" ghost>删除</Button>
                </div>
                <div className="prize-row">
                    <Input placeholder="输入id" className={'item-id'} />
                    <Button type="primary" ghost className={'present-btn'} onClick={me.saveExcellentWork.bind(me, '12345')}>保存</Button>
                    <Button type="danger" ghost>删除</Button>
                </div>
                <div className="prize-row">
                    <Input placeholder="输入id" className={'item-id'} />
                    <Button type="primary" ghost className={'present-btn'} onClick={me.saveExcellentWork.bind(me, '12345')}>保存</Button>
                    <Button type="danger" ghost>删除</Button>
                </div>
                <div className="prize-row">
                    <Input placeholder="输入id" className={'item-id'} />
                    <Button type="primary" ghost className={'present-btn'} onClick={me.saveExcellentWork.bind(me, '12345')}>保存</Button>
                    <Button type="danger" ghost>删除</Button>
                </div>

                <Button type="primary" ghost className={'present-btn'} style={{marginBottom: '20px'}}>增加</Button>

            </div>

        )
    }


}


export default ExcellentUserSetting;