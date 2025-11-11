// assignments slice
// add / update / delete

/* eslint-disable @typescript-eslint/no-explicit-any */

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'
import * as dbmod from '../Database'

const db: any = (dbmod as any)?.default ?? (dbmod as any) ?? {}

export type Assignment = {
  _id: string
  name: string
  description?: string
  points?: number
  dueDate?: string
  availableFrom?: string
  availableUntil?: string
  course?: string
}

type UpsertPayload = Omit<Assignment, '_id'> & { _id?: string }

type AssignmentsState = {
  assignments: Assignment[]
}

const initialState: AssignmentsState = {
  assignments: ((db as any)?.assignments as Assignment[]) ?? [],
}

const assignmentsSlice = createSlice({
  name: 'assignments',
  initialState,
  reducers: {
    addNewAssignment: {
      reducer(state, { payload }: PayloadAction<Assignment>) {
        state.assignments = [...state.assignments, payload]
      },
      prepare(input: UpsertPayload) {
        return {
          payload: {
            _id: input._id ?? uuidv4(),
            name: input.name?.trim() || 'untitled assignment',
            description: input.description ?? '',
            points:
              typeof input.points === 'number'
                ? input.points
                : input.points
                ? Number(input.points)
                : undefined,
            dueDate: input.dueDate || undefined,
            availableFrom: input.availableFrom || undefined,
            availableUntil: input.availableUntil || undefined,
            course: input.course,
          } as Assignment,
        }
      },
    },
    updateAssignment(state, { payload }: PayloadAction<Assignment>) {
      state.assignments = state.assignments.map(a =>
        a._id === payload._id ? payload : a
      )
    },
    deleteAssignment(state, { payload }: PayloadAction<string>) {
      state.assignments = state.assignments.filter(a => a._id !== payload)
    },
  },
})

export const { addNewAssignment, updateAssignment, deleteAssignment } =
  assignmentsSlice.actions

export default assignmentsSlice.reducer

// selectors
export type RootState = {
  assignments?: AssignmentsState
}

export const selectAssignments = (s: RootState): Assignment[] =>
  s.assignments?.assignments ?? []

export const selectAssignmentById =
  (id: string) =>
  (s: RootState): Assignment | undefined =>
    (s.assignments?.assignments ?? []).find((a: Assignment) => a._id === id)