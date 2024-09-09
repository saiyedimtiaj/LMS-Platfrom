import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn } from "../auth/authSlice";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://lms-server-seven-sand.vercel.app/api/v1",
  }),
  tagTypes: ["users", "course", "order"],
  endpoints: (builder) => ({
    refreshToken: builder.query({
      query: (data) => ({
        url: "/refreshtoken",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    loadUser: builder.query({
      query: (data) => ({
        url: "/me",
        method: "GET",
        credentials: "include" as const,
      }),
      providesTags: ["users"],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userLoggedIn({
              accessToken: result.data.accessToken,
              user: result.data.data,
            })
          );
        } catch (err: any) {}
      },
    }),
  }),
});

export const { useRefreshTokenQuery, useLoadUserQuery } = apiSlice;
