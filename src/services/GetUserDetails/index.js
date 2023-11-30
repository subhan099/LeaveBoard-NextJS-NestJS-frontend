import axios from "axios";
import { API_URLS } from "../../config";

const getUserDetails = (id) => {
  const response = axios.get(`${API_URLS.USER}/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
  return response;
};

export { getUserDetails };
