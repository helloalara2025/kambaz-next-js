/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║                      ACCOUNT CLIENT                                       ║
 * ║                    API Functions for Auth                                 ║
 * ║                         Created by Alara                                  ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 * 
 * This module contains all the API calls related to user authentication.
 * It abstracts away the HTTP details so components can just call:
 *   const user = await signin({ username, password });
 * 
 * AXIOS WITH CREDENTIALS:
 * We create a custom axios instance with `withCredentials: true`.
 * This ensures cookies (including session cookies) are sent with every request.
 * Without this, the server wouldn't know who's logged in!
 * 
 * @author Alara
 */

import axios from "axios";

/**
 * Axios instance configured to send cookies
 * 
 * WHY CREDENTIALS?
 * The server uses session cookies to remember who's logged in.
 * By default, axios doesn't send cookies on cross-origin requests.
 * `withCredentials: true` tells axios to include cookies.
 */
const axiosWithCredentials = axios.create({ withCredentials: true });

/**
 * Server URL from environment variable
 * This allows different URLs for development vs production.
 */
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER || "http://localhost:4000";
const USERS_API = `${HTTP_SERVER}/api/users`;

// ═══════════════════════════════════════════════════════════════════════════
// AUTHENTICATION API CALLS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Sign in with username and password
 * 
 * @param credentials - { username, password }
 * @returns The user object if successful
 * @throws Error if credentials are invalid
 */
export const signin = async (credentials: { username: string; password: string }) => {
  const response = await axiosWithCredentials.post(`${USERS_API}/signin`, credentials);
  return response.data;
};

/**
 * Sign up (create new account)
 * 
 * @param user - New user data (username, password, firstName, etc.)
 * @returns The created user object
 * @throws Error if username already exists
 */
export const signup = async (user: any) => {
  const response = await axiosWithCredentials.post(`${USERS_API}/signup`, user);
  return response.data;
};

/**
 * Sign out (end session)
 * 
 * Destroys the session on the server. The session cookie becomes invalid.
 */
export const signout = async () => {
  const response = await axiosWithCredentials.post(`${USERS_API}/signout`);
  return response.data;
};

/**
 * Get current user profile
 * 
 * Called on page load to check if user is already logged in.
 * The server checks the session cookie to identify the user.
 * 
 * @returns The current user if logged in
 * @throws 401 error if not logged in
 */
export const profile = async () => {
  const response = await axiosWithCredentials.post(`${USERS_API}/profile`);
  return response.data;
};

/**
 * Update user profile
 * 
 * @param user - User object with updated fields
 * @returns The updated user object
 */
export const updateUser = async (user: any) => {
  const response = await axiosWithCredentials.put(`${USERS_API}/${user._id}`, user);
  return response.data;
};

// ═══════════════════════════════════════════════════════════════════════════
// USER MANAGEMENT API CALLS (for admin features)
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Get all users
 * 
 * @returns Array of all users
 */
export const findAllUsers = async () => {
  const response = await axios.get(`${USERS_API}`);
  return response.data;
};

/**
 * Get users filtered by role
 * 
 * @param role - "STUDENT", "FACULTY", "ADMIN"
 * @returns Array of users with that role
 */
export const findUsersByRole = async (role: string) => {
  const response = await axios.get(`${USERS_API}?role=${role}`);
  return response.data;
};

/**
 * Get a single user by ID
 * 
 * @param userId - The user's _id
 * @returns The user object
 */
export const findUserById = async (userId: string) => {
  const response = await axios.get(`${USERS_API}/${userId}`);
  return response.data;
};

/**
 * Create a new user (admin operation)
 * 
 * Different from signup - doesn't auto-login the created user
 * 
 * @param user - New user data
 * @returns The created user object
 */
export const createUser = async (user: any) => {
  const response = await axios.post(`${USERS_API}`, user);
  return response.data;
};

/**
 * Delete a user
 * 
 * @param userId - The user's _id
 */
export const deleteUser = async (userId: string) => {
  const response = await axios.delete(`${USERS_API}/${userId}`);
  return response.data;
};
