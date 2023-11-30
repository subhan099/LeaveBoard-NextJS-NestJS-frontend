import axios from "axios";
import { API_URLS } from "../../config";

const updateLeave = async (idToUpdate, status, comments) => {
  try {
    const response = await axios.patch(
      `${API_URLS.LEAVE}/${idToUpdate}`,
      {
        status,
        comment: comments,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
  } catch (error) {
    console.error("Error updating leave:", error);
  }
};

export { updateLeave };
