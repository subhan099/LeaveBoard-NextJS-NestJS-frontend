import axios from "axios";
import { API_URLS } from "../../config";

const sendResetEmail = async (email) => {
  try {
    const response = await axios.post(`${API_URLS.SEND_RESET_EMAIL}`, {
      to: email,
    });
    return response;
  } catch (error) {
    console.error("Error updating:", error);
  }
};

export { sendResetEmail };
