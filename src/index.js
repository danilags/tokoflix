import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
// import './index.css';
import AppRoute from './containers';
import store from './store'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
<Provider store={store}>
  <AppRoute />
</Provider>, document.getElementById('root'));
registerServiceWorker();
