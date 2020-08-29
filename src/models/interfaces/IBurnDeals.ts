import CouponDetails from './CouponDetails';
import { IDeal } from './IBurnResponse';
export interface IBurnDeals {
  burnedCoupon: CouponDetails;
  deals: IDeal[];
}
