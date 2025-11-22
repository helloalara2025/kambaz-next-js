import axios from "axios";
import { BASE_API } from "../client";

// load all courses
export const findAllCourses = async () => {
  const { data } = await axios.get(`${BASE_API}/courses`);
  return data;
};

// load courses for current logged in user
export const findCoursesForEnrolledUser = async () => {
  const { data } = await axios.get(`${BASE_API}/users/current/courses`);
  return data;
};

// create a new course
export const createCourse = async (course: any) => {
  const { data } = await axios.post(`${BASE_API}/courses`, course);
  return data;
};

// update one course by id
export const updateCourse = async (course: any) => {
  const { data } = await axios.put(`${BASE_API}/courses/${course._id}`, course);
  return data;
};

// delete one course by id
export const deleteCourse = async (courseId: string) => {
  const { data } = await axios.delete(`${BASE_API}/courses/${courseId}`);
  return data;
};


export { BASE_API };
//Notes:	•	uses BASE_API from app/(Kambaz)/client.ts
//	•	uses /courses and /users/current/courses routes
//	•	exposes findAllCourses, findCoursesForEnrolledUser, createCourse, updateCourse, deleteCourse