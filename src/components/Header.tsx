import { useState } from "react";
import {
  FaSearch,
  FaShoppingBag,
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { User } from "../types/types";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import toast from "react-hot-toast";


interface PropsType {
  user: User | null;
}

function Header({ user }: PropsType) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const logoutHandler = async () => {
    try {
      await signOut(auth);
      toast.success("Signed Out Successfully!");
    } catch (error) {
      toast.error("Signed Out Failed!");
    }
  };

  return (
    <nav className="header">
      <NavLink onClick={() => setIsOpen(false)} to={"/"}>
        HOME
      </NavLink>
      <NavLink onClick={() => setIsOpen(false)} to={"/search"}>
        <FaSearch />
      </NavLink>
      <NavLink onClick={() => setIsOpen(false)} to={"/cart"}>
        <FaShoppingBag />
      </NavLink>
      {user?._id ? (
        <>
          <button onClick={() => setIsOpen((prev) => !prev)}>
            <FaUser />
          </button>
          <dialog  open={isOpen}>
            <div>
              {user.role === "admin" && (
                <NavLink onClick={() => setIsOpen(false)} to="/admin/dashboard">
                  {" "}
                  Admin
                </NavLink>
              )}
              <NavLink onClick={() => setIsOpen(false)} to="/orders">
                {" "}
                Orders
              </NavLink>
            </div>
            <button onClick={logoutHandler}>
              <FaSignOutAlt />
            </button>
          </dialog>
        </>
      ) : (
        <NavLink to={"/login"}>
          <FaSignInAlt />
        </NavLink>
      )}
    </nav>
  );
}

export default Header;
