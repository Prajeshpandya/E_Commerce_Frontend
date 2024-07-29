import { forwardRef } from "react";
import { useSelector } from "react-redux";
import { RootState, server } from "../redux/store";
import { useOrderDetailsQuery } from "../redux/api/OrderApi";
import { Order } from "../types/types";
import { formatDateTime } from "../utils/features";

const defaultData: Order = {
  shippingInfo: {
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
  },
  status: "",
  subTotal: 0,
  discount: 0,
  shippingCharges: 0,
  tax: 0,
  total: 0,
  orderItems: [],
  user: {
    name: "",
    _id: "",
  },
  _id: "",
};
interface InvoiceProps {
  orderId: string;
}

const Invoice = forwardRef<HTMLDivElement, InvoiceProps>(({ orderId }, ref) => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const { data, isLoading } = useOrderDetailsQuery(orderId);

  console.log(data);
  const {
    shippingInfo,
    subTotal,
    tax,
    orderItems,
    discount,
    total,
    shippingCharges,
  } = data?.order || defaultData;

  return (
    <div className="invoice" ref={ref}>
      {isLoading ? (
        <h1>Nop</h1>
      ) : (
        <>
          {" "}
          <header className="invoice-header">
            <h1>ShopEase - Quick & Simple</h1>
          </header>
          <div className="invoice-content">
            <div className="left-section">
              <section className="payment-info">
                <h2>Payment & Order Info</h2>
                <p>
                  <strong>Payment Method:</strong> Online
                </p>
                <p>
                  <strong>Order At:</strong>{" "}
                  {formatDateTime(data?.order.createdAt!)}
                </p>
              </section>
            </div>
            <div className="right-section">
              <section className="user-info">
                <h2>User Info</h2>
                <p>
                  <strong>Name:</strong>
                  {user?.name!}
                </p>
                <p>
                  <strong>Address:</strong>{" "}
                  {`${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.country} ${shippingInfo.pinCode}`}
                </p>
              </section>
            </div>
          </div>
          <section className="items-details">
            <h2>Items Details</h2>
            <table>
              <thead>
                <tr>
                  <th>Photo</th>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {orderItems?.map((item: any, index) => (
                  <tr key={index}>
                    <td>
                      <img src={`${server}/${item.photo}`} alt={item.name} />
                    </td>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>₹{item.price}</td>
                    <td>₹{subTotal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
          <section className="amount-info">
            <h2>Amount Info</h2>

            <p>
              <strong>Shipping Charges:</strong> {shippingCharges} ₹
            </p>
            <p>
              <strong>Tax:</strong> {tax} ₹
            </p>
            <p>
              <strong>Discount:</strong> - {discount} ₹
            </p>
            <p>
              <strong>Total:</strong> {total} ₹
            </p>
          </section>
        </>
      )}
    </div>
  );
});

export default Invoice;
