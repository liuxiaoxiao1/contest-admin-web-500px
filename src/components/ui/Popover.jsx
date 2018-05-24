var React = require('react');
var ReactDOM = require('react-dom');
var assign = require('object-assign')
var classNames = require('classnames');
var Popo = React.createClass({
    propTypes: {
        //不要箭头
        noArrow: React.PropTypes.bool,
        //用来展示在popu中的内容
        html: React.PropTypes.object,
        //箭头方向Top Bottom Left Right
        arrow: React.PropTypes.string,
        style: React.PropTypes.object
    },
    getInitialState: function () {
        return {
            style : this.props.style
        }
    },
    componentDidMount : function(){
        var meEl = $(ReactDOM.findDOMNode(this));
        var mainEl = meEl.parent();
        var tipEl = meEl.find('.lyby_tip');
        if(this.props.noArrow){
            // this.setState({
            //     style : {
            //         top : 0 - (mainEl.height()),
            //         left : -(tipEl.width()+40 - mainEl.width())/2
            //     }
            // });
        }else{
            if(this.props.arrow == 'Left'){
                this.setState({
                    style : {
                        top : -10,
                        left : mainEl.width() + 20
                    }
                });
            }else if(this.props.arrow == 'Top'){
                if(this.props.arrowLeft){
                    this.setState({
                        style : {
                            left :this.props.arrowLeft
                        }
                    });
                }else{
                    this.setState({
                        style : {
                            left : -(tipEl.width() - mainEl.width())/2
                        }
                    });
                }
            }else if(this.props.arrow == 'Bottom'){
                this.setState({
                    style : {
                        left : -(tipEl.width() - mainEl.width())/2,
                        top : -(this.props.height + mainEl.height())
                    }
                });
            }else if(this.props.arrow == 'TopRight'){
                this.setState({
                    style : {
                        left: -tipEl.width() + 5,
                        top : mainEl.height()
                    }
                });
            }
        }
    },
    render: function () {
        if(!this.props.html){
            return null;
        }
        var sObj = assign({
            width : this.state.width
        },this.state.style);
        var cls  = {
            //hidden : true,
            "lyby_tip_main" : true,
            noArrow: this.props.noArrow
        }
        if(!this.props.noArrow){
            cls['arrow'+this.props.arrow] = true;
        }
        //dangerouslySetInnerHTML={{__html: this.state.html}}
        return (
            <div className={classNames(cls)}>
                <div className="lyby_tip" style={sObj}>
                    <div className="tipBody">
                        {this.props.html}
                    </div>
                    <div className="bottom">
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = Popo;
