var React = require('react');
var ReactDOM = require('react-dom');
var classNames = require('classnames');
var assign = require('object-assign');

var DatePicker = React.createClass({
    propTypes: {
        unBetween : React.PropTypes.bool,
        //唯一标识
        hidden : React.PropTypes.bool,
        onChange : React.PropTypes.func
    },
    getInitialState: function () {
        return {
                yearS: new Date().getFullYear(),
                monthS: new Date().getMonth() + 1,
                dateListS : [{
                    label : '1月'
                },{
                    label : '2月'
                },{
                    label : '3月'
                },{
                    label : '4月'
                },{
                    label : '5月'
                },{
                    label : '6月'
                },{
                    label : '7月'
                },{
                    label : '8月'
                },{
                    label : '9月'
                },{
                    label : '10月'
                },{
                    label : '11月'
                },{
                    label : '12月'
                }],


                yearE: new Date().getFullYear(),
                monthE: new Date().getMonth() + 1,
                dateListE : [{
                    label : '1月'
                },{
                    label : '2月'
                },{
                    label : '3月'
                },{
                    label : '4月'
                },{
                    label : '5月'
                },{
                    label : '6月'
                },{
                    label : '7月'
                },{
                    label : '8月'
                },{
                    label : '9月'
                },{
                    label : '10月'
                },{
                    label : '11月'
                },{
                    label : '12月'
                }]


        }
    },
    componentDidMount : function () {
        
    },
    componentWillReceiveProps : function () {
    },
    _onChange: function (evt) {
    },
    render: function () {
        var me =  this;
        var styleObj = {
            display : this.props.hidden ? 'block' : 'none'
        }
        return (
            <div className={classNames({"ppRiLi":true,unbetween:this.props.unBetween})} style={styleObj}>
                <span className="ppJt"></span>
                <div className="startTime">
                    <div className="ppRiLiY">
                        <span className="ppRiLiP" onClick={this._yearClick.bind(this,'s--')}></span>
                        <p className="ppSxTime">{this.state.yearS}</p>
                        <span className="ppRiLiN" onClick={this._yearClick.bind(this,'s++')}></span>
                    </div>
                    <div className="ppRiLiM clearfix">
                        {
                            this.state.dateListS.map(function (item, index) {
                                var curIndex = index + 1;
                                var cls = {
                                    current : curIndex == me.state.monthS
                                }
                                return (
                                    <span key={index} className={classNames(cls)} onClick={me._dateClick.bind(me,item,curIndex,'s')}>{item.label}</span>
                                )
                            })
                        }
                    </div>
                </div>
                {
                    !this.props.unBetween ? (
                        <div className="endTime">
                            <div className="ppRiLiY">
                                <span className="ppRiLiP" onClick={this._yearClick.bind(this,'e--')}></span>
                                <p className="ppSxTime">{this.state.yearE}</p>
                                <span className="ppRiLiN" onClick={this._yearClick.bind(this,'e++')}></span>
                            </div>
                            <div className="ppRiLiM clearfix">
                                {
                                    this.state.dateListE.map(function (item, index) {
                                        var curIndex = index + 1;
                                        var cls = {
                                            current : curIndex == me.state.monthE
                                        }
                                        return (
                                            <span key={index} className={classNames(cls)} onClick={me._dateClick.bind(me,item,curIndex,'e')}>{item.label}</span>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    ) : null
                }

                <a className="button ppSxBtn" onClick={this._changeDate}>确定</a>
            </div>
        )
    },
    _changeDate : function () {
        var mS = this.state.monthS;
        if (mS < 10) {
            mS = '0' + mS;
        }
        var dS = this.state.yearS + '-'+mS;
        var mE = this.state.monthE;
        if (mE < 10) {
            mE = '0' + mE;
        }
        var dE = this.state.yearE + '-'+mE;
        if(this.props.onChange){
            this.props.onChange(dS,dE);
        }
    },
    _yearClick : function (flag,evt) {
        if(flag == 's--'){
            this.setState({
                yearS : --this.state.yearS
            });

        }else if(flag == 's++'){
            this.setState({
                yearS : ++this.state.yearS
            });
        }else if(flag == 'e--'){
            this.setState({
                yearE : --this.state.yearE
            });

        }else if(flag == 'e++'){
            this.setState({
                yearE : ++this.state.yearE
            });
        }
    },
    _dateClick : function (v,k,jude,evt) {
        if(jude=='s'){
            this.setState({
                monthS : k
            });
        }else if(jude=='e'){
            this.setState({
                monthE : k
            });
        }

    }
});
module.exports = DatePicker;
