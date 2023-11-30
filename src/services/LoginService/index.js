import axios from "axios";
import { API_URLS } from "../../config";

const loginService = async (email, password) => {
  try {
    const response = await axios.post(API_URLS.LOGIN, { email, password });
    return response;
  } catch (error) {
    console.error("Error logging in user:", error);
  }
};

export { loginService };
