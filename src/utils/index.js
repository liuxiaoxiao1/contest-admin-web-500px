// // Utils

//require('babel-register')
//require('babel-polyfill')


import fs from 'fs';
import path from 'path';
import util from 'util';
import moment from 'moment';
 

const _isBrowserEnv = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

// 数字补位
function format(value) {
	return (value + '').length > 1 ? value : ('0' + value)
}

export default {
	// 是否浏览器环境
	isBrowserEnv: _isBrowserEnv,


    ip: function(req){
        return req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    },

    // 自己记录可以输出显示的日志，排序默认从新到旧排序
    console: function(txt){
        if(!global.info){
            global.info = {
                index:0,
                list:[]
            }
        }

        if( global.info.index < 2000 ){
            global.info.index++;
            var item = {
                id: global.info.index,
                timestamp: Date.now(),
                time: this.hms(),
                txt: txt
            };
            global.info.list.unshift(item);//向数组顶部插入一条记录
        }else{
            global.info.index++;
            var item = {
                id: global.info.index,
                timestamp: Date.now(),
                time: this.hms(),
                txt: txt
            };
            global.info.list.unshift(item);
            global.info.list.pop();//删除最后一条记录
        }
    },


    formatDateIgnoreTime: (date) => {
        let year = date.getFullYear()
        let month = date.getMonth() + 1
        let day = date.getDate()

        return year + '/' + format(month) + '/' + format(day) + ''
    },


    formatUrl: (url) =>{
        let reg=/(?:[?&]+)([^&]+)=([^&]+)/g; 
        let data={}; 
        function fn(str, pro, value){ 
            data[decodeURIComponent(pro)]=decodeURIComponent(value); 
        } 
        url.replace(reg,fn); 
        return data; 
    },
    
    //返回当前可视化时间
    moment: (timestamp) => {
        if(timestamp === undefined){
            timestamp = new Date().getTime();
        }else if((''+timestamp).length === 10){
            timestamp = parseInt(timestamp+'000');
        }
        return moment( timestamp ).format('YYYY/MM/DD HH:mm:ss"SSS');
    },

    time:(timestamp) => {
        if(timestamp === undefined){
            timestamp = new Date().getTime();
        }else if((''+timestamp).length === 10){
            timestamp = parseInt(timestamp+'000');
        }
        return moment( timestamp ).format('MM/DD HH:mm:ss');
    },

    // 返回当前可视化时间
    // 单独为Chart表格传递时间
    chartstamp: (timestamp) => {
        if(timestamp === undefined){
            timestamp = new Date().getTime();
        }else if((''+timestamp).length === 10){
            timestamp = parseInt(timestamp+'000');
        }
        return moment(timestamp).format('YYYY,MM,DD,HH,mm,ss');
    },

    formatDatetimeByDot: (timestamp) => {
        if(timestamp === undefined){
            timestamp = new Date().getTime();
        }else if((''+timestamp).length === 10){
            timestamp = parseInt(timestamp+'000');
        }
        return moment(timestamp).format('YYYY.MM.DD HH:mm');

    },


    //返回当前可视化时间
    minmoment: (timestamp) => {
        if(timestamp === undefined){
            timestamp = new Date().getTime();
        }else if((''+timestamp).length === 10){
            timestamp = parseInt(timestamp+'000');
        }
        return moment(timestamp).format('MM/DD HH:mm:ss');
    },

    //返回当前年月日可视化时间
    ymd: (timestamp) => {
        if(timestamp === undefined){
            timestamp = new Date().getTime();
        }else if((''+timestamp).length === 10){
            timestamp = parseInt(timestamp+'000');
        }
        return moment(timestamp).format('YYYY/MM/DD');
    },
    
    //返回当前事分秒可视化时间
    hms: function(timestamp) {
        if (timestamp === undefined) {
            timestamp = new Date().getTime();
        } else if (('' + timestamp).length === 10) {
            timestamp = parseInt(timestamp + '000');
        }

        var t = new Date(timestamp);
        var hour = t.getHours();
        var minute = t.getMinutes();
        var second = t.getSeconds();

        hour = (hour < 10) ? ('0' + hour) : hour;
        minute = (minute < 10) ? ('0' + minute) : minute;
        second = (second < 10) ? ('0' + second) : second;

        return hour+':'+minute+':'+second;
    },


    //返回当前事分秒毫秒可视化时间
    hmss: (timestamp) => {
        if(timestamp === undefined){
            timestamp = new Date().getTime();
        }else if((''+timestamp).length === 10){
            timestamp = parseInt(timestamp+'000');
        }
        return moment(timestamp).format('HH:mm:ss"SSS');
    },

    //timestamp 时间戳
    timestamp: () => {
        return new Date().getTime();
    },

    dump: (obj, deep)=>{
        // console.log( util.inspect(json, false, null, true) );
        var len = typeof deep === 'undefined' ? null : deep;
        return util.inspect(obj, false, len, true);
    },

    json2str: (obj)=>{
        return JSON.stringify(obj);
    },

	readFileThunk: (path) => {
		return new Promise(function (resolve, reject) {
			fs.readFile(path, { 'encoding': 'utf8' }, function (err, data) {
				if(err) 
					return reject(err)

				resolve(data)
			})
		})
	},

    delayPromise:(ms)=>{
        return new Promise((resolve)=>{
            setTimeout(resolve, ms);
        })
    },

    timeoutPromise:(promise, ms)=>{
        let timeout = this.delayPromise(ms).then(()=>{
            throw new Error('http timed out after ' + ms + ' ms');
        }) 
        return Promise.race([promise, timeout]);
    },

	// 是否真实手机号码 
	isMobile:(value)=> {
		return /^(?:(13|14|15|18|17)\d)-?\d{5}(\d{3}|\*{3})$/.test(value)	
	},


    isEmail:(value)=>{
        let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(value);
    },

    // 未经验证
    /*视口的大小，部分移动设备浏览器对innerWidth的兼容性不好，需要
     *document.documentElement.clientWidth或者document.body.clientWidth
     *来兼容（混杂模式下对document.documentElement.clientWidth不支持）。
     *使用方法 ： getViewPort().width;
     */
    getViewPort: () => {
        if(document.compatMode == "BackCompat") {   //浏览器嗅探，混杂模式
            return {
                width: document.body.clientWidth,
                height: document.body.clientHeight
            };
        } else {
            return {
                width: document.documentElement.clientWidth,
                height: document.documentElement.clientHeight
            };
        }
    },

    // 未经验证
    //获得文档的大小（区别与视口）,与上面获取视口大小的方法如出一辙
    getDocumentPort: () => {
        if(document.compatMode == "BackCompat") {
            return {
                width: document.body.scrollWidth,
                height: document.body.scrollHeight
            };
        } else {
            return {
                width: Math.max(document.documentElement.scrollWidth,document.documentElement.clientWidth),
                height: Math.max(document.documentElement.scrollHeight,document.documentElement.clientHeight)
            }
        }
    }




}

