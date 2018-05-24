var React = require('react');
var ReactDOM = require('react-dom');
var classNames = require('classnames');
var assign = require('object-assign');

var Store = require('../../store/FormStore');
var Input = React.createClass({
    propTypes: {
        //唯一标识
        index : React.PropTypes.string,
        label: React.PropTypes.string,
        placeholder : React.PropTypes.string,
        afterChange : React.PropTypes.func,
        allowblank : React.PropTypes.bool,
        cls : React.PropTypes.object,
        otherHtml : React.PropTypes.object,
        readonly : React.PropTypes.bool
    },
    getInitialState: function () {
        return new Store.form({
            id : this.props.index
        })
    },
    componentWillReceiveProps : function () {
    },
    _onChange : function (evt) {
        var value = this.refs.input.value;
        this.state.setValueByIndex(value);
        if(this.props.afterChange){
            this.props.afterChange(value);
        }
    },
    render: function () {
        var placeholderText = this.props.placeholder||'';
        if(placeholderText){
            placeholderText = '（'+placeholderText+'）';
        }


        var inputOptions = {
            ref: "input",
            maxLength: "300",
            onChange: this._onChange,
            placeholder: this.props.placeholder,
            defaultValue: this.props.defaultValue
        }
        if(this.props.readonly === true){
            inputOptions['readOnly'] = 'readOnly';
        }
        return (
            <div className={classNames(this.props.cls)}>
                {
                    this.props.label ? (
                        <label htmlFor="img_title">
                            <h4>
                                <span>
                                    {this.props.label}
                                    {placeholderText}
                                </span>
                                {
                                    this.props.allowblank ? (
                                        <span className="allowblank">*</span>
                                    ):null
                                }
                            </h4>
                        </label>
                    ) : ''
                }
                <input {...inputOptions}>
                </input>
                {this.props.otherHtml}
            </div>
        )
    }
});

module.exports = Input;
