import { API_CALL } from '../utils';

const secretKey = ENV['REACT_APP_SECRET_CODE'];

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

export const getApiData = ({ url, type }) => async dispatch => {
  
  dispatch(onPending(type));
  
  try {
    const option = {
      method: 'GET',
      url: `${url}&api_key=${secretKey}`
    };
    
    const res = await API_CALL(option);
    
    return dispatch(onSuccess(type, res))
  
  } catch (error) {
    const errMsg = {
      status_code: 404,
      message: 'Not found'
    };
    onSuccess(type, errMsg)
  }
}

