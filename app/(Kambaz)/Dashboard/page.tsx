"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import * as coursesClient from "../Courses/client";
import * as enrollmentsClient from "../Enrollments/client";

import {
  setCourses,
  type Course,
} from "../Courses/reducer";
import {
  setEnrollments,
  enrollInCourse as enrollInState,
  unenrollFromCourse as unenrollFromState,
} from "../Enrollments/reducer";

import type { RootState } from "../store";

const Dashboard = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { courses } = useSelector(
    (state: RootState) => state.assignments
  );
  const { courseIds: enrolledCourseIds } = useSelector(
    (state: RootState) => state.enrollments
  );

  const [showAll, setShowAll] = useState(false);

  // load courses + enrollments
  const loadData = async () => {
    const [allCourses, enrollments] = await Promise.all([
      coursesClient.findAllCourses(),
      enrollmentsClient.findEnrollmentsForCurrentUser(),
    ]);

    dispatch(setCourses(allCourses));
    dispatch(setEnrollments(enrollments));
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isEnrolled = (courseId?: string) =>
    !!courseId && enrolledCourseIds.includes(courseId);

  const visibleCourses: Course[] = showAll
    ? courses
    : courses.filter((c) => isEnrolled(c._id));

  const handleToggleView = () => {
    setShowAll(!showAll);
  };

  const handleEnroll = async (courseId: string) => {
    await enrollmentsClient.enrollInCourse(courseId);
    dispatch(enrollInState(courseId));
  };

  const handleUnenroll = async (courseId: string) => {
    await enrollmentsClient.unenrollFromCourse(courseId);
    dispatch(unenrollFromState(courseId));
  };

  const openCourse = (courseId: string) => {
    if (!isEnrolled(courseId)) {
      return;
    }
    router.push(`/Courses/${courseId}`);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">dashboard</h2>

        <button
          className="btn btn-primary"
          onClick={handleToggleView}
          id="wd-enrollments-toggle"
        >
          {showAll ? "show my courses" : "show all courses"}
        </button>
      </div>

      <ul className="list-group">
        {visibleCourses.map((course) => {
          const enrolled = isEnrolled(course._id);
          return (
            <li
              key={course._id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <span
                style={{
                  cursor: enrolled ? "pointer" : "default",
                  opacity: enrolled ? 1 : 0.6,
                }}
                onClick={() =>
                  course._id && openCourse(course._id)
                }
              >
                {course.number} · {course.name}
              </span>

              <div className="btn-group">
                {enrolled ? (
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() =>
                      course._id &&
                      handleUnenroll(course._id)
                    }
                  >
                    unenroll
                  </button>
                ) : (
                  <button
                    className="btn btn-sm btn-success"
                    onClick={() =>
                      course._id && handleEnroll(course._id)
                    }
                  >
                    enroll
                  </button>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Dashboard;


//Notes:  
//	•	fetch all courses (not just enrolled)
//	•	fetch enrollments for current user
//	•	toggle between “All courses” and “My courses”
//	•	show Enroll / Unenroll buttons
//   •	navigate to course page on click if enrolled  