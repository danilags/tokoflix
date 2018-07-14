import { API_CALL, convertPrice } from '../utils';

import { 
  REQUEST_TOKEN, 
  LOGIN_GUEST, 
  FETCH_CURRENT_USER,
  USER_BUY_MOVIE
} from '../constants';


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

export const fetchCurrentUser = () => async dispatch => {
  try {
    const name = localStorage.getItem('name');
    const userBalance = localStorage.getItem('user_balance');
    const token = localStorage.getItem(REQUEST_TOKEN);
    const payloadUser = {
      name,
      userBalance,
      token
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
    const onSetName = await localStorage.setItem('name', name);
    const onSetToken = await localStorage.setItem(REQUEST_TOKEN, guest_session_id);
    const onSetBalance = await localStorage.setItem('user_balance', 100000);
    return dispatch(onSuccess(LOGIN_GUEST, res))
  
  } catch (error) {
    const errMsg = {
      status_code: 404,
      message: 'Not found'
    };
    onSuccess(LOGIN_GUEST, name)
  }
}

export const setRegion = (params) => async dispatch => {
  try {
    const onSet = await localStorage.setItem('region', params);
    window.location.reload();
    return dispatch(onSuccess('SET_REGION', params))
  
  } catch (error) {
    const errMsg = {
      status_code: 404,
      message: 'Not found'
    };
    onSuccess('SET_REGION', params)
  }
}

export const userBuyMovie = (vote) => async dispatch => {
  try {
    const moviePrice = convertPrice(vote);
    const userBalance = localStorage.getItem('user_balance');
    const token = localStorage.getItem(REQUEST_TOKEN);
    if (token) {
      const currentBalance = userBalance - moviePrice;
      const onSetBalance = await localStorage.setItem('user_balance', currentBalance);
    }
    return dispatch(onSuccess(USER_BUY_MOVIE, moviePrice))
  
  } catch (error) {
    const errMsg = {
      status_code: 404,
      message: 'Not found'
    };
    onSuccess(USER_BUY_MOVIE, true)
  }
}
