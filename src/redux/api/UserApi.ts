import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  AllUsersResponse,
  DeleteUserParameters,
  MessageResponse,
  UserResponse,
} from "../../types/api-types";
import { User } from "../../types/types";
import axios from "axios";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/user/`,
  }),
  tagTypes: ["users"],
  endpoints: (builder) => ({
    //first argument for response and second for the User that we send..
    login: builder.mutation<MessageResponse, User>({
      query: (user) => ({
        url: "new",
        method: "POST",
        body: user,
      }),
    }),
    getAllUsers: builder.query<AllUsersResponse, string>({
      query: (id) => `all?id=${id}`,
      providesTags: ["users"],
    }),
    deleteUser: builder.mutation<MessageResponse, DeleteUserParameters>({
      query: ({ userId, adminId }) => ({
        url: `${userId}?id=${adminId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const getUser = async (id: string) => {
  try {
    const { data }: { data: UserResponse } = await axios.get(
      `${import.meta.env.VITE_SERVER}/api/v1/user/${id}`
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const { useLoginMutation, useGetAllUsersQuery, useDeleteUserMutation } =
  userApi;
