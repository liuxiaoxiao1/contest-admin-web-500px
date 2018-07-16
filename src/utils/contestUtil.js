import assign from 'object-assign';


var contestUtil = {
    DefaultListMixin: {
        getInitialState: function () {
            return {
                hasNext: true,
                page: 0,
                data: []
            };
        },
        _loadData: function () {
            if(!this.props.url){
                return;
            }
            var me = this;
            $.ajax({
                type: "GET",
                context: this,
                url: this.props.url,
                data: assign({
                    page: ++this.state.page,
                    size: this.state.size,
                    type: 'json'
                },this.props.ajaxParams),
                dataType: "json",
                success: function (data) {
                    if (!(data instanceof Array)) {
                        if (data.status == 200) {
                            data = data.data;
                        } else {
                            this.setState({
                                hasNext: false,
                            })
                        }
                    }
                    if (data.length) {
                        me.state.data.push.apply(me.state.data, data);
                        this.setState({
                            data: me.state.data
                        })
                    } else {
                        this.setState({
                            hasNext: false,
                        })
                    }
                },
                error: function (e) {
                    //lyby.errorMsg(e);
                }
            });
        }
    },
    getContestRTime: function (data) {
        var stateKey = {
            101: {
                key: 'openTime',
                value: '距征稿：'
            },
            102: {
                key: 'judgeTime',
                value: '距截稿：'
            },
            103: {
                key: 'judgeEndTime',
                value: '距颁奖：'
            },
            104: {
                key: 'judgeEndTime',
                value: '结束时间：'
            }
        }
        var dayFilter = function (obj) {
            var r = '';
            var i = 0, j = 0;
            for (var key in obj) {
                if (!j && obj[key] > 0) {
                    r += (obj[key] + key);
                    break;
                }
                if (obj[key] > 0) {
                    i++;
                    r += (obj[key] + key);
                }
                j++;
                if (i == 2) {
                    break;
                }
            }
            if (!r) {
                r = '1分钟';
            }
            return r;
        }
        var jsonObj = stateKey[data.state];
        if (jsonObj) {
            if (data.state == 104) {
                return jsonObj.value + new Date(data[jsonObj.key]).pattern('yyyy年MM月dd日');
            } else {
                var time = dayFilter(new Date(data[jsonObj.key]).getRTime());
                if (time) {
                    return jsonObj.value + time;
                }
            }
        }
        return '';
    },
    _getDetailUrl: function (item) {
        var detailUrlStr = 'javascript:void(0);';
        //contestType 0 普通大赛  1 邀请赛 2 自主小活动 3 自主办赛
        if (item) {
            if (item.contestType == 2) {
                if (typeof item.fromType != 'undefined') {
                    if (item.fromType === 0) {
                        //之里方磊说tribeId随便传一个就可以，为了私有图文不展示而设置
                        detailUrlStr = '/community/v2/graphic/detail/' + item.refer + '?fromType=tribe&fromResourceId=fl';
                    } else if (item.fromType === 1) {
                        detailUrlStr = item.refer;
                        if(detailUrlStr.indexOf('http') == -1) {
                            detailUrlStr = 'http://' + detailUrlStr;
                        }
                    }
                }
            }else{
                if (item.version == 3 && item.domainName) {
                    detailUrlStr = '/contest/' + item.domainName;
                } else {
                    if (item.contestType == 1) {
                        if (item.state == 101) {
                            detailUrlStr = '/community/contest/details/invite/' + item.id;
                        } else if (item.state == 104) {
                            detailUrlStr = '/community/contest/details/invite/' + item.id + "?action=prize";
                        } else if (item.detailsShow == 1) {
                            detailUrlStr = '/community/contest/details/invite/' + item.id;
                        } else {
                            detailUrlStr = '/community/contest/details/invite/' + item.id + "?action=allList";
                        }

                    } else if (item.state == 101) {
                        detailUrlStr = '/community/contest/details/' + item.id;
                    } else if (item.state == 104) {
                        detailUrlStr = '/community/contest/' + item.id + '/awards';
                    } else {
                        detailUrlStr = '/community/contest/' + item.id + '/photos?orderby=createdTime';
                    }
                }
            }
        }
        return detailUrlStr;
    }
}
export default contestUtil;