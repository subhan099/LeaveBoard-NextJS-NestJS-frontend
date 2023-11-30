import axios from "axios";
import { API_URLS } from "../../config";

const sendEmail = async (to) => {
  try {
    const response = await axios.post(
      `${API_URLS.EMAIL}`,
      { to },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error logging in user:", error);
  }
};

export { sendEmail };
