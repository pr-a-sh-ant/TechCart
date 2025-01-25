import axios from "axios";
import { getBaseURL } from "../apiconfig";

const refreshToken = async (token) => {
  try {
    let url = `${getBaseURL()}/token/refreshToken`;
    const response = await axios.post(url, { refreshToken: token });
    const newToken = response.data.token; // Assuming your backend returns the new token
    // Update session storage or state with the new access token
    localStorage.setItem("token", newToken);
    localStorage.setItem("refreshToken", response.data.refreshToken);
    return response.data.refreshToken;
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw error; // Handle error appropriately
  }
};

export default refreshToken;
