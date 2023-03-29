import { createSlice } from '@reduxjs/toolkit'

const initialState = [];

const courseOnlabSlices = createSlice({
  name: "courseOnlab",
  initialState,
  reducers: {
    setCourseOnlab : (state, action) => {
        return action.payload;
    },
  }
});

export const { setCourseOnlab  } = courseOnlabSlices.actions

export default courseOnlabSlices.reducer