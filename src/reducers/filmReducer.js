import { 
  GET_ALL_MOVIES
} from '../constants';

const initialState = {
	filmList: {
    data: [],
    status_code: 0,
    currentPage: 0,
  },
  isFetch: false
}

const filmReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${GET_ALL_MOVIES}_PENDING`: {
      return {
        ...state, filmList: initialState.filmList, isFetch: true
      }
    }
    case GET_ALL_MOVIES: {
      const { results, page } = action.payload.data;
      return {
        ...state,
          filmList: {
            ...state.filmList, 
              data: results,
              status_code: action.payload.status,
              currentPage: page
          },
          isFetch: false
      }
    }
    default: return state;  
  }
}

export default filmReducer;
