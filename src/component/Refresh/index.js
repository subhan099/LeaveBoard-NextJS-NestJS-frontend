import jwt from "jsonwebtoken";
import { store } from "../../redux/store";

const refresh = async () => {
  try {
    const state = store.getState();
    const token = state.user.access_token;

    if (!token) {
      // Handle the case when the token is not available
      return null;
    }

    const decodedToken = jwt.decode(token);
    const id = decodedToken.id;
    const role = decodedToken.role;
    return { id, role };
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

export { refresh };
