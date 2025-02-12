import axios from "axios";
import { API_BASE_URL } from "../utils/constants";
import { logout } from "./auth";

const instance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // send HttpOnly cookies automatically
});

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      try {
        // Call the logout endpoint on the server.
        await logout();
      } catch (e) {
        console.error("Error during API logout:", e);
      } finally {
        window.location.href = "/";
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
