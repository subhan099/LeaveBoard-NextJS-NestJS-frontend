import axios from "axios";
import { API_URLS } from "../../config";

const createLeave = (leaveType, date, duration, comment) => {
  const response = axios.post(
    `${API_URLS.LEAVE_DETAILS}`,
    {
      leaveType,
      date,
      duration,
      comment,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    }
  );
  return response;
};

export { createLeave };
