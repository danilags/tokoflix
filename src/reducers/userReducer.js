import { 
  FETCH_CURRENT_USER
} from '../constants';

const initialState = {
  currentUser: null,
  isFetch: false
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${FETCH_CURRENT_USER}_PENDING`: {
      return {
        ...state, currentUser: null, isFetch: true
      }
    }
    case FETCH_CURRENT_USER: {
      return {
        ...state,
          currentUser: action.payload,
          isFetch: false
      }
    }
    default: return state;  
  }
}

export default userReducer;
