import React from 'react';


//import registerServiceWorker from '../../registerServiceWorker';

import PrizeSettingIndex from './components/PrizeSettingIndex'


import Layout from '../../components/Layout';


import './index.scss'

class IndexContainer extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (<Layout {...this.props}>
            <PrizeSettingIndex {...this.props}/>
        </Layout>);
    }

    componentDidMount() {
        console.log('500px contest-present-prize page!');
    }

}

export default IndexContainer;



//registerServiceWorker();
