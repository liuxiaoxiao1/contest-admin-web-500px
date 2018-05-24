/**
 * Created by liuxiaoxiao1 on 2018/3/19.
 * 图文审核的暂时不做 form yuxiangcui 20180319
 */
import React from 'react';
import classNames from 'classnames'
import PropTypes from 'prop-types'
import lyby from '../../utils/web-utils'
import UserAvatar from '../UserAvatar'
import Button from '../ui/Button'

import './graphicTxtDetail.less'


class ReviewGraphicTxtDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            graphicDetail: {
                "data": {
                    "userPictureShareedCount": 12,
                    "doTsa": false,
                    "rating": 88.6483,
                    "userLikerState": false,
                    "riseUpDate": 1521248649183,
                    "uploadedDate": 1521214155000,
                    "photos": [{
                        "uploaderId": "5be887ada423cbb3748797be807526722",
                        "uploaderName": "视觉深圳精选集",
                        "width": "1280",
                        "sign": true,
                        "id": "0100b9e7dbd640809171cd5bcbc261cb",
                        "type": "photo",
                        "url": {
                            "p1": "https://img.500px.me/graphic/5be887ada423cbb3748797be807526722/0100b9e7dbd640809171cd5bcbc261cb.jpeg!p1",
                            "baseUrl": "https://img.500px.me/graphic/5be887ada423cbb3748797be807526722/0100b9e7dbd640809171cd5bcbc261cb.jpeg",
                            "id": "0100b9e7dbd640809171cd5bcbc261cb"
                        },
                        "height": "659"
                    }, {
                        "description": "一年一度的视觉中国摄影师年会如约而至。\n\n        想了解行业最前沿动态，却只敢上朋友圈别人的分享；\n        想认识摄影大师，却没人引荐；\n        想买器材，专卖店太贵，其他渠道不敢买；\n        想结交热爱摄影的小伙伴一起玩耍，但总是抱怨缘分太少；\n        想亲临北京现场参加摄影师年会，奈何路太远，时间太紧，\n        如果你还在苦恼这些，\n\n        今年视觉中国摄影师年会新增深圳站，本次年会由500px视觉深圳部落主办，深圳市风光摄影协会、云途摄影机构及视觉广东、风光摄影、摄在广州、视觉汕尾、视觉梅州、潮摄影等部落联合协办。应邀出席的嘉宾代表有视觉中国创意社区总裁，深圳市相关部门领导，广东省摄影家协会领导以及深圳市风光摄影协会领导等。届时会场将同期展出深圳名家摄影作品以飨观众。\n\n活动时间：\n\n4月1日（周日）13:00-18:00\n\n活动地点：\n\n空体新媒体实验室\n南山区科技园南区虚拟大学园R3-A栋1楼（18东门）\n\n\n\n主要活动流程\n\n\n13:00 -14:00：\n签到并自由参观《让世界聚焦》深圳摄影名家作品展\n\n14:05&mdash;14:15：\n开场视频拍摄心得分享（拾贰）\n\n14:35 -14:55 :\n2017视觉趋势报告（Max)\n\n14:55 -15:00 ：\n抽三等奖\n\n15:00 -15:20 ：\n社区发布新产品规划(王钧）\n\n15:25 -16:05：\n《行走西藏》讲座（钟国华）\n\n16:05 -16:15 ：\n抽二等奖\n\n16:20-16:50：\n摄影高端论坛：风光与人文\n（钟国华、橙子、阿戈、仁慈的狮子）\n\n16:50-17:00：\n2017视觉广东区域部落年度十佳图片颁奖\n\n17:00 - 17:10\n抽一等奖\n\n17:10 - 18:00\n致辞，合影\n\n\n分享嘉宾\n\n\n视觉中国创意社区 总裁 王钧\n\n广东省摄影家协会副主席、深圳市摄影家协会副主席  钟国华\n\n深圳著名风光摄影师，深圳市风光摄影协会专家组专家橙子、阿戈等\n\n\n合作伙伴",
                        "type": "text",
                        "url": {}
                    }, {
                        "uploaderId": "5be887ada423cbb3748797be807526722",
                        "uploaderName": "视觉深圳精选集",
                        "width": "1080",
                        "sign": true,
                        "id": "53fcf5784f394be39cb1b2a327003ab9",
                        "type": "photo",
                        "url": {
                            "p1": "https://img.500px.me/graphic/5be887ada423cbb3748797be807526722/53fcf5784f394be39cb1b2a327003ab9.jpg!p1",
                            "baseUrl": "https://img.500px.me/graphic/5be887ada423cbb3748797be807526722/53fcf5784f394be39cb1b2a327003ab9.jpg",
                            "id": "53fcf5784f394be39cb1b2a327003ab9"
                        },
                        "height": "1184"
                    }, {
                        "uploaderId": "5be887ada423cbb3748797be807526722",
                        "uploaderName": "视觉深圳精选集",
                        "width": "899",
                        "sign": true,
                        "id": "148384c7ae8b4fefabf4c0b3a3f617fe",
                        "type": "photo",
                        "url": {
                            "p1": "https://img.500px.me/graphic/5be887ada423cbb3748797be807526722/148384c7ae8b4fefabf4c0b3a3f617fe.jpg!p1",
                            "baseUrl": "https://img.500px.me/graphic/5be887ada423cbb3748797be807526722/148384c7ae8b4fefabf4c0b3a3f617fe.jpg",
                            "id": "148384c7ae8b4fefabf4c0b3a3f617fe"
                        },
                        "height": "726"
                    }, {
                        "uploaderId": "5be887ada423cbb3748797be807526722",
                        "uploaderName": "视觉深圳精选集",
                        "width": "3744",
                        "sign": true,
                        "id": "6c7ffb105e2242deb95c3be4729024e3",
                        "type": "photo",
                        "url": {
                            "p1": "https://img.500px.me/graphic/5be887ada423cbb3748797be807526722/6c7ffb105e2242deb95c3be4729024e3.jpeg!p1",
                            "baseUrl": "https://img.500px.me/graphic/5be887ada423cbb3748797be807526722/6c7ffb105e2242deb95c3be4729024e3.jpeg",
                            "id": "6c7ffb105e2242deb95c3be4729024e3"
                        },
                        "height": "2501"
                    }, {
                        "uploaderId": "5be887ada423cbb3748797be807526722",
                        "uploaderName": "视觉深圳精选集",
                        "width": "1900",
                        "sign": true,
                        "id": "8eed01b100da4aebac28538946ff8ad6",
                        "type": "photo",
                        "url": {
                            "p1": "https://img.500px.me/graphic/5be887ada423cbb3748797be807526722/8eed01b100da4aebac28538946ff8ad6.jpeg!p1",
                            "baseUrl": "https://img.500px.me/graphic/5be887ada423cbb3748797be807526722/8eed01b100da4aebac28538946ff8ad6.jpeg",
                            "id": "8eed01b100da4aebac28538946ff8ad6"
                        },
                        "height": "1228"
                    }, {
                        "uploaderId": "5be887ada423cbb3748797be807526722",
                        "uploaderName": "视觉深圳精选集",
                        "width": "5032",
                        "sign": true,
                        "id": "4db82d20525449ad9daf952f6bf438e3",
                        "type": "photo",
                        "url": {
                            "p1": "https://img.500px.me/graphic/5be887ada423cbb3748797be807526722/4db82d20525449ad9daf952f6bf438e3.jpg!p1",
                            "baseUrl": "https://img.500px.me/graphic/5be887ada423cbb3748797be807526722/4db82d20525449ad9daf952f6bf438e3.jpg",
                            "id": "4db82d20525449ad9daf952f6bf438e3"
                        },
                        "height": "3437"
                    }, {
                        "uploaderId": "5be887ada423cbb3748797be807526722",
                        "uploaderName": "视觉深圳精选集",
                        "width": "1000",
                        "sign": true,
                        "id": "fc7ce1074a8247959143f423458f062e",
                        "type": "photo",
                        "url": {
                            "p1": "https://img.500px.me/graphic/5be887ada423cbb3748797be807526722/fc7ce1074a8247959143f423458f062e.jpg!p1",
                            "baseUrl": "https://img.500px.me/graphic/5be887ada423cbb3748797be807526722/fc7ce1074a8247959143f423458f062e.jpg",
                            "id": "fc7ce1074a8247959143f423458f062e"
                        },
                        "height": "1000"
                    }, {
                        "uploaderId": "5be887ada423cbb3748797be807526722",
                        "uploaderName": "视觉深圳精选集",
                        "width": "696",
                        "sign": true,
                        "id": "96ba1a0aefa8422ba59e610a97e5afa8",
                        "type": "photo",
                        "url": {
                            "p1": "https://img.500px.me/graphic/5be887ada423cbb3748797be807526722/96ba1a0aefa8422ba59e610a97e5afa8.jpg!p1",
                            "baseUrl": "https://img.500px.me/graphic/5be887ada423cbb3748797be807526722/96ba1a0aefa8422ba59e610a97e5afa8.jpg",
                            "id": "96ba1a0aefa8422ba59e610a97e5afa8"
                        },
                        "height": "800"
                    }, {
                        "uploaderId": "5be887ada423cbb3748797be807526722",
                        "uploaderName": "视觉深圳精选集",
                        "width": "701",
                        "sign": true,
                        "id": "e951292cc8674cd18b4b1db4ef7350e4",
                        "type": "photo",
                        "url": {
                            "p1": "https://img.500px.me/graphic/5be887ada423cbb3748797be807526722/e951292cc8674cd18b4b1db4ef7350e4.jpg!p1",
                            "baseUrl": "https://img.500px.me/graphic/5be887ada423cbb3748797be807526722/e951292cc8674cd18b4b1db4ef7350e4.jpg",
                            "id": "e951292cc8674cd18b4b1db4ef7350e4"
                        },
                        "height": "643"
                    }, {
                        "uploaderId": "5be887ada423cbb3748797be807526722",
                        "uploaderName": "视觉深圳精选集",
                        "width": "1000",
                        "sign": true,
                        "id": "7912a770202f46458becc3ca7426e299",
                        "type": "photo",
                        "url": {
                            "p1": "https://img.500px.me/graphic/5be887ada423cbb3748797be807526722/7912a770202f46458becc3ca7426e299.jpg!p1",
                            "baseUrl": "https://img.500px.me/graphic/5be887ada423cbb3748797be807526722/7912a770202f46458becc3ca7426e299.jpg",
                            "id": "7912a770202f46458becc3ca7426e299"
                        },
                        "height": "1000"
                    }, {
                        "uploaderId": "5be887ada423cbb3748797be807526722",
                        "uploaderName": "视觉深圳精选集",
                        "width": "799",
                        "sign": true,
                        "id": "829524e3b4054f8aa43d6a7c1fce1522",
                        "type": "photo",
                        "url": {
                            "p1": "https://img.500px.me/graphic/5be887ada423cbb3748797be807526722/829524e3b4054f8aa43d6a7c1fce1522.jpg!p1",
                            "baseUrl": "https://img.500px.me/graphic/5be887ada423cbb3748797be807526722/829524e3b4054f8aa43d6a7c1fce1522.jpg",
                            "id": "829524e3b4054f8aa43d6a7c1fce1522"
                        },
                        "height": "223"
                    }, {
                        "description": "重要提示\n\n1、报名将获得现场伴手礼一份，里面有神秘礼物喔！\n\n2、报名每人8.8元\n\n\n报名方式",
                        "type": "text",
                        "url": {}
                    }, {
                        "uploaderId": "5be887ada423cbb3748797be807526722",
                        "uploaderName": "视觉深圳精选集",
                        "width": "1080",
                        "sign": true,
                        "id": "e981c5c38936495f8051af6d00b43720",
                        "type": "photo",
                        "url": {
                            "p1": "https://img.500px.me/graphic/5be887ada423cbb3748797be807526722/e981c5c38936495f8051af6d00b43720.jpg!p1",
                            "baseUrl": "https://img.500px.me/graphic/5be887ada423cbb3748797be807526722/e981c5c38936495f8051af6d00b43720.jpg",
                            "id": "e981c5c38936495f8051af6d00b43720"
                        },
                        "height": "279"
                    }, {
                        "uploaderId": "5be887ada423cbb3748797be807526722",
                        "uploaderName": "视觉深圳精选集",
                        "width": "640",
                        "sign": true,
                        "id": "fff17e56114b4db0b250e2337fef03b7",
                        "type": "photo",
                        "url": {
                            "p1": "https://img.500px.me/graphic/5be887ada423cbb3748797be807526722/fff17e56114b4db0b250e2337fef03b7.jpg!p1",
                            "baseUrl": "https://img.500px.me/graphic/5be887ada423cbb3748797be807526722/fff17e56114b4db0b250e2337fef03b7.jpg",
                            "id": "fff17e56114b4db0b250e2337fef03b7"
                        },
                        "height": "165"
                    }, {
                        "uploaderId": "5be887ada423cbb3748797be807526722",
                        "uploaderName": "视觉深圳精选集",
                        "width": "1080",
                        "sign": true,
                        "id": "171b5da257b04daf870a1e1127948668",
                        "type": "photo",
                        "url": {
                            "p1": "https://img.500px.me/graphic/5be887ada423cbb3748797be807526722/171b5da257b04daf870a1e1127948668.jpg!p1",
                            "baseUrl": "https://img.500px.me/graphic/5be887ada423cbb3748797be807526722/171b5da257b04daf870a1e1127948668.jpg",
                            "id": "171b5da257b04daf870a1e1127948668"
                        },
                        "height": "279"
                    }, {
                        "description": "主办单位：视觉中国500PX摄影社区     \n合作伙伴：索尼（中国）有限公司\n承办单位：500PX联营部落《视觉深圳》\n                    深圳市风光摄影协会\n                    云途摄影机构\n联合协办：500PX《视觉广东》、《风光摄影》\n                  《摄在广州》、《视觉汕尾》\n                  《视觉梅州》、《潮摄影》部落\n支持单位： 适马贸易（上海）有限公司\n                    飞思相机\n                    中山日高精密工业有限公司\n                    南京泛太克文化产业发展有限公司\n                    深圳弗莱斯光电有限公司\n                    深圳万力云科技有限公司\n                    初类（深圳）广告有限公司\n                    卓创国际（香港）有限公司\n                    天利光学\n                    深圳市唯色视觉文化有限公司                    \n                    原识工作室\n                    深圳空体新媒体实验室有限公司\n                    深圳市洲灏科技有限公司\n                    尼康映像仪器销售（中国）有限公司\n                    深圳市赢龙数码有限责任公司\n场地支持：空体新媒体实验室",
                        "type": "text",
                        "url": {}
                    }, {
                        "uploaderId": "5be887ada423cbb3748797be807526722",
                        "uploaderName": "视觉深圳精选集",
                        "width": "640",
                        "sign": true,
                        "id": "7fec5ed483fb414bb99032aec5358256",
                        "type": "photo",
                        "url": {
                            "p1": "https://img.500px.me/graphic/5be887ada423cbb3748797be807526722/7fec5ed483fb414bb99032aec5358256.jpg!p1",
                            "baseUrl": "https://img.500px.me/graphic/5be887ada423cbb3748797be807526722/7fec5ed483fb414bb99032aec5358256.jpg",
                            "id": "7fec5ed483fb414bb99032aec5358256"
                        },
                        "height": "795"
                    }],
                    "userPictureContentState": false,
                    "userPictureCreativityState": false,
                    "ossUrl": "https://img.500px.me/graphic/5be887ada423cbb3748797be807526722/0100b9e7dbd640809171cd5bcbc261cb.jpeg",
                    "licenceId": "1",
                    "userPictureTechnicalState": false,
                    "createdTime": 1521214155000,
                    "id": "35fdf991b1437d539ef0c5465b4257f1",
                    "state": 0,
                    "height": 659,
                    "uploaderId": "5be887ada423cbb3748797be807526722",
                    "sort": 31175049,
                    "tags": "公告通知,广告推广",
                    "commentCount": 0,
                    "pictureLikeedCount": 30,
                    "ratingMaxDate": 1521265259657,
                    "origin": "cn",
                    "description": "一年一度的视觉中国摄影师年会如约而至。\n\n        想了解行业最前沿动态，却只敢上朋友圈别人的分享；\n        想认识摄影大师，却没人引荐；\n        想买器材，专卖店太贵，其他渠道不敢买；\n        想结交热爱摄影的小伙伴一起玩耍，但总是抱怨缘分太少；\n        想亲临北京现场参加摄影师年会，奈何路太远，时间太紧，\n        如果你还在苦恼这些，\n\n        今年视觉中国摄影师年会新增深圳站，本次年会由500px视觉深圳部落主办，深圳市风光摄影协会、云途摄影机构及视觉广东、风光摄影、摄在广州、视觉汕尾、视觉梅州、潮摄影等部落联合协办。应邀出席的嘉宾代表有视觉中国创意社区总裁，深圳市相关部门领导，广东省摄影家协会领导以及深圳市风光摄影协会领导等。届时会场将同期展出深圳名家摄影作品以飨观众。\n\n活动时间：\n\n4月1日（周日）13:00-18:00\n\n活动地点：\n\n空体新媒体实验室\n南山区科技园南区虚拟大学园R3-A栋1楼（18东门）\n\n\n\n主要活动流程\n\n\n13:00 -14:00：\n签到并自由参观《让世界聚焦》深圳摄影名家作品展\n\n14:05&mdash;14:15：\n开场视频拍摄心得分享（拾贰）\n\n14:35 -14:55 :\n2017视觉趋势报告（Max)\n\n14:55 -15:00 ：\n抽三等奖\n\n15:00 -15:20 ：\n社区发布新产品规划(王钧）\n\n15:25 -16:05：\n《行走西藏》讲座（钟国华）\n\n16:05 -16:15 ：\n抽二等奖\n\n16:20-16:50：\n摄影高端论坛：风光与人文\n（钟国华、橙子、阿戈、仁慈的狮子）\n\n16:50-17:00：\n2017视觉广东区域部落年度十佳图片颁奖\n\n17:00 - 17:10\n抽一等奖\n\n17:10 - 18:00\n致辞，合影\n\n\n分享嘉宾\n\n\n视觉中国创意社区 总裁 王钧\n\n广东省摄影家协会副主席、深圳市摄影家协会副主席  钟国华\n\n深圳著名风光摄影师，深圳市风光摄影协会专家组专家橙子、阿戈等\n\n\n合作伙伴",
                    "privacy": 0,
                    "title": "&ldquo;让世界聚焦&rdquo;&mdash;视觉中国2017摄影师年会（深圳站）等您来！",
                    "userPictureCreativityedCount": 0,
                    "photoCount": 1629,
                    "originId": 1521214154,
                    "uploaderInfo": {
                        "userRoleIds": {},
                        "nickName": "视觉深圳",
                        "avatar": {
                            "a1": "https://img.500px.me/default_tx.png!a1",
                            "baseUrl": "https://img.500px.me/default_tx.png"
                        },
                        "userFolloweeState": false,
                        "userName": "VisualSZ",
                        "gicEditorialId": "-",
                        "userfolloweeLookUpload": false,
                        "coverUrl": {
                            "baseUrl": "https://img.500px.me/photo/2b7a049f642b9b8d9b115e0ab59ec4284/3666e8bfee884dcab66f0cffa465df7e.jpg",
                            "id": "5be887ada423cbb3748797be807526722"
                        },
                        "gicCreativeId": "-",
                        "userFollowedCount": 46,
                        "userfolloweeLookShare": false,
                        "userfolloweeFocus": false,
                        "id": "5be887ada423cbb3748797be807526722",
                        "userType": 0,
                        "userFollowedState": false
                    },
                    "userPictureTechnicaledCount": 0,
                    "userPictureShareState": false,
                    "hasCover": 0,
                    "openState": "profile",
                    "userPicturePutupedCount": 0,
                    "userPictureCompositionState": false,
                    "picturePvCount": 324,
                    "userPictureCompositionedCount": 0,
                    "url": {
                        "p1": "https://img.500px.me/graphic/5be887ada423cbb3748797be807526722/0100b9e7dbd640809171cd5bcbc261cb.jpeg!p1",
                        "baseUrl": "https://img.500px.me/graphic/5be887ada423cbb3748797be807526722/0100b9e7dbd640809171cd5bcbc261cb.jpeg",
                        "id": "35fdf991b1437d539ef0c5465b4257f1"
                    },
                    "coverUserInfo": {
                        "nickName": "视觉深圳",
                        "sign": true,
                        "id": "5be887ada423cbb3748797be807526722",
                        "userName": "VisualSZ"
                    },
                    "createdDate": 1521214155000,
                    "uploaderName": "视觉深圳",
                    "refer": "",
                    "width": 1280,
                    "userPictureContentedCount": 0,
                    "userPicturePutupState": false,
                    "categoryId": "公告通知,广告推广",
                    "resourceType": 3
                }, "message": "sucess", "status": "200"
            }
        }
    }

    static propTypes = {
        item: PropTypes.object.isRequired
    }
    static defaultProps = {
        item: {}
    }

    handleSubmit = (e) => {

    }

    componentDidMount() {

    }

    _onGallery(imgUrl, event) {
        return true;
        //TODO: 看大圖的功能暂时注释掉 以后换插件实现以下
        var target = event.target || event.srcElement;
        if (target.className == 'user-detail-link-source') {
            return true;
        }

        if (this.props.onlyContent) {
            this._imgClick(imgUrl);
            return false;
        }

        event = event || window.event;
        var galleryId = 'main-content-container';
        var linksEle = document.getElementById(galleryId);
        var target = event.target || event.srcElement,
            link = target.src ? target.parentNode : $(target).find('a')[0],//target, 手机端的a标签 点击事件不响应了
            options = {index: link, event: event},
            links = linksEle.getElementsByClassName('photo-img-per-link');//linksEle.getElementsByTagName('a');
        //blueimp.Gallery(links, options);

        $('.slide-content').addClass('copyright-contextmenu');

    }

    render() {
        var me = this;
        var rows = [];
        var mobileCls = {};

        //放一段视频的假数据
        if (me.state.graphicDetail.data.id == '3a3a39eb244b4c3cbfddb8cd5aa8b8ee') {
            // me.state.graphicDetail.data.photos.unshift(
            //     {
            //         type:"video",
            //         url: {
            //             "createdTime":1494548400259,
            //             "duration":60,
            //             "ext":".mp4",
            //             "hd":"8c56231db483f8dbe4266ffc9f9815655_d_1280x720_1min咖啡机视频.mp4",
            //             "hdUrl": "http://36.102.209.53/v.cctv.com/flash/mp4video6/TMS/2011/01/05/cf752b1c12ce452b3040cab2f90bc265_h264818000nero_aac32-1.mp4?wsiphost=local", //http://qiniu.video.shijue.me/8c56231db483f8dbe4266ffc9f9815655_d_1280x720_1min咖啡机视频.mp4?e=1502327450&token=q1lZNdNmlPLW8wl-zD-6iDlngX0CSrRq1Ou2Sa6b:Y0xUjAUcJtuNXavKdw75sfzvtBg=",
            //             "height":1080,
            //             "id":347,
            //             "lossless":"8c56231db483f8dbe4266ffc9f9815655_d_v_1min咖啡机视频.mp4",
            //             "losslessUrl":"http://qiniu.video.shijue.me/8c56231db483f8dbe4266ffc9f9815655_d_v_1min咖啡机视频.mp4?e=1502327450&token=q1lZNdNmlPLW8wl-zD-6iDlngX0CSrRq1Ou2Sa6b:pfkfgdPpaBBzLJ_ebi4LtMfKt4k=",
            //             "md5":"lhVhp_ICxAEI_S7_mLFKjq3UmcpV",
            //             "mimeType":"video/mp4",
            //             "name":"1min咖啡机视频.mp4",
            //             "sd":"8c56231db483f8dbe4266ffc9f9815655_d_640x360_1min咖啡机视频.mp4",
            //             "sdUrl":"http://qiniu.video.shijue.me/8c56231db483f8dbe4266ffc9f9815655_d_640x360_1min咖啡机视频.mp4?e=1502327450&token=q1lZNdNmlPLW8wl-zD-6iDlngX0CSrRq1Ou2Sa6b:mcS4-fCjOI_9rMUftovLB9Rj5rk=",
            //             "size":29760733,
            //             "state":2,
            //             "thumbnails":"8c56231db483f8dbe4266ffc9f9815655_d_thumbnails_1min咖啡机视频.jpg",
            //             "thumbnailsUrl":"http://qiniu.video.shijue.me/8c56231db483f8dbe4266ffc9f9815655_d_thumbnails_1min咖啡机视频.jpg?e=1502327450&token=q1lZNdNmlPLW8wl-zD-6iDlngX0CSrRq1Ou2Sa6b:xteHeDHBIa0QLG3mqPWaOTdKlVo=",
            //             "userId":"8c56231db483f8dbe4266ffc9f9815655_d",
            //             "width":1440
            //         }
            //     });
        }

        if (me.state.graphicDetail.data.photos && me.state.graphicDetail.data.photos.length) {
            var datas = me.state.graphicDetail.data.photos;
            for (var i = 0, l = datas.length; i < l; i++) {
                if (datas[i].type == 'text' && datas[i].description) {
                    rows.push((<div className="detail-txt" key={i}>
                        <span
                            dangerouslySetInnerHTML={{__html: lyby.handleLinkHtml(datas[i].description ? lyby.escape2Html(datas[i].description) : '')}}></span>
                    </div>));
                } else if (datas[i].type == 'photo') {
                    rows.push((
                        <div className="detail-photo" key={i} onClick={me._onGallery.bind(me, datas[i].url.baseUrl)}>
                            <a href={datas[i].url.baseUrl + '!p5'} className="photo-img-per-link">
                                <img alt="" className="copyright-contextmenu" src={datas[i].url.baseUrl + '!p3'}
                                />
                            </a>
                            {
                                datas[i].sign ? (
                                        (me.props.onlyContent || !datas[i].uploaderId) ? (<div className="credits">
                            <span> 图：{lyby.htmldecode(datas[i].uploaderName)}
                            </span>
                                            </div>) : (<div className="credits">
                            <span> 图：
                                <a href={"/community/user-details/" + datas[i].uploaderId} target="_blank"
                                   className="user-detail-link-source">{lyby.htmldecode(datas[i].uploaderName)}</a>
                            </span>
                                            </div>)
                                    ) : ''
                            }

                        </div>));
                } else if (datas[i].type == 'video') {
                    let styleObj = {
                        padding: '5px',
                        backgroundColor: '#000'
                    }
                    let item = datas[i];
                    var videoUrl = item.url.baseUrl;
                    var videoDivC = '';
                    if (/^http?.+\.(flv|mpg|mpeg|avi|wmv|mov|asf|rm|rmvb|mkv|m4v|mp4)/g.test(videoUrl)) {
                        videoDivC = (
                            <video controls="controls" name="media" height="auto" width="100%"
                                   style={styleObj} key={i} className="video-item"
                                   poster={''}>
                                <source
                                    src={videoUrl}
                                    type="video/mp4"/>
                            </video>
                        )
                    } else {
                        videoDivC = (
                            <iframe height="480" width="600" src={videoUrl} frameBorder="0" allowFullScreen></iframe>
                        )
                    }
                    rows.push(<div className="detail-video">{videoDivC}</div>);
                }

            }

        }

        var headImgSourceCmp = '';
        if (me.state.graphicDetail.data.coverUserInfo && me.state.graphicDetail.data.coverUserInfo.id && me.state.graphicDetail.data.coverUserInfo.sign) {
            if (me.props.onlyContent) {
                headImgSourceCmp = (<div className="credits">
                            <span> 图：{lyby.htmldecode(me.state.graphicDetail.data.coverUserInfo.nickName)}
                            </span>
                </div>)
            } else {
                headImgSourceCmp = (<div className="credits">
                            <span> 图：
                                <a href={lyby.getUserDetailLink(me.state.graphicDetail.data.coverUserInfo)}
                                   target="_blank">{lyby.htmldecode(me.state.graphicDetail.data.coverUserInfo.nickName)}</a>
                            </span>
                </div>);
            }
        }

        return (
            <div className="graphic-content-container photos_index_layout">
                {
                    !me.props.onlyContent && (<div className="graphic-head-region">
                        <div className="head-img-region" ref='cover'>
                            {
                                !lyby.ismobile ? (<div className="head-img copyright-contextmenu" style={{
                                        backgroundImage: 'url("' + me.state.graphicDetail.data.url.baseUrl
                                        + '!p8' + '")'
                                    }}></div>) : ''
                            }

                            {
                                lyby.ismobile ? (<div className="head-img-mobile" style={{
                                        backgroundImage: 'url("' + me.state.graphicDetail.data.url.baseUrl
                                        + '!p3' + '")'
                                    }}></div>) : ''
                            }

                            {
                                headImgSourceCmp
                            }

                        </div>
                        <div className="top-content-container main_container">
                            <div className="graphic-title">
                                {lyby.htmldecode(me.state.graphicDetail.data.title)}
                            </div>
                            <div className="action-container photo_sidebar">
                                <div className="graphic-action-region actions_region clearfix">
                                    {
                                        ((me.state.graphicDetail.data.openState == 'private') &&
                                        (me.state.graphicDetail.data.uploaderId != lyby.loginUser().id)) ? '' : (
                                                <div className="button-action curator-actions left">
                                                    <div className="desktop">
                                                        哈哈
                                                    </div>
                                                </div>
                                            )
                                    }

                                    {
                                        (me.state.graphicDetail.data.uploaderId == lyby.loginUser().id) ? (
                                                <div className="button-action action-edit left"
                                                     onClick={me._gotoEdit.bind(me, me.state.graphicDetail.data)}>
                                                    编辑
                                                </div>
                                            ) : ''

                                    }

                                    <div className="button-action left">
                                        wawa
                                    </div>
                                    <div className="button-action left">
                                        heihei
                                    </div>
                                </div>

                            </div>

                        </div>
                        <div className="graphic-author">
                            <a href={lyby.getUserDetailLink(me.state.graphicDetail.data.uploaderInfo)}>{lyby.htmldecode(me.state.graphicDetail.data.uploaderInfo.nickName)}</a>
                        </div>
                        {
                            me.state.graphicDetail.data.tags ? (
                                    <div className="tags-container">
                                        {
                                            me.state.graphicDetail.data.tags.split(',').map(function (item, index) {
                                                return (
                                                    <span className="tags-per" key={index}>
                                                        {item}
                                                    </span>
                                                )
                                            })
                                        }
                                    </div>
                                ) : ''
                        }

                        <div className="other-data-container">
                            <span
                                className="time-ago">{lyby.time_ago_in_words(parseInt(me.state.graphicDetail.data.uploadedDate))}</span>
                            <span className="read-count">阅读{me.state.graphicDetail.data.picturePvCount}</span>
                        </div>
                    </div>)
                }

                <div className={classNames({"graphic-main-content-region": true})} style={mobileCls}>
                    <div className="main-content-container" id="main-content-container">
                        {
                            rows
                        }
                        <div className="copyright-container">
                            &copy; 图片和文字版权归各自作者所有。
                        </div>
                        {
                            (!me.props.onlyContent && (me.state.graphicDetail.data.uploaderId != lyby.loginUser().id)) ? (
                                    <div className="report-btn">
                                        举报
                                    </div>
                                ) : ''
                        }

                    </div>

                </div>


            </div>
        )
    }
}


export default ReviewGraphicTxtDetail;
