import { ReactElement, useState } from "react";
import TableHOC from "../components/admin/TableHOC";
import { Column } from "react-table";
import { Link } from "react-router-dom";

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
  const [rows] = useState<DataType[]>([
    {
      _id: "bsabbcmadbajbdjadbn",
      amount: 50000,
      quantity: 2,
      discount: 1500,
      status: <span className="red">Processing</span>,
      action: <Link to={`/orders/bsabbcm`}>View</Link>,
    },
  ]);

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
      {Table}
    </div>
  );
}
