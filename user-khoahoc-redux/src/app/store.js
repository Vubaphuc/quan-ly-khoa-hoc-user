import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from "./slices/courseSlices";
import courseReducer from "./slices/courseDetailSlices";
import courseOnlabReducer from "./slices/courseOnlabSlices";
import courseOnlineSlices from "./slices/courseOnlineSlices";
import { courseApi } from "./service/couresService";
import { categoryApi } from "./service/categoryService";
import { userApi } from "./service/userService";


export const store = configureStore({
    reducer : {
         /* phần import các trang Course */
        courseList : coursesReducer,
        courseDetail : courseReducer,
        courseOnlabReducer : courseOnlabReducer,
        couresOnline : courseOnlineSlices,


         /* phần import các trang quản lý ADMIN */
        [courseApi.reducerPath]: courseApi.reducer,
        [categoryApi.reducerPath]: categoryApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        
    },

     /* phần import các trang quản lý ADMIN */
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            courseApi.middleware,
            categoryApi.middleware,
            userApi.middleware,
            ),
})


