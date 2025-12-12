/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║                      MODULES CLIENT                                       ║
 * ║                    API Functions for Modules                              ║
 * ║                         Created by Alara                                  ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 * 
 * @author Alara
 */

import axios from "axios";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER || "http://localhost:4000";

/**
 * Get all modules for a course
 */
export const findModulesForCourse = async (courseId: string) => {
  const response = await axios.get(`${HTTP_SERVER}/api/courses/${courseId}/modules`);
  return response.data;
};

/**
 * Create a new module
 */
export const createModule = async (courseId: string, module: any) => {
  const response = await axios.post(`${HTTP_SERVER}/api/courses/${courseId}/modules`, module);
  return response.data;
};

/**
 * Update a module
 */
export const updateModule = async (courseId: string, module: any) => {
  const response = await axios.put(
    `${HTTP_SERVER}/api/courses/${courseId}/modules/${module._id}`,
    module
  );
  return response.data;
};

/**
 * Delete a module
 */
export const deleteModule = async (courseId: string, moduleId: string) => {
  const response = await axios.delete(
    `${HTTP_SERVER}/api/courses/${courseId}/modules/${moduleId}`
  );
  return response.data;
};
