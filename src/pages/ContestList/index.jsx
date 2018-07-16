import React from 'react';

import { useStrict } from 'mobx'
import { observer } from 'mobx-react'

//import registerServiceWorker from '../../registerServiceWorker';



import Layout from '../../components/Layout';
import ContestList from './list';
import ContestStore from '../../stores/contest-store'

useStrict(true)

@observer
class IndexContainer extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (<Layout {...this.props}><ContestList {...this.props}/></Layout>);
    }

    componentDidMount() {
        console.log('500px contest-admin page!');
        ContestStore.setRouteProps(this.props);
    }

}

export default IndexContainer;



//registerServiceWorker();
