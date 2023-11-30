import axios from "axios";
import { API_URLS } from "../../config";

const createCompanyService = async (name, category) => {
  try {
    const response = await axios.post(
      `${API_URLS.COMPANY}`,
      {
        name,
        category,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error updating:", error);
  }
};

export { createCompanyService };
