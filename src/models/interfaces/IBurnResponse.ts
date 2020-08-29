import CouponDetails from './CouponDetails';
export default interface IBurnResponse {
  token: { token: string };
  burnResponse: CouponResponse;
  offers: IDeal[];
}

export type CouponResponse = {
  autosubscribeResult: CouponDetails;
};

export interface IDeal {
  discount: number;
  image: string;
  merchant: string;
  offerNumber: string;
  offerType: string;
  logo: string;
  title: string;
  externalpoints: number;
  categoryId: string;
  description: string;
}
