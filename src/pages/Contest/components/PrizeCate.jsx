/**
 * Created by liuxiaoxiao1 on 2018/6/6.
 */
import React from 'react';
import { Button } from 'antd';
import styled, { css } from 'styled-components'
import CommonStepGuide from './CommonStepGuide'
import ContestThemeForm from './PrizeForm'
import { autobind } from 'core-decorators'

import ContestEditStore from '../../../stores/contest-edit-store'

import assign from 'object-assign'

import { useStrict } from 'mobx'
import { observer } from 'mobx-react'


import './PrizeForm.scss'
import PropTypes from "prop-types";


useStrict(true)


@observer
class ContestTheme extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    static propTypes = {
        history: PropTypes.object
    }
    static defaultProps = {
        history: {}
    }

    componentDidMount() {

    }

    handleCancel = () => {

    }

    onSubmitForm = () => {
        console.log('this.refs.form', this.refs.form);
        let me = this;

        //先取值再校验
        this.refs.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.setState({
                    confirmLoading: true,
                });

                ContestEditStore.updateContestPrizePost(this.props.history, function errorCallBack() {
                    me.setState({
                        confirmLoading: false,
                    })

                });


            }
        });
    }


    addPrizeCate() {
        ContestEditStore.addPrizeCate();
    }





    render() {
        //这里可以写各种组件内容
        let me = this;
        //let dataLength = 0;

        //console.log('dataLength', dataLength);

        const { confirmLoading } = this.state;

        let canAddCategory = true;
        // if(ContestEditStore.prizeCategories.prizeUser.prizes.length &&
        //     ContestEditStore.prizeCategories.prizeWorks.prizes.length) {
        //     canAddCategory = false;
        // }
        //
        // if(ContestEditStore.prizeItems.length >= 2) {
        //     canAddCategory = false
        // }

        console.log('ContestEditStore.prizeItems.length', ContestEditStore.prizeItems.length);



        return (
            <div className='main-body edit-page-container'>
                <CommonStepGuide curStep={4}/>
                <div className="edit-main-container clearfix">
                    <ContestThemeForm ref="form"/>
                </div>
                <div className="add-btn-region" onClick={me.addPrizeCate} style={{display: canAddCategory ? 'block':'none' }}>
                    +  添加更多获奖分组
                </div>

                <div style={{width: '100%', textAlign:'center'}}>
                    <Button type="primary" className={'button-edit'} loading={confirmLoading} style={{width: 240}}
                            onClick={this.onSubmitForm.bind(this)}>完成</Button>
                </div>

            </div>


        );
    }
}

export default ContestTheme;
