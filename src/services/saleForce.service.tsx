import http from './base.service';
import { SaleForceResponse } from "../models/interfaces/SaleForceAuthTokenResponse";

function getBaseUrl() {
  let lang = localStorage.lang === 'ar' ? 'ar-SA' : 'en-US';
  return `api/${lang}/SaleForce/`;
}


const getToken = async (): Promise<SaleForceResponse> => {
  const response = await http.get<SaleForceResponse>(`${getBaseUrl()}Auth-token`);
  const data = response.data;
  return Promise.resolve<SaleForceResponse>(data);
};

export default {
    getToken
};
