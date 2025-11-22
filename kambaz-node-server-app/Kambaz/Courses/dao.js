// kambaz-node-server-app/Kambaz/Courses/dao.js

// DAO for working with courses in the in-memory Kambaz DB

export default function CoursesDao(db) {
  const { courses, enrollments } = db;

  const findAllCourses = () => {
    return courses;
  };

  const findCourseById = (courseId) => {
    return courses.find((c) => c._id === courseId) || null;
  };

  // return only the courses where the user is enrolled
  const findCoursesForEnrolledUser = (userId) => {
    const userEnrollments = enrollments.filter((e) => e.user === userId);
    const courseIds = new Set(userEnrollments.map((e) => e.course));
    return courses.filter((c) => courseIds.has(c._id));
  };

  const createCourse = (course) => {
    const newId = `c${Date.now()}`;
    const newCourse = {
      _id: newId,
      name: course.name ?? "",
      number: course.number ?? "",
      ...course,
    };
    courses.push(newCourse);
    return newCourse;
  };

  const updateCourse = (courseId, updates) => {
    const course = findCourseById(courseId);
    if (!course) {
      return null;
    }
    Object.assign(course, updates);
    return course;
  };

  const deleteCourse = (courseId) => {
    const index = courses.findIndex((c) => c._id === courseId);
    if (index === -1) {
      return false;
    }

    courses.splice(index, 1);

    for (let i = enrollments.length - 1; i >= 0; i--) {
      if (enrollments[i].course === courseId) {
        enrollments.splice(i, 1);
      }
    }

    return true;
  };

  return {
    findAllCourses,
    findCourseById,
    findCoursesForEnrolledUser,
    createCourse,
    updateCourse,
    deleteCourse,
  };
}