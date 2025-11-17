import axios from "axios";

// base server url
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

// rest endpoints
const COURSES_API = `${HTTP_SERVER}/api/courses`;
const USERS_API = `${HTTP_SERVER}/api/users`;

// plain axios for public course data
export const fetchAllCourses = async () => {
  const { data } = await axios.get(COURSES_API);
  return data;
};

// axios instance configured to send credentials (cookies)
const axiosWithCredentials = axios.create({
  withCredentials: true,
});

// current user's enrolled courses
export const findMyCourses = async () => {
  const { data } = await axiosWithCredentials.get(
    `${USERS_API}/current/courses`
  );
  return data;
};
type CourseInput = {
  title: string;
  description?: string;
};

export const createCourse = async (course: CourseInput) => {
  const { data } = await axiosWithCredentials.post(`${USERS_API}/current/courses`, course);
  return data;
};
export const deleteCourse = async (id: string) => {
  const { data } = await axios.delete(`${COURSES_API}/${id}`);
  return data;
};
type CourseUpdate = CourseInput & { _id: string };
export const updateCourse = async (course: CourseUpdate) => {
  const { data } = await axios.put(`${COURSES_API}/${course._id}`, course);
  return data;
};
export const findModulesForCourse = async (courseId: string) => {
  const response = await axios
    .get(`${COURSES_API}/${courseId}/modules`);
  return response.data;
};

type ModuleInput = {
  title: string;
  content?: string;
  [key: string]: unknown;
};

type Module = ModuleInput & { _id: string };

export const createModuleForCourse = async (courseId: string, module: ModuleInput) => {
  const response = await axios.post(
    `${COURSES_API}/${courseId}/modules`,
    module
  );
  return response.data;
};

const MODULES_API = `${HTTP_SERVER}/api/modules`;
export const deleteModule = async (moduleId: string) => {
 const response = await axios.delete(`${MODULES_API}/${moduleId}`);
 return response.data;
};
export const updateModule = async (module: Module) => {
  const { data } = await axios.put(`${MODULES_API}/${module._id}`, module);
  return data;
};
