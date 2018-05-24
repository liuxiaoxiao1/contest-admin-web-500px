var React = require('react');
var ReactDOM = require('react-dom');
var classNames = require('classnames');
var assign = require('object-assign');
var allMsgArray = [];

var Message = React.createClass({
    getInitialState: function () {
        return assign({
            //提示信息ff里显示的内容
            html : '',
            //样式分为error success warning，默认为warning
            cls : ''
        }, this.props)
    },
    _onChange: function () {
        //this.props.onchange
    },
    componentDidMount: function () {
    },
    componentWillUnmount: function () {
    },
    _close : function(){
        var me = this;
        this.setState({
           html : ''
        })
        setTimeout(function () {
            if(me.state.afterClose){
                me.state.afterClose();
            }
            //ReactDOM.unmountComponentAtNode(document.getElementById('react_msg_window'));
            var _thiDom = $(ReactDOM.findDOMNode(me));
            var windEl = _thiDom.parent();
            ReactDOM.unmountComponentAtNode(windEl[0]);
            windEl.remove();
        },300)
    },
    _show : function(options){
        this.setState(options);
    },
    render: function () {
        var me = this;
        var style = {};
        if(this.state.html){
            style.top = 0;
            // setTimeout(function(){
            //     me._close();
            // },4000);
        }else{
        }

        var clsJson = {
            msg_window: true,
            msg: true
        }
        if(this.state.cls){
            clsJson[this.state.cls] = true;
        }
        return (
            <div className={classNames(clsJson)} style={style}>
                <div className="inside">
                    {this.state.html}
                </div>
                <a className="close_x" onClick={this._close}></a>
            </div>
        )
    }
});
// if(typeof document != 'undefined'){
//     var msgWin = document.getElementById('msg_window');
//     if(!msgWin){
//         msgWin=document.createElement("div");
//         msgWin.id = 'msg_window'
//         document.body.appendChild(msgWin);
//     }
//     module.exports = ReactDOM.render(
//         <Message />,
//         msgWin
//     )
// }

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
        var lastWindow = allMsgArray.pop();
        if(lastWindow){
            lastWindow._close();
        }
    },
    _dingshiClose : null,
    _show: function (options) {
        var me = this;
        if (typeof document != 'undefined') {
            // var msgWin = document.getElementById('msg_window');
            // if (!msgWin) {
            //     msgWin = document.createElement("div");
            //     msgWin.id = 'msg_window'
            //     document.body.appendChild(msgWin);
            // }
            var curwin;
            var _showFn = function () {
                setTimeout(function () {
                    curwin._show(options);
                    me._dingshiClose = setTimeout(function(){
                        me._close();
                    },4000);
                },100)
            }
            if(allMsgArray.length){
                curwin = allMsgArray[0];
                clearTimeout(me._dingshiClose);
                _showFn();
            }else{
                var msgWin = document.createElement("div");
                document.body.appendChild(msgWin);
                curwin = ReactDOM.render(
                    <Message {...{
                    }}/>,
                    msgWin
                )
                _showFn();
                allMsgArray.push(curwin);
            }
        }
    }
}
