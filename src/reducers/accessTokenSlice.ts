import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAccessToken } from "../types/IAccessToken";
import { RootState } from "../store/store";
import apiClient from "../api/client";

const initialState: IAccessToken = {
  token: "",
  status: "idle",
};

const accessTokenSlice = createSlice({
  name: "accessToken",
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<IAccessToken>) => {
      state.token = action.payload.token;
      state.status = action.payload.status;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(refreshToken.pending, (state) => {
      state.status = "pending";
    });
  },
});

export const refreshToken = createAsyncThunk(
  "accessToken/refreshToken",
  async () => {
    await apiClient.get("users/refresh");
  }
);

export const { setAccessToken } = accessTokenSlice.actions;
export const selectAccessTokenStatus = (store: RootState) =>
  store.accessToken.status;

export default accessTokenSlice.reducer;
