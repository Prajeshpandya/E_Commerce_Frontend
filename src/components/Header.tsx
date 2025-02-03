import { useEffect, useRef, useState } from "react";
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
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface PropsType {
  user: User | null;
}

function Header({ user }: PropsType) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const { cartItems } = useSelector((state: RootState) => state.cartReducer);

  const logoutHandler = async () => {
    try {
      await signOut(auth);
      toast.success("Signed Out Successfully!");
    } catch (error) {
      toast.error("Signed Out Failed!");
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dialogRef.current &&
      !dialogRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

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
          <div
            style={{
              position: "absolute",
              backgroundColor: "black",
              borderRadius: "100%",
              width: "20px",
              height: "20px",
              color: "white",
              textAlign: "center",
              top: "5px",
              right: "41px",
              fontSize: "small",
              fontWeight: "500",
            }}
          >
            {cartItems.length}
          </div>
      </NavLink>
      {user?._id ? (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen((prev) => !prev);
            }}
          >
            <FaUser />
          </button>
          <dialog ref={dialogRef} open={isOpen}>
            <div>
              {user.role === "admin" && (
                <NavLink onClick={() => setIsOpen(false)} to="/admin/dashboard">
                  Admin
                </NavLink>
              )}
              <NavLink onClick={() => setIsOpen(false)} to="/orders">
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
