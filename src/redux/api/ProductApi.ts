import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  AllProductsResponse,
  CategoriesResponse,
  MessageResponse,
  NewProductParameters,
  SearchProductParameters,
  SearchProductResponse,
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

    newProduct: builder.mutation<MessageResponse, NewProductParameters>({
      query: ({ formData, id }) => ({
        url: `new?id=${id}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags:["product"]
    }),
  }),
});

export const {
  useLatestProductsQuery,
  useAllProductsQuery,
  useAllCategoriesQuery,
  useSearchProductsQuery,
  useNewProductMutation,
} = productApi;