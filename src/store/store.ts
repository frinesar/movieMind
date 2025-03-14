import { configureStore } from "@reduxjs/toolkit";

import accessTokenSlice from "../reducers/accessTokenSlice";
import authModalSlice from "../reducers/authModalSlice";
import { apiSlice } from "../api/api";

export const store = configureStore({
  reducer: {
    accessToken: accessTokenSlice,
    authModal: authModalSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
