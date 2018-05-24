// ajax.js
import assign from 'object-assign'
export const Ajax = {

    /**
	 * get方法
     * @param url
     * @param paramsObj
     * @param callForever 无论是不是200全返回
     */
	get: ( url, paramsObj = {}, callForever = false )=>{
	    return new Promise((resolve, reject)=>{
	    	//注释掉原生方法
			// let request = new XMLHttpRequest(); // 新建XMLHttpRequest对象
			// request.onreadystatechange = function () { // 状态发生变化时，函数被回调
			//     if (request.readyState === 4) { // 成功完成
			//         // 判断响应结果:
			//         if (request.status === 200) {
			//             // 成功，通过responseText拿到响应的文本:
			//             return resolve( JSON.parse(request.responseText));
			//         } else {
			//             // 失败，根据响应码判断失败原因:
			//             return resolve( request.status );
			//         }
			//     } else {
			//         // HTTP请求还在继续...
			//     }
			// }
			//
			// // 发送请求:
			// request.open('GET', url);
			// request.send();

            $.ajax({
                type: "GET",
                url: url,
                data: paramsObj,
                dataType: "json",
                success (data) {
                	//这里可以抽象出来一个公共的过滤方法 来处理
                    resolve(data);

                    // if (data.status == 401) {
                    //
                    // }else {
                    	// resolve(data);
					// }

                },
                error (XMLHttpRequest, textStatus, errorThrown) {
                    // 状态码
                    let status = XMLHttpRequest.status;
                    console.log(XMLHttpRequest.status);
                    // 状态
                    console.log(XMLHttpRequest.readyState);
                    // 错误信息
                    console.log(textStatus);
                    if(callForever) {
                        resolve(XMLHttpRequest.responseJSON)
                    }else {
                        //处理各种状态码
                        if(status == 401) {

                        }

                    }
                    console.log(XMLHttpRequest.responseJSON);
                }
            });
		})
	},

    /**
     * get方法
     * @param url
     * @param paramsObj
     * @param callForever 无论是不是200全返回
     */
    postJson: ( url , paramsObj = {}, callForever = false)=>{
        return new Promise((resolve, reject)=>{
            //注释掉原生方法
            // let request = new XMLHttpRequest(); // 新建XMLHttpRequest对象
            // request.onreadystatechange = function () { // 状态发生变化时，函数被回调
            //     if (request.readyState === 4) { // 成功完成
            //         // 判断响应结果:
            //         if (request.status === 200) {
            //             // 成功，通过responseText拿到响应的文本:
            //             return resolve( JSON.parse(request.responseText));
            //         } else {
            //             // 失败，根据响应码判断失败原因:
            //             return resolve( request.status );
            //         }
            //     } else {
            //         // HTTP请求还在继续...
            //     }
            // }
            //
            // request.open('POST', url);
            // request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
            // request.setRequestHeader("Accept","application/json");
            // request.send(body2Query(params));

            let config = {
                type: "POST",
                url: url,
                data: JSON.stringify(paramsObj),
                contentType: 'application/json',
                //是否序列化参数，默认为true
                dataType: "json",
                success (data) {
                    //这里可以抽象出来一个公共的过滤方法 来处理
                    console.log('444444resData', data);
                    resolve(data);
                    // if (data.status == 401) {
                    //
                    // }else {
                    //     resolve(data);
                    // }
                },
                error (XMLHttpRequest, textStatus, errorThrown) {
                    // 状态码
                    let status = XMLHttpRequest.status;
                    console.log(XMLHttpRequest.status);
                    // 状态
                    console.log(XMLHttpRequest.readyState);
                    // 错误信息
                    console.log(textStatus);
                    if(callForever) {
                        resolve(XMLHttpRequest.responseJSON)
                    }else {
                        //处理各种状态码
                        if(status == 401) {

                        }

                    }
                    console.log(XMLHttpRequest.responseJSON);

                }
            }


            $.ajax(config);
        })
    },

    /**
     * get方法
     * @param url
     * @param paramsObj
     * @param callForever 无论是不是200全返回
     */
	post: ( url , paramsObj = {}, callForever = false, isFileUpload = false)=>{
	    return new Promise((resolve, reject)=>{
            //注释掉原生方法
			// let request = new XMLHttpRequest(); // 新建XMLHttpRequest对象
			// request.onreadystatechange = function () { // 状态发生变化时，函数被回调
			//     if (request.readyState === 4) { // 成功完成
			//         // 判断响应结果:
			//         if (request.status === 200) {
			//             // 成功，通过responseText拿到响应的文本:
			//             return resolve( JSON.parse(request.responseText));
			//         } else {
			//             // 失败，根据响应码判断失败原因:
			//             return resolve( request.status );
			//         }
			//     } else {
			//         // HTTP请求还在继续...
			//     }
			// }
			//
			// request.open('POST', url);
			// request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			// request.setRequestHeader("Accept","application/json");
			// request.send(body2Query(params));

			let config = {
                type: "POST",
                url: url,
                data: paramsObj,
                //是否序列化参数，默认为true
                dataType: "json",
                success (data) {
                    //这里可以抽象出来一个公共的过滤方法 来处理

                    console.log('444444resData', data);
                    resolve(data);

                    // if (data.status == 401) {
                    //
                    // }else {
                    //     resolve(data);
                    // }
                },
                error (XMLHttpRequest, textStatus, errorThrown) {
                    // 状态码
                    let status = XMLHttpRequest.status;
                    console.log(XMLHttpRequest.status);
                    // 状态
                    console.log(XMLHttpRequest.readyState);
                    // 错误信息
                    console.log(textStatus);
                    if(callForever) {
                        resolve(XMLHttpRequest.responseJSON)
                    }else {
                        //处理各种状态码
                        if(status == 401) {

                        }

                    }
                    console.log(XMLHttpRequest.responseJSON);

                }
            }

            if(isFileUpload) {
				config = assign(config, {
					processData: false,
                    contentType: false})
			}

            $.ajax(config);
		})
	},

    /**
     * put方法
     * @param url
     * @param paramsObj
     * @param callForever 无论是不是200全返回
     */
    put: ( url, paramsObj = {}, callForever = false )=>{
        return new Promise((resolve, reject)=>{
            //注释掉原生方法
            // let request = new XMLHttpRequest(); // 新建XMLHttpRequest对象
            // request.onreadystatechange = function () { // 状态发生变化时，函数被回调
            //     if (request.readyState === 4) { // 成功完成
            //         // 判断响应结果:
            //         if (request.status === 200) {
            //             // 成功，通过responseText拿到响应的文本:
            //             return resolve( JSON.parse(request.responseText));
            //         } else {
            //             // 失败，根据响应码判断失败原因:
            //             return resolve( request.status );
            //         }
            //     } else {
            //         // HTTP请求还在继续...
            //     }
            // }
            //
            // // 发送请求:
            // request.open('GET', url);
            // request.send();

            $.ajax({
                type: "PUT",
                url: url,
                data: paramsObj,
                dataType: "json",
                success (data) {
                    //这里可以抽象出来一个公共的过滤方法 来处理
                    resolve(data);

                    // if (data.status == 401) {
                    //
                    // }else {
                    // resolve(data);
                    // }

                },
                error (XMLHttpRequest, textStatus, errorThrown) {
                    // 状态码
                    let status = XMLHttpRequest.status;
                    console.log(XMLHttpRequest.status);
                    // 状态
                    console.log(XMLHttpRequest.readyState);
                    // 错误信息
                    console.log(textStatus);
                    if(callForever) {
                        resolve(XMLHttpRequest.responseJSON)
                    }else {
                        //处理各种状态码
                        if(status == 401) {

                        }

                    }
                    console.log(XMLHttpRequest.responseJSON);
                }
            });
        })
    },

    /**
     * put方法
     * @param url
     * @param paramsObj
     * @param callForever 无论是不是200全返回
     */
    putJson: ( url, paramsObj = {}, callForever = false )=>{
        return new Promise((resolve, reject)=>{
            //注释掉原生方法
            // let request = new XMLHttpRequest(); // 新建XMLHttpRequest对象
            // request.onreadystatechange = function () { // 状态发生变化时，函数被回调
            //     if (request.readyState === 4) { // 成功完成
            //         // 判断响应结果:
            //         if (request.status === 200) {
            //             // 成功，通过responseText拿到响应的文本:
            //             return resolve( JSON.parse(request.responseText));
            //         } else {
            //             // 失败，根据响应码判断失败原因:
            //             return resolve( request.status );
            //         }
            //     } else {
            //         // HTTP请求还在继续...
            //     }
            // }
            //
            // // 发送请求:
            // request.open('GET', url);
            // request.send();

            $.ajax({
                type: "PUT",
                url: url,
                data: JSON.stringify(paramsObj),
                dataType: "json",
                contentType: 'application/json',
                success (data) {
                    //这里可以抽象出来一个公共的过滤方法 来处理
                    resolve(data);

                    // if (data.status == 401) {
                    //
                    // }else {
                    // resolve(data);
                    // }

                },
                error (XMLHttpRequest, textStatus, errorThrown) {
                    // 状态码
                    let status = XMLHttpRequest.status;
                    console.log(XMLHttpRequest.status);
                    // 状态
                    console.log(XMLHttpRequest.readyState);
                    // 错误信息
                    console.log(textStatus);
                    if(callForever) {
                        resolve(XMLHttpRequest.responseJSON)
                    }else {
                        //处理各种状态码
                        if(status == 401) {

                        }

                    }
                    console.log(XMLHttpRequest.responseJSON);
                }
            });
        })
    },


    /**
     * delete 方法
     * @param url
     * @param paramsObj
     * @param callForever 无论是不是200全返回
     */
    delete: ( url , paramsObj = {}, callForever = false)=>{
        return new Promise((resolve, reject)=>{
            //注释掉原生方法
            // let request = new XMLHttpRequest(); // 新建XMLHttpRequest对象
            // request.onreadystatechange = function () { // 状态发生变化时，函数被回调
            //     if (request.readyState === 4) { // 成功完成
            //         // 判断响应结果:
            //         if (request.status === 200) {
            //             // 成功，通过responseText拿到响应的文本:
            //             return resolve( JSON.parse(request.responseText));
            //         } else {
            //             // 失败，根据响应码判断失败原因:
            //             return resolve( request.status );
            //         }
            //     } else {
            //         // HTTP请求还在继续...
            //     }
            // }
            //
            // request.open('POST', url);
            // request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
            // request.setRequestHeader("Accept","application/json");
            // request.send(body2Query(params));

            let config = {
                type: "DELETE",
                url: url,
                data: paramsObj,
                //是否序列化参数，默认为true
                dataType: "json",
                success (data) {
                    //这里可以抽象出来一个公共的过滤方法 来处理
                    console.log('444444resData', data);
                    resolve(data);
                    // if (data.status == 401) {
                    //
                    // }else {
                    //     resolve(data);
                    // }
                },
                error (XMLHttpRequest, textStatus, errorThrown) {
                    // 状态码
                    let status = XMLHttpRequest.status;
                    console.log(XMLHttpRequest.status);
                    // 状态
                    console.log(XMLHttpRequest.readyState);
                    // 错误信息
                    console.log(textStatus);
                    if(callForever) {
                        resolve(XMLHttpRequest.responseJSON)
                    }else {
                        //处理各种状态码
                        if(status == 401) {

                        }
                    }
                    console.log(XMLHttpRequest.responseJSON);
                }
            }


            $.ajax(config);
        })
    }
} 


