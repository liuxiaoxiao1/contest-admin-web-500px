/**
 * Created by liuxiaoxiao1 on 2018/6/6.
 */
import React from 'react';
import { Button } from 'antd';
import styled, { css } from 'styled-components'
import CommonStepGuide from './CommonStepGuide'
import ContestColumnForm from './ColumnForm'
import { autobind } from 'core-decorators'

import ContestEditStore from '../../../stores/contest-edit-store'



import { useStrict } from 'mobx'
import { observer } from 'mobx-react'


import './Column.scss'

import {message} from "antd/lib/index";
import ContestApi from "../../../lib/Api/ContestApi";
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

                ContestEditStore.updateContestColumnPost(this.props.history, function errorCallBack() {
                    me.setState({
                        confirmLoading: false,
                    })

                });





            }
        });
    }


    addTheme() {
        ContestEditStore.addTheme();
    }





    render() {
        //这里可以写各种组件内容
        let me = this;
        const { confirmLoading } = this.state;





        return (
            <div className='main-body edit-page-container column-page'>
                <CommonStepGuide curStep={3}/>
                <div className="edit-main-container clearfix">
                    <ContestColumnForm ref="form"/>
                </div>

                <div style={{width: '100%', textAlign:'center'}}>
                    <Button type="primary" className={'button-edit'} loading={confirmLoading}
                            onClick={this.onSubmitForm.bind(this)}>保存进入下一步</Button>
                </div>
            </div>


        );
    }
}

export default ContestTheme;
