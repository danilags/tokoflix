import { API_CALL, convertPrice } from '../utils';

import { 
  REQUEST_TOKEN, 
  LOGIN_GUEST, 
  FETCH_CURRENT_USER,
  USER_BUY_MOVIE,
  USER_LOGOUT
} from '../constants';


const secretKey = process.env.REACT_APP_SECRET_CODE;

const onSuccess = (type, data) => dispatch => {
  const res = dispatch({
    type,
    payload: data
  })
  return res;
}

export const fetchCurrentUser = () => async dispatch => {
  try {
    const name = localStorage.getItem('name');
    const userBalance = localStorage.getItem('user_balance');
    const token = localStorage.getItem(REQUEST_TOKEN);
    const payloadUser = {
      name,
      userBalance,
      token,
    };
    return dispatch(onSuccess(FETCH_CURRENT_USER, payloadUser))
  } catch (error) {
    const errMsg = {
      status_code: 404,
      message: 'Not found'
    };
    return dispatch(onSuccess(FETCH_CURRENT_USER, errMsg))
  }
}

export const userAuth = (name) => async dispatch => {
  try {
    const option = {
      method: 'GET',
      url: `/3/authentication/guest_session/new?api_key=${secretKey}`
    };
    
    const res = await API_CALL(option);
    const { guest_session_id } = res.data;
    await localStorage.setItem('name', name);
    await localStorage.setItem(REQUEST_TOKEN, guest_session_id);
    await localStorage.setItem('user_balance', 100000);
    const payloadUser = {
      ...res,
      name,
      user_balance: await localStorage.getItem('user_balance')
    }
    return dispatch(onSuccess(LOGIN_GUEST, payloadUser))
  
  } catch (error) {
    onSuccess(LOGIN_GUEST, error)
  }
}

export const setRegion = (params) => async dispatch => {
  try {
    await localStorage.setItem('region', params);
    window.location.reload();
    return dispatch(onSuccess('SET_REGION', params))
  
  } catch (error) {
    onSuccess('SET_REGION', error)
  }
}

export const userBuyMovie = ({ id, name, vote_average }) => async dispatch => {
  try {
    const moviePrice = convertPrice(vote_average);
    const userBalance = localStorage.getItem('user_balance');
    const token = localStorage.getItem(REQUEST_TOKEN);
    // await localStorage.setItem('user_movies', []);
    if (token) {
      const currentBalance = userBalance - moviePrice;
      await localStorage.setItem('user_balance', currentBalance);
    }
    return dispatch(onSuccess(USER_BUY_MOVIE, moviePrice))
  
  } catch (error) {
    onSuccess(USER_BUY_MOVIE, error)
  }
}

export const userLogout = () => async dispatch => {
  try {
    const token = localStorage.getItem(REQUEST_TOKEN);
    if (token) {
      await localStorage.removeItem('name');
      await localStorage.removeItem(REQUEST_TOKEN);
      await localStorage.removeItem('user_balance');
      window.location.reload();
    }
    return dispatch(onSuccess(USER_LOGOUT, true))
  
  } catch (error) {
    onSuccess(USER_LOGOUT, error)
  }
}
