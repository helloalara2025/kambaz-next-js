'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */

// assignment editor
// simple form used for both new and edit

import { useParams, useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { useMemo, useState } from 'react'
import {
  addNewAssignment,
  updateAssignment,
  selectAssignments,
} from '../../../reducer'

export default function AssignmentEditor() {
  const { cid, aid } = useParams() as { cid: string; aid: string }
  const router = useRouter()
  const dispatch = useDispatch()

  const all = useSelector((s: any) => selectAssignments(s)) || []
  const current = useMemo(
    () => all.find((a: any) => a._id === aid),
    [all, aid]
  )
  const isNew = aid === 'new' || aid == null

  type FormState = {
    name: string
    description: string
    points: string | number
    dueDate: string
    availableFrom: string
    availableUntil: string
  }

  const [form, setForm] = useState<FormState>({
    name: current?.name ?? '',
    description: current?.description ?? '',
    points: current?.points ?? '',
    dueDate: current?.dueDate ?? '',
    availableFrom: current?.availableFrom ?? '',
    availableUntil: current?.availableUntil ?? '',
  })

  const update = (k: keyof FormState, v: FormState[keyof FormState]) =>
    setForm(s => ({ ...s, [k]: v } as FormState))

  const save = () => {
    const payload = {
      name: form.name?.trim() || 'untitled assignment',
      description: form.description || '',
      points: form.points === '' ? undefined : Number(form.points),
      dueDate: form.dueDate || undefined,
      availableFrom: form.availableFrom || undefined,
      availableUntil: form.availableUntil || undefined,
      course: cid,
    } as any

    if (isNew) {
      dispatch(addNewAssignment(payload))
    } else if (current) {
      dispatch(updateAssignment({ ...current, ...payload, _id: current._id }))
    }

    router.push(`/Kambaz/Courses/${cid}/Assignments`)
  }

  const cancel = () => router.push(`/Kambaz/Courses/${cid}/Assignments`)

  return (
    <section className="p-3 max-w-xl space-y-4">
      <h4>{isNew ? 'new assignment' : 'edit assignment'}</h4>

      <form
        onSubmit={e => {
          e.preventDefault()
          save()
        }}
        className="flex flex-col gap-3"
      >
        <label className="flex flex-col">
          <span>name</span>
          <input
            value={form.name}
            onChange={e => update('name', e.target.value)}
            required
          />
        </label>

        <label className="flex flex-col">
          <span>description</span>
          <textarea
            value={form.description}
            onChange={e => update('description', e.target.value)}
          />
        </label>

        <label className="flex flex-col">
          <span>points</span>
          <input
            type="number"
            value={form.points}
            onChange={e => update('points', e.target.value)}
            min={0}
          />
        </label>

        <label className="flex flex-col">
          <span>due date</span>
          <input
            type="date"
            value={form.dueDate}
            onChange={e => update('dueDate', e.target.value)}
          />
        </label>

        <label className="flex flex-col">
          <span>available from</span>
          <input
            type="date"
            value={form.availableFrom}
            onChange={e => update('availableFrom', e.target.value)}
          />
        </label>

        <label className="flex flex-col">
          <span>available until</span>
          <input
            type="date"
            value={form.availableUntil}
            onChange={e => update('availableUntil', e.target.value)}
          />
        </label>

        <div className="flex gap-2">
          <button type="submit">save</button>
          <button type="button" onClick={cancel}>
            cancel
          </button>
        </div>
      </form>
    </section>
  )
}