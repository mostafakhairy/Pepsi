export default interface RegisterUser {
  firstName: string;
  lastName: string;
  mobileNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
  offerNumber?: string;
  isSubscribedMail: boolean;
  isSubscribedSms: boolean;
  Language: string;
}
