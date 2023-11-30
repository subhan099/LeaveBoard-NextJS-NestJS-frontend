import axios from "axios";
import { API_URLS } from "../../config";

const createCompanyLeave = async (LeaveType, DateRange) => {
  try {
    const response = await axios.post(
      `${API_URLS.COMPANY_LEAVE}`,
      {
        LeaveType,
        DateRange,
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

export { createCompanyLeave };
