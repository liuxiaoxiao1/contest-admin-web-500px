/**
 * Created by liuxiaoxiao1 on 2018/2/28.
 */
import React from 'react';
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import './Loading.less'

let scrollTop = 0

var timer = null;

//只要滚动条出现在视窗范围内 就加载数据； 这里没有脱离jQuery
class Loading extends React.Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    //只会在滚动到底部的时候加载数据
    onScrollHandle(event) {
        console.log(65656565656);

        //console.log('event.target', event.target);
        // const clientHeight = event.target.clientHeight
        // const scrollHeight = event.target.scrollHeight
        // const scrollTop = event.target.scrollTop

        //let container = event.target;


        //视窗高度
        const clientHeight = $(this.props.containerNode || window).height()
        //文档高度
        let scrollHeight = '';
        if(this.props.containerNode) {
            scrollHeight = $(this.props.containerNode)[0].scrollHeight;
        }else {
            scrollHeight= $(document).height();
        }
        //滚动条的高度
        const scrollTop = $(this.props.containerNode || window).scrollTop()

        //滚动到底部加载：这里的40 也是可以定制化的，是为了降低误差，防止滚动到底部不加载； 距离还有多少的时候 就开始加载，暂且不定制，以后需要的话，可以作为参数处理
        const isBottom = Math.abs(clientHeight + scrollTop - scrollHeight) < 40;
        if(isBottom) {
            this._onClick();
        }

        console.log('scrollTop', scrollTop);
        console.log('clientHeight', clientHeight);
        console.log('scrollHeight', scrollHeight);
        console.log('clientHeight + scrollTop', clientHeight + scrollTop);
        console.log('isBottom', isBottom);
        // if (this.state.isScrollBottom !== isBottom) {
        //     this.setState({
        //         isScrollBottom: isBottom
        //     })
        // }

    }

    componentDidMount() {
        if(this.props.isJustUi) {
            return ''
        }
        //$(ReactDOM.findDOMNode(this))
        //这里绑定滚动事件 也是绑定到有滚动条的视窗上
        let container = this.props.winNode || window;
        let winNode = $(container);
        let me = this;
        console.log('winNode', winNode);
        if (winNode) {
            //异步是为了防止拿不到父级dom节点
            setTimeout(function () {
                //contentNode.addEventListener('scroll', me.onScrollHandle.bind(me));
                //contentNode.scrollTop = scrollTop
                me.handleLoadData();//防止加载一次数据后，依然出现滚动条
                winNode.bind('scroll', me.handleLoadData.bind(me));
                winNode.scrollTop(scrollTop);
            }, 100)

        }
    }
    componentDidUpdate() {
        if(this.props.isJustUi) {
            return ''
        }
        this.handleLoadData()
    }

    handleLoadData() {
        console.log('scroll ***');
        let me = this;
        clearTimeout(timer);

        if(me.isVisual()) {
            timer = setTimeout(function () {
                me._onClick();
            }, 1000)
        }

    }

    //只要出现在视窗范围内都会加载数据
    isVisual() {
        //如果加载完数据后，加载条依然在视野中就应该继续加载数据
        //需要知道 父级容器，才能计算出来滚动条在父级容器中的相对高度, 相对高度低于视窗的高度就继续加载

        console.log(54545);

        if(!$(".infinite_scroll_loader").length) {
            return false
        }

        let winNode = this.props.winNode;

        let positiveHeight = '';//相对于父容器的高度
        let visualHeight = ''; //视窗的高度

        //滚动条距离视窗顶部的高度低于视窗高度: 初始相对于视窗的高度-滚动条的高度
        if(winNode) {
            positiveHeight = $(`${winNode} .infinite_scroll_loader`).offset().top - $(winNode).offset().top - $(winNode).scrollTop();
        }else {
            positiveHeight = $(".infinite_scroll_loader").offset().top - $(window).scrollTop();
        }

        if(winNode) {
            visualHeight = $(winNode).height();
        }else {
            visualHeight = $(window).height();
            // if(container) {
            //     visualHeight = $(window).height() - $(container).offset().top;
            // }else {
            //     visualHeight = $(window).height();
            // }

        }

        console.log('positiveHeight', positiveHeight);
        console.log('visualHeight', visualHeight);


        //相对高度低于视窗的高度(滚动条距离视窗顶部的高度低于视窗高度)就继续加载数据;  其实这里的positiveHeight永远不会小于0
        if(positiveHeight < visualHeight) {
            return true;
            //this._onClick();
        }

    }

    componentWillUnmount() {
        let container = this.props.containerNode || window;
        let contentNode = $(container);
        let me = this;
        if (contentNode) {
            // contentNode.removeEventListener('scroll', this.onScrollHandle.bind(this));
            // let scrollTop = contentNode.scrollTop
            contentNode.unbind('scroll', me.handleLoadData.bind(me));
            //#4635：评审任务管理页面，列表滑动至页面底部，点击添加评委或评委提交情况，页面弹出蒙层，底部列表页面自动返回至顶部。 20180503
            //contentNode.scrollTop(scrollTop);
        }
    }


    _onClick() {
        if(this.props.isJustUi) {
            return ''
        }
        this.props.onClick();
    }

    render() {

        return (
            <div className="infinite_scroll_loader" style={{visibility: this.props.isShow ? 'visible': 'hidden'}} >
                <div className="bg">
                    <div ref="lazyDiv" className="lyby_500px_load" data-original="//500px.me/images/loading-500.png">
                    </div>
                </div>
            </div>
        );
    }
}

Loading.propTypes = {
    isShow: PropTypes.bool,
    //只有当父级容器是限定高度的时候，才需要传进来这个，否则不需要
    containerNode: PropTypes.string, //这个不需要再传了
    onClick: PropTypes.func,
    winNode: PropTypes.string, //视窗元素（滚动条所在的元素，可以是窗口中的某一个固定高度的元素），若无则为window
    isJustUi: PropTypes.bool  //如果只是作为一个展示过度的UI就不需要执行处理数据操作
}

Loading.defaultProps = {
    isShow: true,
    containerNode: '',
    isJustUi: false
}




export default Loading;
