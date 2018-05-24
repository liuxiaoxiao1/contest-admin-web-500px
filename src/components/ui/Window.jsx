var React = require('react');
var ReactDOM = require('react-dom');
var lyby = require('../../js/util');
// var PropTypes = require('prop-types');
var classNames = require('classnames');
var assign = require('object-assign');
//var classNames = require('classnames');


var allWindowArray = [];

var Window = React.createClass({
    propTypes: {
        style: React.PropTypes.object
    },
    _initData: function () {
        return {
            cls : '',
            //定义的样式容器如果被点击了，就不会关掉窗口
            noCloseCls : '',
            autoClose : false,
            maxWidth: 0,
            maxHeight: 0,
            width: 0,
            height: 0,
            hidden: true,
            html: null,
            /*Begin: Added by xiaoxiaoliu for 扩展弹出窗口的基本功能：title和关闭按钮 20170706*/
            //是否有公有的头部，里面可能有 title，必须有close的按钮
            hasHead: false,
            //配合hasHead使用，只能在有head的时候 才能有title，窗口的标题
            title: ''
            /*End: Added by xiaoxiaoliu for 扩展弹出窗口的基本功能：title和关闭按钮 20170706*/

        }
    },
    getInitialState: function () {
        return this._initData();
    },
    _onChange: function () {
        //this.props.onchange
    },
    _windowResize : function () {
        var maxWidth = this.state.maxWidth || 0;
        var maxHeight = this.state.maxHeight || 0;

        var el = $(window);
        var pxEl = $(this.refs.centerbody);
        if (pxEl.length) {
            var w = this.state.width || (el.width() - (lyby.ismobile ? 10 : 80));
            var h = this.state.height || (el.height()- (lyby.ismobile ? 20 : 120));

            if (maxWidth && w > maxWidth) {
                w = maxWidth;
            }
            if(maxHeight && h > maxHeight){
                h = maxHeight;
            }
            pxEl.css({
                width : w,
                height : h,
                'margin-left':0 - w/2,
                'margin-top':0-h/2
            });
        }
    },
    _windowClick: function (evt) {
        if(!this.state.autoClose){
            return;
        }
        if(!this.state.hidden){
            var _thisEl = $(evt.target);
            if (_thisEl[0].type == 'file' || (this.state.noCloseCls && _thisEl.is(this.state.noCloseCls))) {
                return;
            }
            if (!_thisEl.parents('.pxLightboxHtml').length) {
                var lastWindow = allWindowArray.pop();
                if(lastWindow){
                    lastWindow._close();
                }
                //this._close();
            }
        }
    },
    componentDidMount: function () {
        $(window).bind("resize",this._windowResize);
        $(window).bind("click",this._windowClick);
    },
    componentDidUpdate : function () {
        this._windowResize();
    },
    componentWillUnmount: function () {
        $(window).unbind("click",this._windowClick);
        $(window).unbind("resize",this._windowResize);
    },
    _close: function (windEl) {
        var me = this;
        //ReactDOM.findDOMNode(this)
        this.setState({
            hidden: true,
            html: ''
        });
        setTimeout(function () {
            if(me.state.afterClose){
                me.state.afterClose();
            }
            //ReactDOM.unmountComponentAtNode(document.getElementById('react_msg_window'));
            var _thiDom = $(ReactDOM.findDOMNode(me));
            var windEl = _thiDom.parent();
            ReactDOM.unmountComponentAtNode(windEl[0]);
            windEl.remove();

            //如果是最后一个窗口了，就不要样式了
            if (!allWindowArray.length) {
                $('html').removeClass('pxLightbox');
            }
        },300)
    },
    _canelClick : function () {
        if(this.state._canelClick){
            this.state._canelClick();
        }else{
            var lastWindow = allWindowArray.pop();
            if(lastWindow){
                lastWindow._close();
            }
            //this._close();
        }
    },
    _show: function (options) {
        var me = this;
        this.state.fullScreen = false;
        options = options || {};
        $('html').addClass('pxLightbox');
        setTimeout(function () {
            var htmlEl = options.html;
            if(htmlEl instanceof Function){
                htmlEl = htmlEl(React);
            }
            me.setState(assign(me._initData(), options, {
                html: htmlEl,
                hidden: false
            }));
            if(options.show instanceof Function){
                options.show();
            }
        },100)
    },
    render: function () {
        var style = {
            position: 'absolute'
        }
        var cls = {
            pxLightbox_window: true,
            show: !this.state.hidden,
            //这个暂时只是详情页要用这个
            "full-screen-main" : this.state.fullScreen
        };
        if(this.state.cls instanceof Object){
            assign(cls,this.state.cls)
        }
        return (
            <div className={classNames(cls)}>
                <div className="pxLightbox_container">
                    <div className="pxLightbox_background"></div>
                    {
                        this.state.fullScreen ? (
                            <div className={classNames({"pxLightboxHtml":true,"full-screen":true})}>
                                {this.state.html}
                            </div>
                        ) : (
                            <div className={classNames({"pxLightboxHtml":true})}>
                                {
                                    this.state.html ? (
                                        <div ref="centerbody" style={style}>
                                            <div className="uploader_layout modal_content">
                                                {
                                                    this.state.hasHead ? (
                                                            <div className="commonHead">
                                                                <h3>{this.state.title ? this.state.title: ''}</h3>
                                                                <div className="close" onClick={this._canelClick}>&times;</div>
                                                            </div>
                                                    ) : ''
                                                }
                                                {this.state.html}
                                            </div>
                                        </div>
                                    ) : null
                                }
                            </div>
                        )
                    }
                </div>
            </div>
        )
    }
});
module.exports = {
    _closeAll: function () {
        var _ce;
        while (_ce = allWindowArray.shift()) {
            if (_ce) {
                _ce._close();
            }
        }
    },
    _close: function () {
        var lastWindow = allWindowArray.pop();
        if(lastWindow){
            lastWindow._close();
        }
    },
    _show: function (options) {
        if (typeof document != 'undefined') {
            // var msgWin = document.getElementById('react_msg_window');
            // if (!msgWin) {
            //     msgWin = document.createElement("div");
            //     msgWin.id = 'react_msg_window'
            //     document.body.appendChild(msgWin);
            // }
            var msgWin = document.createElement("div");
            document.body.appendChild(msgWin);
            var curwin = ReactDOM.render(
                <Window />,
                msgWin
            )
            allWindowArray.push(curwin);
            curwin._show(options);
        }
    }
}