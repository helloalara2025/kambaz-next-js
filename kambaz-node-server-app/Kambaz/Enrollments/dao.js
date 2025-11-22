import { createRequire } from "module";
const require = createRequire(import.meta.url);

export default function EnrollmentsDao(db) {
  return {
    findEnrollmentsForUser: (userId) => {
      return db.enrollments.filter((e) => e.user === userId);
    },

    enrollUserInCourse: (userId, courseId) => {
      const newEnrollment = {
        user: userId,
        course: courseId,
      };
      db.enrollments.push(newEnrollment);
      return newEnrollment;
    },

    unenrollUserFromCourse: (userId, courseId) => {
      const index = db.enrollments.findIndex(
        (e) => e.user === userId && e.course === courseId
      );
      if (index !== -1) {
        db.enrollments.splice(index, 1);
        return true;
      }
      return false;
    }
  };
}