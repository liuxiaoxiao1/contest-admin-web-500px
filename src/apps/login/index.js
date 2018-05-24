import React from 'react';
import { autobind } from 'core-decorators'
import { observable, useStrict } from 'mobx';
import { observer } from 'mobx-react';
import { message } from 'antd'

import './Login.less';
//import registerServiceWorker from '../../registerServiceWorker';
import Layout from '../../components/Layout/LayoutWithoutHeader';
import Login from '../../components/Login';
import User from '../../stores/user'

import { ERROR_LOGIN_401 } from '../../constants'

useStrict(true)

@observer
class IndexContainer extends React.Component {
    constructor(props) {
        super(props);
        console.log(' wa  login props', this.props);
    }

    @autobind
    login(params) {
        //TODO: 登录成功后，要回到之前的页面；
        User.login(params).then((res) => {
            if(res.id) {
                //如果有返回标志goBack 就回退一步；
                if(this.props.location.state && this.props.location.state.goBack) {
                    this.props.history.goBack();
                }else {
                    this.props.history.push('/')
                }
            }else if(res.status == 401) {
                message.error(ERROR_LOGIN_401);
            }

        })

        console.log('this.props', this.props);
        console.log(999);

        console.log('login props', this.props);

    }
    componentDidMount() {
        console.log(' wa  login props', this.props);
    }

    render() {
        return (<Layout>
            <div className="login-wrapper">
                <div className="login-header">
                    <div className="web-logo">
                        <svg id="logo_svg" className="logo-svg" data-name="Logo SVG" xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 80 20">
                            <title>logo</title>
                            <path className="logo-img"
                                  d="M24.83,0a10,10,0,1,0,10,10h0A10.09,10.09,0,0,0,24.83,0Zm0,17.9a7.85,7.85,0,1,1,7.8-7.9h0A7.9,7.9,0,0,1,24.83,17.9ZM46.32,0a10,10,0,1,0,10,10h0A10,10,0,0,0,46.32,0Zm0,17.9a7.85,7.85,0,1,1,7.8-7.9h0A7.77,7.77,0,0,1,46.32,17.9ZM7.63,6a6.74,6.74,0,0,0-5.3,1.4V2.1h9c0.3,0,.5-0.1.5-1s-0.4-.9-0.6-0.9H1.33a0.9,0.9,0,0,0-.9.9V9.9c0,0.5.3,0.6,0.8,0.7a0.76,0.76,0,0,0,.9-0.2h0a5.69,5.69,0,0,1,5-2.4,5.2,5.2,0,0,1,4.5,4.4A5.06,5.06,0,0,1,7.23,18H6.63a5.1,5.1,0,0,1-4.7-3.3c-0.1-.3-0.3-0.5-1.1-0.2s-0.9.5-.8,0.8a7.09,7.09,0,0,0,9,4.2,7.09,7.09,0,0,0,4.2-9A7,7,0,0,0,7.63,6ZM63.12,0.1a5.42,5.42,0,0,0-4.8,5.4v8.9c0,0.5.4,0.6,1,.6s1-.1,1-0.6V5.5a3.36,3.36,0,0,1,2.9-3.4,3.29,3.29,0,0,1,2.5.8,3.19,3.19,0,0,1,1.1,2.4,4,4,0,0,1-.7,1.9,3.15,3.15,0,0,1-2.8,1.3h0c-0.4,0-.7,0-0.8.9,0,0.6,0,.9.5,1a4.92,4.92,0,0,0,2.9-.6,5.37,5.37,0,0,0,2.9-4.2A5.18,5.18,0,0,0,64,0,2.77,2.77,0,0,1,63.12.1Zm13.1,5.2,3.6-3.6c0.1-.1.4-0.4-0.2-1.1a1,1,0,0,0-.7-0.4h0a0.52,0.52,0,0,0-.4.2L74.92,4l-3.6-3.7c-0.3-.3-0.6-0.2-1.1.2s-0.5.8-.2,1.1l3.6,3.6L70,8.9h0a0.76,0.76,0,0,0-.2.4,0.84,0.84,0,0,0,.4.7,1.61,1.61,0,0,0,.7.4h0a1.06,1.06,0,0,0,.5-0.2L75,6.6l3.6,3.6a0.52,0.52,0,0,0,.4.2h0a1,1,0,0,0,.7-0.4c0.3-.4.4-0.8,0.1-1Z"
                                  transform="translate(0)"></path>
                        </svg>
                    </div>
                </div>
                <Login {...{
                    onLogin: this.login.bind(this)
                }}/>
            </div>

        </Layout>);
    }

    componentDidMount() {

    }

}

export default IndexContainer;



//registerServiceWorker();
