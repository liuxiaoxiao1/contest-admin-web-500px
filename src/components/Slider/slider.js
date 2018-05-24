import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import assign from 'object-assign'
import lyby from '../../utils/web-utils'

import './slider.less'

//require('jssor-slider/js/jssor.slider.min.js')
require('../../js/lib/different-size-photo-slider.slider/js/jssor.slider-21.1.5.debug.js');



/* eslint-disable */
//原版的格式 请参考nodejs-500项目中的 slider.jsx
var jssor_1_slider = '';
function ScaleSlider() {
//                var refSize = jssor_1_slider.$Elmt.parentNode.clientHeight;
//                if (refSize) {
//                    refSize = Math.min(refSize, $(window).height());
//                    jssor_1_slider.$ScaleHeight(refSize);
    var refSize = jssor_1_slider.$Elmt.parentNode.clientWidth;

    console.log('refSize', refSize)
    return;
    if (refSize) {
        refSize = Math.min(refSize, $(window).width());
        jssor_1_slider.$ScaleWidth(refSize);
    }
    else {
        window.setTimeout(ScaleSlider, 30);
    }
}

class SilderCmp extends React.PureComponent {
    constructor(props) {
        super(props)
    }
    static propTypes = {
        data : PropTypes.array,
        item : PropTypes.object,
        show: PropTypes.bool, //窗口的开 关 状态
    }

    static defaultProps = {
        show: true,
    }

    componentDidMount () {
        var me = this;
        var list = this.props.data;
        if(list.length && this.props.show){
            //TODO: initSlider里面获取 外层容器高度的时候取不到，所以加上了一个延迟操作
            me._initSlider();

        }
    }

    componentDidUpdate() {
        var me = this;
        console.log(222222222);
        //me._initSlider();
    }

