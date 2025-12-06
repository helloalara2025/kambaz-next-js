// The + Quiz button
"use client";
import { Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";

/**
 * QuizzesControls component props.
 * Interface (not constants) because these are dynamic runtime values
 * passed from parent component, not fixed compile-time constants.
 */
interface QuizControlProps {
  searchTerm: string; // Dynamic: changes as user types (not a constant)
  setSearchTerm: (term: string) => void; // Function: updates parent state (not a constant)
  addQuiz: () => void; // Callback: triggers quiz creation (not a constant)
  isFaculty: boolean; // Computed: based on user role (not a constant)
}

export default function QuizzesControls({
  searchTerm,
  setSearchTerm,
  addQuiz,
  isFaculty,
}: QuizControlProps) {
  return (
    <div className="d-flex justify-content-between align-items-center mb-4">
      {/* search bar and add quiz button */}
      <div className="input-group" style={{ maxWidth: "300px" }}>
        <span className="input-group-text">
          <i className="bi bi-search"></i>
        </span>

        <input
          type="text"
          className="form-control"
          placeholder="Search quizzes…"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {/* Add Quiz Button - Right Side (Faculty Only) */}
      {isFaculty && (
        <Button 
        className="btn btn-danger" 
        onClick={addQuiz}>
            <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
               Quiz
        </Button>
      )}
    </div>
  );
}
