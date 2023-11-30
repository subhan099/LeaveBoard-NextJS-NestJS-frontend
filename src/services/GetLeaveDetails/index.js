import axios from "axios";
import { API_URLS } from "../../config";

const getLeaveDetails = (id) => {
  const response = axios.get(`${API_URLS.LEAVE_DETAILS}/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
  return response;
};

export { getLeaveDetails };
