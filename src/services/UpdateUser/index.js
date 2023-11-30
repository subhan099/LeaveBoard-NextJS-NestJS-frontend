import axios from "axios";
import { API_URLS } from "../../config";

const updateUser = async (idToUpdate, updateData) => {
  try {
    const payload = {};

    if (updateData.firstName !== undefined) {
      payload.firstName = updateData.firstName;
    }

    if (updateData.lastName !== undefined) {
      payload.lastName = updateData.lastName;
    }

    if (updateData.password !== undefined) {
      payload.password = updateData.password;
    }

    if (updateData.status !== undefined) {
      payload.status = updateData.status;
    }

    const response = await axios.patch(
      `${API_URLS.USER}/${idToUpdate}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );

    return response;
  } catch (error) {
    console.error("Error updating user:", error);
  }
};

export { updateUser };
