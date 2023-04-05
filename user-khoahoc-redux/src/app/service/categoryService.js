import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";



export const categoryApi = createApi({
    reducerPath: "categoryApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/api/v1/admin"}),
    endpoints: (builder) => ({
        getAllCategory: builder.query({
            query: () => "categorys"
        })
    })
});

export const { useGetAllCategoryQuery } = categoryApi;