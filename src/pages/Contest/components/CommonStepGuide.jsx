/**
 * Created by liuxiaoxiao1 on 2018/2/28.
 */
import React from 'react';
import { BackTop, Pagination, Select, Icon} from 'antd';
import styled, { css } from 'styled-components'

import ContestEditStore from '../../../stores/contest-edit-store'
import Util from "../../../utils/web-utils";


import { useStrict } from 'mobx'
import { observer } from 'mobx-react'


import './CommonStepGuide.scss'
import PropTypes from "prop-types";


useStrict(true)


@observer
class CommonStepGuide extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount() {


    }


    static propTypes = {
        curStep: PropTypes.number
    }
    static defaultProps = {
        curStep: 1
    }





    render() {
        let me = this;
        let { showTxt, totalStep } = ContestEditStore.guideStore;
        let { curStep } = this.props;

        const stepArray = new Array(totalStep);
        stepArray.fill(1);

        const styledDiv = styled.div`
            
        `



        return (
            <div className='step-guide-region'>
                <div className="guide-line-region">
                    {/* 原始写死的代码 */}
                    {/*<div className="guide__node node--pass">*/}
                        {/*<Icon type="check" style={{color: '#fff', fontSize: '26px'}}/>*/}
                    {/*</div>*/}
                    {/*<div className="segment-line line--pass">*/}

                    {/*</div>*/}
                    {/*<div className="guide__node node--cur">*/}
                        {/*2*/}
                    {/*</div>*/}
                    {/*<div className="segment-line">*/}

                    {/*</div>*/}
                    {/*<div className="guide__node node--normal">*/}

                    {/*</div>*/}
                    {/*<div className="segment-line">*/}

                    {/*</div>*/}
                    {/*<div className="guide__node node--normal">*/}

                    {/*</div>*/}

                    {/* TODO:  需要找到一个解决方案，实现：文字自动对齐 */}
                    {
                        stepArray.map((item, index) => {

                            let length = stepArray.length;
                            let el = '';
                            if(index < (curStep - 1)) {
                                if(index != (length-1)) {
                                    el = <div className='node-container' key={index}>
                                        <div className="guide__node node--pass">
                                            <Icon type="check" style={{color: '#fff', fontSize: '26px'}}/>
                                        </div>
                                        <div className="segment-line line--pass">
                                        </div>
                                    </div>
                                }else {
                                    el = <div className="guide__node node--pass" key={index}>
                                        <Icon type="check" style={{color: '#fff', fontSize: '26px'}}/>
                                    </div>
                                }
                            }else if(index == (curStep - 1)) {
                                if(index != (length-1)) {
                                    el = <div className='node-container' key={index}>
                                        <div className="guide__node node--cur">
                                            {index+1}
                                        </div>
                                        <div className="segment-line line--normal">
                                        </div>
                                    </div>
                                } else {
                                    el = <div className="guide__node node--cur" key={index}>
                                        {index+1}
                                    </div>
                                }

                            }else {
                                if(index != (length-1)) {
                                    el = <div className='node-container' key={index}>
                                        <div className="guide__node node--normal">

                                        </div>
                                        <div className="segment-line line--normal">
                                        </div>
                                    </div>
                                } else {
                                    el = <div className="guide__node node--normal" key={index}>

                                    </div>
                                }
                            }

                            return el;



                        })

                    }

                    

                </div>
                
                <div className="guide-txt-region">
                    {
                        showTxt.map((item, index)=> {
                            let styleObj = {};
                            if(curStep < 4) {
                                styleObj = {
                                    paddingLeft: 15
                                }
                            }
                            if(index < curStep) {
                                styleObj = {
                                    paddingLeft: -5
                                }
                            }

                            if(curStep == 1) {
                                styleObj.width = 140
                            }else if(curStep == 2) {
                                styleObj.width = 145;
                                if(index < (curStep-1)) {

                                }else {
                                    styleObj.paddingLeft = 20;
                                }
                            }else if(curStep == 3) {
                                styleObj.width = 148;
                                if(index < (curStep-1)) {

                                }else {
                                    styleObj.paddingLeft = 20;
                                }
                            }else if(curStep == 4) {
                                styleObj.width = 150;
                                if(index < (curStep-1)) {

                                }else {
                                    styleObj.paddingLeft = 20;
                                }
                            }

                            return (<div className="txt_item" key={index} style={styleObj}>
                                {item}
                            </div>)
                        })
                    }

                </div>



            </div>


        );
    }
}

export default CommonStepGuide;
