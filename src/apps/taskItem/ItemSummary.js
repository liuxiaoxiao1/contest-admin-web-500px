/**
 * Created by liuxiaoxiao1 on 2018/2/28.
 */
import React from 'react';
import './index.less';
import Layout from '../../components/Layout';
import ItemSummary from '../../components/ReviewTaskItem/ItemSummary';

class Container extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (<Layout {...this.props}><ItemSummary {...this.props}/></Layout>);
    }
}

export default Container;
