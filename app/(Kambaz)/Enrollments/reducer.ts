// simple enrollments slice
// stores course ids a user is enrolled in

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type EnrollmentsState = {
  courseIds: string[]
}

const initialState: EnrollmentsState = {
  courseIds: [],
}

const enrollmentsSlice = createSlice({
  name: 'enrollments',
  initialState,
  reducers: {
    enroll(state, { payload }: PayloadAction<string>) {
      if (!state.courseIds.includes(payload)) state.courseIds.push(payload)
    },
    unenroll(state, { payload }: PayloadAction<string>) {
      state.courseIds = state.courseIds.filter(id => id !== payload)
    },
    toggleEnroll(state, { payload }: PayloadAction<string>) {
      const i = state.courseIds.indexOf(payload)
      if (i === -1) state.courseIds.push(payload)
      else state.courseIds.splice(i, 1)
    },
  },
})

export const { enroll, unenroll, toggleEnroll } = enrollmentsSlice.actions

type RootState = {
  enrollments: EnrollmentsState
}

export const selectEnrolled = (s: RootState): string[] =>
  s.enrollments?.courseIds ?? []

export const isCourseEnrolled =
  (courseId: string) =>
  (s: RootState): boolean =>
    (s.enrollments?.courseIds ?? []).includes(courseId)

export default enrollmentsSlice.reducer