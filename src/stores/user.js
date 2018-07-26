/**
 * Created by liuxiaoxiao1 on 2018/3/1.
 */
import React from 'react';
import { observable, useStrict, action, runInAction } from 'mobx';
import { message, Modal } from 'antd'
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

            //每次都需要登录，前端维护一个有效期
            let _user = Util.loginUser();

            let isExpired = false; //是否过期
            if(Util.localStorage.getValue('expireTime')) {
                let expireTime = Util.localStorage.getValue('expireTime');
                if(Number(expireTime) < new Date().getTime()) {
                    isExpired = true;
                }

            }else {
                isExpired = true;
            }

            console.log('ssllll', _user);
            console.log('isExpired', isExpired);

            if(Util.isObjectEmpty(_user) || isExpired) {
                this.user = {};
                this.sessionActive = true;
                resolve({});
                Util.setUser({})
            }else {
                console.log(7787878787);
                Util.refreshSession();
                this.sessionActive = true;
                this.user = _user;
                Util.setUser(_user);
                resolve(_user);
            }
            console.log('log in user', _user);




            // Ajax.get('/api/user/current', {}, true).then((resData) => {
            //     console.log('current resData', resData);
            //     runInAction(()=> {
            //         resolve(resData);
            //         //200的话 后台不返回状态码
            //         this.sessionActive = true;
            //         if(!resData.status) {
            //             this.user = resData;
            //             Util.setUser(resData);
            //         }else {
            //             this.user = {}
            //             Util.setUser({})
            //         }
            //
            //     })
            //
            //
            // })

        })

    }

    @action login = (paramsObj) => {
        console.log('paramsObj', paramsObj);
        return new Promise((resolve, reject)=> {
            Ajax.post('/user/v2/tologin', (paramsObj), true).then((resData) => {
                console.log('resData', resData);
                runInAction(()=> {
                    if(resData.status == '200') {
                        if(!resData.userAccountInfo.userRoleIds.contestbackadmin) {
                            Modal.error({
                                title: '登录失败',
                                content: '您没有相关权限',
                                okText: "确认"
                            });
                            return '';
                        }

                        this.user = resData.userAccountInfo;
                        Util.setUser(resData.userAccountInfo);

                        //过期时间定为6天，每进来一次要刷新一下 session 过期时间的
                        Util.refreshSession();

                        resolve(resData.userAccountInfo);
                    }else {
                        Modal.error({
                            title: '登录失败',
                            content: '用户名或密码错误',
                            okText: "确认"
                        });
                    }


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

