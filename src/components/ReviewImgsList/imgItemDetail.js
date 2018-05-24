/**
 * Created by liuxiaoxiao1 on 2018/3/14.
 */
import React from 'react';
import ReactDOM from 'react-dom'
import './reviewImgList.less'
import PropTypes from 'prop-types'
import Button from '../ui/Button'
import DanTuCmp from './imgItemDetailLeft'
import SilderCmp from '../Slider/slider'
import { autobind } from 'core-decorators'


import { WORK_TYPE_GROUP } from '../../constants'


import './imgItemDetail.less'

/*eslint-disable*/
var cmpJson = {};
top.slider_lybystart = function (a, b, c, d) {
    var allcount = this.$SlidesCount();
    // var allImgIdJson
    var curPhotoItem = cmpJson.detail.props.data;


    console.log('curPhotoItem', curPhotoItem);
    //return ''


    //如果a<b就是下一页翻页，等于总数就是要重新循环到第一个了
    if (a < b && b == allcount) {
        var nextObj = allImgIdJson[curPhotoItem.id].next;//.item;
        if (cmpJson.detail) {
            //cmpJson.detail.props.showWinPhotoDetail({})
            if(nextObj instanceof Function){
                //不加载下一页数据
                cmpJson.detail.props.closeWin();
                // nextObj(function (iteList) {
                //     if(iteList.length){
                //         //cmpJson.detail._loadData(iteList[0])
                //     }else{
                //         cmpJson.detail.props.closeWin();
                //     }
                // })
            }else{
                //cmpJson.detail._loadData(nextObj.item)
                cmpJson.detail._nextClick(nextObj)
            }
        }
    }else if(a > b && b == -1) {
        var prevObj = allImgIdJson[curPhotoItem.id].prev;
        if (cmpJson.detail) {
            //cmpJson.detail.props.showWinPhotoDetail({})
            if(prevObj instanceof Function){
                //不加载下一页数据
                cmpJson.detail.props.closeWin();
                // prevObj(function (iteList) {
                //     if(iteList.length){
                //         //cmpJson.detail._loadData(iteList[iteList.length-1])
                //     }else{
                //         cmpJson.detail.props.closeWin();
                //     }
                // })
            }else{
                //cmpJson.detail._loadData(prevObj.item)
                cmpJson.detail._nextClick(prevObj)
            }
        }
    }

}


/*eslint-enable*/

//因为弹出窗口的缘故，所有的数据更新走的都是 props里面的数据
class ImgItemDetail extends React.PureComponent {
    constructor(props) {
        super(props);
        let imgItem = {};
        if(this.props.data.resourceGroupItems) {
            imgItem = this.props.data.resourceGroupItems[0];
        }
        this.state = {
            descOpen: false, //是否展开
            imgItem: imgItem, // 组图中的单图, 默认第一个图
            // itemSubmitted: false // 当前作品是否已经提交操作
        }
    }

    static propTypes = {
        showWinPhotoDetail: PropTypes.func,
        closeWin: PropTypes.func,
        index: PropTypes.string,
        data: PropTypes.object.isRequired,
        show: PropTypes.bool, //当前图片详情窗口是否展示
        actionBtnShowStr: PropTypes.string,
        confirmAction: PropTypes.func,
        reviewWait: PropTypes.func,
        btnClassName: PropTypes.string, //按钮的样式
        curTask: PropTypes.object,
        isWaitPage: PropTypes.bool, //是不是在待定页面
        isConfirmPage: PropTypes.bool, //是不是在已选/淘汰页面
        itemSubmitted: PropTypes.bool // 当前作品是否已经提交操作
    }
    static defaultProps = {
        data: {},
        index: '',
        show: true,
        btnClassName: '', //按钮的样式
        curTask: {},
        isWaitPage: false,
        isConfirmPage: false,
        itemSubmitted: false // 当前作品是否已经提交操作
    }

    componentDidMount() {
        //页面的全局变量在最上面定义
        cmpJson.detail = this;
        this._resizeWidth();
        $(window).bind("resize", this._resizeWidth.bind(this));
    }

    componentDidUpdate () {
        this._resizeWidth();
    }

    //如果单图详情页的数据需要单独取的话，这里重新调一下后台接口
    _loadData () {
        //TODO: 取数据
        // Ajax.get().then((resData) => {
        //
        // })

        this.setState({

        })
    }

    _resizeWidth () {
        var _el = $(ReactDOM.findDOMNode(this.refs.photoContainer));
        var hNum = $(window).height() - 0//100;
        _el.css({
            'line-height': hNum - 40 + 'px',
            height: hNum
        });
    }

    _nextClick (imgJson) {
        if (imgJson && imgJson.id) {
            //var _photoInfo = {
            //    id: '500px202009851',
            //    resourceType: 1
            //}

            //this._loadData(imgJson)
            console.log('nextJSON66', imgJson);
            this.props.showWinPhotoDetail(imgJson.item);
            //this.setState({data: imgJson.item})
        }
    }

    descSwitch() {
        this.setState({
            descOpen: !this.state.descOpen
        })
    }

