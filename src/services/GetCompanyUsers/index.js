import axios from "axios";
import { API_URLS } from "../../config";

const getCompanyUsers = async (leaveData) => {
  try {
    const response = await axios.get(`${API_URLS.BRIDGE}/${leaveData}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error logging in user:", error);
  }
};

export { getCompanyUsers };
