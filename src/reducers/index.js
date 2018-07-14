import { combineReducers } from 'redux';

import filmReducer from './filmReducer';
import userReducer from './userReducer';


const rootReducer = combineReducers({
	filmReducer,
	userReducer
});

export default rootReducer;
