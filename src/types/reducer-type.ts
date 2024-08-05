import { User } from "firebase/auth";
import { CartItem, Product, ShippingInfo } from "./types";

export interface UserReducerInitialState {
  user: User | null;
  loading: boolean;
}
export interface ModalReducerInitialState {
  modal: boolean;
  selectedProduct: Product;
}
export interface CartReducerInitialState {
  loading: boolean;
  cartItems: CartItem[];
  subTotal: number;
  tax: number;
  shippingCharges: number;
  discount: number;
  total: number;
  shippingInfo: ShippingInfo;
}
