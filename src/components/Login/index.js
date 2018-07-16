/**
 * Created by liuxiaoxiao1 on 2018/2/28.
 */
import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import './Login.less'
import { Ajax } from '../../utils/utils.js'
import Util from '../../utils/web-utils.js'


const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                console.log(values);
                this.props.onLogin(values);
                //this.login(values);
            }
        });
    }


    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form" id="components-form-demo-normal-login">
                <FormItem>
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: '请输入用户名' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入密码' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox className="hidden">Remember me</Checkbox>
                    )}
                    <a className="login-form-forgot hidden" href="">Forgot password</a>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        登录
                    </Button>
                    <div className="hidden">
                        Or <a href="">register now!</a>
                    </div>

                </FormItem>
            </Form>
        );
    }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);



export default WrappedNormalLoginForm;
