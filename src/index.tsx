import 'bootstrap/dist/css/bootstrap.min.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const rootEl = document.getElementById('root') as HTMLElement;

ReactDOM.render(
    <App/>,
    rootEl
);
registerServiceWorker();

if (module.hot) {
    module.hot.accept('./index', () => {
        const NextApp = require('./index').default;
        ReactDOM.render(
            <NextApp/>,
            rootEl
        );
    });
}
