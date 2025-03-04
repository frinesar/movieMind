import { configureStore } from "@reduxjs/toolkit";

import accessTokenSlice from "../reducers/accessTokenSlice";

export const store = configureStore({
  reducer: {
    accessToken: accessTokenSlice,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
