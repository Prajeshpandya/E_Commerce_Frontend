import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  AllProductsResponse,
  CategoriesResponse,
  DeleteProductParameters,
  GetReviewsResponse,
  MessageResponse,
  NewProductParameters,
  NewReviewParameters,
  SearchProductParameters,
  SearchProductResponse,
  SingleProductResponse,
  UpdateProductParameters,
} from "../../types/api-types";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/product/`,
  }),
  tagTypes: ["product"],

  endpoints: (builder) => ({
    latestProducts: builder.query<AllProductsResponse, string>({
      query: () => "latest",
      providesTags: ["product"],
    }),
    allProducts: builder.query<AllProductsResponse, string>({
      query: (id) => `admin-products?id=${id}`,
      providesTags: ["product"],
    }),
    allCategories: builder.query<CategoriesResponse, string>({
      query: () => "categories",
      providesTags: ["product"],
    }),
    searchProducts: builder.query<
      SearchProductResponse,
      SearchProductParameters
    >({
      query: ({ page, price, sort, category, search }) => {
        let base = `all?search=${search}&page=${page}`;

        if (price) base += `&price=${price}`;
        if (sort) base += `&sort=${sort}`;
        if (category) base += `&category=${category}`;

        return base;
      },
      providesTags: ["product"],
    }),
    productDetails: builder.query<SingleProductResponse, string>({
      query: (id) => id,
      providesTags: ["product"],
    }),
    updateProduct: builder.mutation<MessageResponse, UpdateProductParameters>({
      query: ({ formData, userId, productId }) => ({
        url: `${productId}?id=${userId}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["product"],
    }),

    deleteProduct: builder.mutation<MessageResponse, DeleteProductParameters>({
      query: ({ userId, productId }) => ({
        url: `${productId}?id=${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["product"],
    }),

    newProduct: builder.mutation<MessageResponse, NewProductParameters>({
      query: ({ formData, id }) => ({
        url: `new?id=${id}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["product"],
    }),
    newReview: builder.mutation<MessageResponse, NewReviewParameters>({
      query: ({ comment, rating, productId, userId }) => ({
        url: `newreview?productId=${productId}&userId=${userId}`,
        body: { comment, rating },
        method: "POST",
      }),
      invalidatesTags: ["product"],
    }),
    getReviews: builder.query<GetReviewsResponse, string>({
      query: (productId) => `getreviews?productId=${productId}`,
      providesTags: ["product"],
    }),
  }),
});

export const {
  useLatestProductsQuery,
  useAllProductsQuery,
  useAllCategoriesQuery,
  useSearchProductsQuery,
  useNewProductMutation,
  useProductDetailsQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useNewReviewMutation,
  useGetReviewsQuery
} = productApi;
