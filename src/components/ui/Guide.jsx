var React = require('react');
var ReactDOM = require('react-dom');
var classNames = require('classnames');
var assign = require('object-assign');
var lyby = require('../../js/util');
var ImgCmp = React.createClass({
    componentDidMount:function(){
        if(this.props.hidden){
            this.props.hidden();
        }
    },
    render: function () {
        return (
            <img className="guidance_help"
                 onLoad={this.props._imgLoad}
                 src={this.props.src}
                />
        )
    }
});

var GuideCmp = React.createClass({
    _initData: function () {
        return {
            //html: (
            //    <div>
            //        <span>
            //    Spring is in the air. Save 30% on all memberships.
            //    </span>
            //        <a className="button" href="/upgrade">立刻升级</a>
            //
            //        <div className="close_x"></div>
            //    </div>
            //)
        }
    },
    getInitialState: function () {
        return this._initData();
    },
    componentDidMount: function () {
    },
    componentWillUnmount: function () {
    },
    _guideCount : function(index){
        var loginUser = lyby.loginUser.getData();
        var loginUserId = loginUser.id;
        if (!loginUserId || !index) {
            return;
        }
        $.ajax({
            url: '//node.500px.me/guide/count',
            dataType: 'jsonp',
            data: {
                userId: loginUser.id,
                flag: index
            },
            success: function (ndata) {
            }
        })
    },
    _init: function (options) {
        if (options.Event) {
            this.event = options.Event;
            delete options.Event;
        }
        this.setState(options);
        return this;
    },
    _initAppData: function (options) {
        if (!options) {
            options = {};
        }
        //if(options.transparent){
        //    $(this.props.parentEl).addClass('tm');
        //}
        var me = this;
        this.componentDidUpdate = function () {
            var mainEl = $(ReactDOM.findDOMNode(this));
            var btnEl = mainEl.find('.applink .button');
            if (Mlink instanceof Function && btnEl.length) {
                new Mlink(
                    {
                        mlink: options.url || 'https://ayzxdi.mlinks.cc/AKjE?userId=77818fa7dffa4cb6a5ef849c8d15f901',
                        button: btnEl,
                        autoRedirect: false
                    }
                )
            }
        }
        lyby.loadJs("https://static.mlinks.cc/scripts/dist/mlink.min.js", function () {
            me.setState({
                html: me.state.transparent ? (
                    <div className="applink">
                        <a className="_tmlogo" href="/">
                            <svg data-name="Logo SVG" viewBox="0 0 80 20">
                                <title>logo</title>
                                <path
                                    d="M24.83,0a10,10,0,1,0,10,10h0A10.09,10.09,0,0,0,24.83,0Zm0,17.9a7.85,7.85,0,1,1,7.8-7.9h0A7.9,7.9,0,0,1,24.83,17.9ZM46.32,0a10,10,0,1,0,10,10h0A10,10,0,0,0,46.32,0Zm0,17.9a7.85,7.85,0,1,1,7.8-7.9h0A7.77,7.77,0,0,1,46.32,17.9ZM7.63,6a6.74,6.74,0,0,0-5.3,1.4V2.1h9c0.3,0,.5-0.1.5-1s-0.4-.9-0.6-0.9H1.33a0.9,0.9,0,0,0-.9.9V9.9c0,0.5.3,0.6,0.8,0.7a0.76,0.76,0,0,0,.9-0.2h0a5.69,5.69,0,0,1,5-2.4,5.2,5.2,0,0,1,4.5,4.4A5.06,5.06,0,0,1,7.23,18H6.63a5.1,5.1,0,0,1-4.7-3.3c-0.1-.3-0.3-0.5-1.1-0.2s-0.9.5-.8,0.8a7.09,7.09,0,0,0,9,4.2,7.09,7.09,0,0,0,4.2-9A7,7,0,0,0,7.63,6ZM63.12,0.1a5.42,5.42,0,0,0-4.8,5.4v8.9c0,0.5.4,0.6,1,.6s1-.1,1-0.6V5.5a3.36,3.36,0,0,1,2.9-3.4,3.29,3.29,0,0,1,2.5.8,3.19,3.19,0,0,1,1.1,2.4,4,4,0,0,1-.7,1.9,3.15,3.15,0,0,1-2.8,1.3h0c-0.4,0-.7,0-0.8.9,0,0.6,0,.9.5,1a4.92,4.92,0,0,0,2.9-.6,5.37,5.37,0,0,0,2.9-4.2A5.18,5.18,0,0,0,64,0,2.77,2.77,0,0,1,63.12.1Zm13.1,5.2,3.6-3.6c0.1-.1.4-0.4-0.2-1.1a1,1,0,0,0-.7-0.4h0a0.52,0.52,0,0,0-.4.2L74.92,4l-3.6-3.7c-0.3-.3-0.6-0.2-1.1.2s-0.5.8-.2,1.1l3.6,3.6L70,8.9h0a0.76,0.76,0,0,0-.2.4,0.84,0.84,0,0,0,.4.7,1.61,1.61,0,0,0,.7.4h0a1.06,1.06,0,0,0,.5-0.2L75,6.6l3.6,3.6a0.52,0.52,0,0,0,.4.2h0a1,1,0,0,0,.7-0.4c0.3-.4.4-0.8,0.1-1Z"
                                    transform="translate(0)">
                                </path>
                            </svg>
                        </a>
                        <a className="button">在官方APP中打开</a>
                    </div>
                ) : (
                    <div className="applink">
                        <span className='_logo'>
                        视觉中国摄影社区
                        </span>
                        <a className="button">在官方APP中打开</a>
                    </div>
                )
            })
        });
    },
    event : {},
    _close: function () {
        $('html').removeClass('guide_show');
        this.setState({
            html: ''
        });
    },
    _show: function () {
        $('html').addClass('guide_show');
        if (this.event.afterShow instanceof Function) {
            this.event.afterShow.call(this);
        }
    },
    _bgClick: function () {
        if (this.event.bgClick instanceof Function) {
            this.event.bgClick.call(this);
        }
    },
    render: function () {
        return (
            <div className="guidance" onClick={this._bgClick}>
                <div className="guidance_bg"></div>
                <div className="guidance_body">
                    {this.state.html}
                </div>
            </div>
        )
    }
});

