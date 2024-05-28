import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productAPI = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_SERVER}/api/v1/product/`,
  }),
  // tagTypes is use to give tags which can use in endpoints for invalidate caching
  // here you can give multiple name in single array and use it according to need
  tagTypes: ["product"],
  endpoints: (builder) => ({
    // now here providesTags array is a array to reference the invalidate cache memory
    // here also you can give multiple name in single array and use it according to need
    // but the thing is name must be present in the tagTypes array which we create above
    latestProducts: builder.query({ query: () => "latest", providesTags: ["product"] }),
    getSingleProduct: builder.query({ query: (id) => id, providesTags: ["product"] }),
    adminAllProducts: builder.query({ query: (id) => `admin-products?id=${id}`, providesTags: ["product"] }),
    allSearchProducts: builder.query({
      query: ({ search, sort, material, color, size, minPrice, maxPrice, page }) => {
        let base = `all?search=${search}&page=${page}`;
        if (sort) base += `&sort=${sort}`;
        if (material) base += `&material=${material}`;
        if (color) base += `&color=${color}`;
        if (size) base += `&size=${size}`;
        if (minPrice) base += `&minPrice=${minPrice}`;
        if (maxPrice) base += `&maxPrice=${maxPrice}`;

        return base;
      },
      providesTags: ["product"],
    }),
    addNewProduct: builder.mutation({
      query: ({ productData, id }) => ({
        url: `new?id=${id}`,
        method: "POST",
        body: productData,
      }),
      // here we use invalidatesTags for invalidate cache memory
      // here also you can give multiple name in single array and use it according to need
      // in this tag name which you write it will invalidate cache memory after calling query
      //     api like if we give providesTags = "product" to show all admin product and use it
      //     in add new product mutation then after adding new product it will invalidate cache
      //     memory for show all admin product.
      // [{(for more reference show video of the integration
      //     of ecommerce website by 6 pack programmer from time 2:41:00 hrs)}]
      invalidatesTags: ["product"],
    }),
    updateProduct: builder.mutation({
      query: ({ updatedProductData, userId, productId }) => ({
        url: `${productId}?id=${userId}`,
        method: "PUT",
        body: updatedProductData,
      }),
      invalidatesTags: ["product"],
    }),
    deleteProduct: builder.mutation({
      query: ({ userId, productId }) => ({
        url: `${productId}?id=${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["product"],
    }),
  }),
});

export const {
  useLatestProductsQuery,
  useAdminAllProductsQuery,
  useAllSearchProductsQuery,
  useAddNewProductMutation,
  useGetSingleProductQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productAPI;
