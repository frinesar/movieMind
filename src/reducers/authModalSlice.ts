import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

const initialState = {
  isOpen: false,
};

const authModalSlice = createSlice({
  name: "authModal",
  initialState,
  reducers: {
    openAuthModal: (state) => {
      state.isOpen = true;
    },
    closeAuthModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const selectAuthModalIsOpen = (state: RootState) =>
  state.authModal.isOpen;
export const { openAuthModal, closeAuthModal } = authModalSlice.actions;
export default authModalSlice.reducer;
