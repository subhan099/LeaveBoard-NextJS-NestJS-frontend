import axios from "axios";
import { API_URLS } from "../../config";

const getCompanyLeave = async () => {
  try {
    const response = await axios.get(`${API_URLS.COMPANY_LEAVE}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export { getCompanyLeave };
