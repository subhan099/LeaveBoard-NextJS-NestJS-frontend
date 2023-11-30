import axios from "axios";
import { API_URLS } from "../../config";

const resetMail = async (email) => {
  try {
    const response = await axios.post(`${API_URLS.EMAIL_RESET_KEY}`, {
      email,
    });
    return response;
  } catch (error) {
    console.error("Error updating:", error);
  }
};

export { resetMail };
