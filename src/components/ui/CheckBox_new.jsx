var React = require('react');
var ReactDOM = require('react-dom');
var classNames = require('classnames');
var assign = require('object-assign');
//var classNames = require('classnames');


var CheckBox = React.createClass({
    propTypes: {
        //按钮的回调
        handler: React.PropTypes.func,
        //默认状态 是否勾选
        checked: React.PropTypes.bool,
        //CheckBox框后面跟的文本
        label: React.PropTypes.string,
        //标签名字是否是html
        isLabelHtml: React.PropTypes.bool,
    },
    getInitialState: function () {
        return {
            checked: !!this.props.checked
        }
    },
    _onChange: function () {

    },
    componentDidMount: function () {

    },
    componentWillUnmount: function () {

    },
    getValue: function () {
        return this.state.checked;
    },
    _handler: function () {
        var me = this;
        this.setState({
            checked: !this.state.checked
        })
        if (me.props.handler instanceof Function) {
            me.props.handler(!this.state.checked);
        }
    },
    render: function () {
        var me = this;
        return (
            <div className="checkbox-container-lxx" onClick={this._handler}>
                <div className="check-per flexbox">
                    <div className={classNames({"checkbox": true, "checked": this.state.checked})}>
                    </div>
                    {
                        this.props.isLabelHtml ? <div className="cate-txt" dangerouslySetInnerHTML={{__html: me.props.label}}>
                            </div> : <div className="cate-txt">
                                {me.props.label}
                            </div>
                    }
                </div>
            </div>
        )
    }
});

module.exports = CheckBox