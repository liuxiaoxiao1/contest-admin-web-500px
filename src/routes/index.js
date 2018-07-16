/**
 * Created by liuxiaoxiao1 on 2018/2/28.
 */


import React from 'react'
import PropTypes from 'prop-types'
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

import asyncComponent from '../components/AsyncComponent'
import AuthorizedRoute from '../components/AuthorizedRoute'


import { useStrict } from 'mobx';
import { observer }  from 'mobx-react'

useStrict(true)



//TODO: 1.首页的组件需要动态获取，根据用户权限来
//FIXED: 2.组件异步加载
//TODO: vendor等js文件 不需要变的事情

let ContestList = '';
let ContestEdit = '';
let ContestPresentPrize = '';


let ItemSummary = '';
let ReviewListMy = '';
let ReviewGraphicTxtList = '';
let ReviewGraphicTxtDetail = '';
let ReviewImagesList = '';
let Login = '';
let IndexComponent = '';


//添加chunkName
ContestList = asyncComponent(() => import(/* webpackChunkName: 'contestList' */'../pages/ContestList/index'))
ContestEdit = asyncComponent(() => import(/* webpackChunkName: 'contestEdit' */'../pages/Contest/index'))
ContestPresentPrize = asyncComponent(() => import(/* webpackChunkName: 'contestPresentPrize' */'../pages/ContestPresentPrize/index'))





Login = asyncComponent(() => import(/* webpackChunkName: 'login' */'../pages/Login'))




function getIndexComponent(user) {
    console.log('!User.user.admin', user);
    if(!user.admin) {
        IndexComponent = ReviewListMy;
    }else {
        IndexComponent = ContestList;
    }
    return IndexComponent
}




const Routes = ({user = {}}) => (
    <Router>
        <div>
            <AuthorizedRoute exact path="/" loggedInOnly component={ContestList} />
            <AuthorizedRoute exact path="/index" loggedInOnly component={ContestList} />

            {/* 大赛管理*/}
            <AuthorizedRoute path="/contest-admin" adminOnly loggedInOnly component={ContestList} />

            <AuthorizedRoute  path="/contest" adminOnly loggedInOnly component={ContestEdit} />

            <AuthorizedRoute exact path="/present/:id/prize" adminOnly loggedInOnly component={ContestPresentPrize}/>




            <Route path="/login" component={Login} />

            {/* 404 */}
            {/*<Route path="*" component={NotFound}/>*/}




        </div>
    </Router>
)

Routes.defaultProps = {
    user: {}
};

Routes.propTypes = {
    user: PropTypes.object,
};


export default Routes