'use client';

/*
  modules index for a course
  renders module cards for the given cid
*/

import { useParams } from 'next/navigation';
import * as db from '../../../Database';

// data shapes from our tiny JSON db
export type Lesson = { _id: string; name: string; description?: string; module: string };
export type ModuleT = { _id: string; name: string; description?: string; course: string; lessons?: Lesson[] };
export type Course = { _id: string; name: string; description?: string };

export default function ModulesPage() {
  const { cid } = useParams<{ cid: string }>();

  const modules = ((db.modules as ModuleT[]) ?? []).filter((m) => m.course === cid);
  const course = ((db.courses as Course[]) ?? []).find((c) => c._id === cid);

  return (
    <div id="wd-modules" className="container-fluid">
      <h1 className="mb-1">{course?.name ?? 'Course'}</h1>
      <h2 className="h5 text-muted">Modules <span className="badge text-bg-secondary ms-2">{modules.length}</span></h2>
      <hr />

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {modules.map((m) => (
          <div key={m._id} className="col">
            <div className="card h-100 shadow-sm">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title text-truncate" title={m.name}>{m.name}</h5>
                <p className="card-text text-muted small mb-3">{m.description ?? '—'}</p>
                {m.lessons && m.lessons.length > 0 && (
                  <ul className="list-group list-group-flush small mb-3">
                    {m.lessons.slice(0, 4).map((l) => (
                      <li key={l._id} className="list-group-item px-0 py-1 text-truncate" title={l.name}>{l.name}</li>
                    ))}
                  </ul>
                )}
                <div className="mt-auto text-muted small">Lessons: {m.lessons?.length ?? 0}</div>
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
}