import { ReactElement, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { Column } from "react-table";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TableHOC from "../../components/admin/TableHOC";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
} from "../../redux/api/UserApi";
import { useSelector } from "react-redux";
import { RootState, server } from "../../redux/store";
import { CustomError } from "../../types/api-types";
import toast from "react-hot-toast";
import { SkeletonLoader } from "../../components/Loader";
import { responseToast } from "../../utils/features";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.userReducer);

  const { data, isError, isLoading, error } = useGetAllUsersQuery(user?._id!);
  const [deleteUser] = useDeleteUserMutation();

  const deleteHadler = async (id: string) => {
    try {
      const res = await deleteUser({ userId: id, adminId: user?._id! });
      responseToast(res, navigate, "/admin/customer");
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

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
            <button onClick={() => deleteHadler(i._id)}>
              <FaTrash />
            </button>
          ),
        }))
      );
    }
  }, [data]);

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }

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
      <main>
        {isLoading ? (
          <>
            <SkeletonLoader length={5} />
          </>
        ) : (
          Table
        )}
      </main>{" "}
    </div>
  );
};

export default Customers;
