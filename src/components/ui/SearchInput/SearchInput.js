import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import PropTypes from 'prop-types'
import assign from 'object-assign';
import './index.less'


class CommonSearchCmp extends React.Component{
    constructor(props) {
        super(props)
    }

    _handleKeyUp (event) {
        //console.log(event.keyCode)
        if ((event.keyCode == 13) && this.props.onSearchClick) {
            let val = event.target.value;
            this.props.onSearchClick(val);
        }
    }
    render () {
        let me = this;
        let containerCls = assign(me.props.classObj, {
            "search-container-contest": true
        })
        if(me.props.needSearchBtn) {
            containerCls['width-search-btn'] = true;
        }
        return (
            <div className={classNames(containerCls)} style={me.props.styObj}>
                <span alt="" className="search-icon"/>
                <input type="text" name="searchKey"
                       className="searchValue input-txt"
                       placeholder={me.props.placeHolder}
                       style={{width: '240px', "marginLeft": "10px", height: '30px'}}
                       onChange={me.props.onSearchKeyChange} defaultValue={''} onKeyUp={me._handleKeyUp.bind(this)}/>
                {
                    me.props.needSearchBtn ? (
                            <span className="grid-btn"
                                  onClick={me.props.onSearchClick}>搜索</span>
                        ) : ""
                }
            </div>
        )
    }
};

CommonSearchCmp.defaultProps = {
    placeHolder: '',
    needSearchBtn: true,
    classObj: {},
    styObj: {}
}
CommonSearchCmp.propTypes = {
    placeHolder: PropTypes.string,
    needSearchBtn: PropTypes.bool,
    classObj: PropTypes.object,
    styObj: PropTypes.object
}


export default CommonSearchCmp

//module.exports = CommonSearchCmp