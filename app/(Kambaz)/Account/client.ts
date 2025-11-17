import axios from "axios";

const USERS_API = process.env.USERS_API ?? "http://localhost:4000";

// axios instance configured to send cookies for session-based auth
export const axiosWithCredentials = axios.create({
  withCredentials: true,
});

export type SignupUser = Record<string, unknown>;

export const signup = async (user: SignupUser) => {
  const response = await axiosWithCredentials.post(`${USERS_API}/signup`, user);
  return response.data;
};

export const updateUser = async (user: SignupUser & { _id: string }) => {
  const response = await axiosWithCredentials.put(
    `${USERS_API}/${user._id}`,
    user
  );
  return response.data;
};

export const profile = async () => {
  const response = await axiosWithCredentials.post(`${USERS_API}/{profile}`);
  return response.data;
};

export const signout = async () => {
  const response = await axiosWithCredentials.post(`${USERS_API}/signout`);
  return response.data;
};


