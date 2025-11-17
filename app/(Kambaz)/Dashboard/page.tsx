'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */

// dashboard
// shows only the courses the current user is enrolled in

import Link from 'next/link'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as db from '../Database'
import * as client from '../Courses/client'

// resolve db pieces we still mirror on the client
const { enrollments }: any = (db as any)?.default ?? (db as any)

export default function DashboardPage() {
  const dispatch = useDispatch()

  // current signed-in user from the account reducer
  const currentUser = useSelector((state: any) => state.accountReducer.currentUser)

  // courses come from the shared courses reducer
  const courses = useSelector((state: any) => state.coursesReducer.courses ?? []) as any[]

  // load the current user's courses from the server
  const fetchCourses = async () => {
    try {
      const myCourses = await client.findMyCourses()
      dispatch({ type: 'courses/set', payload: myCourses })
    } catch (error) {
      // simple logging so we can debug in the console
      console.error(error)
    }
  }

  // whenever the current user changes, refresh the courses
  useEffect(() => {
    if (!currentUser) return
    void fetchCourses()
  }, [currentUser])

  // helper: check if the current user is enrolled in a given course
  const isEnrolled = (courseId: string) =>
    enrollments?.some(
      (enrollment: any) =>
        enrollment.user === currentUser._id && enrollment.course === courseId,
    )

  const visibleCourses = courses.filter(c => isEnrolled(c._id))

  const onAddNewCourse = async (course: any) => {
    try {
      const newCourse = await client.createCourse(course)
      dispatch({ type: 'courses/set', payload: [ ...courses, newCourse ] })
    } catch (error) {
      console.error(error)
    }
  };

  const onDeleteCourse = async (courseId: string) => {
    try {
      await client.deleteCourse(courseId)
      dispatch({ type: 'courses/set', payload: courses.filter(c => c._id !== courseId) })
    } catch (error) {
      console.error(error)
    }
  }

  const onUpdateCourse = async (course: any) => {
    try {
      const updatedCourse = await client.updateCourse(course)
      dispatch({
        type: 'courses/set',
        payload: courses.map(c => (c._id === updatedCourse._id ? updatedCourse : c)),
      })
    } catch (error) {
      console.error(error)
    }
  }

  // if there's no user yet, just show a gentle hint
  if (!currentUser) {
    return (
      <section id="wd-dashboard" className="p-4 mx-auto" style={{ maxWidth: 1100 }}>
        <h1 className="text-2xl font-bold mb-2">dashboard</h1>
        <p className="text-sm opacity-70">sign in to see your courses</p>
      </section>
    )
  }


  return (
    <section id="wd-dashboard" className="p-4 mx-auto" style={{ maxWidth: 1100 }}>
      <header className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">dashboard</h1>
      </header>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visibleCourses.map(c => (
          <li
            key={c._id}
            className="bg-white border rounded-lg p-4 shadow-sm hover:shadow transition"
          >
            <Link
              className="block font-medium underline-offset-2 hover:underline"
              href={`/Courses/${c._id}/Home`}
            >
              {c.title || c.name}
            </Link>
            <div className="text-sm opacity-70 mt-1">{c.number || ''}</div>
            <button
              className="mt-2 mr-3 text-blue-600 hover:text-blue-800"
              id="wd-update-course-click"
              onClick={e => {
                e.preventDefault()
                void onUpdateCourse(c)
              }}
            >
              Update
            </button>
            <button
              className="mt-2 text-red-600 hover:text-red-800"
              onClick={e => {
                e.preventDefault()
                void onDeleteCourse(c._id)
              }}
            >
              Delete
            </button>
          </li>
        ))}

        {visibleCourses.length === 0 && (
          <li className="text-sm opacity-70 col-span-full">
            you are not enrolled in any courses yet
          </li>
        )}
      </ul>
    </section>
  )
}