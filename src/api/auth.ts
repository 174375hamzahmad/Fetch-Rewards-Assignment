import axios from "./axiosInstance";

interface loginPayload {
  name: string;
  email: string;
}

export const login = async (payload: loginPayload): Promise<void> => {
  try {
    await axios.post("/auth/login", payload);
  } catch (err) {
    console.error(err);
  }
};

export const logout = async (): Promise<void> => {
  try {
    await axios.post("/auth/logout");
  } catch (err) {
    console.log(err);
  }
};
