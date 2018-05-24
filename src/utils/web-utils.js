var assign = require('object-assign');
var querystring = require('querystring');

/* eslint-disable */
(function () {


    /**
     * 对Date的扩展，将 Date 转化为指定格式的String
     * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q) 可以用 1-2 个占位符
     * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
     * eg:
     * (new Date()).pattern("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
     * (new Date()).pattern("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04
     * (new Date()).pattern("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04
     * (new Date()).pattern("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04
     * (new Date()).pattern("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
     */
    Date.prototype.pattern=function(fmt) {
        var o = {
            "M+" : this.getMonth()+1, //月份
            "d+" : this.getDate(), //日
            "h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时
            "H+" : this.getHours(), //小时
            "m+" : this.getMinutes(), //分
            "s+" : this.getSeconds(), //秒
            "q+" : Math.floor((this.getMonth()+3)/3), //季度
            "S" : this.getMilliseconds() //毫秒
        };
        var week = '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_');
        if(/(y+)/.test(fmt)){
            fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
        }
        if(/(E+)/.test(fmt)){
            fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "/u661f/u671f" : "/u5468") : "")+week[this.getDay()+""]);
        }
        for(var k in o){
            if(new RegExp("("+ k +")").test(fmt)){
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
            }
        }
        return fmt;
    };
    /*以下方法IE不支持，用正则实现*/
    String.prototype.trim= function(){
        // 用正则表达式将前后空格
        // 用空字符串替代
        return this.replace(/(^\s*)|(\s*$)/g, "");
    }

    String.prototype.startsWith = function(str){
        return (this.match("^"+str)==str)
    }
    String.prototype.endsWith = function(str){
        return (this.match(str+"$")==str)
    }



    if(!Date.prototype.getRTime){
        Date.prototype.getRTime = function(){
            var EndTime= this; //截止时间 前端路上 http://www.51xuediannao.com/qd63/
            var NowTime = new Date();
            /*var localTime = NowTime.getTime();
             var localOffset = NowTime.getTimezoneOffset() * 60000;
             var utc = localTime - localOffset;
             var offset = 8;
             var bombay = utc + (3600000*offset);
             var newNowTime = new Date(bombay);*/

            var t =EndTime.getTime() - NowTime.getTime();

            var d=Math.floor(t/1000/60/60/24);
            var h=Math.floor(t/1000/60/60%24);
            var m=Math.floor(t/1000/60%60);
            var s=Math.floor(t/1000%60);

            //getTimezoneOffset()
            return {
                '天' : d,
                '小时' : h,
                '分' : m
            }
        }
    }
    if(!String.prototype.startsWith){
        String.prototype.startsWith = function(str){
            return (this.match("^"+str)==str)
        }
    }
    if(!String.prototype.endsWith){
        String.prototype.endsWith = function(str){
            return (this.match(str+"$")==str)
        }
    }
    if(!String.prototype.trim){
        String.prototype.trim= function(){
            // 用正则表达式将前后空格
            // 用空字符串替代
            return this.replace(/(^\s*)|(\s*$)/g, "");
        }
    }
    if (!String.prototype.splice) {
        String.prototype.splice = function(start, delCount, newSubStr) {
            return this.slice(0, start) + newSubStr + this.slice(start + Math.abs(delCount));
        };
    }
    if(!String.prototype.format){
        String.prototype.format = function(args) {
            var result = this;
            if (arguments.length > 0) {
                if (arguments.length == 1 && typeof (args) == "object") {
                    for (var key in args) {
                        if(args[key]!=undefined){
                            var reg = new RegExp("({" + key + "})", "g");
                            result = result.replace(reg, args[key]);
                        }
                    }
                }
                else {
                    for (var i = 0; i < arguments.length; i++) {
                        if (arguments[i] != undefined) {
                            var reg= new RegExp("({)" + i + "(})", "g");
                            result = result.replace(reg, arguments[i]);
                        }
                    }
                }
            }
            return result;
        }
    }
})();
var lyby = {
    _count: function (idIndex) {
        $.ajax({
            type: "post",
            url: "/alilog/put",
            dataType: "json",
            data: {
                objId: idIndex
            },
            success: function (data) {
            },
            error: function (e) {
            }
        });
    },
    cmpRemainingTime:function(createdTime,settingRemainingDays){
        var nowTime = new Date();
        var settingRemainingTime=settingRemainingDays*1000*3600*24;
        var remainingTime=settingRemainingTime-(nowTime.getTime() - createdTime);
        if(remainingTime>0){
            var durDays = remainingTime / 1000 / 3600 / 24;
            var durHours = remainingTime / 1000 / 3600 - Math.floor(durDays) * 24;
            var durMinus = remainingTime / 1000 / 60 - Math.floor(durDays) * 24 * 3600 - Math.floor(durHours) * 60;
            var resultTimes = '';
            if (Math.floor(durDays) >= 1) {
                resultTimes = Math.floor(durDays) + '天';
            } else if (Math.floor(durHours) >= 1) {
                resultTimes = Math.floor(durHours) + '小时';
            } else if(Math.floor(durMinus)>=1){
                resultTimes = Math.floor(durMinus) + '分钟';
            }else{
                resultTimes='1分钟';
            }
            var text = Math.floor(durDays) + '天' + Math.floor(durHours) + '小时' + Math.floor(durMinus) + '分钟';
            return resultTimes;
        }else{
            return '过期'
        }
    },
    addCookie: function (name, value, expiresHours) {
        var cookieString = name + "=" + escape(value);
        //判断是否设置过期时间,0代表关闭浏览器时失效
        if (expiresHours > 0) {
            var date = new Date();
            date.setTime(date.getTime() + expiresHours * 1000);
            cookieString = cookieString + ";expires=" + date.toUTCString();
        }
        document.cookie = cookieString;
    },
    editCookie : function (name, value, expiresHours) {
        var cookieString = name + "=" + escape(value);
        if (expiresHours > 0) {
            var date = new Date();
            date.setTime(date.getTime() + expiresHours * 1000); //单位是毫秒
            cookieString = cookieString + ";expires=" + date.toGMTString();
        }
        document.cookie = cookieString;
    },
    //根据名字获取cookie的值
    getCookieValue : function (name) {
        var strCookie = document.cookie;
        var arrCookie = strCookie.split("; ");
        for (var i = 0; i < arrCookie.length; i++) {
            var arr = arrCookie[i].split("=");
            if (arr[0] == name) {
                return unescape(arr[1]);
                break;
            }
        }
        return 0;
    },
    setUser: function (value) {
        return this.localStorage.setValue('curUser', JSON.stringify(value));
    },
    loginUser: function () {
        return JSON.parse(this.localStorage.getValue('curUser')) || {};
    },
    localStorage: {
        setValue: function (key, value) {
            if (typeof(localStorage) != 'undefined' && localStorage) {
                localStorage[key] = value;
            }
        },
        getValue: function (key) {
            //如果localStorage为null的时候，这个if就会进去
            if (typeof(localStorage) != 'undefined' && localStorage) {
                return localStorage[key];
            }
            return '';
        },
        remove: function (key) {
            localStorage.removeItem(key);
        },
        clear: function () {
            localStorage.clear();
        }
    },
    superObj : {
        _onChange: function () {
            this.setState(this.state.getData());
        },
        componentDidMount: function () {
            this.state.on(this._onChange);
            if(this.state.init instanceof Function){
                this.state.init();
            }
        },
        componentWillUnmount: function () {
            this.state.remove(this._onChange);
        }
    },
    isLogin: function () {
        var d = this.loginUser();
        if (!d.id) {
            return false;
        }
        return true;
    },
    downloadFile: function (url) {
        try{
            var elemIF = document.createElement("iframe");
            elemIF.src = url;
            elemIF.style.display = "none";
            document.body.appendChild(elemIF);
        }catch(e){
            console.log("下载异常！");
        }
    },
    validateUser: function () {
        var d = this.loginUser();
        if (!d.id) {
            location.replace('/user/login?redirect=' + encodeURIComponent(location.href));
            return false;
        }
        return true;
    },
    isObjectEmpty: function (e) {
        var t;
        for (t in e)
            return !1;
        return !0
    },
    getQianyueDefaultPage: function () {
            let me = this;
            var switchDefault = me.localStorage.getValue('switch_default_page_qianyue-' + me.loginUser.getData().id);
            //默认打开
            if(typeof switchDefault == 'undefined') {
                switchDefault = 'true'; //为啥要用字符串，因为存储那边只能保存字符串啊
            }
            return switchDefault;
    },
    setQianyueDefaultPage: function (val) {
            let me = this;
            me.localStorage.setValue('switch_default_page_qianyue-' + me.loginUser.getData().id, val)
    },
    validLogin: function() {
        if(!this.islogin) {
            location.href = '/user/login?redirect=' + encodeURIComponent(location.href);
        }else {
            return true;
        }
    },
    getUrlParams : function () {
        var params = '';
        if(typeof(location) != 'undefined'){
            var searchStr = location.search.substring(1, location.search.length);
            if (searchStr) {
                params = querystring.parse(location.search.substring(1, location.search.length));
            }
        }
        return params;
    },
    /**
     * 将参数对象转换为，url参数字符串： {a: 1,b: 2} -> 'a=1&b=2'
     * @param paramsObj
     * @returns {string}
     */
    getQueryStrFromObj: function (paramsObj) {
        var _resStr = '';
        if(typeof paramsObj == 'object') {
            for(var p in paramsObj) {
                _resStr += p + '=' + paramsObj[p] + '&';
            }
        }
        //去掉最后一个&
        return _resStr.substring(0, _resStr.length-1);
    },
    guideCount : function(flag,flagValue) {
        var loginUser = this.loginUser.getData();
        if (!loginUser.id || !flag) {
            return;
        }
        $.ajax({
            url: '//node.500px.me/guide/count',
            dataType: 'jsonp',
            data: {
                userId: loginUser.id,
                flag: flag,
                flagValue : flagValue
            },
            success: function (ndata) {
            }
        })
    },
    errorMsg : function (err) {
        
    },
    isEmptyObj : function (obj) {
        for(var i in obj){
            return false;
        }
        return true;
    },
    htmlencode : function (s){
        var div = document.createElement('div');
        div.appendChild(document.createTextNode(s));
        return div.innerHTML;
    },
    htmldecode : function (s){
        if(!s)return '';
        var div = document.createElement('div');
        div.innerHTML = s;
        return div.innerText || div.textContent;
    },
    escape2Html : function (str) {
        var arrEntities={'lt':'<','gt':'>','nbsp':' ','amp':'&','quot':'"'};
        return str.replace(/&(lt|gt|nbsp|amp|quot);/ig,function(all,t){return arrEntities[t];});
    },
    percentage : function (numOrstr) {
        if(!numOrstr){
            numOrstr = 0;
        }
        return parseFloat((parseFloat(numOrstr) * 100).toPrecision(12)) + '%';
    },
    getOS: function () {
        if (navigator.userAgent.indexOf('Window') > 0) {
            return 'windows';
        } else if (navigator.userAgent.indexOf('Mac OS X') > 0) {
            return 'mac';
        } else if (navigator.userAgent.indexOf('Linux') > 0) {
            return 'linux'
        } else {
            return ''
        }
    },
    ismobile : function () {
        if(typeof navigator != 'undefined'){
            return navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/iPhone|iPod/i) ? !0 : !1
        }
        return false;
    }(),
    isIPhone: function () {
        if (typeof navigator != 'undefined') {
            return /(iPhone|iPad|iPod)/i.test(navigator.userAgent);
        }
        return false;
    }(),
    isAndroid: function () {
        if (typeof navigator != 'undefined') {
            return /(Android)/i.test(navigator.userAgent);
        }
        return false;
    }(),
    stringify : function (jsonObj) {
        return encodeURI(JSON.stringify(jsonObj));
    },
    domain : 'http://500px.me',
    cdn : '//cdn.500px.me',
    ajax: function (store,params) {
        var options = store.getData();
        $.ajax({
            url: options.url,
            data: assign({
                type: 'json',
                page: ++options.page,
                size: options.size
            },params),
            dataType: 'json',
            success: function (data) {
                store.addData(data);
            }
        })
    },
    zhanweituUrl : '//cdn.500px.me/images/qianyue/zhanweitu.png?dc=1',
    defaultImgUrl : 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
    default_avatar : '//pic.500px.me/images/default_tx.png',
    default_avatar_cdn : '//pic.500px.me/images/default_tx.png',
    user_avatar: function (obj) {
        var avatarUrl;
        if (obj && obj.avatar) {
            if (typeof obj.avatar == 'string') {
                try{
                    obj.avatar = JSON.parse(obj.avatar)
                }catch (e){
                    return avatarUrl || this.default_avatar;
                }
            }
            avatarUrl = obj.avatar['a2'] || obj.avatar['a1'];// || avatarUrl;
            if(!avatarUrl && obj.avatar.baseUrl){
                if(obj.avatar.baseUrl.match(/^(https|http):\/\/(c\.shijue\.me|img\.500px\.me)/)){
                    avatarUrl = obj.avatar.baseUrl + '!a1';
                }else{
                    avatarUrl = obj.avatar.baseUrl;
                }
            }
        }
        return avatarUrl || this.default_avatar;
    },
    getUrlLink: function (urlJosn, tag) {
        if (urlJosn && tag && urlJosn.baseUrl) {
            return urlJosn.baseUrl + '!' + tag;
        }
        return '';
    },
    loadJs : function () {
        var oldScript;
        return function(src, fun,id) {
            var script = null;
            script = document.createElement("script");
            script.type = "text/javascript";
            script.id = id||'cy_cmt_num';
            script.src = src;
            if (typeof fun === "function") {
                script.onload = fun;
            }
            var headObj = document.getElementsByTagName("head")[0];
            if (!oldScript) {
                oldScript = headObj.appendChild(script);
            }else{
                headObj.replaceChild(script,oldScript);
                oldScript = script;
            }
        }
    }(),
    loadCSS: function () {
        var oldScript;
        return function (src, fun) {
            var script = null;
            script = document.createElement("link");
            script.type = "text/css";
            script.rel = "stylesheet";
            script.href = src;
            if (typeof fun === "function") {
                script.onload = fun;
            }
            var headObj = document.getElementsByTagName("head")[0];
            if (!oldScript) {
                oldScript = headObj.appendChild(script);
            } else {
                headObj.replaceChild(script, oldScript);
                oldScript = script;
            }
        }
    }(),
    imgLoadError: function (evt) {
        evt.target.src = lyby.default_avatar;
    },
    /*paramstr是阿里对图片进行处理的参数*/
    getImgUrl : function (opt,paramstr) {
        var url = '';
        /*if (paramstr) {
         paramstr+='_1o';
         }else{
         paramstr = '';
         }*/
        paramstr = paramstr || '';
        if (opt && opt.url) {
            try{
                var urlFlag = 'p2';
                if (typeof opt.url == 'string') {
                    opt.url = JSON.parse(opt.url)
                }
                var wNum = paramstr.match(/^@(\d+)w_.*/);
                if (wNum) {
                    var nw=parseInt(wNum[1]);
                    if (nw > 2000) {
                        urlFlag = 'p5';
                    }else if(nw < 600){
                        urlFlag = 'p1';
                    }else if(nw == 900){
                        urlFlag = 'p3';
                    }
                }
                var hNum = paramstr.match(/^@(\d+)h_.*/);
                if (hNum) {
                    var hw=parseInt(hNum[1]);
                    if (hw == 600) {
                        urlFlag = 'p3';
                    }
                }

                if (paramstr === 'p3') {
                    urlFlag = paramstr;
                }else if (paramstr === 'p6') {
                    urlFlag = paramstr;
                }else if (lyby.ismobile) {
                    //mobile 变小
                    if (urlFlag == 'p5') {
                        urlFlag = 'p3';
                    }else{
                        urlFlag = 'p1';
                    }
                }
                url = opt.url[urlFlag]||'';
            }catch(e){}
        }
        //return (url+paramstr);
        return url;//url.replace('.jpg','');
    },
    time_ago_in_words : function (commentDate) {
        if(typeof sjApp != 'undefined'){
            return sjApp.time_ago_in_words(new Date().getTime()-parseInt(commentDate));
        }else{
            return new Date(commentDate).pattern("yyyy-MM-dd H:m:s");
        }
    },
    override : function(origclass, overrides) {
        if (overrides) {
            var p = origclass.prototype;
            assign(p, overrides);
        }
    },
    extend : function() {
        // inline overrides
        var io = function(o) {
            for (var m in o) {
                this[m] = o[m];
            }
        };
        var oc = Object.prototype.constructor;

        return function(sb, sp, overrides) {
            if (sp instanceof Object) {
                overrides = sp;
                sp = sb;
                sb = overrides.constructor != oc
                    ? overrides.constructor
                    : function() {
                    if (arguments.callee.init instanceof Function) {
                        arguments.callee.init.apply(this,arguments);
                        arguments.callee.init = null;
                    }
                    sp.apply(this, arguments);
                };
            }
            var F = function() {
            }, sbp, spp = sp.prototype;

            F.prototype = spp;
            sbp = sb.prototype = new F();
            sbp.constructor = sb;
            sb.superclass = spp;
            if (spp.constructor == oc) {
                spp.constructor = sp;
            }
            sb.override = function(o) {
                sjApp.override(sb, o);
            };
            sbp.superclass = sbp.supr = (function() {
                return spp;
            });
            sbp.override = io;
            lyby.override(sb, overrides);
            sb.extend = function(o) {
                return lyby.extend(sb, o);
            };
            return sb;
        };
    }(),
    wxShare : function (shareOptions) {
        if (typeof wxinfo == 'undefined' || typeof wx == 'undefined' || this.wxReady) {
            return;
        }
        var so = {
            title: $('head title').text() || undefined,
            desc: $('head meta[name=description]').attr('content') || undefined,
            link: location.href,
            //imgUrl: cur_set.url.p1,
            success: function () {
            },
            cancel: function () {
            }
        }
        if(typeof(shareOptions) != 'undefined'){
            if (shareOptions.title) {
                shareOptions.title = this.htmldecode(shareOptions.title);
            }
            if (shareOptions.desc) {
                shareOptions.desc = this.htmldecode(shareOptions.desc);
            }
            assign(so,shareOptions);
        }
        if (wxinfo.appid) {
            if(!so.title){
                so.title = '视觉中国摄影社区';
            }
            if(!so.desc){
                so.desc = '视觉中国摄影社区 500px.me - 让精彩无处不在';
            }
            this.wxReady = function(){
                /*var shareOptions = {
                 title: '我是授权登陆拿你信息的', // 分享标题
                 desc: '敢点就敢拿', // 分享描述
                 link: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid={{data.appid}}&redirect_uri=http%3A//www.jshare.net/weixin/getUser&response_type=code&scope=snsapi_userinfo&state=200#wechat_redirect', // 分享链接
                 imgUrl: 'http://c.shijue.me/picurl/avatar/15f8dbf6d417aa75823d32e6906c14051_1446718864905---jpg.jpg?code=3669826d4fc03487', // 分享图标
                 //type: 'pic', // 分享类型,music、video或link，不填默认为link
                 dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                 success: function () {
                 // 用户确认分享后执行的回调函数
                 },
                 cancel: function () {
                 // 用户取消分享后执行的回调函数
                 }
                 }*/
                var sOptions = arguments.callee.so;
                var tdh = sOptions.title;
                if (sOptions.title && sOptions.desc) {
                    tdh = sOptions.title+'\n'+sOptions.desc;
                }
                wx.onMenuShareTimeline(sjApp.applyIf({
                    title : tdh
                },sOptions));//朋友圈
                wx.onMenuShareQQ(sOptions);//qq
                wx.onMenuShareWeibo(sOptions);//腾讯微博
                wx.onMenuShareQZone(sOptions);//QQ空间
                wx.onMenuShareAppMessage(sOptions);//发送给朋友
                // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
            }
            this.wxReady.so = so;
            //alert(location.href.split('#')[0]);
            var ctl = {
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: wxinfo.appid, // 必填，公众号的唯一标识
                timestamp: wxinfo.timestamp, // 必填，生成签名的时间戳
                nonceStr: wxinfo.nonceStr, // 必填，生成签名的随机串
                signature: wxinfo.signature,// 必填，签名，见附录1
                jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareWeibo','onMenuShareQZone'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            }
            wx.config(ctl);
            //console.error(ctl);
            wx.ready(this.wxReady);
        }
    },
    getBroswer: function() {
        var explorer = navigator.userAgent;
        var cur_broswer = '';
        //ie
        if (explorer.indexOf("MSIE") >= 0) {
            cur_broswer = ("ie");
        }
        //firefox
        else if (explorer.indexOf("Firefox") >= 0) {
            cur_broswer = ("Firefox");
        }
        //Chrome
        else if (explorer.indexOf("Chrome") >= 0) {
            cur_broswer = ("Chrome");
        }
        //Opera
        else if (explorer.indexOf("Opera") >= 0) {
            cur_broswer = ("Opera");
        }
        //Safari
        else if (explorer.indexOf("Safari") >= 0) {
            cur_broswer = ("Safari");
        }
        //Netscape
        else if (explorer.indexOf("Netscape") >= 0) {
            cur_broswer = ('Netscape');
        }
        return cur_broswer;
    },
    handleLinkHtml: function(str) {
        //需要处理一下<>  &lt;  避免script也作为html输出
        str = str.replace(/</g, '&lt;');

        var strVal = str;
        //((\w|=|\?|\.|\/|&|-)+)
        var reg = /(http:\/\/|https:\/\/)?(((\w|-)+\.(\w|-)+)+((\w|=|\?|\.|\/|&|-)*))/g;

        var html = strVal.replace(reg, function(str, $1,$2){
            var linkUrl = str;
            if(!(~str.indexOf('http') || ~str.indexOf('https'))) {
                linkUrl = 'http://' + str;
            }
            return "<a href='" + linkUrl + "' target='_blank' style='text-decoration: underline;color:#0000EE;'>" + str + "</a>";
        }).replace(/\n/g, "<br />");

        return html;
    },
    bytesToSize: function (bytes) {
        if(typeof(bytes) == 'string'){
            bytes = parseInt(bytes);
        }
        if (!bytes || bytes === 0) return '0 B';
        var k = 1024;
        var sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        var i = Math.floor(Math.log(bytes) / Math.log(k));
        //return (bytes / Math.pow(k, i)) + ' ' + sizes[i];
        //toPrecision(3) 后面保留一位小数，如1.0GB
        return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
    },
    initShare: function(qzoneEl,weiboEl,weixin) {
        var me = this;

        if (!qzoneEl) {
            qzoneEl = $('.qzone');
        }
        if (!weiboEl) {
            weiboEl = $('.weibo');
        }
        if (!weixin) {
            weixin = $('.weixin');
        }
        qzoneEl.click(function() {
            /* Begin:Added by liuxiaoxiao 20150612 */
            // 公共参数
            var linkObject = $(this);
            var paramUrl = '';
            var paramTitle = '';
            var paramSummary = '视觉中国摄影社区500px.me';//'500px摄影社区';
            var paramURl = linkObject.data('href');
            var shareParamsStr = ''
            /* Begin:Added by liuxiaoxiao for 作品集分享 20150623 */
            // 如有其它页面的分享，再扩展参数
            var pageFrom = linkObject.data('from');
            // 作品集分享
            if ('user-detail' == pageFrom) {
                paramUrl = 'http://' + location.host+ '/community/user-details/'+ linkObject.data('user-id');
                paramTitle = '【美图分享】' + linkObject.data('user') + '的作品集';
                shareParamsStr = ['?url=', encodeURIComponent(paramUrl),
                    '&showcount=1', '&title=', encodeURI(paramTitle),
                    '&summary=', paramSummary].join('');
            } else if('set-detail' == pageFrom){
                //影集详情页分享
                var setId = linkObject.data('set-id');
                paramUrl = 'http://' + location.host+ '/community/set/'+ setId+ '/details?swipe=1';

                paramTitle = '【美图分享】' + linkObject.data('user') + '的影集';
                //paramUrl = location.href.replace('/community','/signoff');
                shareParamsStr = ['?url=', encodeURIComponent(paramUrl),
                    '&showcount=1', '&title=', encodeURI(paramTitle),
                    '&summary=', paramSummary].join('');

            }else if('user-group' == pageFrom){
                //群组页分享
                paramUrl = location.href;
                paramTitle = '【群组分享】' + linkObject.data('user') + '的群组' + '-- 500px摄影社区';
                shareParamsStr = ['?url=', encodeURIComponent(paramUrl), '&count=1', '&title=', encodeURI(paramTitle),'&summary=', paramSummary].join('');

            }else if('tribe' == pageFrom){
                //部落分享
                targetData = me.props.tribeData;
                paramUrl = location.href;
                paramTitle = targetData.name;
                shareParamsStr = ['?url=', encodeURIComponent(paramUrl), '&count=1', '&title=', encodeURI(paramTitle),'&summary=', paramSummary].join('');
            }
            else {
                paramUrl = linkObject.data('img-refer');
                // 图片分享
                if(!paramUrl){
                    paramUrl = 'http://' + location.host+ '/community/photo-details/'+ linkObject.data('img-id');
                }else{
                    paramUrl = 'http://' + location.host+ paramUrl;
                }
                if(linkObject.data('title') != ''){
                    paramTitle = linkObject.data('user') + "的作品" + "《"
                        + linkObject.data('title') + "》" + '-- 500px摄影社区';
                }else{
                    paramTitle = linkObject.data('user') + "的作品" + '-- 500px摄影社区';
                }
                var paramPics = '';
                if (typeof(cur_imgInfo) != 'undefined' && cur_imgInfo.url) {
                    paramPics = sjApp.getImgUrl(cur_imgInfo,'@200w_200h');
                }
                shareParamsStr = ['?url=', encodeURIComponent(paramUrl),
                    '&showcount=1', '&title=', encodeURI(paramTitle),
                    '&summary=', paramSummary, '&pics=',
                    encodeURIComponent(paramPics)].join('');
            }
            /* End:Added by liuxiaoxiao for 作品集分享 20150623 */
            window.open([paramURl, shareParamsStr].join(''),"QQ空间分享","height=666,width=820");
            /* End:Added by liuxiaoxiao 20150612 */

        })


        /* Begin:Added by liuixaoxiao 20150612 */
        weiboEl.click(function(){
            var linkObject = $(this);
            var paramUrl = '';
            var paramTitle = '';
            var paramURl = linkObject.data('href');
            var pageFrom =  linkObject.data('from');
            var shareParamsStr = ''
            /*Begin:Added by liuxiaoxiao for 作品集分享 20150623*/
            //如有其它页面的分享，再扩展参数
            if('user-detail' == pageFrom){
                //作品集分享
                paramUrl = 'http://' + location.host + '/community/user-details/' + linkObject.data('user-id');
                paramTitle = '快来欣赏 '+ linkObject.data('user') + '的摄影作品集吧' + '-- 500px摄影社区';
                shareParamsStr = ['?url=', encodeURIComponent(paramUrl), '&count=1', '&title=', encodeURI(paramTitle)].join('');
            }else if('set-detail' == pageFrom){
                //影集详情页分享
                var setId = linkObject.data('set-id');
                paramUrl = 'http://' + location.host+ '/community/set/'+ setId+ '/details?swipe=1';

                //paramUrl = location.href.replace('/community','/signoff');
                paramTitle = '【美图分享】' + linkObject.data('user') + '的影集' + '-- 500px摄影社区';
                shareParamsStr = ['?url=', encodeURIComponent(paramUrl), '&count=1', '&title=', encodeURI(paramTitle)].join('');

            }else if('user-group' == pageFrom){
                //群组页分享
                paramUrl = location.href;
                paramTitle = '【群组分享】' + linkObject.data('user') + '的群组' + '-- 500px摄影社区';
                shareParamsStr = ['?url=', encodeURIComponent(paramUrl), '&count=1', '&title=', encodeURI(paramTitle)].join('');

            }else if('tribe' == pageFrom){
                //部落分享
                targetData = me.props.tribeData;

                paramUrl = location.href;
                paramTitle = targetData.name + '-- 视觉中国摄影社区500px.me';
                shareParamsStr = ['?url=', encodeURIComponent(paramUrl), '&count=1', '&title=', encodeURI(paramTitle)].join('');

            }else{
                paramUrl = linkObject.data('img-refer');
                if(!paramUrl){
                    paramUrl = 'http://' + location.host + '/community/photo-details/' + linkObject.data('img-id');
                }else{
                    paramUrl = 'http://' + location.host+ paramUrl;
                }
                //图片分享
                if(linkObject.data('title') != ''){
                    paramTitle = linkObject.data('user') + "的作品" + "《" + linkObject.data('title') + "》" + '-- 500px摄影社区';
                }else{
                    paramTitle = linkObject.data('user') + "的作品" + '-- 500px摄影社区';
                }

                var paramPics = '';
                if (typeof(cur_imgInfo) != 'undefined' && cur_imgInfo.url) {
                    paramPics = sjApp.getImgUrl(cur_imgInfo,'@200w_200h');
                }
                shareParamsStr = ['?url=', encodeURIComponent(paramUrl), '&count=1', '&title=', encodeURI(paramTitle), '&pic=', encodeURIComponent(paramPics)].join('');
            }
            /*End:Added by liuxiaoxiao for 作品集分享 20150623*/
            window.open([paramURl, shareParamsStr].join(''),"微博分享","height=666,width=820");
        });
        weixin.click(function() {
            var linkObject = $(this);
            //创建一个 div
            var wxDiv = $('<div id="btn-dialogBox"></div>');
            $(document.body).append(wxDiv);

            var dialogEl = $('#btn-dialogBox');
            dialogEl.dialogBox({
                width : 350,
                height : 350,
                hasClose : true,
                hasMask : true,
                hasBtn : false,
                //confirmValue : '确定',
                //cancelValue : '取消',
                title : '分享到微信',
                content : '<div id="weixin_modal_body"></div>',
                hasFooter : true,
                callback : function () {
                    var paramUrl = location.href;
                    var setId = linkObject.data('set-id');
                    if (setId) {
                        paramUrl = 'http://' + location.host+ '/community/set/'+ setId+ '/details?swipe=1';
                    }
                    //paramUrl = paramUrl.replace('/community','/signoff');
                    $('#weixin_modal_body').qrcode(paramUrl);
                    $('.dialog-foot').text('打开微信，点击底部的“发现”，使用 “扫一扫” 即可将网页分享到我的朋友圈。');
                }
            });
        });
    },
    getUserDetailLink: function (userinfo) {
        var userDetailStr = '' //'/community/user-details/' + userinfo.id;
        if(userinfo.userName) {
            userDetailStr = '/' + userinfo.userName;
        }else {
            userDetailStr = '/community/user-details/' + userinfo.id;
        }
        return userDetailStr;
    },
    /**
     *
     * @param tribeInfo
     * @param isCommon 是否是取普通作品列表的链接
     * @returns {string}
     */
    getTribeDetailLink: function (tribeInfo, isCommon) {
        var tribeDetailLink = '';// /page/tribe/detail?tribeId=045eec356b604452be4e8ace05165454
        if(tribeInfo.alias) {
            tribeDetailLink = '/tribe/' + tribeInfo.alias;
            if((typeof isCommon != 'undefined') && isCommon) {
                tribeDetailLink = tribeDetailLink + '?pagev=works&order=createdTime';
            }
        }else {
            tribeDetailLink = '/page/tribe/detail?tribeId=' + tribeInfo.id;
            if((typeof isCommon != 'undefined') && isCommon) {
                tribeDetailLink = tribeDetailLink + '&pagev=works&order=createdTime';
            }
        }
        return tribeDetailLink;
    },
    validLink: function (linkStr) {
        var reg = /(http:\/\/|https:\/\/)(((\w|-)+\.(\w|-)+)+((\w|=|\?|\.|\/|&|-)*))/g
        return reg.test(linkStr);
    },
    getTribeVImgSrc: function (item) {
        var vImgSrc = '';
        if(!!item.authentication) {
            switch(item.authentication.toLowerCase()) {
                case 'not_authentication': {
                    break;
                }
                case 'official': {
                    vImgSrc = lyby.cdn + '/images/tribe/v_blue.svg';
                    break;
                }
                case 'red': {
                    vImgSrc = lyby.cdn + '/images/tribe/v_red.svg';
                    break;
                }
                case 'green': {
                    vImgSrc = lyby.cdn + '/images/tribe/v_green.svg';
                    break;
                }
                case 'blue': {
                    vImgSrc = lyby.cdn + '/images/tribe/v_blue.svg';
                    break;
                }
                case 'black': {
                    vImgSrc = lyby.cdn + '/images/tribe/v_darkgrey.svg';
                    break;
                }
            }
        }
        return vImgSrc;
    },
    getTribeVImgTitle: function (item) {
        var vImgSrc = '';
        if(!!item.authentication) {
            switch(item.authentication.toLowerCase()) {
                case 'not_authentication': {
                    break;
                }
                case 'official': {
                    vImgSrc = '500px官方部落';
                    break;
                }
                case 'red': {
                    vImgSrc = '500px联合运营部落';
                    break;
                }
                case 'green': {
                    vImgSrc = '500px认证部落';
                    break;
                }
                case 'blue': {
                    vImgSrc = '500px官方部落';
                    break;
                }
                case 'black': {
                    vImgSrc = '';
                    break;
                }
            }
        }
        return vImgSrc;
    },
    get4BytesCharacter:function(str){
        var str = str || "";
        var result = [];

        for (let c of str) {
            if (c.codePointAt(0) > 0xFFFF) {
                result.push(c);
            }
        }
        return result;
    },
    transDate: function (curTime) {
        var date = curTime;
        var tt = new Date(parseInt(date));
        var days = parseInt((new Date().getTime() - date) / 86400000);

        // console.log('new Date().getTime() ', new Date().getTime());
        // console.log('date: ', date);
        // console.log('(new Date().getTime() - date)', (new Date().getTime() - date));

        var today = new Date().getDate();
        var year = tt.getFullYear();
        var mouth = tt.getMonth() + 1;
        var day = tt.getDate();
        var time = tt.getHours() < 10 ? "0" + tt.getHours() : tt.getHours();
        var min = tt.getMinutes() < 10 ? "0" + tt.getMinutes() : tt.getMinutes();
        var result, offset;
        offset = Math.abs(today - day);

        // console.log('days', days);
        // console.log('offset', offset);

        if (days < 4&&offset<3) {
            if (offset === 0) {
                result = "今天 " + time + ":" + min;
            } else if (offset === 1) {
                result = "昨天 " + time + ":" + min;
            } else if (offset === 2) {
                result = "前天 " + time + ":" + min;
            }
        } else {
            result = year + "-" + mouth + "-" + day + " " + time + ":" + min;
        }

        return result;
    },
    /**
     * 根据图片url获取 指定大小
     * @param url
     * @param p
     * @returns {string}
     */
    getPImgUrlByUrl: function (url = '', p = 'p6') {
        var res = '';
        if (url) {
            if(url.split('!').length > 1) {
                res = url.split('!')[0] + '!' + p;
            }else {
                if(~p.indexOf('!')) {
                    res = url + p;
                }else {
                    res = url + '!' + p;
                }

            }
        }
        return res;
    },
    arrayContains: function (array, value) {
        return (Array.prototype.includes ? array.includes(value) : array.some(el => el === value));
    },
    is32Bit: function (c) {
        return c.codePointAt(0) > 0xFFFF;
    },
    /**
     * 随机生成UUID
     * @param len 生成uuid的长度
     * @param radix 基数 10进制还是16进制或者...
     * @returns {string}
     */
    uuid: function (len, radix) {
        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
        var uuid = [], i;
        radix = radix || chars.length;

        if (len) {
            // Compact form
            for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
        } else {
            // rfc4122, version 4 form
            var r;

            // rfc4122 requires these characters
            uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
            uuid[14] = '4';

            // Fill in random data.  At i==19 set the high bits of clock sequence as
            // per rfc4122, sec. 4.1.5
            for (i = 0; i < 36; i++) {
                if (!uuid[i]) {
                    r = 0 | Math.random()*16;
                    uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                }
            }
        }

        return uuid.join('');
    }

};
// if (typeof($) != 'undefined') {
//     if (lyby.getOS) {
//         $('html').addClass(lyby.getOS());
//     }
// }
//module.exports = lyby;
export default lyby;
/*eslint-enable */