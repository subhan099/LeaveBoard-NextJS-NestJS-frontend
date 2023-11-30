import jwt from "jsonwebtoken";
import { store } from "../../redux/store";

const getRole = async () => {
  try {
    const state = store.getState();
    const token = state.user.access_token;

    if (!token) {
      // Handle the case when the token is not available
      return null;
    }

    const decodedToken = jwt.decode(token);
    const role = decodedToken.role;
    return role;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

export { getRole };
