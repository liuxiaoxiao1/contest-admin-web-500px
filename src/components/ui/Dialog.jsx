var React = require('react');
var ReactDOM = require('react-dom');
var classNames = require('classnames');
var assign = require('object-assign');
//var classNames = require('classnames');

var Mask = React.createClass({
    getInitialState: function () {
        return {
            hidden : true
        }
    },
    componentDidMount: function () {
        var me = this;
        setTimeout(function () {
            me.setState({
                hidden : false
            })
        },100)
    },
    render : function () {
        return (
            <div id={this.state.hidden ? '' : 'dialog-box-mask'} style={{height: '1506px',display: 'block'}}></div>
        )
    }
});
var Dialog = React.createClass({
    propTypes: {
        //用来展示在dialog中的内容
        //html: React.PropTypes.string,
        //按钮的回调
        handler : React.PropTypes.func,
        //右上角的叉
        closeAble : React.PropTypes.bool,
        //自定义标题
        title : React.PropTypes.string,
    },
    getDefaultProps: function () {
        return {
            btns: {
                cancel: '取消',
                ok: '确定'
            }
        };
    },
    getInitialState: function () {
        return {
            hidden : true
        }
    },
    _onChange: function () {
        //this.props.onchange
    },
    componentDidMount: function () {
        $('html').addClass('pxLightbox');
        this._show();
        //Added by xiaoxiaoliu for 窗口展示后 自动调整窗口左右位置 20170503
        this._adjustWin();
    },
    componentWillUnmount: function () {
        if(!this.props.noremoveCls){
            $('html').removeClass('pxLightbox');
        }
    },
    //Added by xiaoxiaoliu for 窗口展示后 自动调整窗口左右位置 20170503
    _adjustWin: function () {
        var winWidth = $("#btn-dialogBox").width();
        $("#btn-dialogBox").css({'margin-left': -(winWidth/2)});
    },
    _close: function () {
        //父类自己去调用close
        var me = this;
        var opt = {
            hidden : true
        };
        this.setState(opt);
        this.refs.mask.setState(opt);
        setTimeout(function () {
            //动画0.3秒消失后，删除父dom
            ReactDOM.unmountComponentAtNode(me.props.parent);
        },300)
    },
    _show: function () {
        var me = this;
        setTimeout(function () {
            me.setState({
                hidden : false
            })
        },100)
    },
    render: function () {
        var me = this;
        // style="width: 300px;" style="width: 260px;"

        var btnsEl = [];
        for(var key in this.props.btns){
            btnsEl.push((
                <span key={key} className={"dialog-btn-"+key} onClick={this.props.handler.bind(this,key)}>{this.props.btns[key]}</span>
            ));
        }
        {/*<span className="dialog-btn-cancel" onClick={this.props.handler.bind(this,'cancel')}>{this.props.btns.cancel||'取消'}</span>*/}
        {/*<span className="dialog-btn-confirm" onClick={this.props.handler.bind(this,'ok')}>{this.props.btns.ok||'确定'}</span>*/}
        return (
            <div className={classNames(assign({dialogbox_main_cmp:true},this.props.cls))}>
                <section id="btn-dialogBox" style={this.props.style} className={classNames({'dialog-box':true,'effect-fade':true,show : !this.state.hidden})}>
                    <div className="dialog-box-container normal">
                        <div className="dialog-box-title">
                            <h3>提示</h3>
                            {
                                this.props.closeAble ?
                                    <span className="dialog-box-close" onClick={this.props.handler.bind(this,'cancel')}>×</span>
                                    : ''
                            }
                        </div>
                        {
                            this.props.title?(
                                    <div className="dialog-box-defined-title">{this.props.title}</div>
                                ):null
                        }

                        <div className="dialog-box-content">
                            {this.props.html}
                        </div>
                        <div className="dialog-btn">
                            {btnsEl}
                        </div>
                    </div>
                </section>
                <Mask ref="mask" />
            </div>
        )
    }
});

module.exports = {
    /*
    * $1: html 显示在dialog中的内容
    *
    * */
    _show : function (options) {
        if (typeof document != 'undefined') {
            var msgWin = document.getElementById('btn-dialogBox');
            msgWin = document.createElement("div");
            // msgWin = document.createElement("section");
            // msgWin.id = 'btn-dialogBox';
            // msgWin.className = 'dialog-box effect-fade';
            document.body.appendChild(msgWin);

            // var maskEl = document.createElement("div");
            // maskEl.id = 'dialog-box-mask';
            // document.body.appendChild(maskEl);
            //<div id="" style={{height: '1506px',display: 'block'}}></div>
            ReactDOM.render(
                React.createElement(Dialog, assign({parent: msgWin}, options)),
                msgWin
            )
        }
    }
};
