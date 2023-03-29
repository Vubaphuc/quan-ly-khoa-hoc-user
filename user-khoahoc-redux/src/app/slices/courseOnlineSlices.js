import { createSlice } from '@reduxjs/toolkit'

const initialState = [];

const courseOnlineSlices = createSlice({
  name: "courseOnline",
  initialState,
  reducers: {
    setCoursesOnline: (state, action) => {
        return action.payload;
    },
  },
});

export const { setCoursesOnline } = courseOnlineSlices.actions

export default courseOnlineSlices.reducer