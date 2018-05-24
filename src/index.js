import React from 'react';
import ReactDOM from 'react-dom';
import './components/common.less'
import './index.css';
//import Routes from './routes';
import registerServiceWorker from './registerServiceWorker';


import App from './App'

ReactDOM.render(<App />, document.getElementById('root'));

// $('div').addClass('new')
//TODO: 暂时停用serviceWorker 缓存的太强了，需要找下原因
registerServiceWorker();
if(module.hot) {
    module.hot.accept();
}
