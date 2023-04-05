import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/api/v1/admin" }),
    endpoints: (builder) => ({
        getAllUser: builder.query({
            query: () => "users"
        })
    })
});

export const { useGetAllUserQuery } = userApi;