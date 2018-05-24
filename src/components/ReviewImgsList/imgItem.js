/**
 * Created by liuxiaoxiao1 on 2018/3/14.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import './reviewImgList.less'
import PropTypes from 'prop-types'
import Loading from '../Loading';
import classNames from 'classnames'
import lyby from '../../utils/web-utils'
import Button from '../ui/Button'



import './imgItem.less'


require('../../js/lib/zepto_lazyload')



class ImgItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    static propTypes = {
        showWinPhoto: PropTypes.func,
        //当前图片在 图片资源列表中的索引
        index: PropTypes.number,
        data: PropTypes.object.isRequired,
        //是否是组图
        isGroup: PropTypes.bool,
        //显示点评窗口
        confirmAction: PropTypes.func,
        actionBtnShowStr: PropTypes.string,
        btnClassName: PropTypes.string, //按钮的样式
        curTask: PropTypes.object,
        isWaitPage: PropTypes.bool, //是不是在待定页面
        isConfirmPage: PropTypes.bool, //是不是在已选/淘汰页面
    }
    static defaultProps = {
        data: {},
        index: 0,
        isGroup: false,
        actionBtnShowStr: '',
        btnClassName: '',
        curTask: {},
        isWaitPage: false, //是不是在待定页面
        isConfirmPage: false, //是不是在已选/淘汰页面
    }

    _loadData () {
        //TODO: 取数据
        // Ajax.get().then((resData) => {
        //
        // })

        this.setState({

        })


    }

    _showWinPhoto() {
        let me = this;

        if(typeof me.props.showWinPhoto != 'undefined') {
            me.props.showWinPhoto(me.props.data, me.props.index)
        }

    }

    componentDidMount() {
        var dom = ReactDOM.findDOMNode(this);
        var _this = $(dom);
        var lazyOptions = {
            effect: "fadeIn"
        }
        if(this.props.container){
            lazyOptions.container = $(this.props.container);
        }
       _this.find('.lazy').removeClass('lazy').lazyload(lazyOptions);
    }

    render() {
        var me = this;
        var item = this.props.data.resource;

        var loginUser = {};
        var cls = {
            photo_thumbnail : true,
            'jg-entry' : true,
            'entry-visible' : true,
            selected : this.state.isSelect,
            active : this.state.active
        }
        // cls['Img_' + item.id] = true;
        if(this.props.urlIndex){
            cls['index_'+this.props.urlIndex] = true;
        }
        if(item.html){
            return (
                <div key={this.props.index} style={{overflow: 'visible'}} className={classNames(cls)} dangerouslySetInnerHTML={{__html: item.html}}></div>
            )
        }

        var user = item.uploaderInfo || {id:item.uploaderId};
        var isSelf = loginUser.id == user.id;

        var photoDetailUrl = this.props.selected ? 'javascript:void(0)':'/community/photo-details/' + item.id;


        if(this.props.isGroup){
            photoDetailUrl = '/community/v2/groupPhoto/detail/'+item.id;
        }

        var userDetailUrl = '/community/user-details/' + user.id;
        if (user.userName) {
            userDetailUrl = '/' + user.userName;
        }


        /*onClick={this._showWinPhoto}*/
        //href={photoDetailUrl}
        //target={!this.props.selected ? "_blank" : null}

        var imgStr;
        if (item.url && item.url.baseUrl) {
            imgStr = item.url.baseUrl + (lyby.ismobile ? '!p1' : this.props.relevant ? '!p6_2':'!p4');
        }

        imgStr = lyby.getPImgUrlByUrl(item.url, lyby.ismobile ? '!p1': '!p4');


        if(this.props.isSearch && item.searchContent){
            photoDetailUrl = photoDetailUrl + '?fl='+item.searchContent;
        }

        // "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"

        return (
            <div key={this.props.index} className={classNames(cls)} data-id={item.id}>
                {
                    this.props.selected ? (
                            <div className="overlay">
                                <div className="overlay_2"></div>
                                <div className="selected-circle"></div>
                            </div>
                        ) : null
                }
                <a {...{
                    className: "photo_link",
                    href: photoDetailUrl,
                    target: item.resourceType == 2 || me.props.isSearch ? '_blank' : null
                }}>
                    {/*  item.width ? */}

                        {
                            item.width ? (
                                    <img data-original={imgStr}
                                         data-id={item.id}
                                         src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                                         height={item.height}
                                         width={item.width}
                                         className="lazy copyright-contextmenu"></img>

                                ):(
                                    <img src={imgStr} className="copyright-contextmenu"></img>
                                )
                        }


                </a>

                {
                    this.props.isGroup? (
                            <div className="group_b">
                                {this.props.data.resourceGroupItems.length}
                            </div>
                        ) : null
                }
                {
                    !lyby.ismobile && !this.props.selected ? (
                            <div className="info" style={{display: 'none'}}>
                                <div className="credits">
                                    {
                                        //自己的不显示自己的头像和nickname或者有参数传入也不显示
                                        !isSelf && !this.props.hideAvatar ? (
                                                <div>
                                                    <a className="avatar lazy"
                                                       target="_blank"
                                                       href={userDetailUrl}
                                                       data-original={lyby.user_avatar(user)}></a>
                                                    <div className="photo_info_wrap">
                                                        <a className="photographer"
                                                           href={userDetailUrl}
                                                           target="_blank"
                                                           dangerouslySetInnerHTML={{__html: user.nickName}}>
                                                        </a>
                                                    </div>
                                                </div>
                                            ) : this.props.isGroup ? null : (
                                                    <div>
                                                        <span style={{display:'inline-block',height : '30px','verticalAlign' : 'middle'}}></span>
                                                        <div className="photo_info_wrap">
                                                            <a className="photographer"
                                                               dangerouslySetInnerHTML={{__html: item.title}}>
                                                            </a>
                                                        </div>
                                                    </div>
                                                )
                                    }
                                </div>

                            </div>
                        ) : ''
                }

                {
                    !me.props.curTask.submittedAt ? (
                            <div className="hover-region" onClick={this._showWinPhoto.bind(this)}>
                                {
                                    !this.props.isConfirmPage ? <Button {...{
                                            isNeedBgc: true,
                                            classnames: `button-action ${this.props.btnClassName}`,
                                            showString: this.props.actionBtnShowStr,
                                            clickFunction: this.props.confirmAction.bind(this)
                                        }}/> : ''
                                }
                                {
                                    !this.props.isWaitPage ? <Button {...{
                                            isNeedBgc: true,
                                            classnames: 'button-action action-undetermined',
                                            showString: '待定',
                                            clickFunction: this.props.reviewWait.bind(this)
                                        }}/>: ''
                                }

                            </div>
                        ) : ''
                }


            </div>
        );
    }
}



export default ImgItem;
