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

const convertPrice = (rating) => {
 if (rating === 1 && rating <= 3) {
    return 3500;
 } else if (rating >= 3 && rating <= 6) {
    return 8250;
 } else if (rating >= 6 && rating <= 8) {
    return 16350;
 } else if (rating >= 8 && rating <= 10) {
    return 21250;
 } 
}

const convertToRupiah = (angka) => {
  var rupiah = '';
  var angkarev = angka.toString().split('').reverse().join('');
  for (var i = 0; i < angkarev.length; i++)
    if (i % 3 === 0)
      rupiah += angkarev.substr(i, 3) + '.';
  return rupiah.split('', rupiah.length - 1).reverse().join('');
}

export { API_CALL, converDate, convertPrice, convertToRupiah };
