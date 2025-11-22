"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { ListGroup, Button } from "react-bootstrap";

import * as client from "./client";
import {
  setAssignments,
  deleteAssignment as removeAssignment,
} from "./reducer";
import type { RootState } from "@/app/(Kambaz)/store";

const AssignmentsPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { cid } = useParams<{ cid: string }>();

  const assignments = useSelector((state: RootState) => {
    // support different possible RootState shapes: the assignments array might live
    // directly on state.assignments, inside state.assignments.assignments, or under state.courses.assignments
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const s = state as any;
    return s.assignments?.assignments ?? s.assignments ?? s.courses?.assignments ?? [];
  });

  const loadAssignments = async () => {
    if (!cid) return;
    const data = await client.findAssignmentsForCourse(cid);
    dispatch(setAssignments(data));
  };

  useEffect(() => {
    loadAssignments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cid]);

  // navigate to editor for new assignment
  const onCreate = () => {
    if (!cid) return;
    router.push(`/Courses/${cid}/Assignments/new`);
  };

  // navigate to editor for existing assignment
  const onEdit = (aid: string) => {
    if (!cid) return;
    router.push(`/Courses/${cid}/Assignments/${aid}`);
  };

  // delete assignment with confirm
  const onDelete = async (aid: string) => {
    const ok = window.confirm(
      "are you sure you want to remove this assignment?"
    );
    if (!ok) return;

    await client.deleteAssignment(aid);
    dispatch(removeAssignment(aid));
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="mb-0">assignments</h3>
        <Button id="wd-add-assignment" onClick={onCreate}>
          + assignment
        </Button>
      </div>

      <ListGroup id="wd-assignments">
        {assignments.map((a: any) => (
          <ListGroup.Item
            key={a._id}
            className="d-flex justify-content-between align-items-center"
          >
            <div onClick={() => onEdit(a._id as string)} style={{ cursor: "pointer" }}>
              <div className="fw-semibold">{a.title}</div>
              <div className="small text-muted">
                {a.points} pts · due {a.dueDate}
              </div>
            </div>

            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => onDelete(a._id as string)}
            >
              delete
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default AssignmentsPage;

//Notes:	•	uses client.ts for server calls
//	•	uses reducer.ts for redux state
//	•	fetches assignments for course on mount
//	•	allows creating, editing (navigate to editor), deleting assignments
//	•	loads assignments for the current course from the server on mount
//	•	navigates to assignment editor for creating and editing assignments
//	•	allows deleting assignments with confirmation