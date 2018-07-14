import { API_CALL } from '../utils';

import { GET_ALL_MOVIES, GET_MOVIE_DETAILS } from '../constants';

const secretKey = process.env.REACT_APP_SECRET_CODE;

const onSuccess = (type, data) => dispatch => {
  const res = dispatch({
    type,
    payload: data
  })
  return res;
}

const onPending = (type) => dispatch => {
  dispatch({
    type: `${type}_PENDING`,
    payload: true
  });
  return true;
}

export const getApiData = ({ page }) => async dispatch => {
  
  dispatch(onPending(GET_ALL_MOVIES));
  
  try {
    const option = {
      method: 'GET',
      url: `3/movie/popular?api_key=${secretKey}&language=en-US&page=${page}`
    };
    
    const res = await API_CALL(option);
    
    dispatch(onSuccess(GET_ALL_MOVIES, res))
  
  } catch (error) {
    const errMsg = {
      status_code: 404,
      message: 'Not found'
    };
    onSuccess(errMsg)
  }
}

export const getMovieDetails = (id) => async dispatch => {
  console.log('id movie', id);
  dispatch(onPending(GET_MOVIE_DETAILS));

  try {
    const option = {
      method: 'GET',
      url: `3/movie/${id}?api_key=${secretKey}&language=en-US`
    };

    const res = await API_CALL(option);
    
    return dispatch(onSuccess(GET_MOVIE_DETAILS, res));
  
  } catch (error) {
    const errMsg = {
      status_code: 404,
      message: 'Not found'
    };
    onSuccess(errMsg)
  }
}