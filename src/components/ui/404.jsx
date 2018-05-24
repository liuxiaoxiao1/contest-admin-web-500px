var React = require('react');
var ReactDOM = require('react-dom');
var classNames = require('classnames');
var assign = require('object-assign');
//var classNames = require('classnames');
var Window = React.createClass({
    propTypes: {

    },
    _initData: function () {
        return {

        }
    },
    getInitialState: function () {

    },
    _onChange: function () {

    },
    componentDidMount: function () {

    },
    componentDidUpdate : function () {

    },
    componentWillUnmount: function () {

    },
    _goBack: function() {
        window.history.go(-1);
    },
    _goIndex: function() {
        location.href =  location.protocol + "//" + location.host + location.port;
    },
    render: function () {
        return (
            <div id="sj_404" class="content_container">
                <div class="page_404_img"></div>
                <div class="bottom_link">
                    <div id="goback" class="link_per" onClick={this._goBack}>返回上一页面</div>
                    <div id="goindex" class="link_per" onClick={this._goIndex}>返回首页</div>
                </div>

            </div>
        )
    }
});

