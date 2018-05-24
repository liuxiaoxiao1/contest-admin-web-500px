import React from 'react';
import './index.less';

//import registerServiceWorker from '../../registerServiceWorker';
import Layout from '../../components/Layout';
import MainPage from './ReviewAdmin';

class ReviewAdmin extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (<Layout {...this.props}><MainPage /></Layout>);
    }

    componentDidMount() {
        console.log('500px review page!');
    }

}

export default ReviewAdmin;



//registerServiceWorker();
