import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingInfo } from "../redux/reducer/cartReducer";
import { RootState, server } from "../redux/store";

export default function Shipping() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state: RootState) => state.userReducer);

  const { cartItems, total } = useSelector(
    (state: RootState) => state.cartReducer
  );
  console.log(
    cartItems?.map((i) => {
      console.log(i.name, i.quantity);
    })
  );
  const [shippingInfo, setShippingInfo] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
  });
  const [isLoadingShip, SetIsLoadingShip] = useState(false);

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

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(saveShippingInfo(shippingInfo));

    try {
      SetIsLoadingShip(true);
      const { data } = await axios.post(
        `${server}/api/v1/payment/create`,
        {
          amount: total,
          name: user?.name!,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(data);
      navigate("/pay", {
        state: data.clientSecret,
      });
      SetIsLoadingShip(false);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong!");
      SetIsLoadingShip(false);
    }
  };
  return (
    <div className="shipping">
      <button className="back_btn" onClick={() => navigate("/cart")}>
        <BiArrowBack />
      </button>
      <form onSubmit={submitHandler}>
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
        <button
          type="submit"
          disabled={isLoadingShip}
          style={{
            cursor: isLoadingShip ? "not-allowed" : "pointer",
          }}
        >
          {isLoadingShip ? "Processing" : "Pay Now"}
        </button>
      </form>
    </div>
  );
}
