import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers'
import { logger } from 'redux-logger'

const middlewares = [thunk];

if (process.env.NODE_ENV === `development`) {
  middlewares.push(logger);
}
const createStoreWithMiddleware = compose(
    applyMiddleware(...middlewares),
  )(createStore);

const store = createStoreWithMiddleware(rootReducer);

export default store;
