import axios from "axios";

export const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

// axios instance that sends cookies for session
const axiosWithCredentials = axios.create({
  withCredentials: true,
});

export const USERS_API = `${HTTP_SERVER}/api/users`;

// create a new user and sign them in
export const signup = async (user: any) => {
  const { data } = await axiosWithCredentials.post(
    `${USERS_API}/signup`,
    user
  );
  return data;
};

// sign in with username and password
export const signin = async (credentials: any) => {
  const { data } = await axiosWithCredentials.post(
    `${USERS_API}/signin`,
    credentials
  );
  return data;
};

// get current logged in user from session
export const profile = async () => {
  const { data } = await axiosWithCredentials.get(
    `${USERS_API}/profile`
  );
  return data;
};

// update current user profile
export const updateUser = async (userId: string, updates: any) => {
  const { data } = await axiosWithCredentials.put(
    `${USERS_API}/${userId}`,
    updates
  );
  return data;
};

// sign out current user
export const signout = async () => {
  const { data } = await axiosWithCredentials.post(
    `${USERS_API}/signout`
  );
  return data;
};

// export all client functions as an object
// 	uses NEXT_PUBLIC_HTTP_SERVER
//	uses /api/users/... routes
//	sends cookies with withCredentials: true
//	exposes signup, signin, profile, updateUser, signout for your Account screens and Session provider