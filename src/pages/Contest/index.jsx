import React from 'react';
import { Route, Switch } from 'react-router-dom'

//import registerServiceWorker from '../../registerServiceWorker';



import Layout from '../../components/Layout';
import ContestBasic from './components/Basic';
import ContestTheme from './components/Theme';
import ContestColumn from './components/Column';
import ContestPrize from './components/PrizeCate';

import './edit.scss'

class IndexContainer extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (<Layout {...this.props}>
            <Switch>
                <Route exact path="/contest" component={ContestBasic} />
                <Route exact path="/contest/theme" component={ContestTheme} />
                <Route exact path="/contest/column" component={ContestColumn} />
                <Route exact path="/contest/prize" component={ContestPrize} />
            </Switch>
            {/*<ContestBasic />*/}
        </Layout>);
    }

    componentDidMount() {
        console.log('500px contest-edit page!');
    }

}

export default IndexContainer;



//registerServiceWorker();
