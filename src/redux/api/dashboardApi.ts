import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BarResponse, LineResponse, PieResponse, StatsResponse } from "../../types/api-types";

export const dashboardApi = createApi({
  reducerPath: "dashboardApi",
  tagTypes: ["product", "orders", "users"],

  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/dashboard/`,
  }),
  endpoints: (builder) => ({
    stats: builder.query<StatsResponse, string>({
      query: (id) => `stats?id=${id}`,
      providesTags: ["product", "orders", "users"],
    }),
    pie: builder.query<PieResponse, string>({
      query: (id) => `pie?id=${id}`,
      providesTags: ["product", "orders", "users"],
    }),
    bar: builder.query<BarResponse, string>({
      query: (id) => `bar?id=${id}`,
      providesTags: ["product", "orders", "users"],
    }),
    line: builder.query<LineResponse, string>({
      query: (id) => `line?id=${id}`,
      providesTags: ["product", "orders", "users"],
    }),
  }),
});

export const { useBarQuery, useLineQuery, usePieQuery, useStatsQuery } =
  dashboardApi;

//useLazyBarQuery means when we trigger that then it call req and get data.
//   in useBarQuery there are direct get the data!
