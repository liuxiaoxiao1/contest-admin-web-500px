import React from 'react';

import './NotFound.less';
import Layout from '../../components/Layout/LayoutWithoutHeader';
import NotFound from '../../components/NotFound';



class IndexContainer extends React.Component {
    constructor(props) {
        super(props);
        console.log(' wa  login props', this.props);
    }

    componentDidMount() {
        console.log(' wa  login props', this.props);
    }

    render() {
        return (<Layout>

                <NotFound />

        </Layout>);
    }

    componentDidMount() {

    }

}

export default IndexContainer;



//registerServiceWorker();
