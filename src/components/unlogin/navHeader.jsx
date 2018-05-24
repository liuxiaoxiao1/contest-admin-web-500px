var React = require('react');
var ReactDOM = require('react-dom');
var classNames = require('classnames');
var assign = require('object-assign');
var lyby = require('../../js/util');

var MainCmp = React.createClass({
    getInitialState: function () {
        return {
        }
    },
    render: function () {
        return (
            <div className="header fadein transparent">
                <div className="background"></div>
                <div className="wrapper">
                    <div className="inner">
                        <a className="logo" href="/"></a>
                        <div className="right">
                            <a className="signup button submit" data-ga-action="Sign up"
                               data-ga-category="Homepage Navigation Header"
                               href="/user/registerMe?redirect=https://www.500px.me/community/index.html">
                                注册
                            </a>
                            <a className="login" data-ga-action="Log in" data-ga-category="Homepage Navigation Header"
                               href="/community/index.html">
                                登录
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});
module.exports = MainCmp;