    componentWillUnmount () {
        console.log(8989898);


        let jssor_1_slider = this.jssor_1_slider;
        console.log('jssor_1_slider', jssor_1_slider);
        // $(window).unbind("resize", ScaleSlider);
        // jssor_1_slider.$UnlistenAll();
        // TODO: 在关闭窗口的时候，不知道为啥报错了，就先把这个注释掉了, 后面需要解决
        // jssor_1_slider.$Pause();
        // jssor_1_slider.$Destroy();
    }
    render () {
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

                           let urlP2 = lyby.getPImgUrlByUrl(item.url, 'p2');
                           let urlP5 = lyby.getPImgUrlByUrl(item.url, 'p5');
                           let urlP6 = lyby.getPImgUrlByUrl(item.url, 'p6');

                            var avatarUrl = lyby.user_avatar(userObj);
                            return (
                                <div key={index} style={{display : 'none'}}>
                                    <img data-u="image" data-src2={lyby.ismobile ? urlP2 : urlP5}/>
                                    <img data-u="thumb" src={urlP6} />
                                    {/*
                                     <footer className="silder_footer clearfix">
                                     <div className="img_desc" dangerouslySetInnerHTML={{__html: item.description}}></div>
                                     </footer>
                                     */}
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
    }
    _initSlider () {
        var me = this;
        setTimeout(() => {

            var _thisEl = $(ReactDOM.findDOMNode(this))
            var parentEl = _thisEl.parent();

            _thisEl.append([
                '<div data-u="thumbnavigator" class="jssort01" data-autocenter="1">',
                '<div data-u="slides">',
                '<div data-u="prototype" class="p">',
                '<div class="w">',
                '<div data-u="thumbnailtemplate" class="t"></div>',
                '</div>',
                //'<div class="c"></div>',
                '</div>',
                '</div>',
                '</div>',
                // ,
                '<span data-u="arrowleft" class="jssora05l"></span>',
                '<span data-u="arrowright" class="jssora05r"></span>'
                //'<div data-u="navigator" class="jssorb01">',
                //'<div data-u="prototype"></div>',
                //'</div>'
            ].join(''));

            var _widthNum = $(parentEl).width();
            var _heightNum = $(parentEl).height();


            console.log('$(parentEl)', $(parentEl));

            console.log('_widthNum', _widthNum);
            console.log('_heightNum', _heightNum);

            _thisEl.width(_widthNum);
            _thisEl.height(_heightNum);



            _thisEl.find('.sliderImgs').width(_widthNum);
            _thisEl.find('.sliderImgs').height(_heightNum - 115);

            var jssor_1_SlideshowTransitions = [
                {
                    $Duration: 1200,
                    x: 0.3,
                    $Cols: 2,
                    $During: {$Left: [0.3, 0.7]},
                    $ChessMode: {$Column: 3},
                    $Easing: {$Left: $JssorEasing$.$EaseInCubic, $Opacity: $JssorEasing$.$EaseLinear},
                    $Opacity: 2,
                    $Brother: {
                        $Duration: 1200,
                        y: 0.3,
                        $Rows: 2,
                        $During: {$Top: [0.3, 0.7]},
                        $ChessMode: {$Row: 12},
                        $Easing: {$Top: $JssorEasing$.$EaseInCubic, $Opacity: $JssorEasing$.$EaseLinear},
                        $Opacity: 2
                    }
                },{
                    $Duration: 1200,
                    y: 0.3,
                    $Rows: 2,
                    $During: {$Top: [0.3, 0.7]},
                    $ChessMode: {$Row: 12},
                    $Easing: {$Top: $JssorEasing$.$EaseInCubic, $Opacity: $JssorEasing$.$EaseLinear},
                    $Opacity: 2,
                    $Brother: {
                        $Duration: 1200,
                        x: 0.3,
                        $Cols: 2,
                        $During: {$Left: [0.3, 0.7]},
                        $ChessMode: {$Column: 3},
                        $Easing: {$Left: $JssorEasing$.$EaseInCubic, $Opacity: $JssorEasing$.$EaseLinear},
                        $Opacity: 2
                    }
                }]
            var jssor_1_options = {
                //$Loop : 0,
                $LazyLoading : lyby.ismobile ? 1 : 2,//如果是手机前后预加载1张，pc时是2张．
                $PauseOnHover : false,
                $AutoPlay: false,
                $FillMode: 1,
                $SlideshowOptions: {
                    $Class: $JssorSlideshowRunner$,
                    $Transitions: jssor_1_SlideshowTransitions,
                    $TransitionsOrder: 1
                },
                $BulletNavigatorOptions: {
                    $Orientation : lyby.ismobile ? 1 : 2,
                    $Class: $JssorBulletNavigator$
                },
                $ArrowNavigatorOptions: {
                    $Class: $JssorArrowNavigator$
                },
                $ThumbnailNavigatorOptions: {
                    $Class: $JssorThumbnailNavigator$,
                    $Loop : 0,
                    $Cols: parseInt(_widthNum/98),
                    $SpacingX: 5,
                    $SpacingY: 5,
                    $Align: 360
                }
            };
            jssor_1_slider = me.jssor_1_slider =  new $JssorSlider$(ReactDOM.findDOMNode(me.refs.slider), jssor_1_options);
            jssor_1_slider.$On($JssorSlider$.$EVT_SWIPE_END,function(slideIndex, fromIndex){
                // console.log(jssor_1_slider.$CurrentIndex())
                console.log('sliderIndex', slideIndex);
                if(me.props.sliderEvent.SWIPE_END) {
                    console.log(8889898989);
                    me.props.sliderEvent.SWIPE_END(slideIndex);
                }
            });

            //responsive code begin
            //you can remove responsive code if you don't want the slider scales while window resizing
            //$(window).bind("resize", ScaleSlider);

        }, 500)

        //responsive code begin
        //you can remove responsive code if you don't want the slider scales while window resizing
        //$(window).bind("resize", ScaleSlider);
        //ScaleSlider();


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
        // $(window).bind("load", ScaleSlider);
        // $(window).bind("resize", ScaleSlider);
        // $(window).bind("orientationchange", ScaleSlider);
        //responsive code end
    }
};


export default SilderCmp;