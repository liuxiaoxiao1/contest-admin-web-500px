/**
 * Created by liuxiaoxiao1 on 2018/2/28.
 */
import React from 'react';
import classNames from 'classnames'
import PropTypes from 'prop-types'
import Util from '../../utils/web-utils'
import UserAvatar from '../UserAvatar'
import Button from '../ui/Button'

import './graphicTxtItem.less'



class GraphicItem extends React.Component {
    constructor(props) {
        super(props);
    }
    static propTypes = {
        item: PropTypes.object.isRequired
    }
    static defaultProps = {
        item: {}
    }

    handleSubmit = (e) => {

    }

    render() {
        const {item} = this.props;
        let graphicDetailStr = '/community/v2/graphic/detail/' + item.id;
        let imgUrl;
        let userinfo = item.uploaderInfo || {};
        let userDetailStr = ''

        if (item.url && item.url.baseUrl) {
            imgUrl = item.url.baseUrl + (Util.ismobile ? '!p1' : '!p2');
        }


        if(userinfo.userName) {
            userDetailStr = '/' + userinfo.userName;
        }else {
            userDetailStr = '/community/user-details/' + userinfo.id;
        }

        return (
            <div className={classNames({"card left":true})}>
                {
                    <a href={graphicDetailStr} className="link_wrap"></a>
                }
                <div className="topImg">
                    <div className="top-img lazy" data-original={imgUrl}></div>
                </div>
                <div className="content">
                    <div className="title">
                        {item.title}
                    </div>
                    <div className="label">
                        {
                            (item.tag && item.tag.length) ? (
                                    item.tag.map(function(item, index) {
                                        return (
                                            <span key={index}>{item}</span>
                                        )
                                    })
                                ) :''
                        }

                    </div>
                    <div className="info" style={{visibility: 'hidden'}}>
                        <div className="author">
                            <div className="avatar_wrap">
                                <div className="avatar_background"></div>
                                <UserAvatar {...{
                                    userInfo: item,
                                    classStr: 'reviewer-item-container'
                                }}/>


                            </div>

                            <span className="nickName"><a href={userDetailStr} target="_blank">{item.uploaderInfo.nickName ? Util.htmldecode(item.uploaderInfo.nickName): ''}</a></span>

                        </div>
                        <div className="reading">
                            <span>{item.picturePvCount ? item.picturePvCount : 0}</span>次阅读
                        </div>
                    </div>


                </div>
                <div className="hover-region">
                    <Button {...{
                        isNeedBgc: true,
                        classnames: 'button-action action-confirm',
                        showString: '入选'
                    }}/>

                    <Button {...{
                        isNeedBgc: true,
                        classnames: 'button-action action-undetermined',
                        showString: '待定'
                    }}/>


                </div>
            </div>
        );
    }
}



export default GraphicItem;
