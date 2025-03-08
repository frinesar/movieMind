import apiClient from "./client";
import { createApi, BaseQueryFn } from "@reduxjs/toolkit/query/react";
import { AxiosError, AxiosRequestConfig } from "axios";
import { ITrendingMovies } from "../types/ITrendingMovies";
import { IReview } from "../types/IReview";

const axiosBaseQuery =
  (): BaseQueryFn<
    {
      url: string;
      method?: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
      headers?: AxiosRequestConfig["headers"];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params, headers }) => {
    try {
      const result = await apiClient({
        url,
        method,
        data,
        params,
        headers,
      });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export const apiSlice = createApi({
  baseQuery: axiosBaseQuery(),
  reducerPath: "api",
  endpoints: (build) => {
    return {
      getTrendingMovies: build.query<ITrendingMovies, "week" | "day">({
        query: (timeWindow) => ({
          url: `/tmdb/trending/movie/${timeWindow}`,
          method: "get",
        }),
      }),
      getUsersReviews: build.query<IReview[], void>({
        query: () => ({
          url: "/reviews",
          method: "get",
        }),
      }),
      login: build.mutation<
        { accessToken: string },
        { username: string; password: string }
      >({
        query: (data) => ({
          url: "/users/login",
          method: "post",
          data,
        }),
      }),
      signUp: build.mutation<void, { username: string; password: string }>({
        query: (data) => ({
          url: "/users",
          method: "post",
          data,
        }),
      }),
      logout: build.mutation<void, void>({
        query: () => ({
          url: "/users/logout",
          method: "post",
        }),
      }),
    };
  },
});

export const {
  useGetTrendingMoviesQuery,
  useLazyGetUsersReviewsQuery,
  useLoginMutation,
  useLogoutMutation,
  useSignUpMutation,
} = apiSlice;
