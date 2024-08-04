import { createSlice } from "@reduxjs/toolkit";
import { ModalReducerInitialState } from "../../types/reducer-type";

export const modalReducer = createSlice({
  name: "modalReducer",
  initialState: <ModalReducerInitialState>{ modal: false, selectedProduct: {} },
  reducers: {
    showModal: (state, action) => {
      state.modal = true;
      state.selectedProduct = action.payload;
    },
    closeModal: (state) => {
      state.modal = false;
      state.selectedProduct = null;
    },
  },
});

export const { closeModal, showModal } = modalReducer.actions;
