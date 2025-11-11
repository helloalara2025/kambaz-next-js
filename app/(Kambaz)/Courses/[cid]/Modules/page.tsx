'use client';

import { addModule, editModule, updateModule, deleteModule }
  from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import { useState } from 'react';
import ModulesControls from './ModulesControls';
import ModuleControlButtons from './ModuleControlButtons';
import { FormControl } from 'react-bootstrap';
import { BsGripVertical } from 'react-icons/bs';

/*
  modules index for a course
  renders module cards for the given cid
*/

import { useParams } from 'next/navigation';
import * as db from '../../../Database';

// data shapes from our tiny JSON db
export type Lesson = { _id: string; name: string; description?: string; module: string };
export type ModuleT = { _id: string; name: string; description?: string; course: string; lessons: Lesson[]; editing?: boolean };
export type Course = { _id: string; name: string; description?: string };

export default function ModulesPage() {
  const { cid } = useParams<{ cid: string }>();

  // redux: read modules from store
  // redux: read modules from store
  const { modules } = useSelector((state: { modulesReducer: { modules: ModuleT[] } }) => state.modulesReducer);
  const dispatch = useDispatch();
  // input: new module name
  const [moduleName, setModuleName] = useState('');

  // add new module via reducer
  const handleAddModule = () => {
    const newModule: ModuleT = {
      _id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      name: moduleName,
      course: cid as string,
      lessons: [],
      editing: false,
    };

    dispatch(addModule(newModule));
    setModuleName('');
  };

  const filtered: ModuleT[] = (modules ?? []).filter((m: ModuleT) => m.course === (cid as string));
  const course = ((db.courses as Course[]) ?? []).find((c) => c._id === cid);

  return (
    <div id="wd-modules" className="container-fluid">
      <h1 className="mb-1">{course?.name ?? 'Course'}</h1>
      <h2 className="h5 text-muted">Modules <span className="badge text-bg-secondary ms-2">{filtered.length}</span></h2>
      <hr />

      <ModulesControls
        setModuleName={setModuleName}
        moduleName={moduleName}
        addModule={handleAddModule}
      />

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {filtered.map((module: ModuleT) => (
          <div key={module._id} className="col">
            <div className="card h-100 shadow-sm">
              <div className="card-body d-flex flex-column">
                <ModuleControlButtons
                  moduleId={module._id}
                  deleteModule={(moduleId) => dispatch(deleteModule(moduleId))}
                  editModule={(moduleId) => dispatch(editModule(moduleId))}
                />
                <div className="wd-title p-3 ps-2 bg-secondary-subtle">
                  <BsGripVertical className="me-2 fs-3" />
                  {!module.editing && module.name}
                  {module.editing && (
                    <FormControl
                      className="w-50 d-inline-block"
                      defaultValue={module.name}
                      onChange={(e) => dispatch(updateModule({ ...module, name: e.target.value }))}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          dispatch(updateModule({ ...module, editing: false }));
                        }
                      }}
                    />
                  )}
                </div>
                <p className="card-text text-muted small mb-3">{module.description ?? '—'}</p>
                {module.lessons && module.lessons.length > 0 && (
                  <ul className="list-group list-group-flush small mb-3">
                    {module.lessons.slice(0, 4).map((l) => (
                      <li key={l._id} className="list-group-item px-0 py-1 text-truncate" title={l.name}>{l.name}</li>
                    ))}
                  </ul>
                )}
                <div className="mt-auto text-muted small">Lessons: {module.lessons?.length ?? 0}</div>
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="col-12">
            <div className="alert alert-warning mb-0">No modules found for this course.</div>
          </div>
        )}
      </div>
    </div>
  );
}