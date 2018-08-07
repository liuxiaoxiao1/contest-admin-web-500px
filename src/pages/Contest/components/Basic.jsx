/**
 * Created by liuxiaoxiao1 on 2018/6/6.
 */
import React from 'react';
import PropTypes from 'prop-types'
import { Button } from 'antd';

import CommonStepGuide from './CommonStepGuide'
import ContestBasicForm from './BasicForm'
import assign from 'object-assign'
import qs from 'qs'


import ContestEditStore from '../../../stores/contest-edit-store'




import { useStrict } from 'mobx'
import { observer } from 'mobx-react'




import './Basic.scss'


useStrict(true)


@observer
class ContestBasic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmLoading: false,
            contestId: ''
        }
    }

    static propTypes = {
        history: PropTypes.object
    }
    static defaultProps = {
        history: {}
    }
    componentDidMount() {
        //TODO: 先初始化一下store里面的数据
        //ContestStore.getList(1);

        let params = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
        let curContestId = params.id || '';

        console.log('props xxliu', qs.parse(this.props.location.search, { ignoreQueryPrefix: true }));
        //TODO: 刚做到 取回数据，需要回显
        if(curContestId) {
            this.setState({
                contestId: curContestId
            })
            ContestEditStore.getContestInfo(curContestId);
        }




    }

    onPageChange(pageNumber) {

    }
    handleCancel = () => {

    }

    onSubmitForm = () => {
        alert(1)
        let me = this;
        console.log('this.refs.form', this.refs.basicForm);

        console.log('ContestEditStore.curItem', assign({}, ContestEditStore.curItem));





        //先取值再校验
        this.refs.basicForm.validateFields((err, values) => {

            console.log('all Received values of form: ', values);


            if (!err) {
                console.log('Received values of form: ', values);

                this.setState({
                    confirmLoading: true
                })

                alert(2)
                ContestEditStore.prepareUpdateContestParams(values, me.props.history,  function errorCallBack() {
                    me.setState({
                        confirmLoading: false,
                    })

                });


            }
        });
    }





    render() {
        //这里可以写各种组件内容
        let me = this;
        const { confirmLoading } = this.state;





        return (
            <div className='main-body edit-page-container'>
                <CommonStepGuide curStep={1}/>
                <div className="edit-main-container clearfix">
                    <ContestBasicForm ref="basicForm"/>
                </div>


                <div style={{width: '100%', textAlign:'center'}}>
                    <Button type="primary" className={'button-edit'} loading={confirmLoading}
                            onClick={this.onSubmitForm.bind(this)}>保存进入下一步</Button>
                </div>


            </div>


        );
    }
}

export default ContestBasic;
