import 'bootstrap/dist/css/bootstrap.min.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from 'store';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';


const rootEl = document.getElementById('root') as HTMLElement;

ReactDOM.render(
	<Provider store={store}>
	  <App/>
	</Provider>,
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
