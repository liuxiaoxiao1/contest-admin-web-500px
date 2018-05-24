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

// import Home from '../apps/index'
// import Login from '../apps/login'
// import NotFound from '../apps/notFound'
// import ReviewAdmin from '../apps/reviewAdmin'
// import ReviewListMy from '../apps/reviewListMy'
// import ItemSummary from '../apps/taskItem/ItemSummary'
// import ReviewGraphicTxtList from '../apps/reviewGraphicTxtList/index'
// import ReviewGraphicTxtDetail from '../apps/reviewGraphicTxtDetail/index'
// import ReviewImagesList from '../apps/reviewImgsList/index'


//TODO: 1.首页的组件需要动态获取，根据用户权限来
//FIXED: 2.组件异步加载
//TODO: vendor等js文件 不需要变的事情

let ReviewAdmin = '';
let ItemSummary = '';
let ReviewListMy = '';
let ReviewGraphicTxtList = '';
let ReviewGraphicTxtDetail = '';
let ReviewImagesList = '';
let Login = '';
let IndexComponent = '';


//添加chunkName
ReviewAdmin = asyncComponent(() => import(/* webpackChunkName: 'reviewAdmin' */'../apps/reviewAdmin'))
ItemSummary = asyncComponent(() => import(/* webpackChunkName: 'itemSummary' */'../apps/taskItem/ItemSummary'))
ReviewListMy = asyncComponent(() => import(/* webpackChunkName: 'reviewListMy' */'../apps/reviewListMy/index.js'))
ReviewGraphicTxtList = asyncComponent(() => import(/* webpackChunkName: 'reviewGraphicTxtList' */'../apps/reviewGraphicTxtList/index'))
ReviewGraphicTxtDetail = asyncComponent(() => import(/* webpackChunkName: 'reviewGraphicTxtDetail' */'../apps/reviewGraphicTxtDetail/index'))
ReviewImagesList = asyncComponent(() => import(/* webpackChunkName: 'reviewImgsList' */'../apps/reviewImgsList/index'))
Login = asyncComponent(() => import(/* webpackChunkName: 'login' */'../apps/login'))




function getIndexComponent(user) {
    console.log('!User.user.admin', user);
    if(!user.admin) {
        IndexComponent = ReviewListMy;
    }else {
        IndexComponent = ReviewAdmin;
    }
    return IndexComponent
}




const Routes = ({user = {}}) => (
    <Router>
        <div>
            <AuthorizedRoute exact path="/" loggedInOnly component={getIndexComponent(user)} />
            <AuthorizedRoute exact path="/index" loggedInOnly component={getIndexComponent(user)} />

            {/* 评审任务管理*/}
            <AuthorizedRoute path="/review-admin" adminOnly loggedInOnly component={ReviewAdmin} />
            <AuthorizedRoute path="/review-summary/:id" adminOnly loggedInOnly component={ItemSummary} />


            {/* 我的评审任务列表 */}
            <AuthorizedRoute path="/review-list-my" loggedInOnly component={ReviewListMy} />


            {/* 图文评审任务列表 */}
            <AuthorizedRoute path="/review/graphic/list/:id" loggedInOnly component={ReviewGraphicTxtList} />
            <AuthorizedRoute path="/review/graphic/detail/:id" loggedInOnly  component={ReviewGraphicTxtDetail} />


            {/* 单图组图混排评审任务列表 */}
            <AuthorizedRoute path="/review/images/single/:id" loggedInOnly component={ReviewImagesList} />


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