var React = require('react');
var ReactDOM = require('react-dom');
var classNames = require('classnames');
var assign = require('object-assign');

var RadioGroup = React.createClass({
    propTypes: {
        defaultValue : React.PropTypes.number,
        index: React.PropTypes.string,
        data: React.PropTypes.array
    },
    _radioClick: function () {
        if (this.props._radioClick) {
            this.props._radioClick.apply(this, arguments);
        }
    },
    render: function () {
        var me = this;
        var radioGroup = this.props.data || [];
        // [{
        //     key: '摄影图片',
        //     value: '1'
        // }, {
        //     key: '绘画插画',
        //     value: '3'
        // }, {
        //     key: '矢量图',
        //     value: '5'
        // }]
        return (
            <div>
                {
                    radioGroup.map(function (item, index) {
                        var indexStr = me.props.index;
                        //onClick={me._radioClick.bind(me,item)}

                        var defaultV = me.props.defaultValue || 0;
                        return (
                            <div key={index} className="radioMain">
                                <div className="roundedOne">
                                    {
                                        defaultV == index ?
                                            (<input onChange={me._radioClick.bind(me,item)} type="radio" name={indexStr+"_radio"} id={indexStr+"_radio_"+index} defaultChecked></input>)
                                            :(<input onChange={me._radioClick.bind(me,item)} type="radio"name={indexStr+"_radio"} id={indexStr+"_radio_"+index}></input>)
                                    }
                                    <label htmlFor={indexStr+"_radio_"+index}></label>
                                </div>
                                <label htmlFor={indexStr+"_radio_"+index} className="text">{item.key}</label>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
});

module.exports = RadioGroup;
