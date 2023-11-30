const BaseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const API_URLS = {
  LOGIN: `${BaseUrl}/auth/login`,
  SIGNUP: `${BaseUrl}/user/signup`,
  USER: `${BaseUrl}/user`,
  EMAIL_RESET_KEY: `${BaseUrl}/user/key`,
  SEND_RESET_EMAIL: `${BaseUrl}/company/resetEmail`,
  PASSWORD_RESET: `${BaseUrl}/user/reset`,
  LEAVE_DETAILS: `${BaseUrl}/leave/details`,
  LEAVE: `${BaseUrl}/leave`,
  BRIDGE: `${BaseUrl}/bridge`,
  BRIDGE_USER: `${BaseUrl}/bridge/user`,
  EMAIL: `${BaseUrl}/company/sendEmail`,
  COMPANY: `${BaseUrl}/company`,
  COMPANY_LEAVE: `${BaseUrl}/companyLeave`,
  COMPANY_DETAILS: `${BaseUrl}/company/detail`,
  RESET_COMPARE: `${BaseUrl}/user/compare`,
};
