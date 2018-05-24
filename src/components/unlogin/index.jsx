var React = require('react');
var ReactDOM = require('react-dom');
var classNames = require('classnames');
var assign = require('object-assign');
var lyby = require('../../js/util');

var SliderCmp = require('./slider.jsx');


var MainCmp = React.createClass({
    getInitialState: function () {
        return {
        }
    },
    render: function () {
        return (
            <div className="">
                <div className="photo_container">
                    <div className="slider_main">
                        <SliderCmp {...{
                            sliderEvent : {

                            },
                            data : [{
                                "exifInfo":{
                                    "resourceId":"ced6ff62cd0b49648135fecd2f8209de",
                                    "uploadTime":1506061906966
                                },
                                "groupId":"7c4316b662f242779a262b94ca627080",
                                "width":120,
                                "createdTime":1506061907000,
                                "location":0,
                                "updateTime":1506061907000,
                                "id":"ced6ff62cd0b49648135fecd2f8209de",
                                "state":0,
                                "userId":"8aedb879c48f081e5724c17bfe8448561",
                                "isCover":true,
                                "url":{
                                    "p1":"https://c.shijue.me/groupPhoto/8aedb879c48f081e5724c17bfe8448561/55543043da3f4441820f70ef0425234b.jpg!p1",
                                    "p2":"https://c.shijue.me/groupPhoto/8aedb879c48f081e5724c17bfe8448561/55543043da3f4441820f70ef0425234b.jpg!p2",
                                    "baseUrl":"https://c.shijue.me/groupPhoto/8aedb879c48f081e5724c17bfe8448561/55543043da3f4441820f70ef0425234b.jpg",
                                    "p5":"https://c.shijue.me/groupPhoto/8aedb879c48f081e5724c17bfe8448561/55543043da3f4441820f70ef0425234b.jpg!p5",
                                    "p6":"https://c.shijue.me/groupPhoto/8aedb879c48f081e5724c17bfe8448561/55543043da3f4441820f70ef0425234b.jpg!p6",
                                    "id":"ced6ff62cd0b49648135fecd2f8209de"
                                },
                                "height":67
                            },{
                                "exifInfo":{
                                    "resourceId":"9df119a909db48ec8dc62d1cb151b81f",
                                    "aperture":"f/2.2",
                                    "exposureTime":"1/40 sec",
                                    "exposureTimeVcg":"1/40",
                                    "iso":"32",
                                    "dateTimeOriginal":1438601862000,
                                    "model":"iPhone 6 Plus",
                                    "modelVcg":"Apple iPhone 6 Plus",
                                    "uploadTime":1506061906966,
                                    "make":"Apple",
                                    "dateTimeDigitized":1438601862000,
                                    "focalLength":"4.2"
                                },
                                "groupId":"7c4316b662f242779a262b94ca627080",
                                "width":3264,
                                "createdTime":1506061907000,
                                "location":0,
                                "updateTime":1506061906000,
                                "id":"9df119a909db48ec8dc62d1cb151b81f",
                                "state":0,
                                "userId":"8aedb879c48f081e5724c17bfe8448561",
                                "isCover":false,
                                "url":{
                                    "p1":"https://c.shijue.me/groupPhoto/8aedb879c48f081e5724c17bfe8448561/165066c74f9f4fcdb10f8aa09acab1c7.jpg!p1",
                                    "p2":"https://c.shijue.me/groupPhoto/8aedb879c48f081e5724c17bfe8448561/165066c74f9f4fcdb10f8aa09acab1c7.jpg!p2",
                                    "baseUrl":"https://c.shijue.me/groupPhoto/8aedb879c48f081e5724c17bfe8448561/165066c74f9f4fcdb10f8aa09acab1c7.jpg",
                                    "p5":"https://c.shijue.me/groupPhoto/8aedb879c48f081e5724c17bfe8448561/165066c74f9f4fcdb10f8aa09acab1c7.jpg!p5",
                                    "p6":"https://c.shijue.me/groupPhoto/8aedb879c48f081e5724c17bfe8448561/165066c74f9f4fcdb10f8aa09acab1c7.jpg!p6",
                                    "id":"9df119a909db48ec8dc62d1cb151b81f"
                                },
                                "height":2448
                            }],
                        }}/>
                    </div>
                </div>
            </div>
        )
    }
});
module.exports = MainCmp;