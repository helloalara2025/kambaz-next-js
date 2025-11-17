// app/Labs/Lab5/WorkingWithObjects.tsx
"use client";

import { useState } from "react";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER ?? "http://localhost:4000";

interface Assignment {
  title: string;
  score?: number;
  completed?: boolean;
}

interface ModuleObj {
  id: string;
  name: string;
  description: string;
  course: string;
}

export default function WorkingWithObjects() {
  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [moduleObj, setModuleObj] = useState<ModuleObj | null>(null);

  const [newTitle, setNewTitle] = useState("");
  const [newModuleName, setNewModuleName] = useState("");

  // helpers
  const fetchJson = async (url: string) => {
    const res = await fetch(url);
    return res.json();
  };

  const getAssignment = async () => {
    const data = await fetchJson(`${HTTP_SERVER}/lab5/assignment`);
    setAssignment(data);
  };

  const getAssignmentTitle = async () => {
    const res = await fetch(`${HTTP_SERVER}/lab5/assignment/title`);
    const text = await res.text();
    setAssignment((prev) => ({ ...(prev ?? {}), title: text }));
  };

  const updateAssignmentTitle = async () => {
    if (!newTitle.trim()) return;
    const data = await fetchJson(
      `${HTTP_SERVER}/lab5/assignment/title/${encodeURIComponent(newTitle)}`
    );
    setAssignment(data);
  };

  const getModule = async () => {
    const data = await fetchJson(`${HTTP_SERVER}/lab5/module`);
    setModuleObj(data);
  };

  const getModuleName = async () => {
    const res = await fetch(`${HTTP_SERVER}/lab5/module/name`);
    const text = await res.text();
    setModuleObj((prev) => (prev ? { ...prev, name: text } : null));
  };

  const updateModuleName = async () => {
    if (!newModuleName.trim()) return;
    const data = await fetchJson(
      `${HTTP_SERVER}/lab5/module/name/${encodeURIComponent(newModuleName)}`
    );
    setModuleObj(data);
  };

  return (
    <div id="wd-working-with-objects" className="mt-4">
      <h3>Working With Objects</h3>

      {/* ASSIGNMENT SECTION */}
      <section id="wd-assignment-section" className="mb-4">
        <h4>Assignment</h4>

        <div className="mb-2">
          <button
            id="wd-get-assignment"
            className="btn btn-sm btn-primary me-2"
            onClick={getAssignment}
          >
            Get Assignment
          </button>

          <button
            id="wd-get-assignment-title"
            className="btn btn-sm btn-outline-primary me-2"
            onClick={getAssignmentTitle}
          >
            Get Title
          </button>
        </div>

        <div className="mb-2 d-flex align-items-center">
          <input
            id="wd-assignment-new-title"
            className="form-control form-control-sm me-2"
            placeholder="New assignment title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <button
            id="wd-update-assignment-title"
            className="btn btn-sm btn-success"
            onClick={updateAssignmentTitle}
          >
            Update Title
          </button>
        </div>

        <pre id="wd-assignment-json" className="small bg-light p-2">
          {assignment ? JSON.stringify(assignment, null, 2) : "No assignment loaded yet"}
        </pre>
      </section>

      {/* MODULE SECTION */}
      <section id="wd-module-section">
        <h4>Module</h4>

        <div className="mb-2">
          <button
            id="wd-get-module"
            className="btn btn-sm btn-primary me-2"
            onClick={getModule}
          >
            Get Module
          </button>

          <button
            id="wd-get-module-name"
            className="btn btn-sm btn-outline-primary me-2"
            onClick={getModuleName}
          >
            Get Module Name
          </button>
        </div>

        <div className="mb-2 d-flex align-items-center">
          <input
            id="wd-module-new-name"
            className="form-control form-control-sm me-2"
            placeholder="New module name"
            value={newModuleName}
            onChange={(e) => setNewModuleName(e.target.value)}
          />
          <button
            id="wd-update-module-name"
            className="btn btn-sm btn-success"
            onClick={updateModuleName}
          >
            Update Module Name
          </button>
        </div>

        <pre id="wd-module-json" className="small bg-light p-2">
          {moduleObj ? JSON.stringify(moduleObj, null, 2) : "No module loaded yet"}
        </pre>
      </section>
    </div>
  );
}