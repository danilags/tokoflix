import { 
  GET_ALL_USERS
} from '../constants';

const initialState = {
	filmList: {
    data: [],
    status_code: 0
  },
  isFetch: false
}

const filmReducer = (state = initialState, action) => {
  switch (action.type) {
    default: return state;  
  }
}

export default filmReducer;
