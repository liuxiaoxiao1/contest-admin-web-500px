var React = require('react');
var ReactDOM = require('react-dom');
var classNames = require('classnames');
var lyby = require('../../js/util');
var assign = require('object-assign');
// require('../../lib/jquery.themepunch.revolution/js/jquery.themepunch.plugins.min.js');
// require('../../lib/jquery.themepunch.revolution/js/jquery.themepunch.revolution.min.js');
require('../../lib/different-size-photo-slider.slider/js/jssor.slider-21.1.5.debug.js');

var SilderCmp = React.createClass({
    propTypes: {
        data : React.PropTypes.array
    },
    componentDidMount : function () {
        var list = this.props.data;
        if(list.length){
            this._initSlider();
        }
    },
    componentWillUnmount: function () {
        var jssor_1_slider = this.jssor_1_slider;
        jssor_1_slider.$UnlistenAll();
        jssor_1_slider.$Pause();
        jssor_1_slider.$Destroy();
    },
    render: function () {
        var list = this.props.data;
        if(!list.length){
            return null;
        }
        return (
            <div ref="slider" className="lyby jssorbody">
                {/*<div data-u="loading" className="slider_loading" style2="position: absolute; top: 0px; left: 0px;">
                 <div className="overlay" style2="filter: alpha(opacity=70); opacity: 0.7; position: absolute; display: block; top: 0px; left: 0px; width: 100%; height: 100%;"></div>
                 <div className="loadimg" style2="position:absolute;display:block;background:url('http://500px.me/images/loading.gif') no-repeat center center;top:0px;left:0px;width:100%;height:100%;"></div>
                 </div>*/}
                <div className="lyby sliderImgs" data-u="slides">
                    {
                        list.map(function (item, index) {
                            var style = {
                                width : item.width,
                                height : item.height
                            }
                            var userObj = item.uploaderInfo;

                            var avatarUrl = lyby.user_avatar(userObj);
                            return (
                                <div key={index} style={{display: 'none'}} data-p="225.00">
                                    <div data-u="image" style={{backgroundImage: 'url(' + item.url.p5 + ')',height:'100%'}}>
                                    </div>
                                    {/*<img data-u="image" src={lyby.ismobile ? item.url.p2 : item.url.p5} style={{height : "auto"}}/>*/}
                                </div>
                            )
                        })
                    }
                    {
                        /*<a data-u="add" href="http://www.jssor.com/demos/different-size-photo-slider.slider" style2="display:none">Different Size Photo Sldier</a>*/
                    }
                </div>
            </div>
        )
    },
    _initSlider: function () {
        var _thisEl = $(ReactDOM.findDOMNode(this))
        var parentEl = _thisEl.parent();

        _thisEl.append([
            '<div data-u="navigator" class="jssorb032" data-autocenter="1" data-scale="0.5" data-scale-bottom="0.75">',
            '<div data-u="prototype" class="i" >',
            '<svg viewbox="0 0 16000 16000">',
            '<circle class="b" cx="8000" cy="8000" r="5800"></circle>',
            '</svg>',
            '</div>',
            '</div>'
        ].join(''));

        var _widthNum = $(parentEl).width();
        var _heightNum = $(parentEl).height();

        _thisEl.width(_widthNum);
        _thisEl.height(_heightNum);
        _thisEl.find('.sliderImgs').width(_widthNum);
        _thisEl.find('.sliderImgs').height(_heightNum - 115);

        var jssor_1_SlideoTransitions = [
            [{b:-1,d:1,o:-0.7}],
            [{b:900,d:2000,x:-379,e:{x:7}}],
            [{b:900,d:2000,x:-379,e:{x:7}}],
            [{b:-1,d:1,o:-1,sX:2,sY:2},{b:0,d:900,x:-171,y:-341,o:1,sX:-2,sY:-2,e:{x:3,y:3,sX:3,sY:3}},{b:900,d:1600,x:-283,o:-1,e:{x:16}}]
        ];

        var jssor_1_options = {
            $AutoPlay: 0,
            $SlideDuration: 800,
            $SlideEasing: $Jease$.$OutQuint,
            $Cols: 1,
            $Align: 0,
            $CaptionSliderOptions: {
                $Class: $JssorCaptionSlideo$,
                $Transitions: jssor_1_SlideoTransitions
            },
            $BulletNavigatorOptions: {
                $Class: $JssorBulletNavigator$
            }
        };

        var jssor_1_slider = this.jssor_1_slider =  new $JssorSlider$(ReactDOM.findDOMNode(this.refs.slider), jssor_1_options);
        //responsive code begin
        //you can remove responsive code if you don't want the slider scales while window resizing
        function ScaleSlider() {
//                var refSize = jssor_1_slider.$Elmt.parentNode.clientHeight;
//                if (refSize) {
//                    refSize = Math.min(refSize, $(window).height());
//                    jssor_1_slider.$ScaleHeight(refSize);
            var refSize = jssor_1_slider.$Elmt.parentNode.clientWidth;
            if (refSize) {
                refSize = Math.min(refSize, $(window).width());
                jssor_1_slider.$ScaleWidth(refSize);
            }
            else {
                window.setTimeout(ScaleSlider, 30);
            }
        }
        $(window).bind("resize", ScaleSlider);
        //ScaleSlider();
        var me =this;
        jssor_1_slider.$On($JssorSlider$.$EVT_SWIPE_END,function(slideIndex,fromIndex){
            // console.log(jssor_1_slider.$CurrentIndex())
            if(me.props.sliderEvent.SWIPE_END){
                me.props.sliderEvent.SWIPE_END(slideIndex);
            }
        });
        // jssor_1_slider.$On($JssorSlider$.$EVT_STATE_CHANGE,function(slideIndex,fromIndex){
        //     if(me.props.sliderEvent.SWIPE_START){
        //         me.props.sliderEvent.SWIPE_START(slideIndex);
        //     }
        // });

        //jssor_1_slider.$On($JssorSlider$.$EVT_SLIDESHOW_END,function(slideIndex,fromIndex){
        //    console.log(slideIndex)
        //    if(slideIndex == 5){
        //        // jssor_1_slider.$UnlistenAll();
        //        // jssor_1_slider.$Pause();
        //        // jssor_1_slider.$Destroy();
        //    }
        //});
        // jssor_1_slider.$On($JssorSlider$.$EVT_SLIDESHOW_START,function(slideIndex,fromIndex){
        //     // console.log(slideIndex)
        //     if(slideIndex == 0){
        //         jssor_1_slider.$UnlistenAll();
        //         jssor_1_slider.$Pause();
        //         jssor_1_slider.$Destroy();
        //         me.props.parent._loadData();
        //     }
        // });

        //jssor_1_slider.$On($JssorSlider$.$EVT_LOAD_START,function(slideIndex,fromIndex){
        //    console.log(44444444)
        //});
        // jssor_1_slider.$On($JssorSlider$.$EVT_LOAD_END,function(slideIndex,fromIndex){
        //     console.log(55555555555555)
        // });
        //$(window).bind("load", ScaleSlider);
        //$(window).bind("resize", ScaleSlider);
        //$(window).bind("orientationchange", ScaleSlider);
        //responsive code end
    }
});

module.exports = SilderCmp;