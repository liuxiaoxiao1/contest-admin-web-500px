// request.js


import request from 'request';


const maxHttptime = 30000; //接口请求超时时间，  12秒

export const getRequest = (url)=>{

    return new Promise((resolve, reject) => {
        let jsonError = {
            status: 0,
            url: url, //request url
            data: {
                list: []
            } //default return empty object
        };

        // // 用以区分不同的uuid-10位
        // var uuid = Math.random().toString(30).substring(2).substr(5, 20).toUpperCase();

        // 网络请求超时事件句柄-超时取消请求并发送错误数据
        var timeoutHandler = setTimeout(function() {
            jsonError.message = 'Request Timeout @maxHttptime:' + maxHttptime + ' !';
            return resolve(jsonError);
        }, maxHttptime);
        var sendtime = new Date().getTime();

        // 请求大首页轮播广告数据
        request(url, function(error, response, body) {
            clearTimeout(timeoutHandler);
            if (!error) {
                if (response.statusCode == 200) {
                    var json = JSON.parse(body);
                    return resolve(json);
                } else if (response.statusCode == 401) {
                    jsonError.status = 401;
                    jsonError.message = 'api_token 无效，重新登录';
                    return resolve(jsonError);
                } else {
                    return resolve(jsonError);
                }
            } else {
                return resolve(jsonError);
            }
        });
    });

}



export const postRequest = (url, params = {}) => {
    return new Promise((resolve, reject) => {
        // var uuid = Math.random().toString(30).substring(2).substr(5, 20).toUpperCase();
        var jsonError = {
            status: 0,
            url: url, //request url
            data: {
                list: []
            } //default return empty object
        };
        // 网络请求超时事件句柄-超时取消请求并发送错误数据
        var timeoutHandler = setTimeout(function() {
            jsonError.message = 'Request Timeout @maxHttptime:' + maxHttptime + ' !';
            return resolve(jsonError);
        }, maxHttptime);
        var sendtime = new Date().getTime();


        let postParams = {
            url: url,
            method: "POST",
            json: true,
            headers: {
                "Content-Type": "application/json",
            },
            body: params
        }

        request.post(postParams, function(error, response, body) {
            clearTimeout(timeoutHandler);
            if( error || (typeof body == 'undefined') ){
                resolve({status:0, message:'接口错误 或者无返回数据'+ JSON.stringify(error) + '::body::' + body, data:body});
            }else{

                // console.log('postRequest::: \n :: ', body , ' :: \n ');

                if(body.code == 200){
                    return resolve( body );
                }else{
                    return resolve({status:0, message:'接口错误 或者无返回数据'+ JSON.stringify(error) + '::body::' + body, data:body});
                }
            }
        });

        // // params.xxid = uuid;
        // // 请求大首页轮播广告数据
        // request.post({
        //     url: url,
        //     form: params
        // }, function(error, response, body) {
        //     clearTimeout(timeoutHandler);
        //     if (!error) {
        //         if (response.statusCode == 200) {
        //             var json = JSON.parse(body);
        //             return resolve(json);
        //         } else if (response.statusCode == 401) {
        //             jsonError.status = 401;
        //             jsonError.message = 'api_token 无效，重新登录';
        //             return resolve(jsonError);
        //         } else {
        //             return resolve(jsonError);
        //         }
        //     } else {
        //         console.log('Error 请求接口发生错误', common.hmss(), url, ' Error Info: ', error);
        //         return resolve(jsonError);
        //     }
        // });
    });
}

