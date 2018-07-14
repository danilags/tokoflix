import { 
  GET_ALL_MOVIES
} from '../constants';

const initialState = {
	filmList: {
    data: [],
    status_code: 0,
    currentPage: 0,
    nextUrl: false
  },
  isFetch: false
}

const filmReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${GET_ALL_MOVIES}_PENDING`: {
      return {
        ...state, filmList: { ...state.filmList, status_code: 0 }, isFetch: true
      }
    }
    case GET_ALL_MOVIES: {
      const { results, page } = action.payload.data;
      return {
        ...state,
          filmList: {
            ...state.filmList, 
              data: [ ...state.filmList.data, ...results ],
              status_code: action.payload.status,
              currentPage: page,
              nextUrl: results.length ? true : false
          },
          isFetch: false
      }
    }
    default: return state;  
  }
}

export default filmReducer;
