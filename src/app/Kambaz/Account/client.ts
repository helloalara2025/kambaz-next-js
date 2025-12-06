// client functions to talk to the Node backend from the React frontend
import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });

// Base URL for the backend API
//  - normally comes from NEXT_PUBLIC_HTTP_SERVER
//  - falls back to http://localhost:4000 so dev still works
export const HTTP_SERVER =
  process.env.NEXT_PUBLIC_HTTP_SERVER || "http://localhost:4000";

export const USERS_API = `${HTTP_SERVER}/api/users`;

// ---------- Users CRUD ----------

// Create user
export const createUser = async (user: any) => {
  const response = await axiosWithCredentials.post(`${USERS_API}`, user);
  return response.data;
};

// Get all users
export const findAllUsers = async () => {
  const response = await axiosWithCredentials.get(USERS_API);
  return response.data;
};

// Filter by role
export const findUsersByRole = async (role: string) => {
  const response = await axiosWithCredentials.get(
    `${USERS_API}?role=${encodeURIComponent(role)}`
  );
  return response.data;
};

// Filter by partial name
export const findUsersByPartialName = async (name: string) => {
  const response = await axiosWithCredentials.get(
    `${USERS_API}?name=${encodeURIComponent(name)}`
  );
  return response.data;
};

// Find one user by id
export const findUserById = async (id: string) => {
  const response = await axiosWithCredentials.get(`${USERS_API}/${id}`);
  return response.data;
};

// ---------- Auth ----------

export const signin = async (credentials: any) => {
  const response = await axiosWithCredentials.post(
    `${USERS_API}/signin`,
    credentials
  );
  return response.data;
};

export const signup = async (user: any) => {
  const response = await axiosWithCredentials.post(
    `${USERS_API}/signup`,
    user
  );
  return response.data;
};

export const signout = async () => {
  const response = await axiosWithCredentials.post(`${USERS_API}/signout`);
  return response.data;
};

export const profile = async () => {
  const response = await axiosWithCredentials.post(`${USERS_API}/profile`);
  return response.data;
};

// ---------- Enrollments ----------

export const enrollIntoCourse = async (userId: string, courseId: string) => {
  const response = await axiosWithCredentials.post(
    `${USERS_API}/${userId}/courses/${courseId}`
  );
  return response.data;
};

export const unenrollFromCourse = async (userId: string, courseId: string) => {
  const response = await axiosWithCredentials.delete(
    `${USERS_API}/${userId}/courses/${courseId}`
  );
  return response.data;
};

export const fetchEnrollments = async (userId: string) => {
  const response = await axiosWithCredentials.get(
    `${USERS_API}/${userId}/enrollments`
  );
  return response.data;
};

// ---------- Delete ----------

export const deleteUser = async (userId: string) => {
  const response = await axiosWithCredentials.delete(`${USERS_API}/${userId}`);
  return response.data;
};