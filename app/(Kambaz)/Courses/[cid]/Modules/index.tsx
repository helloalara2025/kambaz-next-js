"use client";
// modules
// server backed list of modules for a single course
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import {
  setModules,
  addModule,
  editModule,
  updateModule,
  deleteModule,
} from "./reducer";
import ModulesControls from "./ModulesControls";

type Module = {
  _id: string;
  name: string;
  lessons: unknown[];
  course: string;
  [key: string]: unknown;
};

const coursesClient = {
  async findModulesForCourse(cid: string): Promise<Module[]> {
    const res = await fetch(`/api/courses/${cid}/modules`);
    if (!res.ok) {
      throw new Error("failed to fetch modules");
    }
    return (await res.json()) as Module[];
  },

  async createModuleForCourse(
    cid: string,
    newModule: Partial<Module> & Record<string, unknown>
  ): Promise<Module> {
    const res = await fetch(`/api/courses/${cid}/modules`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newModule),
    });
    if (!res.ok) {
      throw new Error("failed to create module");
    }
    return (await res.json()) as Module;
  },
};

export default function ModulesList() {
  const params = useParams() as { cid?: string };
  const cid = params?.cid;

  // typed redux state
  type RootState = { modulesReducer: { modules: Module[] } };
  const [moduleName, setModuleName] = useState("");

  // modules slice from redux
  const { modules } = useSelector((state: RootState) => state.modulesReducer);
  const dispatch = useDispatch();

  // load modules for this course from the server
  const fetchModules = async () => {
    if (!cid) return;
    try {
      const serverModules = await coursesClient.findModulesForCourse(cid);
      dispatch(setModules(serverModules));
    } catch (e) {
      console.error("error fetching modules", e);
    }
  };

  useEffect(() => {
    void fetchModules();
  }, [cid]);

  // create a new module for this course on the server
  const onCreateModuleForCourse = async () => {
    if (!cid || !moduleName.trim()) return;

    const newModule = { name: moduleName, course: cid };

    try {
      const created = await coursesClient.createModuleForCourse(cid, newModule);

      dispatch(setModules([...modules, created]));

      setModuleName("");
    } catch (e) {
      console.error("error creating module", e);
    }
  };

  return (
    <section id="wd-modules" className="d-flex flex-column gap-3">
      <ModulesControls
        moduleName={moduleName}
        setModuleName={setModuleName}
        addModule={onCreateModuleForCourse}
      />

      <ul className="list-group rounded-0">
        {modules.map((module: Module) => (
          <li key={module._id} className="list-group-item">
            {module.name}
          </li>
        ))}

        {modules.length === 0 && (
          <li className="list-group-item text-muted">
            no modules for this course yet
          </li>
        )}
      </ul>
    </section>
  );
}