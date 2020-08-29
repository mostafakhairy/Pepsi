import axios from 'axios';
import { apiUrl } from '../config.json';
import translation from './../assets/localization/language';

axios.defaults.baseURL = apiUrl;

if (localStorage.token) {
  axios.defaults.headers.common['authorization'] = 'bearer ' + localStorage.token;
}

axios.interceptors.response.use(
  (response: any) => {
    return response;
  },
  (error) => {
    const expectedError =
      error.response && error.response.status >= 400 && error.response.status < 500;
    if (!expectedError) {
      //LOG EXCEPTION
      //TOASTER
      return Promise.reject(translation.unExpectedError);
    }
    if (error.response.status === 401) {
      if (window.location.pathname !== '/login') {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
      return Promise.reject(translation['wrongAuth']);
    }
    if (error.response.status === 429) return Promise.reject(translation['tryAgainLater']);
    return Promise.reject(error.response.data);
  }
);

function setJwt(jwt: string) {
  axios.defaults.headers.common['authorization'] = jwt;
}
function removeJwt() {
  axios.defaults.headers.common['authorization'] = null;
}
export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  patch: axios.patch,
  setJwt,
  removeJwt,
};
