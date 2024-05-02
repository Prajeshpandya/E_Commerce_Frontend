import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import CartItems from "../components/CartItems";

export default function Cart() {
  const [couponCode, setCouponCode] = useState<string>("");
  const [isValidCoupon, setIsValidCoupon] = useState<boolean>(false);
  const subtotal = 4000;
  const cartItems = [
    {
      productId: "djandjand",
      photo:
        "https://m.media-amazon.com/images/I/316ArzLeJ2L._SY445_SX342_QL70_FMwebp_.jpg",
      name: "MacBook",
      price: 30000,
      quantity: 40,
      stock: 10,
    },
  ];
  const tax = Math.round(subtotal * 0.18);
  const shippingCharges = 200;
  const discount = 400;
  const total = subtotal + tax + shippingCharges;

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
  return (
    <div className="cart">
      <main>
        {cartItems.map((i, index) => (
          <CartItems key={index} cartItem={i}/>
        ))}
      </main>
      <aside>
        <p>Subtotal: ₹{subtotal}</p>
        <p>Shipping Charges: ₹{shippingCharges}</p>
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
      </aside>
    </div>
  );
}
