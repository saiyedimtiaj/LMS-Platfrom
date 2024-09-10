import { apiSlice } from "../api/apiSlice";
import { userLoggedIn, userLoggedOut, userRegistationToken } from "./authSlice";

type TRegistationResponse = {
  message: string;
  activationString: string;
};

type TRegistationData = {};

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: "/registation",
        body: data,
        method: "POST",
        credentials: "include" as const,
      }),
      invalidatesTags: ["users"],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userRegistationToken({
              token: result.data.activationToken,
            })
          );
        } catch (err: any) {
          console.log(err);
        }
      },
    }),
    activation: builder.mutation({
      query: ({ activation_token, activation_code }) => ({
        url: "/activate-user",
        method: "POST",
        body: { activation_token, activation_code },
      }),
    }),
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: "/login",
        method: "POST",
        body: { email, password },
        credentials: "include",
      }),
      invalidatesTags: ["users"],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userLoggedIn({
              token: result.data.activationToken,
              user: result.data.user,
            })
          );
        } catch (err: any) {
          console.log(err);
        }
      },
    }),
    SocialLogin: builder.mutation({
      query: (data) => ({
        url: "/social-login",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["users"],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userLoggedIn({
              token: result.data.activationToken,
              user: result.data.user,
            })
          );
        } catch (err: any) {
          console.log(err);
        }
      },
    }),

    logOut: builder.mutation({
      query: () => ({
        url: "/log-out",
        method: "POST",
        credentials: "include",
      }),
      invalidatesTags: ["users"],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          dispatch(userLoggedOut());
        } catch (err: any) {
          console.log(err);
        }
      },
    }),
    changePassword: builder.mutation({
      query: (payload) => ({
        url: "/update-user-password",
        method: "PUT",
        body: payload,
        credentials: "include",
      }),
      invalidatesTags: ["users"],
    }),
    updateProfile: builder.mutation({
      query: (payload) => ({
        url: "/update-user-info",
        method: "PUT",
        body: payload,
        credentials: "include",
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useActivationMutation,
  useLoginMutation,
  useLogOutMutation,
  useChangePasswordMutation,
  useUpdateProfileMutation,
  useSocialLoginMutation,
} = authApi;
