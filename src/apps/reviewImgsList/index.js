import React from 'react';
import './index.less';


import Layout from '../../components/Layout';
import MainContent from './ReviewItem';

class IndexContainer extends React.Component {
    constructor(props) {
        super();
    }

    render() {
        const { match } = this.props;
        return (<Layout {...this.props}><MainContent {...this.props}/></Layout>);
    }

    componentDidMount() {

    }

}

export default IndexContainer;



//registerServiceWorker();
