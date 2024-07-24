import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  BarResponse,
  CreateCouponParameters,
  LineResponse,
  MessageResponse,
  PieResponse,
  StatsResponse,
} from "../../types/api-types";
import axios from "axios";

export const dashboardApi = createApi({
  reducerPath: "dashboardApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/dashboard/`,
  }),

  endpoints: (builder) => ({
    stats: builder.query<StatsResponse, string>({
      query: (id) => `stats?id=${id}`,
      keepUnusedDataFor: 0,
    }),

    pie: builder.query<PieResponse, string>({
      query: (id) => `pie?id=${id}`,
      keepUnusedDataFor: 0,
    }),
    bar: builder.query<BarResponse, string>({
      query: (id) => `bar?id=${id}`,
      keepUnusedDataFor: 0,
    }),
    line: builder.query<LineResponse, string>({
      query: (id) => `line?id=${id}`,
      keepUnusedDataFor: 0, //for disable caching bcz it can not be updated on diffrent apis tags
    }),
    // createCoupon: builder.mutation<MessageResponse, CreateCouponParameters>({
    //   query: (id) => `line?id=${id}`,
    //   keepUnusedDataFor: 0,
    // }),
  }),
});

export const { useBarQuery, useLineQuery, usePieQuery, useStatsQuery } =
  dashboardApi;

//useLazyBarQuery means when we trigger that then it call req and get data.
//   in useBarQuery there are direct get the data!


