import React from 'react';
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import contestUtil from '../../utils/contestUtil.js'
import { Icon, Popover } from 'antd'
import Styled from 'styled-components'
import { autobind } from 'core-decorators'
import AdminActionSelect from './components/AdminActionSelect'
import './index.scss'

import { useStrict } from 'mobx'
import { observer } from 'mobx-react'


require('../../js/lib/zepto_lazyload')


useStrict(true)

@observer
class ContestItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
    }
    static propTypes = {
        item: PropTypes.object,
        isAdmin: PropTypes.bool,
    }
    static defaultProps = {
        item: {},
        isAdmin: false
    }
    componentDidMount () {
        this._loadPic();
    }
    _loadPic () {
        var dom = ReactDOM.findDOMNode(this);
        $(dom).find('.lazy').removeClass('lazy').lazyload({
            //placeholder : this.props.img,
            effect: "fadeIn"
        });
    }


    _getDetailUrl () {
        let item = this.props.item;
        return contestUtil._getDetailUrl(item);
    }

    @autobind
    onVisibleChange (visible) {
        this.setState({ visible });
    }

    render() {
        const { item } = this.props;
        let timeStr;
        if(item.state == 104){
            timeStr = '已结束';
        }else{
            timeStr = contestUtil.getContestRTime(item);
        }

        let coverUrlstr;
        if(item.webUrl && item.webUrl.baseUrl){
            coverUrlstr = item.webUrl.baseUrl + '!p1';
        }



        return (
            <div className="quest_item">
                <div className="quest_card px_card medium no_badge no_avatar">
                    <a className="link_wrap" target="_blank" href={this._getDetailUrl()}></a>
                    <div className="top quest_card__top lazy" data-original={coverUrlstr}>
                        <div className="quest_card__center">
                            <div className="quest_card__quest_title" dangerouslySetInnerHTML={{__html : item.title}}></div>
                            <div className="quest_card__quest_sub-title">{item.subtitle}</div>
                            {/*<div className="quest_card__time_remaining">*/}

                                {/*<div className="quest_card__clock_icon"></div>*/}

                                {/*<div className="quest_card__time_calculation">{timeStr}</div>*/}


                            {/*</div>*/}
                        </div>
                        {/*<div className="quest_card__prize">*/}
                            {/*<div className="quest_card__prize_icon"></div>*/}
                            {/*<div className="quest_card__prize_text" dangerouslySetInnerHTML={{__html : item.contestPropertyInfo.prizeMsg}}></div>*/}
                        {/*</div>*/}
                        <div className="quest_card__overlay"></div>

                        {
                            this.props.isAdmin ? (
                                <Popover visible={this.state.visible} onVisibleChange={this.onVisibleChange} placement="bottom" title={''}
                                         content={<AdminActionSelect {...{
                                            item: item,
                                            clickCallback: this.onVisibleChange,
                                        }}/>} trigger="click">
                                    <div className="action-over">
                                        <Icon type="ellipsis"style={{ fontSize: 30, color: '#fff' }} />
                                    </div>
                                </Popover>

                            ) : ''
                        }


                    </div>
                    <div className="bottom quest_card__bottom">

                        {
                            item.hostType == 0 ? (
                                <h2 className="quest_card__sponsor_name" dangerouslySetInnerHTML={{__html : item.hostUnit}}></h2>
                            ) :""
                        }

                        {
                            item.hostType == 1 ? (
                                <img src={item.hostLogo.baseUrl + '!p1'} alt="" className="quest_card__sponsor_logo"/>
                            ) :""
                        }

                    </div>
                </div>

            </div>
        )
    }


}


export default ContestItem;