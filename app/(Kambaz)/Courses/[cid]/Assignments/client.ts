import axios from "axios";

const HTTP_SERVER =
  process.env.NEXT_PUBLIC_HTTP_SERVER ?? "http://localhost:4000";

const COURSES_API = `${HTTP_SERVER}/api/courses`;
const ASSIGNMENTS_API = `${HTTP_SERVER}/api/assignments`;

export type AssignmentInput = {
  name: string;
  description?: string;
  points?: number;
  dueDate?: string;
  availableFrom?: string;
  availableUntil?: string;
};

export type Assignment = AssignmentInput & {
  _id: string;
  course: string;
};

export const findAssignmentsForCourse = async (courseId: string) => {
  const { data } = await axios.get<Assignment[]>(
    `${COURSES_API}/${courseId}/assignments`
  );
  return data;
};

export const createAssignment = async (
  courseId: string,
  assignment: AssignmentInput
) => {
  const { data } = await axios.post<Assignment>(
    `${COURSES_API}/${courseId}/assignments`,
    assignment
  );
  return data;
};

export const updateAssignment = async (assignment: Assignment) => {
  const { data } = await axios.put<Assignment>(
    `${ASSIGNMENTS_API}/${assignment._id}`,
    assignment
  );
  return data;
};

export const deleteAssignment = async (assignmentId: string) => {
  await axios.delete(`${ASSIGNMENTS_API}/${assignmentId}`);
};