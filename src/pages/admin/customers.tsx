import { ReactElement, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { Column } from "react-table";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TableHOC from "../../components/admin/TableHOC";
import { useGetAllUsersQuery } from "../../redux/api/UserApi";
import { useSelector } from "react-redux";
import { RootState, server } from "../../redux/store";

interface DataType {
  avatar: ReactElement;
  name: string;
  email: string;
  gender: string;
  role: string;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  {
    Header: "Avatar",
    accessor: "avatar",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Gender",
    accessor: "gender",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Role",
    accessor: "role",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const Customers = () => {
  const [rows, setRows] = useState<DataType[]>([]);

  const { user } = useSelector((state: RootState) => state.userReducer);

  const { data, isError, isLoading, error } = useGetAllUsersQuery(user?._id!);

  useEffect(() => {
    if (data) {
      setRows(
        data?.users.map((i) => ({
          avatar: <img src={i.photo} />,
          name: i.name,
          email: i.email,
          gender: i.gender,
          role: i.role,
          action: (
            <button>
              {" "}
              <FaTrash />
            </button>
          ),
        }))
      );
    }
  }, [data]);

  const Table = TableHOC<DataType>(
    columns,
    rows,
    "dashboard-product-box",
    "Customers",
    rows.length > 6
  )();

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>{Table}</main>
    </div>
  );
};

export default Customers;
