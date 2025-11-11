/*
  dashboard
  renders data-driven courses grid from db
*/
'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */

import Link from 'next/link'

import { useDispatch, useSelector } from 'react-redux'
import { toggleEnroll, isCourseEnrolled } from '../Enrollments/reducer'
import { useState } from 'react'

import * as dbmod from '../Database'

const DB: any = (dbmod as any)?.default ?? (dbmod as any) ?? {}
const coursesFromDb: any[] = DB.courses ?? []

export default function DashboardPage() {
  const [showEnrollments, setShowEnrollments] = useState(false)

  interface Course {
    _id: string
    title?: string
    name?: string
    number?: string
    // add other fields as needed
  }

  function EnrollmentListItem({ course }: { course: Course }) {
    const enrolled = useSelector(isCourseEnrolled(course._id)) as boolean
    const dispatchLocal = useDispatch()
    return (
      <li className="border p-3 rounded flex items-center justify-between">
        <div>
          <div className="font-medium">{course.title || course.name}</div>
          <div className="text-sm opacity-70">{course.number || ''}</div>
        </div>
        <button
          onClick={() => dispatchLocal(toggleEnroll(course._id))}
          aria-label={enrolled ? 'unenroll' : 'enroll'}
          title={enrolled ? 'unenroll' : 'enroll'}
        >
          {enrolled ? 'unenroll' : 'enroll'}
        </button>
      </li>
    )
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">dashboard</h1>
        <button
          onClick={() => setShowEnrollments(s => !s)}
          className="px-3 py-1 border rounded"
          aria-pressed={showEnrollments}
        >
          {showEnrollments ? 'hide enrollments' : 'show enrollments'}
        </button>
      </div>

      {showEnrollments ? (
        <ul className="grid gap-3 md:grid-cols-2">
          {coursesFromDb.map(c => (
            <EnrollmentListItem key={c._id} course={c} />
          ))}
        </ul>
      ) : (
        <ul className="grid gap-3 md:grid-cols-2">
          {coursesFromDb.map(c => (
            <li key={c._id} className="border p-3 rounded">
              <Link className="underline" href={`/Courses/${c._id}/Home`}>
                {c.title || c.name}
              </Link>
              <div className="text-sm opacity-70">{c.number || ''}</div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}