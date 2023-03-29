import { createSlice } from '@reduxjs/toolkit'



const courseDetailSlices = createSlice({
  name: "courseDetail",
  initialState: {
    course: [],
    user: []
  },
  reducers: {
    setCourse: (state, action) => {
      state.course = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setCourse, setUser  } = courseDetailSlices.actions

export default courseDetailSlices.reducer