import http from './base.service';
import IBurnResponse, { IDeal } from './../models/interfaces/IBurnResponse';
import { UserHistory } from '../models/interfaces/IUserHistory';
import { IBurnDeals } from './../models/interfaces/IBurnDeals';
import CouponDetails from './../models/interfaces/CouponDetails';

function getBaseUrl() {
  let lang = localStorage.lang === 'ar' ? 'ar-SA' : 'en-US';
  return `api/${lang}/Coupons/`;
}
function storeNewToken(token: any) {
  http.setJwt('bearer ' + token);
  localStorage.token = token;
}

const burnCoupon = async (couponNumber: string): Promise<IBurnDeals> => {
  const response = await http.post<IBurnResponse>(
    `${getBaseUrl()}burn?offerNumber=${couponNumber}`
  );
  const data = await response.data;
  storeNewToken(data.token.token);
  return Promise.resolve<IBurnDeals>({
    burnedCoupon: data.burnResponse.autosubscribeResult,
    deals: data.offers,
  });
};

const getUserHistory = async (pageSize: Number, pageIndex: Number): Promise<UserHistory> => {
  const response = await http.get<UserHistory>(
    `${getBaseUrl()}GetUserHistory?pageIndex=${pageIndex}&pageSize=${pageSize}`
  );
  const data = response.data;
  return Promise.resolve<UserHistory>(data);
};
const getTiers = async (): Promise<number[]> => {
  const response = await http.get<number[]>(`${getBaseUrl()}GetTiers`);
  const data = response.data;
  return Promise.resolve<number[]>(data);
};
const subscribe = async (
  offerNumber: string,
  externalPoints: number,
  categoryId: string
): Promise<CouponDetails> => {
  const response = await http.get(
    `${getBaseUrl()}subscribe?offerNumber=${offerNumber}&externalPoints=${externalPoints}&categoryId=${categoryId}`
  );
  const data = await response.data;
  storeNewToken(data.token.token);
  return Promise.resolve<CouponDetails>(data.coupon);
};
const getTierDeals = async (): Promise<IDeal[]> => {
  const response = await http.get(`${getBaseUrl()}GetTierDeals`);
  const data = await response.data;
  return Promise.resolve<IDeal[]>(data);
};
export default {
  burn: burnCoupon,
  history: getUserHistory,
  tiers: getTiers,
  subscribe,
  deals: getTierDeals,
};
