import { apiSlice } from "../api/apiSlice";

export const moduleApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCourseModule: builder.query({
      query: (id) => {
        return {
          url: `/get-course-module/${id}`,
          method: "GET",
          credentials: "include" as const,
        };
      },
      providesTags: ["course"],
    }),
    addNewModule: builder.mutation({
      query: (body) => {
        return {
          url: `/create-module`,
          method: "POST",
          body: body,
          credentials: "include" as const,
        };
      },
      invalidatesTags: ["course"],
    }),
    deleteModule: builder.mutation({
      query: (id) => {
        return {
          url: `/module/${id}`,
          method: "DELETE",
          credentials: "include" as const,
        };
      },
      invalidatesTags: ["course"],
    }),
  }),
});

export const {
  useGetCourseModuleQuery,
  useAddNewModuleMutation,
  useDeleteModuleMutation,
} = moduleApi;
