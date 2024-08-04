import { createSlice } from "@reduxjs/toolkit";
import { ModalReducerInitialState } from "../../types/reducer-type";

export const modalReducer = createSlice({
  name: "modalReducer",
  initialState: <ModalReducerInitialState>{ modal: false },
  reducers: {
    showModal: (state) => {
      state.modal = true;
    },
    closeModal: (state) => {
      state.modal = false;
    },
  },
});

export const { closeModal, showModal } = modalReducer.actions;
