/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║                      ASSIGNMENTS CLIENT                                   ║
 * ║                    API Functions for Assignments                          ║
 * ║                         Created by Alara                                  ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 * 
 * @author Alara
 */

import axios from "axios";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER || "http://localhost:4000";

/**
 * Get all assignments for a course
 */
export const findAssignmentsForCourse = async (courseId: string) => {
  const response = await axios.get(`${HTTP_SERVER}/api/courses/${courseId}/assignments`);
  return response.data;
};

/**
 * Get a single assignment by ID
 */
export const findAssignmentById = async (assignmentId: string) => {
  const response = await axios.get(`${HTTP_SERVER}/api/assignments/${assignmentId}`);
  return response.data;
};

/**
 * Create a new assignment
 */
export const createAssignment = async (courseId: string, assignment: any) => {
  const response = await axios.post(
    `${HTTP_SERVER}/api/courses/${courseId}/assignments`, 
    assignment
  );
  return response.data;
};

/**
 * Update an assignment
 */
export const updateAssignment = async (assignment: any) => {
  const response = await axios.put(
    `${HTTP_SERVER}/api/assignments/${assignment._id}`,
    assignment
  );
  return response.data;
};

/**
 * Delete an assignment
 */
export const deleteAssignment = async (assignmentId: string) => {
  const response = await axios.delete(`${HTTP_SERVER}/api/assignments/${assignmentId}`);
  return response.data;
};
