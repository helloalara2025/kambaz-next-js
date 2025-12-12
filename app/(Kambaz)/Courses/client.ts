/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║                      COURSES CLIENT                                       ║
 * ║                    API Functions for Courses                              ║
 * ║                         Created by Alara                                  ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 * 
 * @author Alara
 */

import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER || "http://localhost:4000";
const COURSES_API = `${HTTP_SERVER}/api/courses`;
const USERS_API = `${HTTP_SERVER}/api/users`;

/**
 * Get all courses
 */
export const findAllCourses = async () => {
  const response = await axios.get(COURSES_API);
  return response.data;
};

/**
 * Get courses for a specific user (enrolled courses)
 */
export const findCoursesForUser = async (userId: string) => {
  const response = await axiosWithCredentials.get(`${USERS_API}/${userId}/courses`);
  return response.data;
};

/**
 * Get a single course by ID
 */
export const findCourseById = async (courseId: string) => {
  const response = await axios.get(`${COURSES_API}/${courseId}`);
  return response.data;
};

/**
 * Create a new course
 */
export const createCourse = async (course: any) => {
  const response = await axiosWithCredentials.post(COURSES_API, course);
  return response.data;
};

/**
 * Update a course
 */
export const updateCourse = async (course: any) => {
  const response = await axiosWithCredentials.put(`${COURSES_API}/${course._id}`, course);
  return response.data;
};

/**
 * Delete a course
 */
export const deleteCourse = async (courseId: string) => {
  const response = await axiosWithCredentials.delete(`${COURSES_API}/${courseId}`);
  return response.data;
};

/**
 * Get users enrolled in a course
 */
export const findUsersForCourse = async (courseId: string) => {
  const response = await axios.get(`${COURSES_API}/${courseId}/users`);
  return response.data;
};

/**
 * Enroll current user in a course
 */
export const enrollInCourse = async (courseId: string) => {
  const response = await axiosWithCredentials.post(`${USERS_API}/current/courses/${courseId}`);
  return response.data;
};

/**
 * Unenroll current user from a course
 */
export const unenrollFromCourse = async (courseId: string) => {
  const response = await axiosWithCredentials.delete(`${USERS_API}/current/courses/${courseId}`);
  return response.data;
};

/**
 * Enroll a specific user in a course (for admin)
 */
export const enrollUserInCourse = async (userId: string, courseId: string) => {
  const response = await axiosWithCredentials.post(`${USERS_API}/${userId}/courses/${courseId}`);
  return response.data;
};

/**
 * Unenroll a specific user from a course (for admin)
 */
export const unenrollUserFromCourse = async (userId: string, courseId: string) => {
  const response = await axiosWithCredentials.delete(`${USERS_API}/${userId}/courses/${courseId}`);
  return response.data;
};
