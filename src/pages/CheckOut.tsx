import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useNewOrderMutation } from "../redux/api/OrderApi";
import { resetCart } from "../redux/reducer/cartReducer";
import { RootState } from "../redux/store";
import { NewOrderParameters } from "../types/api-types";
import { responseToast } from "../utils/features";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const CheckOutForm = () => {
  const navigate = useNavigate();
  const stripe = useStripe();
  const dispatch = useDispatch();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const { user } = useSelector((state: RootState) => state.userReducer);
  const {
    cartItems,
    discount,
    shippingCharges,
    shippingInfo,
    subTotal,
    tax,
    total,
  } = useSelector((state: RootState) => state.cartReducer);

  const [newOrder] = useNewOrderMutation();

  console.log(cartItems.map((i)=>{console.log(i.quantity,i.name)}))

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!stripe || !elements) {
      toast.error("Stripe.js has not yet loaded.");
      return;
    }
    setIsProcessing(true);
    const orderData: NewOrderParameters = {
      discount,
      orderItems: cartItems,
      shippingCharges,
      shippingInfo,
      subTotal,
      tax,
      total,
      user: user?._id!,
    };

    console.log(orderData);
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin,
        payment_method_data: {
          billing_details: {
            name: user?.name,
            email: user?.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      },
      
      
      redirect: "if_required",
    });

    if (error) {
      setIsProcessing(false);
      console.log(error);
      return toast.error(error.message || "Something went wrong!");
    }

    if (paymentIntent && paymentIntent.status === "succeeded") {
      const res = await newOrder(orderData);
      dispatch(resetCart());
      responseToast(res, navigate, "/orders");
    }
    setIsProcessing(false);
  };

  return (
    <div className="checkout_container">
      <form onSubmit={submitHandler}>
        <PaymentElement />
        <button type="submit" disabled={isProcessing}>
          {isProcessing ? "Processing" : "Pay"}
        </button>
      </form>
    </div>
  );
};

export default function CheckOut() {
  const location = useLocation();
  const clientSecret: string | undefined = location.state;

  if (!clientSecret) return <Navigate to={"/shipping"} />;

  return (
    <Elements
      options={{
        clientSecret,
      }}
      stripe={stripePromise}
    >
      <CheckOutForm />
    </Elements>
  );
}