var React = require('react');
var ReactDOM = require('react-dom');
var assign = require('object-assign');
var lyby = require('../../js/util');
var popuCommonObj = {
    _restPopu: function () {
        this.setState({
            active: false
        })
        this.popu.setState({
            hidden: true
        })
    },
    componentDidMount: function () {
        var me = this;
        var _thiDom = ReactDOM.findDOMNode(this);
        var popuId = this.state.popuId;
        if (typeof document != 'undefined' && !this.popu) {
            var Popu_settings = this.getPopuCmp();
            var idstr = me.state.popuId;
            var msgWin = document.getElementById(idstr);
            if (!msgWin) {
                msgWin = document.createElement("div");
                msgWin.id = idstr;
                document.body.appendChild(msgWin);
            }
            this.popu = ReactDOM.render(
                <Popu_settings />, msgWin
            );
        }

        var clickFn = function (e) {
            if ($('html').hasClass('guide_show')) {
                return;
            }
            var curDom = e.target;
            if(curDom.isEqualNode(_thiDom)){
                return;
            }

            var classStr = '#' + popuId;
            if (_thiDom.className) {
                classStr += ',.' + (_thiDom.className.replace(/ /g, '.'));
            }else{
                console.error('请给popu主容器加上class');
            }
            var dd = $(curDom).parents(classStr);
            if (!dd.length) {
                me._restPopu();
            }
        }
        var scrollfn = function (e) {
            me._restPopu();
        }
        if(!this.state.popuHoverFlag){
            $(window).bind('click', clickFn);
            $(document).bind('scroll', scrollfn);
            $(window).bind('resize', scrollfn);
        }


        var mouseMoveFn = function (evt) {
            var curDom = evt.target;
            if(curDom.isEqualNode(_thiDom)){
                if(!me.state.active){
                    me._navClick();
                }
                return;
            }
            var classStr = '#' + popuId;
            if (_thiDom.className) {
                classStr += ',.' + (_thiDom.className.replace(/ /g, '.'));
            }else{
                console.error('请给popu主容器加上class');
            }
            var dd = $(curDom).parents(classStr);
            if (!dd.length) {
                if(me.state.active){
                    me._restPopu();
                }
            }else{
                if(!me.state.active){
                    me._navClick();
                }
            }
        }
        //popuHoverFlag 标识是否要鼠标滑过出现
        if(this.state.popuHoverFlag){
            $(window).bind('mousemove', mouseMoveFn);
        }

        this.componentWillUnmount = function () {
            var idstr = me.state.popuId;
            var msgWin = document.getElementById(idstr);
            ReactDOM.unmountComponentAtNode(msgWin);
            if(me.state.popuHoverFlag){
                $(window).unbind('mousemove', mouseMoveFn);
            }else{
                $(window).unbind('click',clickFn);
                $(document).unbind('scroll',scrollfn);
                $(window).unbind('resize',scrollfn);
            }
        }
    },
    _navClick: function () {
        if (!this.popu) {
            return;
        }
        if (!this.state.active) {
            var _thiDom = ReactDOM.findDOMNode(this);
            var popuEl = ReactDOM.findDOMNode(this.popu);
            this.setState({
                active: !this.state.active
            })
            var popuWidth = $(popuEl).width();
            var topEl = $(_thiDom);

            var centerW = (topEl.width() - popuWidth) / 2
            //Modified by xiaoxiaoliu for 兼容IE11 搜狗等浏览器 20171110
            var w = centerW - $(window).scrollLeft(); //window.scrollX;//el.width()
            var y =  $(window).scrollTop();//window.scrollY;
            var left = topEl.offset().left + w;
            var topN = topEl.offset().top + topEl.height() - y;

            // var topN = 35;
            // topN += $('#mainNav').offset().top;

            //如果右边出框了。
            var windowWidth = $(window).width()
            if (left + popuWidth > windowWidth) {
                left = windowWidth - popuWidth - 20;
            }

            this.popu.setState({
                hidden: false,
                style: {
                    top: topN,
                    left: left
                }
            });

            return {
                top: topN,
                left: left
            }
        }else if(!this.state.popuHoverFlag){
            this._restPopu();
            return {
                top: 0,
                left: 0
            }
        }
    }
}

module.exports = popuCommonObj;
