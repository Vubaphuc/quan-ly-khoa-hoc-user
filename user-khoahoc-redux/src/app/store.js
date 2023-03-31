import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from "./slices/courseSlices";
import courseReducer from "./slices/courseDetailSlices";
import courseOnlabReducer from "./slices/courseOnlabSlices";
import courseOnlineSlices from "./slices/courseOnlineSlices";
import { courseApi } from "./service/couresService";


export const store = configureStore({
    reducer : {
        courseList : coursesReducer,
        courseDetail : courseReducer,
        courseOnlabReducer : courseOnlabReducer,
        couresOnline : courseOnlineSlices,


        [courseApi.reducerPath]: courseApi.reducer 
        
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(courseApi.middleware),
})


