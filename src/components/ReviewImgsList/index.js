/**
 * Created by liuxiaoxiao1 on 2018/3/14.
 */
import React from 'react';
import ReactDOM from 'react-dom'
import './reviewImgList.less'
import ImgItem from './imgItem'
import lyby from '../../utils/web-utils'
import {Modal, message} from 'antd'
import assign from 'object-assign'
import ImgItemDetail from './imgItemDetail'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'

import { WORK_TYPE_GROUP } from '../../constants'




if (!$.fn.justifiedGallery) {
    require('justifiedGallery')
    require('justifiedGallery/dist/css/justifiedGallery.min.css')
}


class ReviewImgsList extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            //作品大图页是否显示
            visible: false,
            //评语弹出框 是否展示
            commentShow: false,
            hasNext: true,
            page: 0,
            size: 20,
            cur_photodata: {},
            items: [],
            itemSubmitted: false // 当前作品是否已经提交操作
        }
    }

    static propTypes = {
        curTask: PropTypes.object,
        actionBtnShowStr: PropTypes.string,
        isWaitPage: PropTypes.bool, //是不是在待定页面
        isConfirmPage: PropTypes.bool, //是不是在已选/淘汰页面
    }

    static defaultProps = {
        curTask: {},
        actionBtnShowStr: '',
        isWaitPage: false,
        isConfirmPage: false
    }


    _loadData(page, __handler) {
        //TODO: 取数据
        // Ajax.get().then((resData) => {
        //
        // })

        var me = this;
        var params = assign({
            page: page,
            size: this.state.size,
            type: 'json'
        }, me.props.params);

        $.ajax({
            type: "GET",
            context: this,
            url: '/review_task/21/review_item',
            data: params,
            dataType: this.props.dataType || "json",
            success: function (data) {
                var totalCountNums = data.totalCount != undefined ? data.totalCount : 3040;
                var totalPagesNums = Math.ceil(totalCountNums / this.state.size);
                if (data.status == 200 && data.data && data.data.length) {
                    if (__handler instanceof Function) {
                        __handler(data.data);
                    }
                    this.setState({
                        needGalley: true,
                        data: data.data,
                        page: page,
                        totalPages: totalPagesNums,
                        hasNext: false
                    });
                    this._changeTotalCount(totalCountNums);

                } else {
                    this.setState({
                        totalPages: totalPagesNums,
                        data: [],
                        needGalley: false,
                        page: page,
                        hasNext: false
                    });
                    this._changeTotalCount(0);
                }
            },
            error: function (e) {
                lyby.errorMsg(e);
            }
        });

        this.setState({})


    }

    _loadPhotoDetail(photoInfo) {
        var me = this;
        if (!photoInfo) {
            return;
        }
        var _cid = photoInfo.id;
        var urlStr = '';
        if (photoInfo.resourceType == 2) {
            urlStr = '/community/v2/groupPhoto/detail/' + _cid;
        } else {
            urlStr = '/community/photo-details/' + _cid;
        }
        if (!_cid || !urlStr) {
            return;
        }
        /*Begin:Added by xiaoxiaoliu for 作品详情页支持 查看部落中的私有作品 20170511*/
        var paramsObj = {
            type: 'json',
            imgsize: 'p1,p2,p5,p6'
        }
        if (lyby.getUrlParams().fromType && lyby.getUrlParams().fromResourceId) {
            paramsObj.fromType = lyby.getUrlParams().fromType;
            paramsObj.fromResourceId = lyby.getUrlParams().fromResourceId;
        }
        /*End:Added by xiaoxiaoliu for 作品详情页支持 查看部落中的私有作品 20170511*/

        $.ajax({
            type: "GET",
            url: urlStr,
            context: this,
            data: paramsObj,
            dataType: "json",
            success: function (rs) {
                var data = {
                    cur_photodata: ''
                };
                if (rs.status == 200) {
                    data.cur_photodata = rs.data;
                    if (data.cur_photodata.title) {
                        document.title = lyby.htmldecode(data.cur_photodata.title);
                    }
                } else if (rs.id) {
                    data.cur_photodata = rs;
                    if (data.cur_photodata.title) {
                        document.title = lyby.htmldecode(data.cur_photodata.title);
                    }
                }
                this.setState(data);
            },
            error: function (e) {
                lyby.errorMsg(e);
            }
        });

    }

    justifyGallery() {
        var me = this;

        var g = jQuery(ReactDOM.findDOMNode(me.refs.gallery));


        // cssAnimation : true,
        //     waitThumbnailsLoad : false,
        //     selector: '> .photo_thumbnail',
        //     rowHeight : lyby.ismobile ? 100 : 280,
        //     maxRowHeight : '200%',
        //     lastRow : 'nojustify',//'nojustify',
        //     margins : 10

        var _ss = 'test';

        var options = {
            cssAnimation: true,
            waitThumbnailsLoad: false, //加载失败就不会再展示了
            selector: '.photo_thumbnail',
            lastRow: 'nojustify',
            rowHeight: lyby.ismobile ? 100 : 280,
            margins: 10,
            //border: 0
        }
        g.justifiedGallery(options).on('jg.complete', function (e) {
        });
    }

    componentDidMount() {
       this.justifyGallery();
    }

    componentDidUpdate() {
        this.justifyGallery();
    }


    showWinPhotoDetail(item, index) {
        //下面是通过mobx更改数据
        console.log(3333333);

        this.setState({
            visible: true,
            itemSubmitted: false,
            cur_photodata: item
        });


        // var me = this;
        // //展示全屏数据
        // Fullscreenphoto.show({
        //     data: this.state.cur_photodata,
        //     exitHandler: function (imgData) {
        //         if (!imgData) {
        //             return null;
        //         }
        //         me._prevClick(imgData);
        //     }
        // });


    }

    handleCancel = () => {
        this.setState({
            visible: false,
        });
    }


    //展示评语
    showWinComment(e) {
        console.log(9999999);
        console.log('e', e);
        e.preventDefault();
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        this.setState({
            commentShow: true
        })
    }

    //隐藏评语
    hideWinComment() {
        this.setState({
            commentShow: false
        })
    }

    confirmAction(photoItem, e) {
        e.preventDefault();
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();

        let taskItem = this.props.curTask;
        let item = photoItem;

        this.setState({
            cur_photodata: item
        });

        if (taskItem.reviewTask.reviewTaskType === 0 && taskItem.reviewTask.reviewSummary) {
            this.showWinComment(e);
        } else {
            this.setState({
                itemSubmitted: true
            })
            this.props.confirmAction(item.id);
        }
    }


    //待定
    reviewWait(photoItem, e) {
        e.preventDefault();
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        let me = this;
        let item = photoItem;
        //修复  待定按钮可以重复点击的问题
        this.setState({
            itemSubmitted: true
        })
        me.props.waitAction(item.id);
    }


    submitReviewComment() {
        let me = this;
        let item = this.state.cur_photodata;
        let comment = item.voteSummary;
        if(!comment) {
            message.warning('评语不能为空');
            return '';
        }
        this.setState({
            itemSubmitted: true
        })
        me.props.confirmAction(item.id, comment, () => {
            this.setState({
                commentShow: false
            })
        });
    }

    @autobind
    summaryChange(event) {
        let val = event.target.value;

        console.log('value', val);

        let temObj = assign({}, this.state.cur_photodata);
        temObj.voteSummary = val;


        console.log('comment temObj', temObj);

        this.setState({
            cur_photodata: temObj
        })

    }





    render() {
        const {hasNext,  cur_photodata} = this.state;
        const { curTask, items } = this.props;
        const me = this;
        var hasnextPageFn = false;
        let actionBtnShowStr = '';
        let btnClassName = '';

        if (curTask.reviewTask.reviewTaskType === 0) {
            actionBtnShowStr = '入选';
            btnClassName = 'action-confirm';
        } else {
            actionBtnShowStr = '淘汰';
            btnClassName = 'action-danger';
        }




        return (
            <div className="full-aspect-ratio-photo-grid infinite_scroll_container">
                <div className="grid-container" ref="gallery">
                    {
                        items.length ? (
                                items.map(function (item, index) {

                                    if (!window.allImgIdJson) {
                                        window.allImgIdJson = {}
                                    }
                                    var isgroupFlag = item.resource.resourceType == WORK_TYPE_GROUP;// 单图=0 组图=1 图文=2  （2是组图,0是图片这个是社区的，废弃）

                                    //修改记录： 这里的图片信息是在item的 resource 字段里，所以取item要夺取一个字段

                                    var getPreJson = function (__i) {
                                        if (!__i) {
                                            __i = 1;
                                        }
                                        var __Item = items[index - __i];
                                        if (!__Item) {
                                            return function (__handler) {
                                                if (me.state.page == 1) {
                                                    __handler([]);
                                                } else {
                                                    me._loadData(--me.state.page, __handler);
                                                }
                                            };
                                        }/* else if (__Item.resourceType == 2) {
                                         return getPreJson(++__i);
                                         }*/ else {
                                            return {
                                                id: __Item.id,
                                                item: __Item
                                            };
                                        }
                                    }
                                    var getNextJson = function (__i) {
                                        if (!__i) {
                                            __i = 1;
                                        }
                                        var __Item = items[index + __i];
                                        if (!__Item) {
                                            return function (__handler) {
                                                me._loadData(++me.state.page, __handler);
                                            };
                                        }/* else if (__Item.resourceType == 2) {
                                         return getNextJson(++__i);
                                         } */ else {
                                            return {
                                                id: __Item.id,
                                                item: __Item
                                            };
                                        }
                                    }
                                    window.allImgIdJson[item.id] = {
                                        prev: getPreJson(),
                                        next: getNextJson()
                                    };
                                    if (!hasnextPageFn && index > items.length - 5) {
                                        hasnextPageFn = true;
                                        window.allImgIdJson[item.id].nextPageFn = function () {
                                            me._loadData(++me.state.page);
                                        }
                                    }


                                    return (
                                        <ImgItem {...{
                                            isGroup: isgroupFlag,
                                            key: item.id,
                                            index: index,
                                            data: item,
                                            curTask: me.props.curTask,
                                            showWinPhoto: me.showWinPhotoDetail.bind(me),
                                            actionBtnShowStr: actionBtnShowStr,
                                            btnClassName: btnClassName,
                                            confirmAction: me.confirmAction.bind(me, item),
                                            reviewWait: me.reviewWait.bind(me, item),
                                            isWaitPage: me.props.isWaitPage,
                                            isConfirmPage: me.props.isConfirmPage
                                        }} />
                                    )
                                })
                            ) : ''
                    }


                    {/*<Loading {...{*/}
                    {/*containerNode: '',*/}
                    {/*onClick: this._loadData.bind(this),*/}
                    {/*isShow: hasNext*/}
                    {/*}}/>*/}
                </div>

                {/*全屏展示作品的窗口*/}
                <div>
                    <Modal
                        title=""
                        visible={this.state.visible}
                        closable={true}
                        footer={false}
                        width='100%'
                        style={{top: '0'}}
                        maskClosable={false}
                        mask={false}
                        destroyOnClose={true}
                        onCancel={this.handleCancel}
                        wrapClassName="modal-photo-detail"
                    >
                        <div>
                            <ImgItemDetail  {...{
                                show:this.state.visible,
                                data: cur_photodata,
                                curTask: me.props.curTask,
                                actionBtnShowStr: actionBtnShowStr,
                                btnClassName: btnClassName,
                                confirmAction: me.confirmAction.bind(me, cur_photodata),
                                reviewWait: me.reviewWait.bind(me, cur_photodata),
                                showWinPhotoDetail: me.showWinPhotoDetail.bind(me),
                                closeWin: me.handleCancel.bind(me),
                                isWaitPage: me.props.isWaitPage,
                                isConfirmPage: me.props.isConfirmPage,
                                itemSubmitted: me.state.itemSubmitted
                            }}/>
                        </div>


                    </Modal>
                </div>

                {/* 填写评语窗口 */}
                <div>
                    <Modal
                        title="入选点评"
                        visible={this.state.commentShow}
                        closable={true}
                        maskClosable={false}
                        mask={true}
                        width='500px'
                        style={{'zIndex': '1001'}}
                        cancelText="取消"
                        okText="确定"
                        onCancel={this.hideWinComment.bind(me)}
                        onOk={this.submitReviewComment.bind(me)}
                        wrapClassName="modal-photo-detail-comment"
                    >
                        <div className="content-wrapper">
                            <div className="content-attention">
                                尊敬的评委，本轮评审需要您给出点评
                            </div>

                            <textarea className="work-comment" name="comment" onChange={this.summaryChange} value={this.state.cur_photodata.voteSummary || ''}>

                            </textarea>

                        </div>


                    </Modal>
                </div>


            </div>
        );
    }
}


export default ReviewImgsList;
