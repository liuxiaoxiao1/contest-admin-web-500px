/*百度记数 begin*/
if(typeof SJ_UT == 'undefined'){
	SJ_UT = {
		initScrollTop : function(){}
	}
}
$(function () {
	setTimeout(function () {
		var _hmt = _hmt || [];
		(function() {
			var hm = document.createElement("script");
			hm.src = "//hm.baidu.com/hm.js?78ea451fc4ef02358930eaa6448bfcaf";
			var s = document.getElementsByTagName("script")[0];
			s.parentNode.insertBefore(hm, s);
		})();
	},2000)

	//tingyun监控 只添加到测试环境
	// if(location.hostname == 'photo-test-community.shijue.me') {
     //    setTimeout(function () {
     //        (function() {
     //            var hmt = document.createElement("script");
     //            hmt.src = "//cdn.500px.me/lib/tingyun/tingyun.js";
     //            var s = document.getElementsByTagName("script")[0];
     //            s.parentNode.insertBefore(hmt, s);
     //        })();
     //    },2000)
	// }





})
/*百度记数 begin*/
var isNullObj = function(obj){
	for(var i in obj){
		if(obj.hasOwnProperty(i)){
			return false;
		}
	}
	return true;
}
var superclass = function (options) {
	$.extend(this,options);
	this.init();
	if (this.createItems instanceof Function) {
		this.createItems();
	}
	if (this.initEvent instanceof Function) {
		this.initEvent();
	}
}
var sjApp = {
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
	validateUser : function() {
		if (!SJ_UT.id) {
			this.errorMsg({status:0});
			return false;
		}
		return true;
	},
	toArray : function(a, i, j){
		return Array.prototype.slice.call(a, i || 0, j || a.length);
	},
	format : function(format){
		var args = sjApp.toArray(arguments, 1);
		return format.replace(/\{(\d+)\}/g, function(m, i){
			return args[i];
		});
	},
	stringify : function (jsonObj) {
		return encodeURI(JSON.stringify(jsonObj));
	},
	autoHeight : function () {
		var preEl,mH=0,parentHeight=0;
		if (this.length) {
			parentHeight = this.parent().height();
			var _this = this;
			while((preEl=_this.prev()).length){
				if (!preEl.is(':hidden')) {
					mH+=preEl.height();
				}
				_this = preEl;
			}
		}
		return parentHeight - mH;
	},
	getOtherImg : function (cid) {
		var regImg = new RegExp('(?:(\\w+)":true,"){0,1}'+cid+'(?:":true,"(\\w+)){0,1}');
		var curImgJsonStr = this.cookieGet('otherImg');
		if (curImgJsonStr) {
			var rs = curImgJsonStr.match(regImg);
		}
		var s = {};
		if (rs) {
			s.prev = rs[1];
			s.next = rs[2];
		}
		return s;
	},
	/*该方法实现大图片的左右翻页功能,先将前后各10张的图片存到cookie里,在大图片找到该图前后的图片*/
	LR : function(cid) {
		///${action_path}/photo-details/{{link_param}}
		//(?:(\w+)":true,"){0,1}a17e0b9e79a54cea87edd18c8cbf4d9b(?:":true,"(\w+)){0,1}
		//alert(JSON.stringify(allImgIdJson));
		if (cid) {
			var curImgJsonStr = JSON.stringify(allImgIdJson);
			var regImg = new RegExp('(?:(\\w+)":true,"){0,10}'+cid+'(?:":true,"(\\w+)){0,10}');
			var rs = curImgJsonStr.match(regImg);
			if (rs) {
				this.cookieSet('otherImg',rs[0]);
			}
			//var url = this.urlPath+'photo-details/'+cid;
			//location.href = url;
		}
	},
	encodeUnicode : function (str) {
		return escape(str).toLocaleLowerCase().replace(/\%u/gi, '\\u');
	},
	curRecord : {
		size : 0
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
				}else if (sjApp.ismobile) {
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
		return url.replace('.jpg','');
	},
	default_avatar : '/images/default_tx.png',
	user_avatar_error : function () {
		this.attr('src',sjApp.default_avatar);
		this.unbind('error');
	},
	user_avatar : function (obj,urlParm) {
		var avatarUrl = sjApp.default_avatar;
		if (obj && obj.avatar) {
			if (typeof obj.avatar == 'string') {
				obj.avatar = JSON.parse(obj.avatar)
			}
			avatarUrl = obj.avatar['a2']||obj.avatar['a1']||avatarUrl;
			/*if (avatarUrl.indexOf('shijue.me') != -1 && typeof(urlParm) == 'string') {
			 urlParm += '_1o';
			 avatarUrl += urlParm;
			 }*/
		}
		if (this.error instanceof Function) {
			var _this = this;
			_this.error(function () {
				sjApp.user_avatar_error.call(_this);
			});
		}
		return avatarUrl;
	},
	urlPath : function () {
		if (typeof(SJ_UT)!='undefined' && SJ_UT.id) {
			return '/community/';
		}else{
			return '/community/';
		}
	}(),
	filterUrl : function (urlStr) {
		return this.urlPath+urlStr;
	},
	userDetailUrl :function (userid) {
		return this.urlPath+'user-details/'+(userid||SJ_UT.id);
	},
	photoDetailUrl:function (imgId) {
		return this.urlPath+'photo-details/'+imgId;
	},
	errorMsg : function (e) {
		if (typeof(console) == 'object' && console.error instanceof Function) {
			console.error(e.status+'**'+e.statusText+'**'+e.responseText);
		}
		if (e.status == 0 && SJ_UT.config) {
			var curHref = window.location.pathname + window.location.search;
			location.href = SJ_UT.config.loginUrl+curHref;
		}
	},
	apply : function(o, c, defaults) {
		if (defaults) {
			sjApp.apply(o, defaults);
		}
		if (o && c && typeof c == 'object') {
			for (var p in c) {
				o[p] = c[p];
			}
		}
		return o;
	},
	applyIf : function(o, c, defaults){
		if(defaults){
			this.apply(o, defaults);
		}
		if(o && c && typeof c == 'object'){
			for(var p in c){
				if(typeof o[p] == "undefined")o[p] = c[p];
			}
		}
		return o;
	},
	cookieRemove :function (key,path) {
		//$.cookie(key, '', { expires: -1,path: path||"/"});
	},
	cookieSet : function (key,value,path) {
		$.cookie(key,value,{
			path: path||"/"
		});
	},
	cookieGet : function (key,type) {
		var v = $.cookie(key);
		if (type=='json') {
			if (!v) {
				v = {};
			}else{
				v = JSON.parse(v);
			}
		}
		return v;
	},
	cookieSave : function (options) {
		var key = options.index;

		var pageIndex = options.page || $.getUrlParam('page') || 1;
		var pageSize = options.size || $.getUrlParam('size') || 34;
		this.cookieSet(key+'_page',pageIndex,{
			path: "/"
		});
		this.cookieSet(key+'_size',pageSize,{
			path: "/"
		});
	},
	timeJson : {
		less_than_x_minutes : {
			one : "不足 1 分钟以前",
			other : "不足 {{count}} 分钟以前"
		},
		x_minutes : {
			one : "1 分钟前",
			other : "{{count}} 分钟以前"
		},
		about_x_hours : {
			one : "大约 1 小时以前",
			other : "大约 {{count}} 小时以前"
		},
		x_days : {
			one : "1 天前",
			other : "{{count}} 天以前"
		},
		about_x_months : {
			one : "大约 1 个月以前"
		},
		x_months : {
			other : "{{count}} 个月以前"
		},
		about_x_years : {
			one : "大约 1 年以前",
			other : "大约 {{count}} 年以前"
		},
		over_x_years : {
			one : "超过 1 年以前",
			other : "超过 {{count}} 年以前"
		},
		almost_x_years : {
			one : "将近 1 年以前",
			other : "将近 {{count}} 年以前"
		}
	},
	t : function(){
		var rs = arguments[0];
		if (arguments.length>1) {
			rs = arguments[0].replace(/{{\S+}}/g,arguments[1].count);
		}
		return rs;
	},
	time_ago_in_words: function (t) {
		var e,
			i,
			n,
			o,
			r,
			s,
			a,
			l,
			u,
			c;
		// u = Math.round(t.getTime() / 1000),l = Math.round((new Date).getTime() / 1000),s = l - u,
		return s=t/1000,
			n = 60,
			i = 60 * n,
			e = 24 * i,
			o = 30.4 * e,
			r = 12 * o,
			0.9 * n > s ? this.t(this.timeJson.less_than_x_minutes.one)  : 1.5 * n > s ? this.t(this.timeJson.x_minutes.one)  : 59.1 * n >= s ? this.t(this.timeJson.x_minutes.other, {
				count: Math.round(s / n)
			})  : 1.5 * i >= s ? this.t(this.timeJson.about_x_hours.one)  : 23.1 * i >= s ? this.t(this.timeJson.about_x_hours.other, {
				count: Math.round(s / i)
			})  : 1.5 * e > s ? this.t(this.timeJson.x_days.one)  : 29.1 * e > s ? this.t(this.timeJson.x_days.other, {
				count: Math.round(s / e)
			})  : 1.5 * o >= s ? this.t(this.timeJson.about_x_months.one)  : 11.1 * o >= s ? this.t(this.timeJson.x_months.other, {
				count: Math.round(s / o)
			})  : 14.1 * o > s ? this.t(this.timeJson.about_x_years.one)  : 21.1 * o >= s ? this.t(this.timeJson.over_x_years.one)  : (c = Math.floor(s / r), a = (s - c * r) / o, 2 >= a ? this.t(this.timeJson.about_x_years.other, {
				count: c
			})  : 9.5 >= a ? this.t(this.timeJson.over_x_years.other, {
				count: c
			})  : this.t(this.timeJson.almost_x_years.other, {
				count: c + 1
			}))
	},
	showMsg : function(options) {
		var manMsg = $("#msg_window");
		if(manMsg.length){
			manMsg.remove();
		}
		var cls = options.cls;//success error warning
		var tpl = ['<div id="msg_window" style="top: -36px;" class="msg ',cls,'"><div class="inside">',options.html,'</div><a class="close_x" id="msg_close"></a></div>'];
		var msgEl = $(tpl.join(''));
		$(document.body).append(msgEl);
		var closeMsgFn = function () {
			msgEl.css('top',-36);
			setTimeout(function () {
				msgEl.remove();
			},600)
		};
		$('#msg_close').click(closeMsgFn);
		setTimeout(function () {
			msgEl.css('top',0);
		},10);
		setTimeout(function () {
			closeMsgFn();
		},4000);
	},
	resizePic: function(obj, rw,rh) {
		var lRealWidth = 0;
		var lRealHeight = 0;
		var ywidth = 180;
		var yheight = 240;
		lRealWidth = rw;
		lRealHeight = rh;
		var w = parseFloat(lRealWidth - ywidth);
		var h = parseFloat(lRealHeight - yheight);
		if (w > 0 || h > 0) {
			if (w >= h) {
				obj.width = lRealWidth * (ywidth/lRealWidth);
				obj.height = lRealHeight * (ywidth/lRealWidth);
			} else if (w < h) {
				obj.width = lRealWidth * (yheight/lRealHeight);
				obj.height = lRealHeight * (yheight/lRealHeight);
			}
		}
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
	loadCSS : function () {
		var oldScript;
		return function(src, fun) {
			var script = null;
			script = document.createElement("link");
			script.type = "text/css";
			script.rel ="stylesheet";
			script.href = src;
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
	handlebarsUtils : function () {
		Handlebars.registerHelper('filterCommentDate', function(commentDate,options) {
			if (typeof(commentDate) == 'string' && commentDate.indexOf('-')!=-1) {
				commentDate = new Date(commentDate.replace(/-/g,'\/')).getTime();
			}
			return sjApp.time_ago_in_words(new Date().getTime()-parseInt(commentDate));
		});
		Handlebars.registerHelper('filterCommentDateTitle', function(commentDate,options) {
			if (typeof(commentDate) == 'string' && commentDate.indexOf('-')!=-1) {
				return commentDate;
			}
			return new Date(parseInt(commentDate)).pattern("yyyy-MM-dd E hh:mm:ss");
		});
		Handlebars.registerHelper('user_avatar', function(obj,urlParm,options) {
			return sjApp.user_avatar.apply(this,arguments);
		});
		Handlebars.registerHelper('isOwnedByCurrentUser', function(curObj,options) {
			if (!curObj) {
				return;
			}
			if (curObj.id == SJ_UT.id) {
				return options.fn(this);
			}
		});
		Handlebars.registerHelper('isNotOwnedByCurrentUser', function(curObj,options) {
			if (!curObj) {
				return;
			}
			if (curObj.id != SJ_UT.id) {
				return options.fn(this);
			}
		});
		// 最后一个参数作为展示内容，也就是平时的options。不作为逻辑表达式部分
		Handlebars.registerHelper('expression', function() {
			var exps = [];
			try {
				var arg_len = arguments.length;
				var len = arg_len - 1;
				for (var j = 0; j < len; j++) {
					exps.push(arguments[j]);
				}
				var result = eval(exps.join(' '));
				if (result) {
					return arguments[len].fn(this);
				} else {
					return arguments[len].inverse(this);
				}
			} catch (e) {
			}
		});

		Handlebars.registerHelper('getImgUrl', function(curObj,paramstr,options) {
			if (!curObj) {
				return;
			}
			return sjApp.getImgUrl.apply(this,arguments);
		});
	},
	override : function(origclass, overrides) {
		if (overrides) {
			var p = origclass.prototype;
			sjApp.apply(p, overrides);
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
			sjApp.override(sb, overrides);
			sb.extend = function(o) {
				return sjApp.extend(sb, o);
			};
			return sb;
		};
	}(),
	onpopstate : function (e) {
		if (window.history.state == null) {
			//sjApp.load_comments_page.init();
			return;
		}
		if (e.state) {
			//window.history.pushState(e.state, null, e.state.url);
			var page_link = $('a[href="' + e.state.href + '"]');
			if (page_link.length > 0) {
				page_link.click();
			}
		}
	},
	load_comments_page : function() {
		var handler;
		return {
			setHandler : function (fn) {
				handler = fn;
			},
			init : function (e) {
				if (e.type != 'load') {
					var href = $(this).attr('href');
					if (window.history.pushState) {
						var url;
						if (href.match(/^\?/)) {
							url = window.location.pathname+href;
						}else{
							url = href;
						}
						/* if (page == 1) {
						 url = window.location.pathname;
						 } else {
						 url = window.location.pathname + '?page=' + page;
						 }*/
						if ((window.location.pathname + window.location.search) != url) {
							//window.onpopstate = null;
							window.history.pushState({href: href}, url , url);
							//window.onpopstate = sjApp.onpopstate;
						}
					}
					if (!href) {
						href = window.location.pathname + window.location.search;
					}
					if (handler instanceof Function) {
						handler(href);
					}
					if (e) {
						e.preventDefault();
					}
				}else{
					var href = window.location.pathname + window.location.search;
					window.history.replaceState({href: href}, href , href);
					if (handler instanceof Function) {
						handler(href);
					}
				}
				return false;
			}
		}
	}(),
	//size大小字节
	formatFileSize: function (size) {
		if(!size) {
			return '';
		}
		var filesize = '';
		if (size / 1024 / 1024 > 1) {
			filesize = Math.round(size / 1024 / 1024 * 100) / 100 + 'MB';
		}
		else if (size / 1024 > 1) {
			filesize = Math.round(size / 1024 * 100) / 100 + 'KB';
		}
		else {
			filesize = size + 'B';
		}
		return filesize
	}
};
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
(function () {
	var e = $(document.body);
	var PhotoCopyrightTooltip = function(e) {
		function t() {
			sjApp.applyIf.apply(this,arguments);
			return this;
		}
		return t.prototype.id = "photo_copyright_tooltip", t.prototype.template = "photo_copyright_tooltip", t.prototype.className = "photo-copyright-tooltip", t.prototype.events = {
			"contextmenu *" : function(e) {
				return e.preventDefault()
			}
		}, t.showTooltip = function(e, t) {
			var o, r, i;
			return PhotoCopyrightTooltip.removeExistingTooltip(), o = new PhotoCopyrightTooltip(
				{
					model : e,
					event : t
				}), o.render(), o.$el.css({
				left : null != (r = t.pageX) ? r : t.clientX
				+ document.scrollLeft,
				top : null != (i = t.pageY) ? i : t.clientY
				+ document.scrollTop
			}), $("body").append(o.$el),o.onRender()
		}, t.removeExistingTooltip = function() {
			return $("#" + t.prototype.id).remove()
		},t.prototype.render = function () {
			this.$el = $('<div id="'+this.id+'" class="'+this.className+'"><span> &copy; <span class="author">版权保护</span></span></div>');
		},t.prototype.onRender = function() {
			var e = this;
			return setTimeout(function() {
				return e._teardown()
			}, 1800)
		}, t.prototype._teardown = function() {
			var e = this;
			return this.$el.fadeOut("fast", function() {
				return e.$el.remove()
			})
		}, t
	}();
	e.delegate(".copyright-contextmenu,.link_wrap,.copyright_items *", "contextmenu", function (e) {
		PhotoCopyrightTooltip.showTooltip($(this),e);
		e.preventDefault();
		return false;
	})
	$.getUrlParam = function (name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return window.unescape(r[2]);
		return '';
	};
//	|iPad
	var ismobile = navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/iPhone|iPod/i) ? !0 : !1;
	$.extend(sjApp, {
		ismobile: ismobile,
		initBodyClass: function () {
			if (ismobile) {
				$(document.body).addClass('smartphone');
			}
		}()
	});
//    function handleClass(){
//    	var winWidth = $(window).width();
//    	if(winWidth < 600){
//    		$(document.body).addClass("smartphone");
//    	}else {
//    		$(document.body).addClass("smartphone");
//    	}
//    }
//    
//    	handleClass();
//    	$(window).resize(handleClass);    	
//        
})(jQuery);