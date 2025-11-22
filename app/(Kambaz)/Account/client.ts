"use client";

import axios from "axios";
import type { User } from "./reducer";

// base url for node server
// use env var in vercel when deployed
const SERVER =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:4000";

const API = `${SERVER}/api/users`;

// send cookies with every request
axios.defaults.withCredentials = true;

// sign in user with username and password
export async function signin(credentials: {
  username: string;
  password: string;
}): Promise<User> {
  const response = await axios.post(`${API}/signin`, credentials);
  return response.data as User;
}

// create a new user account
export async function signup(user: Partial<User>): Promise<User> {
  const response = await axios.post(`${API}/signup`, user);
  return response.data as User;
}

// get current logged in user from session
export async function profile(): Promise<User> {
  const response = await axios.get(`${API}/profile`);
  return response.data as User;
}

// update current user by id
export async function updateUser(
  userId: string,
  updates: Partial<User>
): Promise<User> {
  const response = await axios.put(`${API}/${userId}`, updates);
  return response.data as User;
}

// sign out current user
export async function signout(): Promise<void> {
  await axios.post(`${API}/signout`);
}
// export all client functions as an object
// 	uses NEXT_PUBLIC_HTTP_SERVER
//	uses /api/users/... routes
//	sends cookies with withCredentials: true
//	exposes signup, signin, profile, updateUser, signout for your Account screens and Session provider