GuideCmp._init_qianyue_Data  = function (options) {
    var loginUser = lyby.loginUser.getData();
    if (!lyby.ismobile && loginUser.id && (!isNaN(parseInt(loginUser.gicCreativeId)) || !isNaN(parseInt(loginUser.gicEditorialId)))) {
        if (typeof(cur_p) != 'undefined' && (cur_p == 'about' || cur_p == 'set' || cur_p == 'discover')) {
            return;
        }
    } else {
        return;
    }
    if(typeof(noshowDuanlianjie) != 'undefined'){
        return;
    }
    var guideCmpD;
    if (typeof document != 'undefined') {
        var idstr = 'guide_mainCmp';
        var msgWin = document.getElementById(idstr);
        if (!msgWin) {
            msgWin = document.createElement("div");
            msgWin.id = idstr;
            document.body.appendChild(msgWin);
            //document.body.insertBefore(msgWin, document.body.firstChild);
        }
        guideCmpD = ReactDOM.render(
            <GuideCmp {...{
                parentEl: msgWin
            }}/>,
            msgWin
        )
    }
    if(guideCmpD){
        var me = options.scope;
        $.ajax({
            url: '//node.500px.me/guide/getFlag',
            dataType: 'jsonp',
            data: {
                userId: loginUser.id
            },
            success: function (ndata) {
                if(ndata.status == 200){
                    var obj = ndata.data[0];
                    if (!obj || !obj.qianyuexiangdao) {
                        guideCmpD._init({
                            Event: {
                                bgClick : function(){
                                    var clickNum = 0;
                                    return function(){
                                        if(clickNum){
                                            this._close();
                                            this._guideCount('qianyuexiangdao');
                                        }else{
                                            //将上传关掉
                                            me.refs.upload._navClick();

                                            var zb = me.refs.profile._navClick();
                                            this.setState({
                                                html: (
                                                    <ImgCmp {...{
                                                        _imgLoad: function (evt) {
                                                            var _thisDom = $(evt.target);
                                                            zb.left = zb.left - _thisDom.width() + 96;
                                                            zb.top = zb.top + 10;
                                                            _thisDom.css(zb);
                                                        },
                                                        src : '//cdn.500px.me/images/guide/qianyue/guide2.png?dc=2',
                                                        key : new Date().getTime()
                                                    }}/>
                                                )
                                            })
                                        }
                                        clickNum++;
                                    }
                                }(),
                                afterShow: function () {
                                    var zb = me.refs.upload._navClick();
                                    this.setState({
                                        html: (
                                            <ImgCmp {...{
                                                _imgLoad: function (evt) {
                                                    var _thisDom = $(evt.target);
                                                    zb.left = zb.left - _thisDom.width() + 158;
                                                    zb.top = 5;
                                                    _thisDom.css(zb);
                                                },
                                                src : '//cdn.500px.me/images/guide/qianyue/guide1.png'
                                            }}/>
                                        )
                                    })
                                }
                            }
                        })._show();
                    }
                }
            }
        })
    }
}

