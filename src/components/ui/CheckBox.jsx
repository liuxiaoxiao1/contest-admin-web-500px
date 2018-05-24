var React = require('react');
var ReactDOM = require('react-dom');
var classNames = require('classnames');
var assign = require('object-assign');
//var classNames = require('classnames');


var CheckBox = React.createClass({
    propTypes: {
        //按钮的回调
        handler : React.PropTypes.func,
        //默认状态 是否勾选
        checked : React.PropTypes.bool,
        //CheckBox框后面跟的文本
        showTxt: React.PropTypes.string,
        //可能传过来的数据对象
        itemData: React.PropTypes.object,
        //标签名字是否是html
        isLabelHtml: React.PropTypes.bool,
    },
    getDefaultProps: function () {
        return {
        };
    },
    getInitialState: function () {
        return {
            hidden : true,
            checked: this.props.checked
        }
    },
    _onChange: function () {

    },
    componentDidMount: function () {

    },
    componentWillUnmount: function () {

    },
    _handler: function () {
        var me = this;
        if(me.props.itemData) {
            me.props.handler(!me.state.checked, me.props.itemData);
        }else {
            me.props.handler(!me.state.checked);
        }

        me.setState({
            checked: !me.state.checked
        });

    },
    render: function () {
        var me = this;
        var checked = me.state.checked;

        return (
            <div className="checkbox-container-lxx">
                <div className="check-per flexbox">
                    <div className={classNames({"checkbox-cate": true, "checked": checked})}
                         onClick={me._handler}>
                    </div>
                    {
                        this.props.isLabelHtml ? <div className="cate-txt" dangerouslySetInnerHTML={{__html: me.props.showTxt}}>
                            </div> : <div className="cate-txt">
                                {me.props.showTxt}
                            </div>
                    }

                </div>
            </div>
        )
    }
});

module.exports = CheckBox