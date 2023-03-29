import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from "./slices/courseSlices";
import courseReducer from "./slices/courseDetailSlices";
import courseOnlabReducer from "./slices/courseOnlabSlices";
import courseOnlineSlices from "./slices/courseOnlineSlices";

const store = configureStore({
    reducer : {
        courseList : coursesReducer,
        courseDetail : courseReducer,
        courseOnlabReducer : courseOnlabReducer,
        couresOnline : courseOnlineSlices,
        
    }
})

export default store;