import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: "/get-users",
        method: "GET",
        credentials: "include" as const,
      }),
      providesTags: ["users"],
    }),
    userCourseContentUpdate: builder.mutation({
      query: (item) => ({
        url: `/update-access-course/${item?.id}`,
        method: "PUT",
        body: item,
        credentials: "include" as const,
      }),
      invalidatesTags: ["users"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/delete-user/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
      invalidatesTags: ["users"],
    }),
    updateRole: builder.mutation({
      query: (payload) => ({
        url: "/update-user-role",
        method: "PUT",
        body: payload,
        credentials: "include",
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useUserCourseContentUpdateMutation,
  useDeleteUserMutation,
  useUpdateRoleMutation,
} = userApi;
