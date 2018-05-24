/**
 * Created by liuxiaoxiao1 on 2018/2/28.
 */
import React from 'react';
import PropTypes from 'prop-types'
import Button from '../ui/Button'
import { Checkbox } from 'antd'
import CommonSearchCmp from '../../components/ui/SearchInput/SearchInput'
import { Ajax, Parse } from '../../utils/utils'
import Loading from '../../components/Loading'
import LoadingNew from '../../components/Loading/Loading_new'
import Util from '../../utils/web-utils'


import './ItemSummary.less'






class ReviewSummary  extends  React.Component {
    constructor (props) {
        super(props);
        console.log('xxl-match', this.props.match);
        this.state = {
            curTask: {},
            page: 0,
            size: 20,
            items: [],
            search: '',
            distinct: false,
            hasNext: true
        }
    }

    componentDidMount(){
        //this._getData();
        this.getTaskDetail();
    }

    getTaskDetail() {
        let me = this;
        let taskId = me.props.match.params.id;

        Ajax.get('/api/admin/review_task/' + taskId, true).then((resData) => {
            console.log('resData', resData);
            if(resData && !resData.status) {
                me.setState({
                    curTask: resData
                })
            }else if(resData.status == 404){

            }
        })

    }

    exportSummaryData () {
        let me = this;
        //下面下发导出表格请求
         var url = "/api/admin/review_task/" + this.props.match.params.id + "/result/export";
        // Util.downloadFile(url);


        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);    // 也可以使用POST方式，根据接口
        xhr.responseType = "blob";  // 返回类型blob
        // 定义请求完成的处理函数，请求前也可以增加加载框/禁用下载按钮逻辑
        xhr.onload = function () {
            // 请求完成
            if (this.status === 200) {
                // 返回200
                var blob = this.response;
                console.log('response', blob);
                var reader = new FileReader();
                reader.readAsDataURL(blob);  // 转换为base64，可以直接放入a表情href
                reader.onload = function (e) {
                    // 转换完成，创建一个a标签用于下载
                    var a = document.createElement('a');
                    a.download = `review_results_${me.props.match.params.id}.xlsx`;
                    a.href = e.target.result;
                    $("body").append(a);  // 修复firefox中无法触发click
                    a.click();
                    $(a).remove();
                }
            }
        };
        // 发送ajax请求
        xhr.send()
    }

    /**
     * 滚动加载
     * @private
     * @param init: 是不是初始化数据
     */
    _getData () {
        let me = this;
        Ajax.get('/api/admin/review_task/' + me.props.match.params.id + '/result',
            {
                id: me.props.match.params.id,
                search: me.state.search,
                distinct: me.state.distinct,
                page: ++me.state.page,
                size: me.state.size
            }).then((resData) => {
            if(resData.data.length) {
                let tempData = [...this.state.items, ...resData.data]
                this.setState({
                    items: tempData,
                    hasNext: true
                })
            }else {
                this.setState({
                    hasNext: false
                })
            }

        })
    }


    /**
     * 根据搜索条件重置页面数据
     */
    onSearchChange(value) {
        console.log('EV', value);
        this.setState({
            search: value,
            items:[],
            page: 0,
            hasNext: true
        })
        //this._getData();
    }


    /**
     * 是否去重来 重置页面数据
     * @param e
     */
    onDistinctClick (e) {
        let checked = e.target.checked;
        console.log('checked', checked);
        this.setState({
            distinct: checked,
            items:[],
            page: 0,
            hasNext: true
        })

    }



    render () {
        const { item, match } = this.props;
        const { curTask } = this.state;
        let taskId = match.params.id;

        if(Util.isEmptyObj(curTask)) {
            return <LoadingNew isJustUi/>
        }

        return (
            <div className="main-body review-task-summary-page">
                <div className="page-title">
                    评审汇总结果
                </div>
                <div className="head-container">
                    <div className="item-info-region">
                        <div className="title">
                            {/*<div className="title-item">阶段</div>*/}
                            <div className="title-item">任务名称</div>
                            <div className="title-item">任务说明</div>
                        </div>
                        <div className="content">
                            {/*<div className="content-item">海选</div>*/}
                            <div className="content-item">{curTask.name}</div>
                            <div className="content-item">{curTask.description}</div>
                        </div>

                    </div>
                    <div className="">
                        <Button {...{
                            classnames: 'button-action',
                            isNeedBgc: true,
                            showString: '导出评审结果',
                            clickFunction: this.exportSummaryData.bind(this)
                        }}></Button>
                    </div>
                </div>

                <div className="main-content grid-container">
                    <div className="grid-tool-bar">
                        <CommonSearchCmp {...{
                            placeHolder: '搜索作者昵称或者作者ID',
                            onSearchClick: this.onSearchChange.bind(this),
                            classObj: {
                                'review-summary-search': true
                            },
                            //onSearchKeyChange: me._onSearchKeyChange,
                            needSearchBtn: false
                        }}/>
                        <Checkbox onChange={this.onDistinctClick.bind(this)}>每个作者一件</Checkbox>
                    </div>
                    <div className="grid-main-body">
                        <div className="grid-main-head">
                            <div className="head-cell">
                                作品id
                            </div>
                            <div className="head-cell">
                                作品标题
                            </div>
                            <div className="head-cell align-center">
                                缩略图
                            </div>
                            <div className="head-cell align-center">
                                票数
                            </div>
                        </div>
                        <div className="grid-main-lists">
                            {
                                this.state.items.length ? (
                                    this.state.items.map((item, index) => {
                                        {/* 这个跳转不要做，产品说这个id是为了复制 粘贴用的  20180420*/}
                                        {/*let _url = '';*/}
                                        {/*if(item.originPlatform === 0) {*/}
                                            {/*_url = `https://500px.me/community/photo-details/${item.originResourceId}`;*/}
                                        {/*}*/}
                                        return (
                                            <div className="list-item" key={item.id}>
                                                <div className="row-cell">
                                                    {item.originResourceId}
                                                </div>
                                                <div className="row-cell">
                                                    {item.resourceTitle}
                                                </div>
                                                <div className="row-cell align-center">
                                                    <img src={Util.getPImgUrlByUrl(item.resourceUrl, '!p6')} alt="" className="work-shot"/>
                                                </div>
                                                <div className="row-cell align-center">
                                                    {item.votes}
                                                </div>

                                            </div>
                                        )
                                    })
                                    ) : ''
                            }

                            {
                                this.state.hasNext ? (
                                        <Loading {...{
                                            winNode: '',
                                            onClick: this._getData.bind(this)
                                        }}/>
                                    ) : ''
                            }

                        </div>

                    </div>
                </div>


            </div>

        )

    }
}
ReviewSummary.propTypes = {
    item: PropTypes.object
}


export default ReviewSummary;