    //设置组图播放中的单图信息
    /**
     * 在从一个组图切换到上一个组图的时候
     * 这里的itemIndex会先从上一个组图最后一个索引，切到当前组图的0索引，导致数据失败
     */
    setGroupItem(itemIndex) {
        var item = this.props.data.resource;
        let itemList = this.props.data.resourceGroupItems;
        let imgItem = {};
        if((item.resourceType == WORK_TYPE_GROUP) && (itemIndex < itemList.length)) {
            imgItem = itemList[itemIndex];
        }else {
            return '';
        }

        this.setState({
            imgItem: imgItem
        })

    }

    @autobind
    confirmActionClick(e) {
        this.setState({
            itemSubmitted: true
        })
        this.props.confirmAction(e);
    }

    @autobind
    waitActionClick(e) {
        this.setState({
            itemSubmitted: true
        })
        this.props.reviewWait(e);
    }


    render() {
        var me = this;
        var item = this.props.data.resource;
        var list = this.props.data.resourceGroupItems;
        let description = item.description;
        if(description.length > 60 && !this.state.descOpen) {
            description = item.description.substring(0, 59) + '...';
        }
        let showLabel = '展开';
        if(this.state.descOpen) {
            showLabel = '收起';
        }
        let btnActionCls = '';


        console.log('itemSubmitted', this.props.itemSubmitted);
        if(this.props.itemSubmitted) {
            btnActionCls = 'action--disabled';
        }


        console.log('this.state.imgItem', this.state.imgItem);

        // {/* 组图，但是只有一个图的时候 按照单图处理 20180511*/}
        return (
            <div className="photos_index_layout" data-id={item.id}>
                <div className="main_container clearfix">
                    {

                        ((item.resourceType == WORK_TYPE_GROUP) && (list.length > 1) ) ? (
                                <div ref="photoContainer" className="photo_container copyright-contextmenu" style={{}}>
                                    <div className="slider_main">
                                        {
                                            list.length ? (
                                                    <SilderCmp {...{
                                                        key: item.id,
                                                        parent: this,
                                                        item: item, //作品信息
                                                        data: list,
                                                        show: this.props.show,
                                                        sliderEvent: {
                                                            SWIPE_END: function (_i) {
                                                                console.log('_i', _i);
                                                                if(me.refs.detailCmpRef){
                                                                    //更新右侧单图信息, 这里的_i在点击切换快的时候，是个小数，代表没切换100%，需要处理下
                                                                    let _itemIndex = Math.ceil(_i);
                                                                    me.setGroupItem(_itemIndex)
                                                                    {/*me.refs.detailCmpRef.setState({*/}
                                                                        {/*silderIndex: _i*/}
                                                                    {/*})*/}
                                                                }
                                                            },
                                                            //组图内部slider结束的时候，前一个 或者 后一个
                                                            SET_SHOW_END: this._nextClick.bind(me)
                                                        }
                                                    }}/>
                                                ) : ''
                                        }
                                    </div>
                                </div>
                            ) : (
                                <DanTuCmp {...{
                                    key: me.props.data.id,
                                    ref: "photoContainer",
                                    nextClick: this._nextClick.bind(this),
                                    preClick: this._nextClick.bind(this),
                                    closeWin: this.props.closeWin.bind(this),
                                    data: me.props.data,
                                    style: {}
                                }}/>
                            )
                    }

                    <div className="sidebar_region clearfix" ref="detailCmpRef">
                        <div className="photo-side-bar">
                            <div className="desc-region">
                                <div className="title">
                                    {item.title}
                                </div>
                                <div className="desc-container">
                                    { description }
                                </div>
                                {
                                    description.length > 60 ? (
                                            <div className="content-switch" onClick={this.descSwitch.bind(this)}>{showLabel}</div>
                                        ) :''
                                }


                                <div className="tags">
                                    <span className="label" style={{display: item.tags ? 'inline-block': 'none'}}>关键字</span>
                                    <div className="tags-content">
                                        {
                                            item.tags ? (
                                                item.tags.split(',').map((item, index) => {
                                                    return (
                                                        <div className="tag-per" key={index}>
                                                            {item}
                                                        </div>
                                                    )
                                                })
                                                ): ""
                                        }

                                    </div>
                                </div>


                                <div className="content-per" style={{display: ((item.resourceType == WORK_TYPE_GROUP) && this.state.imgItem.description) ? 'block': 'none'}}>
                                    <span className="label">单图描述</span>
                                    <div className="content-region">
                                        {this.state.imgItem.description}
                                    </div>
                                </div>

                                {
                                    !me.props.curTask.submittedAt ? (
                                            <div className="action-region">
                                                {
                                                    !this.props.isConfirmPage ? <Button {...{
                                                            isNeedBgc: true,
                                                            classnames: `button-action ${this.props.btnClassName} ${btnActionCls}`,
                                                            showString: me.props.actionBtnShowStr,
                                                            clickFunction: me.confirmActionClick
                                                        }}/> : ''
                                                }

                                                {
                                                    !this.props.isWaitPage ? <Button {...{
                                                            isNeedBgc: true,
                                                            classnames: `button-action action-undetermined ${btnActionCls}`,
                                                            showString: '待定',
                                                            clickFunction: me.waitActionClick
                                                        }}/> : ''
                                                }





                                            </div>
                                        ) : ''
                                }




                            </div>

                        </div>
                    </div>
                </div>

            </div>
        );
    }
}



export default ImgItemDetail;
