import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import App from '../../components/test';
import registerServiceWorker from '../../registerServiceWorker';


ReactDOM.render(<App />, document.getElementById('root'));

console.log(888);

// import('../../components/async/async-js').then(function (a) {
//     console.log(666);
//     console.log(777);
//     console.log(a);
// })

registerServiceWorker();
