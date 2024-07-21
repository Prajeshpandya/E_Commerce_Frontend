import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { VscError } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItems from "../components/CartItems";
import {
  addToCart,
  calculatePrice,
  discountApplied,
  inValidateCoupon,
  removeCartItem,
} from "../redux/reducer/cartReducer";
import { CartReducerInitialState } from "../types/reducer-type";
import { CartItem } from "../types/types";
import axios from "axios";
import { server } from "../redux/store";

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
    console.log(cartItem.quantity, cartItem.name);
    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity + 1 }));
    console.log(cartItem.quantity, cartItem.name);
  };
  const deccrementHandler = (cartItem: CartItem) => {
    if (cartItem.quantity <= 1) return;
    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity - 1 }));
    console.log(cartItem.quantity, cartItem.name);
  };
  const removeHandler = (productId: string) => {
    dispatch(removeCartItem(productId));
  };

  useEffect(() => {
    const { token, cancel } = axios.CancelToken.source();
    const timeOutId = setTimeout(() => {
      axios
        .get(`${server}/api/v1/payment/discount?coupon=${couponCode}`, {
          cancelToken: token,
        })
        .then((res) => {
          dispatch(discountApplied(res.data.discount));
          setIsValidCoupon(true);
          dispatch(calculatePrice());
        })
        .catch((err) => {
          setIsValidCoupon(false);
          dispatch(discountApplied(0));
          dispatch(calculatePrice());
        });
    }, 500);
    return () => {
      clearTimeout(timeOutId);
      cancel();
      setIsValidCoupon(false);
    };
  }, [couponCode]);

  useEffect(() => {
    dispatch(calculatePrice());
    console.log(total);
  }, [cartItems]);
  
  if (total < 0) {
    console.log("its minus total");
    dispatch(inValidateCoupon());
    console.log("function called inValidateCoupon");
    dispatch(calculatePrice());
    console.log("function called calculatePrice");
  }

  const totalItems = cartItems.reduce(
    (quantity, item) => quantity + item.quantity,
    0
  );
  return (
    <div className="cart">
      <main>
        {totalItems > 0 && <h1>Total Items:{totalItems} </h1>}
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
          disabled={total < 1}
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
