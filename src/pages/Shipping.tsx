import { ChangeEvent, useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { CartReducerInitialState } from "../types/reducer-type";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

export default function Shipping() {
  const navigate = useNavigate();
  const {
    cartItems,

    total,
  } = useSelector(
    (state: { cartReducer: CartReducerInitialState }) => state.cartReducer
  );
  const [shippingInfo, setShippingInfo] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
  });

  useEffect(() => {
    if (cartItems.length <= 0) {
      return navigate("/");
    }
  }, [cartItems]);

  const changeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setShippingInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <div className="shipping">
      <button className="back_btn" onClick={() => navigate("/cart")}>
        <BiArrowBack />
      </button>
      <form action="">
        <h1>Shipping Address</h1>
        <input
          required
          type="text"
          placeholder="Address"
          name="address"
          value={shippingInfo.address}
          onChange={changeHandler}
        />
        <input
          required
          type="text"
          name="city"
          placeholder="City"
          value={shippingInfo.city}
          onChange={changeHandler}
        />
        <input
          required
          type="text"
          name="state"
          placeholder="State"
          value={shippingInfo.state}
          onChange={changeHandler}
        />
        <select
          name="country"
          required
          value={setShippingInfo.country}
          onChange={changeHandler}
        >
          <option value=""> Choose Country</option>
          <option value="india"> India</option>
          <option value="usa"> Usa</option>
          <option value="uk"> Uk</option>
        </select>
        <input
          required
          type="number"
          name="pinCode"
          placeholder="PinCode"
          value={shippingInfo.pinCode}
          onChange={changeHandler}
        />
        <button type="submit">Pay Now</button>
      </form>
    </div>
  );
}
