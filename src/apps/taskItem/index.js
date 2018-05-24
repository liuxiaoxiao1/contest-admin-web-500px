import React from 'react';
import './index.less';

//import registerServiceWorker from '../../registerServiceWorker';



import Layout from '../../components/Layout';
import Home from './ItemSummary';

class IndexContainer extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (<Layout {...this.props}><Home /></Layout>);
    }

    componentDidMount() {

    }

}

export default IndexContainer;



//registerServiceWorker();
