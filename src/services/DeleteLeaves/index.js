import axios from "axios";
import { API_URLS } from "../../config";

const deleteLeave = async (id) => {
  try {
    const response = await axios.delete(`${API_URLS.LEAVE}/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    console.log("response delete", response);
  } catch (error) {
    console.error("Error deleting:", error);
  }
};

export { deleteLeave };
