/**
 * Created by liuxiaoxiao1 on 2018/3/1.
 */
import React from 'react';
import { observable, useStrict, action, runInAction } from 'mobx';
import { observer } from 'mobx-react';
import { Ajax } from '../utils/utils'
import Util from '../utils/web-utils'

useStrict(true);




class UserStore {
    @observable sessionActive = false
    @observable user = {};


    @action addNum1 = () => {
        this.user.data.state ++;
    };

    @action getLoginUserInfo = () => {
        //TODO: 调用后台接口获取当前登录用户信息
        return new Promise((resolve, reject) => {
            //resolve({});
            Ajax.get('/api/user/current', {}, true).then((resData) => {
                console.log('current resData', resData);
                runInAction(()=> {
                    resolve(resData);
                    //200的话 后台不返回状态码
                    this.sessionActive = true;
                    if(!resData.status) {
                        this.user = resData;
                        Util.setUser(resData);
                    }else {
                        this.user = {}
                        Util.setUser({})
                    }

                })


            })

        })

    }

    @action login = (paramsObj) => {
        console.log('paramsObj', paramsObj);
        return new Promise((resolve, reject)=> {
            Ajax.post('/api/login', (paramsObj), true).then((resData) => {
                console.log('resData', resData);
                runInAction(()=> {
                    this.user = resData;
                    Util.setUser(resData);
                    resolve(resData);
                })

            })
        });

    }
    @action logout = () => {

        return new Promise((resolve, reject)=> {
            Ajax.post('/api/logout', {}, true).then((resData) => {
                console.log('logout resData', resData);
                runInAction(()=> {
                    this.user = {};
                    Util.setUser({});
                    resolve(resData);
                })

            })
        });

    }

}

const User = new UserStore();

console.log('User.user', User.user);

export default User;

