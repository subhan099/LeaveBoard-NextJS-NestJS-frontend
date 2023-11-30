import axios from "axios";
import { API_URLS } from "../../config";

const getBridgeUsers = async (companyId) => {
  try {
    const response = await axios.get(`${API_URLS.BRIDGE_USER}/${companyId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error logging in user:", error);
  }
};

export { getBridgeUsers };
