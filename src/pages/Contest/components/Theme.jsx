/**
 * Created by liuxiaoxiao1 on 2018/6/6.
 */
import React from 'react';
import { Switch, Route } from 'react-router-dom'
import { Button} from 'antd';
import styled, { css } from 'styled-components'
import CommonStepGuide from './CommonStepGuide'
import ContestThemeForm from './ThemeForm'
import { autobind } from 'core-decorators'

import ContestEditStore from '../../../stores/contest-edit-store'
import assign from 'object-assign'
import { TYPE_PHOTO, TYPE_GROUP_PHOTO } from './const'



import { useStrict } from 'mobx'
import { observer } from 'mobx-react'


import './Theme.scss'

import {message} from "antd/lib/index";
import ContestApi from "../../../lib/Api/ContestApi";
import PropTypes from "prop-types";


useStrict(true)


@observer
class ContestTheme extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmLoading: false
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

            console.log('Received values of form', values);




            if (!err) {
                console.log('Received values of form: ', values);

                this.setState({
                    confirmLoading: true,
                });



                ContestEditStore.updateContestThemePost(this.props.history, function errorCallBack() {
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
            <div className='main-body edit-page-container'>
                <CommonStepGuide curStep={2}/>
                <div className="edit-main-container clearfix">
                    <ContestThemeForm ref="form"/>
                </div>

                <div className="add-btn-region" onClick={me.addTheme}>
                    +  添加更多征集主题
                </div>


                <div style={{width: '100%', textAlign:'center'}}>
                    <Button type="primary" className={'button-edit'}
                            onClick={this.onSubmitForm.bind(this)}>保存进入下一步</Button>
                </div>

            </div>


        );
    }
}

export default ContestTheme;
