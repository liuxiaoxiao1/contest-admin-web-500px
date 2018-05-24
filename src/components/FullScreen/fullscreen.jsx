import React from 'react'
import ReactDOM from 'react-dom'
import lyby from '../../utils/web-utils'
import classNames from 'classnames'
import ImgItemDetail from '../ReviewImgsList/imgItemDetail'


var assign = require('object-assign');

var timeoutobj = null;
var prevX = null;
var prevY = null

class Fullscreenphoto extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data
        }
    }
    _getImgEl (options) {
        var img = new Image();
        assign(img, options);
        return img;
    }
    _setImgSrc  (rData) {
        var photoInfo = rData.item;
        var imgEl = rData.imgEl;
        var me = this;
        if (!photoInfo) {
            return;
        }
        var _cid = photoInfo.id;
        var urlStr = '/community/photo-details/' + _cid;

        if (!_cid || !urlStr) {
            return;
        }
        /*Begin:Added by xiaoxiaoliu for 作品详情页支持 查看部落中的私有作品 20170511*/
        var paramsObj = {
            type: 'json',
            imgsize: 'p1,p2,p5,p6'
        }
        if(lyby.getUrlParams().fromType && lyby.getUrlParams().fromResourceId ) {
            paramsObj.fromType = lyby.getUrlParams().fromType;
            paramsObj.fromResourceId = lyby.getUrlParams().fromResourceId;
        }
        /*End:Added by xiaoxiaoliu for 作品详情页支持 查看部落中的私有作品 20170511*/

        $.ajax({
            type: "GET",
            url: urlStr,
            data: paramsObj,
            dataType: "json",
            success (data) {
                if (data.url) {
                    // data = rs.data;
                    var prevurlStr = lyby.getUrlLink(data.url, 'p5');
                    if (data.extendedField && data.extendedField.waterMark) {
                        prevurlStr = lyby.getUrlLink(data.url, 'p5_' + data.extendedField.waterMark);
                    }
                    imgEl.src = prevurlStr;
                }
            },
            error (e) {
                lyby.errorMsg(e);
            }
        });
    }
    componentDidUpdate(){
    }
    _launchFullScreen () {
        var element = ReactDOM.findDOMNode(this);
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
    }
    _initScreenChange  () {
        var me = this;
        var element = ReactDOM.findDOMNode(this);
        var _this = $(element);
        // var screenChange = 'webkitfullscreenchange' || 'mozfullscreenchange' || 'fullscreenchange';
        var _changeFn = function () {
            var isFullScreen = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;
            if (isFullScreen) {
                var h = window.screen.height + 'px';
                $(isFullScreen).css({'display':'block','lineHeight':h});
                $(window).keyup(function (e) {
                    // 37：左，39：右，32：空格，27：esc
                    if(e.keyCode == 37){
                        var curID = me.state.data.id;
                        var curJson={};
                        if(window.allImgIdJson && window.allImgIdJson[curID]){
                            curJson = window.allImgIdJson[curID];
                        }
                        me._prevClick(curJson.prev);

                    }else if(e.keyCode == 39){
                        var curID = me.state.data.id;
                        var curJson={};
                        if(window.allImgIdJson && window.allImgIdJson[curID]){
                            curJson = window.allImgIdJson[curID];
                        }
                        me._nextClick(curJson);

                    }else if(e.keyCode == 32){
                        if(me.refs.likeBtn.state.userLikerState){
                            if(_this.hasClass('hidebox')){
                                $(me.refs.zan).addClass('show');
                                setTimeout(function(){
                                    $(me.refs.zan).removeClass('show');
                                },1000);
                            }
                            me._swingIcon();
                        }else{
                            if (!lyby.validateUser()) {
                                return;
                            }
                            var photo = me.state.data;
                            var user = photo.uploaderInfo;


                        }

                    }
                });

                // setTimeout(function(){
                //     _this.addClass('hidebox');
                // },1500);


            } else {
                var windEl = _this.parent();
                ReactDOM.unmountComponentAtNode(windEl[0]);
                windEl.remove();


                var curID = me.state.data.id;
                var curJson={
                    id:curID
                };

                if(me.props.exitHandler){
                    me.props.exitHandler(curJson);
                }
                $(window).unbind('keyup');
                window.removeEventListener('webkitfullscreenchange',_changeFn);
                window.removeEventListener('mozfullscreenchange', _changeFn);
                window.removeEventListener('fullscreenchange', _changeFn);
                console.log('退出全屏');
            }
        }
        window.addEventListener('webkitfullscreenchange', _changeFn);
        window.addEventListener('mozfullscreenchange', _changeFn);
        window.addEventListener('fullscreenchange', _changeFn);
    }
    componentDidMount () {
        this._initScreenChange();
        this._launchFullScreen();

        var me = this;
        var _this = $(ReactDOM.findDOMNode(this));

        var item = me.state.data;


        var urlStr = lyby.getUrlLink(item.url, 'p5');
        if (item.extendedField && item.extendedField.waterMark) {
            urlStr = lyby.getUrlLink(item.url, 'p5_' + item.extendedField.waterMark);
        }
        me.curImgEl = this._getImgEl({
            src: urlStr,
            onload () {
                _this.append(this)
            }
        });
    }
    _swingIcon() {
        $('.animate_icon').css({'animation':'swing 1s linear','-moz-animation':'swing 1s linear','-webkit-animation':'swing 1s linear','-o-animation':'swing 1s linear'});
        setTimeout(function(){
            $('.animate_icon').css({'animation':'','-moz-animation':'','-webkit-animation':'','-o-animation':''});
        },1000);
    }
    render () {
        var me = this;

        var item = this.state.data;
        if (!item) {
            return null;
        }

        // var leftDisabledFlag = true;
        // var rightDisabledFlag = true;
        // var curJson = {};
        // if(window.allImgIdJson){
        //     curJson = window.allImgIdJson[item.id];
        //     if(curJson instanceof Object){
        //         leftDisabledFlag = !curJson.prev;
        //         rightDisabledFlag = !curJson.next;
        //         if (curJson.prev && !curJson.prev.imgEl) {
        //             var prevurlStr = lyby.getUrlLink(curJson.prev.item.url, 'p5');
        //             if (curJson.prev.item.extendedField && curJson.prev.item.extendedField.waterMark) {
        //                 prevurlStr = lyby.getUrlLink(curJson.prev.item.url, 'p5_' + curJson.prev.item.extendedField.waterMark);
        //             }
        //
        //             // curJson.prev.imgEl = this._getImgEl({
        //             //     src: prevurlStr
        //             // });
        //             curJson.prev.imgEl = new Image();
        //             this._setImgSrc(curJson.prev);
        //         }
        //         if (curJson.next && !curJson.next.imgEl) {
        //             var nexturlStr = lyby.getUrlLink(curJson.next.item.url, 'p5');
        //             if (curJson.next.item.extendedField && curJson.next.item.extendedField.waterMark) {
        //                 nexturlStr = lyby.getUrlLink(curJson.next.item.url, 'p5_' + curJson.next.item.extendedField.waterMark);
        //             }
        //
        //             // curJson.next.imgEl = this._getImgEl({
        //             //     src: nexturlStr
        //             // });
        //             curJson.next.imgEl = new Image();
        //             this._setImgSrc(curJson.next);
        //         }
        //     } else {
        //         curJson = {}
        //     }
        // }
        return (
            <div className="fullscreen_photo_container" onMouseMove={this._mouseMove} onClick={function(){me._exitFullscreen()}}>
                <div className="box">
                    <div className="closefullscreen" onClick={function(){me._exitFullscreen()}}></div>

                    <ImgItemDetail {...{
                        data: me.state.data,
                        prevClick: me._prevClick.bind(me),
                        nextClick: me._nextClick.bind(me)
                    }}/>



                </div>

            </div>
        )
    }
    _exitFullscreen () {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
    _loadData (photoInfo) {
        var me = this;
        if (!photoInfo) {
            return;
        }
        var _cid = photoInfo.id;
        var urlStr = '/community/photo-details/' + _cid;

        if (!_cid || !urlStr) {
            return;
        }
        /*Begin:Added by xiaoxiaoliu for 作品详情页支持 查看部落中的私有作品 20170511*/
        var paramsObj = {
            type: 'json',
            imgsize: 'p1,p2,p5,p6'
        }
        if(lyby.getUrlParams().fromType && lyby.getUrlParams().fromResourceId ) {
            paramsObj.fromType = lyby.getUrlParams().fromType;
            paramsObj.fromResourceId = lyby.getUrlParams().fromResourceId;
        }
        /*End:Added by xiaoxiaoliu for 作品详情页支持 查看部落中的私有作品 20170511*/

        $.ajax({
            type: "GET",
            url: urlStr,
            data: paramsObj,
            dataType: "json",
            success (rs) {
                var data;
                if (rs.status == 200) {
                    data = rs.data;
                    if (data.title) {
                        document.title = lyby.htmldecode(data.title);
                    }
                } else if (rs.id) {
                    data = rs;
                    if (data.title) {
                        document.title = lyby.htmldecode(data.title);
                    }
                }
                me.setState({
                    data:data
                });
            },
            error (e) {
                lyby.errorMsg(e);
            }
        });
    }
    _prevClick (obj,event){
        // if(this.timeoutobj){
        //     clearTimeout(this.timeoutobj);
        // }
        // var me = this;
        // var _this = $(ReactDOM.findDOMNode(this));
        // if(event){
        //     event.stopPropagation();
        // }
        //
        // if(this.curImgEl){
        //     this.curImgEl.remove();
        // }
        // this.curImgEl = obj.imgEl;
        // _this.append(obj.imgEl);


        var item = this.state.data;
        var preObj = ''
        if (!item) {
            return null;
        }

        var leftDisabledFlag = true;
        var rightDisabledFlag = true;
        var curJson = {};
        if(window.allImgIdJson){
            curJson = window.allImgIdJson[item.id];
            if(curJson instanceof Object){
                if (curJson.prev) {
                    preObj = curJson.prev;
                }

            }
        }


        if (preObj) {
            this.setState({
                data: preObj
            });
        }else{
            this._exitFullscreen();
        }
    }
    _nextClick(curJson,event){
        // var obj = curJson.next;
        // if(this.timeoutobj){
        //     clearTimeout(this.timeoutobj);
        // }
        // var me = this;
        // var _this = $(ReactDOM.findDOMNode(this));
        // if(event){
        //     event.stopPropagation();
        // }
        //
        // if(curJson.nextPageFn instanceof Function){
        //     curJson.nextPageFn();
        //     delete curJson.nextPageFn;
        // }
        //
        // if(this.curImgEl){
        //     this.curImgEl.remove();
        // }
        // this.curImgEl = obj.imgEl;
        // _this.append(obj.imgEl);


        var item = this.state.data;
        var nextObj = ''
        if (!item) {
            return null;
        }

        var curJson = {};
        if(window.allImgIdJson){
            curJson = window.allImgIdJson[item.id];
            if(curJson instanceof Object){
                if (curJson.prev) {
                    nextObj = curJson.next;
                }
            }
        }

        if (nextObj) {
            // this._loadData(obj)
            this.setState({
                data: nextObj
            });
        }else{
            this._exitFullscreen();
        }
    }
    //不知道这个代码是干啥的
    _mouseMove(evt){
        return true;
        if(evt.pageX == this.prevX && evt.pageY == this.prevY){
            return;
        }
        this.prevX = evt.pageX;
        this.prevY = evt.pageY;
        if(this.timeoutobj){
            clearTimeout(this.timeoutobj);
        }
        var _this = $(ReactDOM.findDOMNode(this));
        _this.removeClass('hidebox');


        if($(evt.target).hasClass('arrow')){
            return;
        }

        this.timeoutobj = setTimeout(function () {
            _this.addClass('hidebox');
        },1500)

    }

};
export default {
    show (options) {
        var msgWin = document.createElement("div");
        document.body.appendChild(msgWin);
        var curwin = ReactDOM.render(
            <Fullscreenphoto{...options}/>,
            msgWin
        )
    }
};