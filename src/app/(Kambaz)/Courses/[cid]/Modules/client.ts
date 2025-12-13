/*******************************************
 * Modules Client - Alara Hakki
 * 
 * This is my axios client for module operations.
 * I use withCredentials for session cookies.
 * All calls go to my backend API.
 *******************************************/
import axios from "axios";

/* I create axios instance with credentials enabled for cookies */
const axiosWithCredentials = axios.create({ withCredentials: true });

/* My backend server URL from environment variable */
const HTTP = process.env.NEXT_PUBLIC_HTTP_SERVER || "http://localhost:4000";

/* Fetch all modules for a specific course */
export const findModulesForCourse = async (courseId: string) => {
  const response = await axiosWithCredentials.get(`${HTTP}/api/courses/${courseId}/modules`);
  return response.data;
};

/* Create a new module in a course */
export const createModule = async (courseId: string, module: any) => {
  const response = await axiosWithCredentials.post(`${HTTP}/api/courses/${courseId}/modules`, module);
  return response.data;
};

/* Update an existing module - I pass courseId and module object */
export const updateModule = async (courseId: string, module: any) => {
  const response = await axiosWithCredentials.put(`${HTTP}/api/courses/${courseId}/modules/${module._id}`, module);
  return response.data;
};

/* Delete a module from a course */
export const deleteModule = async (courseId: string, moduleId: string) => {
  const response = await axiosWithCredentials.delete(`${HTTP}/api/courses/${courseId}/modules/${moduleId}`);
  return response.data;
};