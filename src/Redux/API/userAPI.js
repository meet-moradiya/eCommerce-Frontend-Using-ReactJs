import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";

export const userAPI = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_SERVER}/api/v1/user/`,
  }),
  tagTypes: ["user"],
  endpoints: (builder) => ({
    getSingleUser: builder.query({ query: (userId) => userId, providesTags: ["user"] }),

    signup: builder.mutation({
      query: (user) => ({
        url: "new",
        method: "POST",
        body: user,
      }),
    }),

    login: builder.mutation({
      query: ({ email, password }) => ({
        url: "login",
        method: "POST",
        body: { email, password },
      }),
    }),

    makeAdmin: builder.mutation({
      query: ({ userId, email }) => ({
        url: `make-admin?id=${userId}`,
        method: "PUT",
        body: { email },
      }),
    }),

    updateUserInfo: builder.mutation({
      query: ({ id, userInfo }) => ({
        url: id,
        method: "PUT",
        body: userInfo,
      }),
      invalidatesTags: ["user"],
    }),

    deleteAccount: builder.mutation({
      query: (id) => ({
        url: id,
        method: "DELETE",
      }),
    }),

    getAllUser: builder.query({ query: (userId) => `all?id=${userId}`, providesTags: ["user"] }),
  }),
});

export const {
  useSignupMutation,
  useMakeAdminMutation,
  useLoginMutation,
  useGetSingleUserQuery,
  useUpdateUserInfoMutation,
  useDeleteAccountMutation,
  useGetAllUserQuery,
} = userAPI;

export const getUser = async (id) => {
  try {
    const { data } = await axios.get(`${process.env.REACT_APP_SERVER}/api/v1/user/${id}`);
    return data;
  } catch (error) {}
};
