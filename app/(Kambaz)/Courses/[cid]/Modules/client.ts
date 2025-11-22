// app/(Kambaz)/Courses/[cid]/Modules/client.ts
import axios from "axios";
const BASE_API = process.env.NEXT_PUBLIC_BASE_API || "http://localhost:4000";

// modules for a course
export const findModulesForCourse = async (cid: string) => {
  const { data } = await axios.get(`${BASE_API}/courses/${cid}/modules`);
  return data;
};

// create one module for this course
export const createModuleForCourse = async (cid: string, module: any) => {
  const { data } = await axios.post(
    `${BASE_API}/courses/${cid}/modules`,
    module
  );
  return data;
};

// update one module
export const updateModule = async (module: any) => {
  const { data } = await axios.put(
    `${BASE_API}/modules/${module._id}`,
    module
  );
  return data;
};

// delete one module
export const deleteModule = async (moduleId: string) => {
  const { data } = await axios.delete(`${BASE_API}/modules/${moduleId}`);
  return data;
};