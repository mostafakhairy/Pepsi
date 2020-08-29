import http from './base.service';
import IUserSubscription from './../models/interfaces/IUserSubscription';

function getBaseUrl() {
  let lang = localStorage.lang === 'ar' ? 'ar-SA' : 'en-US';
  return `api/${lang}/user/`;
}

function storeNewToken(token: any) {
  http.setJwt('bearer ' + token);
  localStorage.token = token;
}
const updateUserSubscription = async (userSubscription: IUserSubscription) => {
  const response = await http.patch(`${getBaseUrl()}UpdateSubscription`, userSubscription);
  const data = await response.data;
  storeNewToken(data.token);
};
export default {
  updateUser: updateUserSubscription,
};
