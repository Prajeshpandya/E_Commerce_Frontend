import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartReducerInitialState } from "../../types/reducer-type";
import { CartItem } from "../../types/types";

const initialState: CartReducerInitialState = {
  loading: false,
  cartItems: [],
  subTotal: 0,
  tax: 0,
  shippingCharges: 0,
  total: 0,
  discount: 0,
  shippingInfo: {
    address: "",
    city: "",
    country: "",
    pinCode: "",
    state: "",
  },
};

export const cartReducer = createSlice({
  name: "cartReducer",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      state.loading = true;
      const index = state.cartItems.findIndex(
        (i: any) => i.productId === action.payload.productId
      );

      if (index !== -1) state.cartItems[index] = action.payload;
      else {
        state.cartItems.push(action.payload);
        state.loading = false;
      }
    },
    removeCartItem: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.cartItems = state.cartItems.filter(
        (i: CartItem) => i.productId !== action.payload //return that array where the payload id's item is not present!
      );
      state.loading = false;
    },
    calculatePrice: (state) => {
      const subTotal = state.cartItems.reduce(
        (total: any, item: any) => total + item.price * item.quantity,
        0
      );

      state.subTotal = subTotal;
      if (state.subTotal > 0) {
        state.shippingCharges = state.subTotal > 1000 ? 0 : 200;
      } else {
        state.shippingCharges = 0;
      }
      state.tax = Math.round(state.subTotal * 0.18);
      state.total =
        state.subTotal + state.tax + state.shippingCharges - state.discount;
    },
    discountApplied: (state, action: PayloadAction<number>) => {
      state.discount = action.payload;
    },
  },
});

export const { addToCart, removeCartItem, calculatePrice, discountApplied } =
  cartReducer.actions;
