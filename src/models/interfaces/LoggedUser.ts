export default interface LoggedUser {
  username: string;
  points: number;
  email: string;
  mobileNumber: string;
  userTier?: number;
  isSubscribedSms: Boolean;
  isSubscribedMail: boolean;
}
