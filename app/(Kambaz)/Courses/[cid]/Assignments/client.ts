import axios from "axios";
const BASE_API = process.env.NEXT_PUBLIC_BASE_API || "http://localhost:4000";

// list assignments for a course
export const findAssignmentsForCourse = async (cid: string) => {
  const { data } = await axios.get(`${BASE_API}/courses/${cid}/assignments`);
  return data;
};

// create assignment for a course
export const createAssignmentForCourse = async (
  cid: string,
  assignment: any
) => {
  const { data } = await axios.post(
    `${BASE_API}/courses/${cid}/assignments`,
    assignment
  );
  return data;
};

// update one assignment
export const updateAssignment = async (assignment: any) => {
  const { data } = await axios.put(
    `${BASE_API}/assignments/${assignment._id}`,
    assignment
  );
  return data;
};

// delete one assignment
export const deleteAssignment = async (assignmentId: string) => {
  const { data } = await axios.delete(
    `${BASE_API}/assignments/${assignmentId}`
  );
  return data;
};