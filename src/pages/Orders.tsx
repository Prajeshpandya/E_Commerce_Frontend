import { ReactElement, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import TableHOC from "../components/admin/TableHOC";
import { SkeletonLoader } from "../components/Loader";
import { useMyOrdersQuery } from "../redux/api/OrderApi";
import { CustomError } from "../types/api-types";
import { UserReducerInitialState } from "../types/reducer-type";
import { formatDateTime } from "../utils/features";

type DataType = {
  _id: string;
  amount: number;
  quantity: number[];
  discount: number;
  TimeDate: any;
  updateAt:any;
  status: ReactElement;
  action: ReactElement;
};
const column: Column<DataType>[] = [
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Order ID",
    accessor: "_id",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Quantity",
    accessor: "quantity",
  },
  {
    Header: "Discount",
    accessor: "discount",
  },
  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "TimeDate",
    accessor: "TimeDate",
  },
  {
    Header: "LastUpdate",
    accessor: "updateAt",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];
export default function Orders() {
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );

  const { isError, isLoading, data, error } = useMyOrdersQuery(user?._id!);

  useEffect(() => {
    if (data) {
      const reversedArray = [...data?.orders!].reverse();
      setRows(
        reversedArray!.map((i) => ({
          name: i.orderItems.map((i) => i.name),
          _id: i._id,
          amount: i.total,
          discount: i.discount,
          quantity: i.orderItems.map((i) => i.quantity),
          status: (
            <span
              className={
                i.status === "Processing"
                  ? "red"
                  : i.status === "Shipped"
                  ? "green"
                  : "purple"
              }
            >
              {i.status}
            </span>
          ),
          TimeDate: formatDateTime(i.createdAt),
          updateAt:formatDateTime(i.updatedAt),
          action: <Link to={`/admin/transaction/${i._id}`}>Manage</Link>,
        }))
      );
    }
  }, [data]);

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }

  const [rows, setRows] = useState<DataType[]>([]);

  const Table = TableHOC<DataType>(
    column,
    rows,
    "dashboard_product_box",
    "Orders",
    true
  )();
  return (
    <div className="container">
      <h1>My orders</h1>
      {data?.orders.length! <= 0 ? (
        <h1>No Order Found</h1>
      ) : (
        <>
          {isLoading ? (
            <>
              <SkeletonLoader length={5} />
            </>
          ) : (
            Table
          )}
        </>
      )}
    </div>
  );
}
