"use client";

import { useEffect, useState, KeyboardEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { ListGroup, Button, FormControl } from "react-bootstrap";

import type { RootState } from "@/app/(Kambaz)/store";
import {
  setModules,
  addModule,
  editModule,
  updateModuleLocal,
  updateModule as saveModule,
  deleteModule as removeModule,
} from "./reducer";
import * as client from "./client";

const ModulesPage = () => {
  const { cid } = useParams<{ cid: string }>();

  const dispatch = useDispatch();
  const { modules } = useSelector(
    (state: any) => state.modulesReducer
  );

  const [newModuleName, setNewModuleName] = useState("");

  // load modules from server for this course
  const fetchModules = async () => {
    if (!cid) return;
    const data = await client.findModulesForCourse(cid);
    dispatch(setModules(data));
  };

  useEffect(() => {
    fetchModules();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cid]);

  // create new module
  const onCreateModuleForCourse = async () => {
    if (!cid || !newModuleName.trim()) return;

    const body = { name: newModuleName.trim(), course: cid };
    const createdModule = await client.createModuleForCourse(cid, body);
    dispatch(addModule(createdModule));
    setNewModuleName("");
  };

  // delete module
  const onRemoveModule = async (moduleId: string) => {
    await client.deleteModule(moduleId);
    dispatch(removeModule(moduleId));
  };

  // save updated module name to server
  const onSaveModule = async (module: any) => {
    const updated = await client.updateModule({
      ...module,
      editing: false,
    });
    dispatch(saveModule(updated));
  };

  // when typing in module name input
  const onNameChange = (module: any, value: string) => {
    dispatch(
      updateModuleLocal({
        ...module,
        name: value,
      })
    );
  };

  const handleNameKey = (module: any, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSaveModule(module);
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-3">modules</h3>

      {/* controls */}
      <div className="d-flex mb-3 gap-2">
        <FormControl
          placeholder="new module name"
          value={newModuleName}
          onChange={(e) => setNewModuleName(e.target.value)}
        />
        <Button onClick={onCreateModuleForCourse}>add module</Button>
      </div>

      {/* list */}
      <ListGroup id="wd-modules" className="rounded-0">
        {modules.map((module: any) => (
          <ListGroup.Item
            key={module._id}
            className="d-flex justify-content-between align-items-center"
          >
            <div className="flex-grow-1">
              {!module.editing && (
                <span
                  onClick={() =>
                    dispatch(editModule(module._id as string))
                  }
                  style={{ cursor: "pointer" }}
                >
                  {module.name}
                </span>
              )}

              {module.editing && (
                <FormControl
                  className="w-75 d-inline-block"
                  value={module.name ?? ""}
                  onChange={(e) =>
                    onNameChange(module, e.target.value)
                  }
                  onKeyDown={(e) =>
                    handleNameKey(module, e as any)
                  }
                  autoFocus
                />
              )}
            </div>

            <div className="btn-group btn-group-sm">
              {module.editing && (
                <Button
                  variant="success"
                  onClick={() => onSaveModule(module)}
                >
                  save
                </Button>
              )}

              <Button
                variant="outline-danger"
                onClick={() =>
                  onRemoveModule(module._id as string)
                }
              >
                delete
              </Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default ModulesPage;

//Notes:	•	uses client.ts for server calls
//	•	uses reducer.ts for redux state
//	•	fetches modules for course on mount
//	•	allows creating, updating (inline), deleting modules
//	•	loads modules for the current course from the server on mount
//	•	lets you create, rename, and delete modules
//	•	no fake Database imports, all REST