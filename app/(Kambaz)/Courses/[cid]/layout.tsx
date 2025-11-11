'use client'

// course gate
// allow by default; require enrollment only when list is set

import { useParams, useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { selectEnrolled } from '../../Enrollments/reducer'
import { useEffect } from 'react'
import Link from 'next/link'

export default function CourseGate({ children }: { children: React.ReactNode }) {
  const { cid } = useParams() as { cid: string }
  const router = useRouter()
  const enrolled = (useSelector(selectEnrolled) as string[]) ?? []

  // if no enrollments tracked yet, let it pass
  const ok = enrolled.length === 0 || enrolled.includes(cid)

  useEffect(() => {
    if (!ok) router.replace('/Dashboard')
  }, [ok, router])

  if (!ok) return null
  return (
    <div className="flex gap-4 p-3">
      <aside className="w-56 shrink-0">
        <ul className="space-y-2">
          <li><Link href={`/Courses/${cid}/Home`}>home</Link></li>
          <li><Link href={`/Courses/${cid}/Modules`}>modules</Link></li>
          <li><Link href={`/Courses/${cid}/Assignments`}>assignments</Link></li>
        </ul>
      </aside>
      <main className="flex-1">{children}</main>
    </div>
  )
}