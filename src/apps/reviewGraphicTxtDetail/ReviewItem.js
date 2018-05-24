/**
 * Created by liuxiaoxiao1 on 2018/2/28.
 */
import React from 'react';
import './index.less';

import ReviewGraphicTxt from '../../components/ReviewGraphicTxtDetail';


//TODO: 这里要取一下任务详情，判断任务类型  加载不同的业务组件， 或者在路由里区分一下，这也就不需要做判断了




class Container extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        const { match } = this.props;
        return (
            <div>
                <ReviewGraphicTxt {...{
                    match: match
                }}/>
            </div>
        );
    }
}

export default ReviewGraphicTxt;
