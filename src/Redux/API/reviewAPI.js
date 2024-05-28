import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const reviewAPI = createApi({
  reducerPath: "reviewApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_SERVER}/api/v1/review/`,
  }),
  tagTypes: ["review"],
  endpoints: (builder) => ({
    allReview: builder.query({ query: ({ productId, page }) => `all?id=${productId}&page=${page}`, providesTags: ["review"] }),
    addReview: builder.mutation({
      query: (productReview) => ({
        url: "new",
        method: "POST",
        body: productReview,
      }),
      invalidatesTags: ["review"],
    }),
    updateReview: builder.mutation({
      query: ({ reviewId, newReview }) => ({
        url: `${reviewId}`,
        method: "PUT",
        body: newReview,
      }),
      invalidatesTags: ["review"],
    }),
    deleteReview: builder.mutation({
      query: ({ reviewId, userId }) => ({
        url: `${reviewId}?id=${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["review"],
    }),
  }),
});

export const { useAddReviewMutation, useAllReviewQuery, useUpdateReviewMutation, useDeleteReviewMutation } = reviewAPI;