GuideCmp._init_discover_Data  = function (options) {
    var loginUser = lyby.loginUser.getData();
    if (lyby.ismobile) {
        return;
    }
    if(typeof(noshowDuanlianjie) != 'undefined'){
        return;
    }
    var guideCmpD;
    if (typeof document != 'undefined') {
        var idstr = 'guide_mainCmp';
        var msgWin = document.getElementById(idstr);
        if (!msgWin) {
            msgWin = document.createElement("div");
            msgWin.id = idstr;
            document.body.appendChild(msgWin);
            //document.body.insertBefore(msgWin, document.body.firstChild);
        }
        guideCmpD = ReactDOM.render(
            <GuideCmp {...{
                parentEl: msgWin
            }}/>,
            msgWin
        )
    }
    if(guideCmpD){
        var me = options.scope;
        $.ajax({
            url: '//node.500px.me/guide/getFlag',
            dataType: 'jsonp',
            data: {
                userId: loginUser.id
            },
            success: function (ndata) {
                if(ndata.status == 200){
                    var obj = ndata.data[0];
                    if (!obj || !obj.remensheyingshichaxun) {
                        guideCmpD._init({
                            Event: {
                                bgClick : function(){
                                    this._close();
                                    this._guideCount('remensheyingshichaxun');
                                },
                                afterShow: function () {
                                    var sheyingshi = me.refs.xinruiSheyingshi;

                                    var _thiDom = $(ReactDOM.findDOMNode(sheyingshi));

                                    var left = _thiDom.offset().left - window.scrollX;
                                    var top = _thiDom.offset().top - window.scrollY;

                                    var zb={
                                        left:left,
                                        top:top
                                    };
                                    this.setState({
                                        html: (
                                            <ImgCmp {...{
                                                hidden:function(){
                                                    $('.guidance_help').css('visibility','hidden');
                                                },
                                                _imgLoad: function (evt) {
                                                    var _thisDom = $(evt.target);
                                                    zb.left = zb.left - 60;
                                                    zb.top = zb.top - 17;
                                                    _thisDom.css(zb);
                                                    _thisDom.css('visibility','visible')
                                                },
                                                src : '//cdn.500px.me/images/guide/remen/Group9.png',
                                            }}/>
                                        )
                                    })
                                }
                            }
                        })._show();
                    }
                }
            }
        })
    }
}
module.exports = GuideCmp;