'use client';

import { setModules, addModule, editModule, updateModule, deleteModule }
  from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from 'react';
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
import * as client from '../../client';

// data shapes from our tiny JSON db
export type Lesson = { _id: string; name: string; description?: string; module: string };
export type ModuleT = { _id: string; name: string; description?: string; course: string; lessons: Lesson[]; editing?: boolean };
export type Course = { _id: string; name: string; description?: string };

export default function ModulesPage() {
  const { cid } = useParams<{ cid: string }>();

  // redux: read modules from store
  const { modules } = useSelector((state: { modulesReducer: { modules: ModuleT[] } }) => state.modulesReducer);
  const dispatch = useDispatch();
  // input: new module name
  const [moduleName, setModuleName] = useState('');

  const fetchModules = async () => {
    try {
      const serverModules = await client.findModulesForCourse(cid as string);
      dispatch(setModules(serverModules));
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchModules();
  }, [cid]);

  const course = ((db.courses as Course[]) ?? []).find((c) => c._id === cid);

  const onRemoveModule = async (moduleId: string) => {
    try {
      await client.deleteModule(moduleId);
      dispatch(
        setModules(modules.filter((m: ModuleT) => m._id !== moduleId))
      );
    } catch (e) {
      console.error(e);
    }
  };

  const onUpdateModule = async (module: ModuleT) => {
    try {
      const updated = await client.updateModule({
        ...module,
        title: module.name,
        content: module.description,
      });
      const newModules = modules.map((m: ModuleT) =>
        m._id === updated._id ? updated : m
      );
      dispatch(setModules(newModules));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div id="wd-modules" className="container-fluid">
      <h1 className="mb-1">{course?.name ?? 'Course'}</h1>
      <h2 className="h5 text-muted">Modules <span className="badge text-bg-secondary ms-2">{modules.length}</span></h2>
      <hr />

      <ModulesControls
        setModuleName={setModuleName}
        moduleName={moduleName}
        addModule={handleAddModule}
      />

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {modules.map((module: ModuleT) => (
          <div key={module._id} className="col">
            <div className="card h-100 shadow-sm">
              <div className="card-body d-flex flex-column">
                <ModuleControlButtons
                  moduleId={module._id}
                  deleteModule={(moduleId) => onRemoveModule(moduleId)}
                  editModule={(moduleId) => dispatch(editModule(moduleId))}
                />
                <div className="wd-title p-3 ps-2 bg-secondary-subtle">
                  <BsGripVertical className="me-2 fs-3" />
                  {!module.editing && module.name}
                  {module.editing && (
                    <FormControl
                      className="w-50 d-inline-block"
                      value={module.name}
                      onChange={(e) =>
                        dispatch(updateModule({ ...module, name: e.target.value }))
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          void onUpdateModule({ ...module, editing: false });
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

        {modules.length === 0 && (
          <div className="col-12">
            <div className="alert alert-warning mb-0">No modules found for this course.</div>
          </div>
        )}
      </div>
    </div>
  );

  // add new module via reducer
  function handleAddModule() {
    const newModule: ModuleT = {
      _id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      name: moduleName,
      course: cid as string,
      lessons: [],
      editing: false,
    };

    dispatch(addModule(newModule));
    setModuleName('');
  }
}