'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */

// assignments list
// dynamic from redux slice filtered by course id

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux'
import { deleteAssignment } from './Assignments/reducer'

export default function AssignmentsPage() {
  const { cid } = useParams<{ cid: string }>()
  const dispatch = useDispatch()

  // get all assignments from slice (support different possible RootState shapes)
  const all = useSelector((state: any) => {
    // support different possible RootState shapes: the assignments array might live
    // directly on state.assignments, inside state.assignments.assignments, or under state.courses.assignments
    const s = state as any
    return s.assignments?.assignments ?? s.assignments ?? s.courses?.assignments ?? []
  }) as any[]

  // filter by course id if present on items, else show all
  const hasCourseField =
    all[0] && ('course' in all[0] || 'courseId' in all[0] || 'cid' in all[0])

  const assignments = hasCourseField
    ? all.filter((a: any) => (a.course ?? a.courseId ?? a.cid) === cid)
    : all

  return (
    <div id="wd-assignments" className="p-3" style={{ maxWidth: 600 }}>
      <h4>assignments</h4>
      <ul className="space-y-2">
        {assignments.map((a: any) => (
          <li key={a._id} className="flex items-center justify-between border rounded p-2">
            <Link
              className="underline"
              href={`/Courses/${cid}/Assignments/${a._id}`}
            >
              {a.name || a.title || 'untitled'}
            </Link>
            <button
              onClick={() => {
                if (confirm(`delete ${a.name || a.title}?`)) {
                  dispatch(deleteAssignment(a._id))
                }
              }}
              title="delete"
              aria-label="delete assignment"
            >
              delete
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-3">
        <Link href={`/Courses/${cid}/Assignments/new`} className="underline">
          + assignment
        </Link>
      </div>
    </div>
  )
}