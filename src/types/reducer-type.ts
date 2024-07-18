import { User } from "firebase/auth";
import { CartItems, ShippingInfo } from "./types";

export interface UserReducerInitialState {
  user: User | null;
  loading: boolean;
}
export interface CartReducerInitialState {
  loading: boolean;
  cartItems:CartItems[];
  subTotal: number;
  tax: number;
  shippingCharges: number;
  discount: number;
  total: number;
  shippingInfo:ShippingInfo

}
