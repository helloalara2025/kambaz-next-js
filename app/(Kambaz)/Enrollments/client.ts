import axios from "axios";
const BASE_API = process.env.NEXT_PUBLIC_BASE_API ?? "/api";

// load enrolled course ids for current user
export const findEnrollmentsForCurrentUser = async () => {
  const { data } = await axios.get(`${BASE_API}/enrollments/current`, {
    withCredentials: true,
  });
  return data; // e.g. [ "courseId1", "courseId2" ]
};

// enroll in a course
export const enrollInCourse = async (cid: string) => {
  const { data } = await axios.post(
    `${BASE_API}/courses/${cid}/enroll`,
    {},
    { withCredentials: true }
  );
  return data;
};

// unenroll from a course
export const unenrollFromCourse = async (cid: string) => {
  const { data } = await axios.post(
    `${BASE_API}/courses/${cid}/unenroll`,
    {},
    { withCredentials: true }
  );
  return data;
};