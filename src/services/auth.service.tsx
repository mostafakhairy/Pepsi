import http from "./base.service";
import RegisterUser from "./../models/interfaces/RegisterUser";
import LoggedUser from "./../models/interfaces/LoggedUser";
import jwt_decode from "jwt-decode";
import LoginUser from "./../models/interfaces/LoginUser";
import ResetPassword from "./../models/interfaces/ResetPassword";

function getBaseUrl() {
  let lang = localStorage.lang === "ar" ? "ar-SA" : "en-US";
  return `api/${lang}/auth/`;
}

function storeToken(token: any) {
  http.setJwt("bearer " + token);
  localStorage.token = token;
}
const register = async (registeredUser: RegisterUser) => {
  const response = await http.post(getBaseUrl() + "Register", registeredUser);
  const token = await response.data.token;
  storeToken(token);
};
const isUserAlreadyRegistered = async (
  mobileNumber: string
): Promise<boolean> => {
  const response = await http.get(
    `${getBaseUrl()}isUserRegistered?mobileNumber=${mobileNumber}`
  );
  return (await response.data) as boolean;
};
const getLoggedUser = (): LoggedUser => {
  let user: LoggedUser | any = {};
  if (localStorage.token) {
    user = jwt_decode(localStorage.token) as LoggedUser;
  }
  return user || {};
};
const login = async (loginUser: LoginUser) => {
  const response = await http.post(getBaseUrl() + "Login", loginUser);
  const token = await response.data.token;
  storeToken(token);
};

const getOTP = async (email: String) => {
  const response = await http.get(getBaseUrl() + `GenerateOTP?email=${email}`);
  return await response.data;
};

const validateOTP = async (email: String, otp: number) => {
  const response = await http.get(getBaseUrl() + `ValidateOTP?email=${email}&otp=${otp}`);
  return await response.data;
};

const resetPassword = async (req: ResetPassword) => {
  const response = await http.post(getBaseUrl() + "ResetPassword", req);

  return await response.data;
};

const logout = async () => {
  localStorage.removeItem("token");
  http.removeJwt();
  window.location.href = "/login";
};
export default {
  register,
  getLoggedUser,
  login,
  logout,
  isUserAlreadyRegistered,
  getOTP,
  resetPassword,
  validateOTP
};
