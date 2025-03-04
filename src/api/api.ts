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
    };
  },
});

export const { useGetTrendingMoviesQuery, useLazyGetUsersReviewsQuery } =
  apiSlice;
