import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderAPI = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_SERVER}/api/v1/order/`,
  }),
  tagTypes: ["orders"],
  endpoints: (builder) => ({
    myOrders: builder.query({ query: (userId) => `my-order?id=${userId}`, providesTags: ["orders"] }),
    allOrders: builder.query({ query: (userId) => `all?id=${userId}`, providesTags: ["orders"] }),
    getSingleOrder: builder.query({ query: (id) => id, providesTags: ["orders"] }),

    newOrder: builder.mutation({
      query: (orderDetails) => ({
        url: "new",
        method: "POST",
        body: orderDetails,
      }),
      invalidatesTags: ["orders"],
    }),
    updateOrder: builder.mutation({
      query: ({ userId, orderId }) => ({
        url: `${orderId}?id=${userId}`,
        method: "PUT",
      }),
      invalidatesTags: ["orders"],
    }),
    deleteOrder: builder.mutation({
      query: ({ userId, orderId }) => ({
        url: `${orderId}?id=${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["orders"],
    }),
  }),
});

export const { useAllOrdersQuery, useGetSingleOrderQuery, useMyOrdersQuery, useDeleteOrderMutation, useUpdateOrderMutation, useNewOrderMutation } =
  orderAPI;
