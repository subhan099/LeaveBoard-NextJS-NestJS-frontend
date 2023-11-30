import axios from "axios";
import { API_URLS } from "../../config";

const updateCompanyLeave = async (idToUpdate, LeaveType, DateRange) => {
  try {
    const response = await axios.patch(
      `${API_URLS.COMPANY_LEAVE}/${idToUpdate}`,
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

export { updateCompanyLeave };
