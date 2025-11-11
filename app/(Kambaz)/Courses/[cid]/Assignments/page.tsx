'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */

// assignments list
// dynamic from redux assignments slice filtered by course id

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux'
import { selectAssignments, deleteAssignment } from '../../reducer'

export default function AssignmentsPage() {
  const { cid } = useParams() as { cid: string }
  const dispatch = useDispatch()
  const all = useSelector((s: any) => selectAssignments(s)) || []

  const hasCourseField =
    all[0] && ('course' in all[0] || 'courseId' in all[0] || 'cid' in all[0])

  const assignments = hasCourseField
    ? all.filter((a: any) => (a.course ?? a.courseId ?? a.cid) === cid)
    : all

  return (
    <div id="wd-assignments" className="p-3" style={{ maxWidth: 600 }}>
      <h4>assignments</h4>
      <ul>
        {assignments.map((a: any) => (
          <li key={a._id} className="flex items-center gap-3 py-2">
            <Link href={`/Kambaz/Courses/${cid}/Assignments/${a._id}`}>
              {a.name || a.title || 'untitled'}
            </Link>
            <button
              onClick={() => {
                if (confirm(`delete "${a.name || a.title}"?`))
                  dispatch(deleteAssignment(a._id))
              }}
              aria-label={`delete ${a.name || a.title}`}
              title="delete"
            >
              🗑️
            </button>
          </li>
        ))}
      </ul>

      <Link href={`/Kambaz/Courses/${cid}/Assignments/new`}>+ assignment</Link>
    </div>
  )
}