import axios from "axios";
import { API_URLS } from "../../config";

const getCompanyData = async (id) => {
  try {
    const response = await axios.get(`${API_URLS.COMPANY}/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error logging in user:", error);
  }
};

export { getCompanyData };
