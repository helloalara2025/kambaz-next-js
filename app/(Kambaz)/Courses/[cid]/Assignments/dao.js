export default function AssignmentsDao(db) {
  const { assignments } = db;

  const findAssignmentsForCourse = (courseId) =>
    assignments.filter((a) => a.course === courseId);

  const findAssignmentById = (assignmentId) =>
    assignments.find((a) => a._id === assignmentId);

  const createAssignment = (courseId, assignment) => {
    const newAssignment = {
      _id: crypto.randomUUID?.() ?? Date.now().toString(),
      course: courseId,
      ...assignment,
    };
    assignments.push(newAssignment);
    return newAssignment;
  };

  const updateAssignment = (assignmentId, assignment) => {
    const index = assignments.findIndex((a) => a._id === assignmentId);
    if (index === -1) return null;
    assignments[index] = { ...assignments[index], ...assignment };
    return assignments[index];
  };

  const deleteAssignment = (assignmentId) => {
    const index = assignments.findIndex((a) => a._id === assignmentId);
    if (index === -1) return false;
    assignments.splice(index, 1);
    return true;
  };

  return {
    findAssignmentsForCourse,
    findAssignmentById,
    createAssignment,
    updateAssignment,
    deleteAssignment,
  };
}