import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


// Define a service using a base URL and expected endpoints
export const courseApi = createApi({
  reducerPath: 'courseApi',
  // địa chỉ API cần lấy
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/api/v1/admin' }),
  tagTypes: ["Course"],
  endpoints: (builder) => ({
    getAllCourse: builder.query({
        // "courses" là phần nối với API trên thành api/v1/admin/courses
      query: () => "courses",
      providesTags: ["Course"]
    }),
    getAllUser: builder.query({
        // "courses" là phần nối với A
      query: () => "users",
    }),
    getCourseById: builder.query ({
        query: (id) => `courses/${id}`
    }),
    createCourse: builder.mutation ({
        // phần query này chỉ chấp nhập 1 tham số truyền vào. nếu truyền tham số 2 cái trở nên những tham số khác sẽ undifile.
        query: (data) => ({
            url: "courses",
            method: "POST",
            body: data,
        })
    }),
    /*
        {
            id: 1,
            title: khóa học,
            description: "",
            price: 100000
        } => 
        id : 1 ,
        {
            title: khóa học,
            description: "",
            price: 100000
        }
    */
    updateCourse: builder.mutation ({
        // đây là cách tách id ra khỏi data.
        query: ({id, ...data}) => ({
            url: "courses",
            method: "PUT",
            body: data,
        })
    }),
    deleteCourse: builder.mutation ({
        query: (id) => ({
            url: `courses/${id}`,
            method: "DELETE",
        }),
        invalidatesTags: ["Course"]
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { 
    useGetAllCourseQuery, 
    useGetCourseByIdQuery, 
    useCreateCourseMutation, 
    useUpdateCourseMutation, 
    useDeleteCourseMutation,
    useGetAllUserQuery,
    // trả ra bằng tên method đặt các method API 
} = courseApi;