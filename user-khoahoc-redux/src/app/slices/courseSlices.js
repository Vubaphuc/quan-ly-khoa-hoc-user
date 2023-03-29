import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const courseSlices = createSlice({
  name: "courseList",
  initialState,
  reducers: {
    setCourses : (state, action) => {
        return action.payload;
    },
  },
});

export const { setCourses } = courseSlices.actions;

export default courseSlices.reducer;
