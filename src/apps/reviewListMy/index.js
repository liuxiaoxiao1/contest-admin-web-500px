import React from 'react';
import './index.less';
import Layout from '../../components/Layout';
import Home from './ReviewListMy';

class IndexContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<Layout {...this.props}><Home {...this.props}/></Layout>);
    }

    componentDidMount() {
        console.log('500px review page!');
    }

}

export default IndexContainer;



//registerServiceWorker();
