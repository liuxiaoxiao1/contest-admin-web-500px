import React from 'react'
import classNames from 'classnames'
import ProtoTypes  from 'prop-types'
import './index.less'


class Button extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showString: this.props.showString
        }
    }


    handleMouseOver() {
        if(!this.props.mouseHoverTxt) {
            return '';
        }
        this.setState({
            showString: this.props.mouseHoverTxt
        })
    }

    handleMouseOut() {
        if(!this.props.mouseOutTxt) {
            return '';
        }
        this.setState({
            showString: this.props.mouseOutTxt
        })
    }

    render() {
        const me = this;
        let styObj = Object.assign({}, me.props.style);
        let _classnames = '';
        if(me.props.isNeedBgc) {
            _classnames = 'with-bgc'
        }
        return (
            <div className={`ui-button ${me.props.classnames} ${_classnames}`} style={styObj}
                 onClick={me.props.clickFunction}
                 onMouseOver={this.handleMouseOver.bind(this)}
                 onMouseOut={this.handleMouseOut.bind(this)}>
                {me.state.showString}
            </div>
        )
    }
}


Button.defaultProps = {
    showString: '',
    style: {},
    isNeedBgc: true,
    mouseHoverTxt: '',
    mouseOutTxt: ''
}
Button.protoTypes = {
    classnames: ProtoTypes.string,
    style: ProtoTypes.string,
    showString: ProtoTypes.string.isRequired,
    isNeedBgc: ProtoTypes.bool.isRequired,
    clickFunction: ProtoTypes.func,
    mouseHoverTxt: ProtoTypes.string,
    mouseOutTxt: ProtoTypes.string
}

export default Button;