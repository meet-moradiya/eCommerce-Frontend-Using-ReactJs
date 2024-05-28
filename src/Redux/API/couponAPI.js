import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const couponAPI = createApi({
  reducerPath: "couponApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_SERVER}/api/v1/payment/coupon/`,
  }),
  tagTypes: ["coupon"],
  endpoints: (builder) => ({
    allCoupons: builder.query({ query: (userId) => `all?id=${userId}`, providesTags: ["coupon"] }),
    newCoupon: builder.mutation({
      query: ({ userId, couponDetails }) => ({
        url: `new?id=${userId}`,
        method: "POST",
        body: couponDetails,
      }),
      invalidatesTags: ["coupon"],
    }),
    updateTotalUse: builder.mutation({
      query: (couponCode) => ({
        url: "update-usage",
        method: "POST",
        body: { couponCode },
      }),
    }),
    deleteCoupon: builder.mutation({
      query: ({ userId, couponId }) => ({
        url: `${couponId}?id=${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["coupon"],
    }),
  }),
});

export const { useAllCouponsQuery, useNewCouponMutation, useDeleteCouponMutation, useUpdateTotalUseMutation } = couponAPI;
