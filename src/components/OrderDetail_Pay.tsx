import { useSelector } from "react-redux";
import { RootState, server } from "../redux/store";

const OrderDetailPay = () => {
  const {
    cartItems: orderItems,
    discount,
    shippingCharges,
    shippingInfo,
    subTotal,
    tax,
    total,
  } = useSelector((state: RootState) => state.cartReducer);
  const { user } = useSelector((state: RootState) => state.userReducer);

  return (
    <div className="OrderDetail_Pay">
      <main>
        <section
          style={{
            padding: "2rem",
          }}
        >
          <h2 style={{ textAlign: "center" }}>Order Items</h2>

          {orderItems.length > 0 ? (
            orderItems.map((i) => (
              <ProductCard
                name={i.name}
                photo={`${server}/${i.photo}`}
                productId={i.productId}
                quantity={i.quantity}
                price={i.price}
              />
            ))
          ) : (
            <p style={{color:"red"}}> Please go to cart and again order... </p>
          )}
          <h1 style={{ textAlign: "center" }}>Order Info</h1>
          <h5>User Info</h5>
          <p>Name: {user?.name!}</p>
          <p style={{ marginBottom: "11px" }}>
            Address:{" "}
            {`${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.country} ${shippingInfo.pinCode}`}
          </p>
          <h5>Amount Info</h5>
          <p>Subtotal: {subTotal}</p>
          <p>Shipping Charges: {shippingCharges}</p>
          <p>Tax: {tax}</p>
          <p>Discount: {discount}</p>
          <p style={{ fontSize: "18px", fontWeight: "700", marginTop: "7px" }}>
            Total: {total}/-
          </p>
        </section>
      </main>
    </div>
  );
};

const ProductCard = ({ name, photo, price, quantity, _id }: any) => (
  <div key={_id} className="product_card_orderDetail">
    <div>
      <img
        style={{ width: "5rem", height: "5rem", objectFit: "cover" }}
        src={photo}
        alt={name}
      />
      <p>{name.length > 50 ? `${name.slice(0, 45)}...` : name}</p>
    </div>
    <br />
    <p>
      ₹{price} X {quantity} = ₹{price * quantity}
    </p>
  </div>
);

export default OrderDetailPay;
