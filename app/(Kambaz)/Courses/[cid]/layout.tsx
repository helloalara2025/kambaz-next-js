'use client'

// course gate
// allow by default; require enrollment only when list is set

import { useParams, useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { selectEnrolled } from '../../Enrollments/reducer'
import { useEffect } from 'react'

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
  return <>{children}</>
}