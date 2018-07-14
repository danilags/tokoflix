import axios from 'axios';
import moment from 'moment';

import { API_BASE_URL } from '../constants';

/*
  option should be
  {
    url: 'url',
    method: 'get'/'post'/'put',
    data: {}
  }
*/

const API_CALL = async option => {
  try {
    const API_OPTION = {
      baseURL: API_BASE_URL,
      ...option,
    };

    const res = await axios.request(API_OPTION);
    return Promise.resolve(res);
  } catch ({ response }) {
    throw new Error(response);
  }
};

const converDate = (params) => {
  let date = moment(params, 'YYYY/MM/DD').format('D');
  let month = moment(params, 'YYYY/MM/DD').month();
  let year = moment(params, 'YYYY/MM/DD').format('YYYY');
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return `${date} ${monthNames[month]} ${year}`;
}

export { API_CALL, converDate };
