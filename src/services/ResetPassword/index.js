import axios from "axios";
import { API_URLS } from "../../config";

const resetPassword = async (email, password) => {
  try {
    const response = await axios.patch(`${API_URLS.PASSWORD_RESET}`, {
      email,
      password,
    });
    return response;
  } catch (error) {
    console.error("Error updating:", error);
  }
};

export { resetPassword };
