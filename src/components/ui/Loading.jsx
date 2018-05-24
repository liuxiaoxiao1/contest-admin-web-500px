var React = require('react');
var ReactDOM = require('react-dom');

var Loading = React.createClass({
    getDefaultProps: function(){
        return {
            //图片懒加载是否要根据父类的滚动条进行．可以是bool也可以是className
            container : false,
            isShow: true,
            loadData: function(){}
        }
    },
    componentWillReceiveProps : function () {
    },
    componentWillUnmount: function () {
    },
    _initLazyLoad : function () {
        var me = this;
        var _this = $(ReactDOM.findDOMNode(this));
        var mainEl = $(ReactDOM.findDOMNode(this.refs.lazyDiv));
        var options = {
            load: function () {
                me._onClick();
            }
        }
        //有父容器的时候,可能是在窗口window中,窗口有动画效果.加载有点时间.
        if(this.props.container){
            setTimeout(function () {
                if(typeof me.props.container == 'string'){
                    options.container = $(me.props.container);
                }else{
                    options.container = _this.parent();
                }
                mainEl.lazyload(options);
            },300)
            
        }else{
            mainEl.lazyload(options);
            $(window).scroll();
        }
    },
    componentDidUpdate : function(){
       this._initLazyLoad();
    },
    _onClick : function () {
        if(this.isMounted()){
            if(this.props.loadData instanceof Function){
                this.props.loadData();
            }
        }
    },
    componentDidMount: function () {
        this._initLazyLoad();
    },
    render: function(){
        //<img src="/images/loading.gif" width="40" height="40" data-original="/images/loading.gif"/>
        return (
            <div className="infinite_scroll_loader" style={{visibility: this.props.isShow ? 'visible': 'hidden'}} onClick={this._onClick} key={new Date().getTime()}>
                <div className="bg">
                    <div ref="lazyDiv" className="lyby_500px_load" data-original="//500px.me/images/loading-500.png">
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = Loading;

