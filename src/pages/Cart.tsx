import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { VscError } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItems from "../components/CartItems";
import {
  addToCart,
  calculatePrice,
  removeCartItem,
} from "../redux/reducer/cartReducer";
import { CartReducerInitialState } from "../types/reducer-type";
import { CartItem } from "../types/types";

export default function Cart() {
  const dispatch = useDispatch();
  const {
    cartItems,
    discount,
    loading,
    shippingCharges,
    subTotal,
    tax,
    total,
  } = useSelector(
    (state: { cartReducer: CartReducerInitialState }) => state.cartReducer
  );

  const [couponCode, setCouponCode] = useState<string>("");
  const [isValidCoupon, setIsValidCoupon] = useState<boolean>(false);

  const incrementHandler = (cartItem: CartItem) => {
    if (cartItem.quantity >= cartItem.stock)
      return toast.error(`We have only ${cartItem.stock} in Stock!`);
    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity + 1 }));
  };
  const deccrementHandler = (cartItem: CartItem) => {
    if (cartItem.quantity <= 1) return;
    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity - 1 }));
  };
  const removeHandler = (productId: string) => {
    dispatch(removeCartItem(productId));
  };

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      if (Math.random() > 0.5) setIsValidCoupon(true);
      else setIsValidCoupon(false);
    }, 1000);
    return () => {
      clearTimeout(timeOutId);
      setIsValidCoupon(false);
    };
  }, [couponCode]);

  useEffect(() => {
    dispatch(calculatePrice());
  }, [cartItems]);
  return (
    <div className="cart">
      <main>
        {cartItems.length > 0 && <h1>Total Items:{cartItems.length} </h1>}
        {cartItems.length > 0 ? (
          cartItems.map((i, index) => (
            <CartItems
              removeHandler={removeHandler}
              deccrementHandler={deccrementHandler}
              incrementHandler={incrementHandler}
              key={index}
              cartItem={i}
            />
          ))
        ) : (
          <h1>No iteams Added!</h1>
        )}
      </main>
      <aside>
        <p>Subtotal: ₹{subTotal}</p>
        <p>Shipping Charges: ₹{shippingCharges}</p>{" "}
        {shippingCharges > 0 && (
          <span style={{ color: "red", fontSize: "smaller" }}>
            Add Item of more than ₨.1000 to Avoid Shipping Charges
          </span>
        )}
        <p>Tax: ₹{tax}</p>
        <p>
          Discount : <em> - ₹{discount}</em>
        </p>
        <p>
          {" "}
          <b>Total : {total}</b>
        </p>
        <input
          type="text"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          placeholder="Coupon Code"
        />
        {couponCode &&
          (isValidCoupon ? (
            <span className="green">
              {" "}
              ₹{discount} off using the <code>{couponCode}</code>
            </span>
          ) : (
            <span className="red">
              Invalid Coupon <VscError />
            </span>
          ))}
        {cartItems.length > 0 && <Link to="/shipping">Checkout</Link>}
      </aside>
    </div>
  );
}
