'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */

// dashboard
// course cards + optional enrollments toggle

import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import * as dbmod from '../Database'
import { toggleEnroll, selectEnrolled } from '../Enrollments/reducer'

// resolve db
const DB: any = (dbmod as any)?.default ?? (dbmod as any) ?? {}
const COURSES: any[] = DB.courses ?? []

export default function DashboardPage() {
  const dispatch = useDispatch()
  const [showEnrollments, setShowEnrollments] = useState(false)
  const enrolledIds = useSelector(selectEnrolled) as string[]

  return (
    <section id="wd-dashboard" className="p-4 mx-auto" style={{ maxWidth: 1100 }}>
      <header className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">dashboard</h1>
        <button
          className="text-sm px-3 py-1 border rounded hover:bg-gray-50"
          onClick={() => setShowEnrollments(s => !s)}
          aria-pressed={showEnrollments}
        >
          {showEnrollments ? 'hide enrollments' : 'show enrollments'}
        </button>
      </header>

      {/* default view: course cards */}
      {!showEnrollments && (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {COURSES.map(c => (
            <li key={c._id} className="bg-white border rounded-lg p-4 shadow-sm hover:shadow transition">
              <Link className="block font-medium underline-offset-2 hover:underline" href={`/Courses/${c._id}/Home`}>
                {c.title || c.name}
              </Link>
              <div className="text-sm opacity-70 mt-1">{c.number || ''}</div>
            </li>
          ))}
        </ul>
      )}

      {/* enrollments view */}
      {showEnrollments && (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {COURSES.map(c => {
            const enrolled = enrolledIds.includes(c._id)
            return (
              <li key={c._id} className="bg-white border rounded-lg p-4 shadow-sm hover:shadow transition flex items-start justify-between">
                <div>
                  <div className="font-medium">{c.title || c.name}</div>
                  <div className="text-sm opacity-70 mt-1">{c.number || ''}</div>
                </div>
                <button
                  className={`text-sm px-3 py-1 border rounded ${enrolled ? 'bg-red-50 hover:bg-red-100' : 'bg-green-50 hover:bg-green-100'}`}
                  onClick={() => dispatch(toggleEnroll(c._id))}
                  aria-label={enrolled ? 'unenroll' : 'enroll'}
                  title={enrolled ? 'unenroll' : 'enroll'}
                >
                  {enrolled ? 'unenroll' : 'enroll'}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}