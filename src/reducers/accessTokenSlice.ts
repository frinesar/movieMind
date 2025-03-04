import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAccessToken } from "../types/IAccessToken";
import { RootState } from "../store/store";

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
});

export const { setAccessToken } = accessTokenSlice.actions;
export const selectAccessTokenStatus = (store: RootState) =>
  store.accessToken.status;

export default accessTokenSlice.reducer;
