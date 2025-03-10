import apiClient from "./client";
import { createApi, BaseQueryFn } from "@reduxjs/toolkit/query/react";
import { AxiosError, AxiosRequestConfig } from "axios";
import { ITrendingMovies } from "../types/ITrendingMovies";
import { IReview } from "../types/IReview";
import { IMovie } from "../types/IMovie";

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
      getReviewByID: build.query<IReview, string>({
        query: (id) => ({
          url: `/reviews/${id}`,
          method: "get",
        }),
      }),
      updateReview: build.mutation<IReview, IReview>({
        query: (review) => ({
          url: `/reviews/${review.reviewID}`,
          method: "put",
          data: review,
        }),
      }),
      getMovieByID: build.query<IMovie, string>({
        query: (id) => ({
          url: `/tmdb/movie/${id}`,
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
  useGetMovieByIDQuery,
  useLazyGetMovieByIDQuery,
  useGetUsersReviewsQuery,
  useGetReviewByIDQuery,
  useUpdateReviewMutation,
  useLoginMutation,
  useLogoutMutation,
  useSignUpMutation,
} = apiSlice;
