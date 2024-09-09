import { apiSlice } from "../api/apiSlice";

export const courseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: (data) => {
        return {
          url: "/create-course",
          method: "POST",
          body: data,
          credentials: "include" as const,
        };
      },
    }),
    getAllCourses: builder.query({
      query: () => ({
        url: "/get-admin-courses",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getUserAllCourses: builder.query({
      query: () => ({
        url: "/get-courses",
        method: "GET",
      }),
    }),
    getCourseDetails: builder.query({
      query: (id) => ({
        url: `/get-course/${id}`,
        method: "GET",
      }),
      providesTags: ["course"],
    }),
    getUserAccessCourse: builder.query({
      query: () => ({
        url: `/user-courses`,
        method: "GET",
        credentials: "include" as const,
      }),
      providesTags: ["course", "users", "order"],
    }),
    getAllModule: builder.query({
      query: (id) => ({
        url: `/access-all-module/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
      providesTags: ["course"],
    }),
    getModule: builder.query({
      query: () => ({
        url: `/get-module`,
        method: "GET",
        credentials: "include" as const,
      }),
      providesTags: ["course"],
    }),
    getModuleContent: builder.query({
      query: ({ params, activeContent }) => ({
        url: `/access-content/${params?.id}?videoNo=${activeContent.videoNo}&moduleNo=${activeContent.moduleNo}`,
        method: "GET",
        credentials: "include" as const,
      }),
      providesTags: ["course", "users"],
    }),
    updateCourse: builder.mutation({
      query: ({ id, body }) => ({
        url: `/update-course/${id}`,
        method: "PUT",
        body: body,
        credentials: "include" as const,
      }),
      invalidatesTags: ["course"],
    }),
    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `/delete-course/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
      invalidatesTags: ["course"],
    }),
  }),
});

export const {
  useCreateCourseMutation,
  useGetAllCoursesQuery,
  useGetUserAllCoursesQuery,
  useGetCourseDetailsQuery,
  useGetUserAccessCourseQuery,
  useGetAllModuleQuery,
  useGetModuleContentQuery,
  useDeleteCourseMutation,
  useGetModuleQuery,
  useUpdateCourseMutation,
} = courseApi;
