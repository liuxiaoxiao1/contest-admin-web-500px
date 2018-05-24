/**
 * Created by liuxiaoxiao1 on 2018/2/28.
 */
import React from 'react';
import PropTypes from 'prop-types'
import Button from '../ui/Button'
import { Progress, AButton } from 'antd'
import { NavLink } from 'react-router-dom'

import { Ajax, Parse } from '../../utils/utils'

import Avatar from '../../assets/images/avatar.jpg'

import './ReviewGraphicTxt.less'
import common from '../../utils/index'

import GraphicTxtList from '../GraphicTxtList'




class ReviewSummary  extends  React.Component {
    constructor (props) {
        super(props);

        console.log('xxl-match', this.props.match);
        this.state = {
            page: 0,
            size: 20,
            data: [],
            searchKey: '',
            hasNext: true
        }
    }

    componentDidMount(){
        this._getData();
    }

    exportSummaryData () {
        //下面下发导出表格请求
    }

    /**
     * 滚动加载
     * @private
     */
    _getData () {
        //TODO: 取数据
        // Ajax.get().then((resData) => {
        //     if(resData.data.length) {
        //         let tempData = [...this.state.data, ...resData.data];
        //         this.setState({
        //             data: tempData,
        //             hasNext: true
        //         })
        //     }else {
        //         this.setState({
        //             hasNext: false
        //         })
        //     }
        //
        // })
    }

    /**
     * 根据搜索条件重置页面数据
     */
    getInitData = (e) => {
        //let searchKey = e.target.value;
        console.log('EV', e);
        //TODO: 初始化数据

    }

    /**
     * 是否去重来 重置页面数据
     * @param e
     */
    onDistinctClick (e) {
        let checked = e.target.checked;
        console.log('checked', checked);
        //TODO: 初始化数据

    }



    render () {
        const { item, match } = this.props;
        let taskId = match.params.id;

        return (
            <div className="page-wrapper page-review-graphic review-graphicTxt-page">
                <div className="page-title">
                    俯瞰世界复赛阶段新闻组评审
                </div>
                <div className="head-container">
                    <div className="item-info-region">
                        <div className="title">
                            <div className="title-item">任务类型</div>
                            <div className="title-item">完成进度</div>
                            <div className="title-item">任务说明</div>
                        </div>
                        <div className="content">
                            <div className="content-item">入选</div>
                            <div className="content-item"><Progress size='small' percent={75.13} format={percent => `20/200`}/></div>
                            <div className="content-item">必须完成100%才能提交</div>
                        </div>

                    </div>
                    <div className="">
                        <Button {...{
                            classnames: 'button-action',
                            isNeedBgc: true,
                            showString: '提交',
                            clickFunction: this.exportSummaryData.bind(this)
                        }}></Button>
                    </div>
                </div>
                <div className="page-head-nav-region ui-head-nav">
                    <ul>
                        <li>
                           <span>
                              已入选
                           </span>
                        </li>
                        <li>
                            <span>
                               入选待定
                            </span>
                        </li>
                        <li>
                           <span>
                               未评
                            </span>
                        </li>
                    </ul>
                </div>


                <div className="main-body main-content">
                    <GraphicTxtList />

                </div>


            </div>


        )

    }
}
ReviewSummary.propTypes = {
    item: PropTypes.object
}


export default ReviewSummary;
