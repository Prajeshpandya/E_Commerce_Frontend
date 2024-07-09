import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AllProductsResponse, CategoriesResponse } from "../../types/api-types";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/product/`,
  }),
  endpoints: (builder) => ({
    latestProducts: builder.query<AllProductsResponse, string>({
      query: () => "latest",
    }),
    allProducts: builder.query<AllProductsResponse, string>({
      query: (id) => `admin-products?id=${id}`,
    }),
    allCategories : builder.query<CategoriesResponse,string>({
      query: ()=>"categories" 
    }),
    searchProducts : builder.query({
      query:(page)=>`all?page=${page}`
    })
  }),
});

export const { useLatestProductsQuery,useAllProductsQuery,useAllCategoriesQuery } = productApi;
