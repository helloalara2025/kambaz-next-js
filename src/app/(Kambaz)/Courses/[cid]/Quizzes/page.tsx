"use client";
/*
  Quiz List Page - Req
  1 - Empty state prompting “Add Quiz”.
  2 - Displays sorted quiz list.
  3 - + Quiz creates default quiz and navigates to editor.
  4 - 3-dots menu: Edit, Delete, Publish/Unpublish, Preview.
  5 - Published quizzes show green check.
  6 - Clicking title opens Quiz Details.
*/

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import * as client from "../../client";
import { toast } from 'react-toastify'; // Toast notifications
import QuizzesControls from "./QuizzesControls"; // Component import
// Redux imports 
import { setQuizzes, deleteQuiz as deleteQuizAction } from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";

export default function Quizzes() {
  const { cid } = useParams();
  const router = useRouter();

  // Redux state
  const { quizzes } = useSelector((state: RootState) => state.quizzesReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const isFaculty = currentUser?.role === "FACULTY";

  /* Load quizzes from backend */
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        setLoading(true);
        const data = await client.findQuizzesForCourse(cid as string);
        dispatch(setQuizzes(data));
      } catch (e) {
        console.error("Failed to load quizzes:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchQuizzes();
  }, [cid, dispatch]);

  /* CREATE QUIZ - Creates via API and navigates to editor */
  const handleCreateQuiz = async () => {
    try {
      const newQuiz = await client.createQuiz(cid as string, {
        title: "New Quiz",
        published: false,
        // availableDate: null,
        // untilDate: null,
        // dueDate: null,
        points: 0,
        questions: [],
      });
      dispatch(setQuizzes([...quizzes, newQuiz]));
      router.push(`/Dashboard/Courses/${cid}/Quizzes/${newQuiz._id}/edit`);
    } catch (e) {
      console.error("Failed to create quiz:", e);
        toast.error("Failed to create quiz");
    }
  };

  /* DELETE QUIZ - Deletes via API and updates Redux */
  const handleDeleteQuiz = async (quizId: string) => {
    if (!confirm("Delete this quiz?")) 
      return;
    try {
      await client.deleteQuiz(cid as string, quizId);
      dispatch(deleteQuizAction(quizId));
    } catch (e) {
      console.error("Failed to delete quiz:", e);
      toast.error("Failed to delete quiz");
    }
  };

  /* TOGGLE PUBLISH - Updates via API and reloads quizzes */
  const togglePublish = async (quiz: any) => {
    try {
      await client.publishQuiz(cid as string, quiz._id);
      const updatedQuizzes = await client.findQuizzesForCourse(cid as string);
      dispatch(setQuizzes(updatedQuizzes));
    } catch (error) {
      console.error("Failed to toggle publish:", error);
      toast.error("Failed to update quiz");
    }
  };

  /* Get availability status based on dates */
  const getAvailabilityStatus = (quiz: any) => {
    const now = new Date();
    const from = quiz.availableDate ? new Date(quiz.availableDate) : null;
    const until = quiz.untilDate ? new Date(quiz.untilDate) : null;

    if (from && now < from)
      return `Not available until ${from.toLocaleDateString()}`;
    if (until && now > until) return "Closed";
    return "Available";
  };

  /* Filter quizzes based on search term */
  const filtered = quizzes.filter((q: any) =>
    q.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /* Show published quizzes ONLY TO STUDENTS */
  const displayQuizzes = isFaculty
    ? filtered
    : filtered.filter((q) => q.published);

    /* Loading state */
    if (loading) {
      return (
    <div className="container-fluid mt-4 text-center">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="mt-2">Loading quizzes...</p>
    </div>
      );
    }
    
  /* Render quiz list */
  return (
    <div className="container-fluid" id="wd-quizzes">

      { /* Testing utility: switch between faculty/student */}
      {/* <div className="alert alert-info mb-3">
        Logged in as:{" "}
        <strong>
          {currentUser?.firstName} {currentUser?.lastName}
        </strong>{" "}
        ({currentUser?.role})
        <button
          className="btn btn-sm btn-outline-primary ms-3"
          onClick={() =>
            setCurrentUser(
              currentUser?.role === "FACULTY"
                ? { ...mockUser, role: "STUDENT" }
                : mockUser
            )
          }
        >
          Switch to {isFaculty ? "Student" : "Faculty"}
        </button>
      </div> */}

      {/* search bar and add quiz button */}
      <QuizzesControls
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      addQuiz={handleCreateQuiz}
      isFaculty={isFaculty}
      />

      {/* Quiz list container */}
      <ul className="list-group">

        {/* section label */}
        <li className="list-group-item bg-light border-0">
          <h5 className="mb-0">
            <i className="bi bi-grip-vertical me-2"></i>
            Assignment Quizzes
          </h5>
        </li>

        {/* empty state */}
        {displayQuizzes.length === 0 ? (
          <li className="list-group-item text-center py-5">
            {isFaculty ? (
              <>
                <p className="text-muted mb-2">No quizzes yet</p>
                <button className="btn btn-primary" onClick={handleCreateQuiz}>
                  <i className="bi bi-plus-lg"></i> Create Your First Quiz
                </button>
              </>
            ) : (
              <p className="text-muted">No quizzes available</p>
            )}
          </li>
        ) : (
          /* quiz item rows*/
          displayQuizzes.map((quiz) => (
            <li
              key={quiz._id}
              className="list-group-item d-flex align-items-start py-3 px-2"
            >
              {/* Drag handle (FACULTY only) */}
              {isFaculty && (
                <i className="bi bi-grip-vertical text-muted me-3 mt-2"></i>
              )}

              {/* Quiz icon */}
              <i
                className="bi bi-rocket-takeoff text-success me-3 mt-2"
                // style={{ fontSize: "1.5rem" }}
              ></i>

              {/* title + metadata */}
              <div className="flex-grow-1">
                {/* quiz details (or Take view for students) */}
                <Link
                  href={
                    isFaculty
                      ? `/Dashboard/Courses/${cid}/Quizzes/${quiz._id}` /* navigating to the quiz details */
                      : `/Dashboard/Courses/${cid}/Quizzes/${quiz._id}/take`
                  }
                  className="fw-bold text-dark text-decoration-none"
                >
                  {quiz.title}
                </Link>

                {/* availability, due, points, questions */}
                <div className="text-muted small mt-1">
                  <span className="me-3">
                    <strong>{getAvailabilityStatus(quiz)}</strong>
                  </span>
                  <span className="me-2">|</span>
                  <span className="me-3">
                    <strong>Due:</strong>{" "}
                    {quiz.dueDate
                      ? new Date(quiz.dueDate).toLocaleDateString()
                      : "No due date"}
                  </span>
                  <span className="me-2">|</span>
                  <span className="me-3">{quiz.points || 0} pts</span>
                  <span className="me-2">|</span>
                  <span>{quiz.questions?.length || 0} Questions</span>
                </div>
              </div>

              {/* Faculty actions: Publish + 3-dot menu */}
              {isFaculty && (
                <div className="d-flex align-items-center">
                  {/* Publish/Unpublish toggle */}
                  <button
                    className="btn btn-link text-decoration-none me-2"
                    onClick={() => togglePublish(quiz)}
                  >
                    {quiz.published ? (
                      <i className="bi bi-check-circle-fill text-success fs-4"></i>
                    ) : (
                      <i className="bi bi-slash-circle text-secondary fs-4"></i>
                    )}
                  </button>

                  {/* 3-dots dropdown menu */}
                  <div className="dropdown">
                    <button
                      className="btn btn-link text-dark"
                      data-bs-toggle="dropdown"
                    >
                      <i className="bi bi-three-dots-vertical"></i>
                    </button>

                    <ul className="dropdown-menu dropdown-menu-end">
                      {/* edit */}
                      <li>
                        <Link
                          className="dropdown-item"
                          href={`/Dashboard/Courses/${cid}/Quizzes/${quiz._id}`}
                        >
                          <i className="bi bi-pencil me-2"></i>Edit
                        </Link>
                      </li>

                      {/* delete */}
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => handleDeleteQuiz(quiz._id)}
                        >
                          <i className="bi bi-trash me-2"></i>Delete
                        </button>
                      </li>

                      {/* publish/unpublish */}
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => togglePublish(quiz)}
                        >
                          <i
                            className={`bi ${
                              quiz.published ? "bi-x-circle" : "bi-check-circle"
                            } me-2`}
                          ></i>
                          {quiz.published ? "Unpublish" : "Publish"}
                        </button>
                      </li>

                      <li>
                        <hr className="dropdown-divider" />
                      </li>

                      <li>
                        <Link
                          className="dropdown-item"
                          href={`/Dashboard/Courses/${cid}/Quizzes/${quiz._id}/preview`}
                        >
                          <i className="bi bi-eye me-2"></i>Preview
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}