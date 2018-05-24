/**
 * Created by liuxiaoxiao1 on 2018/3/20.
 * 移植 500px.me dantu_leftPic.jsx
 */

//TODO: 写到，在窗口里显示单图详情页，该调整左侧slider内容
import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import lyby from '../../utils/web-utils'
import classNames from 'classnames'

import './imgItemDetailLeft.less'


var loginID = '';


class DantuCmp extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            loaded : false
        }
    }
    static propTypes =  {
        style: PropTypes.object,
        data: PropTypes.object,
        closeWin: PropTypes.func
    }
    //TODO: 暂时注释掉懒加载
    componentDidMount () {
        // var me = this;
        // var dom = ReactDOM.findDOMNode(this);
        // var _this = $(dom);
        // var lazyOptions = {
        //     effect: "fadeIn",
        //     load (){
        //         me.setState({
        //             loaded : true
        //         })
        //     },
        //     error (){
        //         me.setState({
        //             loaded : true
        //         })
        //     }
        // }
        // if (this.props.container) {
        //     lazyOptions.container = $(this.props.container);
        // }
        // _this.find('.lazy').removeClass('lazy').lazyload(lazyOptions);
    }
    render () {
        var item = this.props.data.resource;
        if (!item) {
            return null;
        }

        var leftDisabledFlag = true;
        var rightDisabledFlag = true;
        var curJson = {};
        if(window.allImgIdJson){
            curJson = window.allImgIdJson[this.props.data.id];
            if(curJson instanceof Object){
                leftDisabledFlag = !curJson.prev && (typeof curJson.prev != 'function');
                rightDisabledFlag = !curJson.next;
            }else{
                curJson = {}
            }
        }

        // var urlStr = item.url.baseUrl + '!p5';
        // if (item.extendedField && item.extendedField.waterMark) {
        //     urlStr = lyby.getUrlLink(item.url, 'p5_' + item.extendedField.waterMark);
        // }



        console.log('itemitemitem,', item);

        var urlStr = lyby.getPImgUrlByUrl(item.url, '!p5');




        console.log('item', item);
        console.log('urlStr', urlStr)
        console.log('curJson', curJson);



        return (
            <div className="photo_container copyright-contextmenu" style={this.props.style}>
                <div className="overlay">

                    {/* 先不支持全屏 */}
                    {/*onClick={this._fullscreen}*/}
                    <div className="adult_content、_region"  ></div>
                    <div className={classNames({"nav left": true, "disabled": leftDisabledFlag})}  onClick={this._prevClick.bind(this, curJson.prev)}>
                        <div className="arrow">
                            {/*<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid" width="30" height="46" viewBox="0 0 30 46">*/}
                                {/*<path d="M25.767,39.039 C26.537,39.785 26.494,41.049 25.670,41.848 C24.846,42.646 23.545,42.689 22.775,41.943 L6.492,25.993 L6.492,25.993 L5.831,25.351 L3.500,23.089 L6.492,20.185 L6.492,20.185 L22.945,4.070 C23.728,3.311 25.040,3.343 25.864,4.141 C26.688,4.941 26.721,6.215 25.937,6.974 L9.542,23.064 L25.767,39.039 Z" className="cls-1"/>*/}
                                {/*<script xmlns=""/></svg>*/}
                        </div>
                    </div>

                    {/* 先不支持全屏 */}
                    {/*<div className="focus"  onClick={this._fullscreen}></div>*/}
                    <div className={classNames({"nav right": true, "disabled": rightDisabledFlag})} onClick={this._nextClick.bind(this, curJson)}>
                        <div className="arrow" >
                            {/*<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid" width="30" height="46" viewBox="0 0 30 46">*/}
                                {/*<path d="M4.335,7.115 C3.572,6.376 3.616,5.125 4.432,4.333 C5.248,3.543 6.536,3.500 7.299,4.239 L23.427,20.036 L23.427,20.036 L24.082,20.671 L26.391,22.912 L23.427,25.788 L23.427,25.788 L7.130,41.748 C6.355,42.500 5.055,42.468 4.240,41.678 C3.423,40.886 3.391,39.624 4.166,38.872 L20.406,22.937 L4.335,7.115 Z" className="cls-1"/>*/}
                                {/*<script xmlns=""/></svg>*/}
                        </div>
                    </div>
                </div>
                {
                    this.state.loaded ? null : (
                            <div className="loading"></div>
                        )
                }
                <img className="photo lazy"
                     //data-original={urlStr}
                     src={urlStr}
                     //src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                    //src="https://drscdn.500px.org/photo/158824843/q%3D80_m%3D2000/c65eddc8c93772d00ea9aae20b811a33"
                     alt="Let the Light In by Casey McCallister on 500px"></img>

                {/* 先不支持全屏 */}
                {/*<a href="javascript:void(0)" className="fullscreen-button" onClick={this._fullscreen}></a>*/}
            </div>
        )
    }
    _prevClick (pre){
        //如果没有上一个数据就关闭
        if(typeof pre == 'function') {
            this.props.closeWin();
        }

        if(this.props.preClick instanceof Function){
            this.props.preClick.apply(this.props, arguments);
        }
    }
    _nextClick (curJson){
        //TODO
        console.log('9999999999999999');
        if(typeof curJson.next == 'function') {
            this.props.closeWin();
        }

        if (this.props.nextClick instanceof Function) {
            if(curJson.nextPageFn instanceof Function){
                //TODO: 暂时不支持 自动加载下一页
                // curJson.nextPageFn();
                // delete curJson.nextPageFn;
            }
            this.props.nextClick.call(this.props, curJson.next);
        }
    }
    //全屏先注释掉
    _fullscreen (){
        // var me = this;
        // var item = this.props.data;
        // if (!item) {
        //     return null;
        // }
        // var Fullscreenphoto = require('./fullscreen.jsx');
        // Fullscreenphoto.show({
        //     data: item,
        //     exitHandler (imgData) {
        //         if (!imgData) {
        //             return null;
        //         }
        //         me._prevClick(imgData);
        //     }
        // });
    }
};

export default  DantuCmp;
