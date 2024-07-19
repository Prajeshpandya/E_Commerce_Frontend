import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function CheckOut() {
  const stripePromise = loadStripe(
    "pk_test_51PRdAeSIRiLwSxTnWbKQYTLwbq9gbAd0PzyaIZHilHf2saCLRVJMPg5yrqixBZqCoKWe6HosuC7fqRP5KVECYgc600W05X96uO"
  );

  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const CheckOutForm = () => {
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();

    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!stripe || !elements) return;
      setIsProcessing(true);

      const orderData = {};

      const { paymentIntent, error } = await stripe.confirmPayment({
        elements,
        confirmParams: { return_url: window.location.origin },
        redirect: "if_required",
      });

      if (error) {
        setIsProcessing(false);
        return toast.error(error.message || "Something Went Wrong!");
      }

      if (paymentIntent.status === "succeeded") {
        console.log("PlacingOrder");
        navigate("/orders");
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
  return (
    <Elements
      options={{
        clientSecret:
          "pi_3PeGNRSIRiLwSxTn0AGm9IRs_secret_aF5TerjzoCnwRIpsCvgsacfS7",
      }}
      stripe={stripePromise}
    >
      <CheckOutForm />
    </Elements>
  );
}