export function Sleep(ms){
    return new Promise((resolve, reject)=>{
		let sleepTime = 1000;
		if(typeof ms == undefined || parseInt(ms) == NaN ){
			sleepTime = 1200;
		}else{
			sleepTime = parseInt(ms);
		}

        if(!!sleepTime){
            setTimeout(resolve, sleepTime);
        }else{
            resolve();
        }
    });
}



export function body2Query(params){
	let query = [];
	for(let o in params){
		query.push(o + '=' + encodeURIComponent(params[o]));
	}
	return query.join('&');
}


export const Parse = {
	url: function(url){

		var a =  document.createElement('a');
		a.href = url;
		return {
		    source: url,
		    protocol: a.protocol.replace(':',''),
		    host: a.hostname,
		    port: a.port,
		    query: a.search,
		    params: (function(){
		        var ret = {},
		            seg = a.search.replace(/^\?/,'').split('&'),
		            len = seg.length, i = 0, s;
		        for (;i<len;i++) {
		            if (!seg[i]) { continue; }
		            s = seg[i].split('=');
		            ret[s[0]] = s[1];
		        }
		        return ret;
		    })(),
		    file: (a.pathname.match(/\/([^\/?#]+)$/i) || [,''])[1],
		    hash: a.hash.replace('#',''),
		    path: a.pathname.replace(/^([^\/])/,'/$1'),
		    relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [,''])[1],
		    segments: a.pathname.replace(/^\//,'').split('/')
		};

	}
}



