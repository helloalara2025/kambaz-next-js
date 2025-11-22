"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { Form, Button } from "react-bootstrap";

import * as client from "../client";
import {
  addAssignment,
  updateAssignment as updateAssignmentInState,
  setAssignments,
} from "../reducer"
import type { RootState } from "@/app/(Kambaz)/store";

const emptyAssignment = {
  title: "",
  description: "",
  points: 100,
  dueDate: "",
  availableFrom: "",
  availableUntil: "",
};

const AssignmentEditorPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { cid, aid } = useParams<{ cid: string; aid: string }>();

  const assignments = useSelector((state: any) => state.assignments?.assignments ?? []);

  const [assignment, setAssignment] = useState<any>(emptyAssignment);
  const [pending, setPending] = useState(false);

  const isNew = aid === "new";

  // load assignments if needed and pick current one
  useEffect(() => {
    const init = async () => {
      if (!cid) return;

      // if we already have them in state
      if (assignments.length > 0 && !isNew) {
        const found = assignments.find((a: { _id: string; }) => a._id === aid);
        if (found) {
          setAssignment(found);
          return;
        }
      }

      // otherwise refetch from server
      const data = await client.findAssignmentsForCourse(cid);
      dispatch(setAssignments(data));

      if (!isNew) {
        const found = data.find((a: any) => a._id === aid);
        if (found) {
          setAssignment(found);
        }
      }
    };

    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cid, aid, isNew]);

  const onChange = (field: string, value: any) => {
    setAssignment({ ...assignment, [field]: value });
  };

  const onCancel = () => {
    if (!cid) return;
    router.push(`/Courses/${cid}/Assignments`);
  };

  const onSave = async () => {
    if (!cid) return;

    setPending(true);

    try {
      if (isNew) {
        // create
        const created = await client.createAssignmentForCourse(cid, {
          ...assignment,
          course: cid,
        });
        dispatch(addAssignment(created));
      } else {
        // update
        const updated = await client.updateAssignment(assignment);
        dispatch(updateAssignmentInState(updated));
      }

      router.push(`/Courses/${cid}/Assignments`);
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-3">
        {isNew ? "new assignment" : "edit assignment"}
      </h3>

      <Form>
        <Form.Group className="mb-3">
          <Form.Label>name</Form.Label>
          <Form.Control
            value={assignment.title ?? ""}
            onChange={(e) => onChange("title", e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={assignment.description ?? ""}
            onChange={(e) => onChange("description", e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>points</Form.Label>
          <Form.Control
            type="number"
            value={assignment.points ?? 0}
            onChange={(e) => onChange("points", Number(e.target.value))}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>due date</Form.Label>
          <Form.Control
            type="date"
            value={assignment.dueDate ?? ""}
            onChange={(e) => onChange("dueDate", e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>available from</Form.Label>
          <Form.Control
            type="date"
            value={assignment.availableFrom ?? ""}
            onChange={(e) => onChange("availableFrom", e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>available until</Form.Label>
          <Form.Control
            type="date"
            value={assignment.availableUntil ?? ""}
            onChange={(e) => onChange("availableUntil", e.target.value)}
          />
        </Form.Group>

        <div className="d-flex gap-2">
          <Button
            variant="secondary"
            type="button"
            onClick={onCancel}
            disabled={pending}
          >
            cancel
          </Button>

          <Button
            variant="primary"
            type="button"
            onClick={onSave}
            disabled={pending}
          >
            {pending ? "saving…" : "save"}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AssignmentEditorPage;