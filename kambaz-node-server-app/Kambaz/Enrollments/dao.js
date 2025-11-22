import enrollments from "../Database/enrollments.json" assert { type: "json" };
import courses from "../Database/courses.json" assert { type: "json" };

// return all courseIds enrolled by a given user
export const findEnrollmentsForUser = (userId) => {
  return enrollments
    .filter((en) => en.user === userId)
    .map((en) => en.course);
};

// enroll a user in a course
export const enrollUserInCourse = (userId, courseId) => {
  const exists = enrollments.find(
    (en) => en.user === userId && en.course === courseId
  );
  if (!exists) {
    enrollments.push({ user: userId, course: courseId });
  }
  return enrollments;
};

// unenroll a user from a course
export const unenrollUserFromCourse = (userId, courseId) => {
  const index = enrollments.findIndex(
    (en) => en.user === userId && en.course === courseId
  );
  if (index >= 0) enrollments.splice(index, 1);
  return enrollments;
};
