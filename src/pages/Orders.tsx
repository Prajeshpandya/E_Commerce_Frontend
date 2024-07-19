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

type DataType = {
  _id: string;
  amount: number;
  quantity: number;
  discount: number;
  status: ReactElement;
  action: ReactElement;
};
const column: Column<DataType>[] = [
  {
    Header: "ID",
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
    data?.orders.map((i) =>
      setRows([
        {
          _id: i._id,
          amount: i.total,
          discount: i.discount,
          quantity: i.orderItems.length,
          status: <span> {i.status} </span>,
          action: <Link to={`/${i._id}`}>Manage</Link>,
        },
      ])
    );
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
