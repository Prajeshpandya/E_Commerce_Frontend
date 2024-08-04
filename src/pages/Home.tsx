import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { SkeletonLoader } from "../components/Loader";
import ProductCard from "../components/ProductCard";
import { useLatestProductsQuery } from "../redux/api/ProductApi";
import { addToCart } from "../redux/reducer/cartReducer";
import { CartReducerInitialState } from "../types/reducer-type";
import { CartItem } from "../types/types";
import { useEffect, useState } from "react";
import home2 from "../assets/home_2.jpg";
import home3 from "../assets/home_new_1.jpg";
import home4 from "../assets/hritik.webp";
import { motion } from "framer-motion";
import Modal from "../components/Modal";
import DetailModal from "../components/DetailModal";
import { RootState } from "../redux/store";
import { showModal } from "../redux/reducer/modalReducer";

export default function Home() {
  const { data, isError, isLoading } = useLatestProductsQuery("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { modal } = useSelector((state: RootState) => state.modalReducer);

  const { cartItems } = useSelector(
    (state: { cartReducer: CartReducerInitialState }) => state.cartReducer
  );

  const addToCartHandler = (cartItem: CartItem) => {
    if (cartItem.stock < 1) return toast.error("Out of Stock!");
    const alreadyExist = cartItems.find(
      (i: CartItem) => i.productId === cartItem.productId
    );
    if (alreadyExist) {
      return toast.error("Item Already Exist in Cart!");
    } else {
      dispatch(addToCart(cartItem));

      toast.success("Item added to Cart!");
    }
  };

  if (isError) {
    toast.error("Can not fetched the Products ");
  }

  const photos = [home2, home3, home4];
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  // const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % photos.length);
    }, 4000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [photos.length]);

  const currentPhoto = photos[currentPhotoIndex];


  const handleClick = (productId:string) => {
    dispatch(showModal());
    navigate(`${productId}`, { state: productId });
  };

  return (
    <div className="home">
      <motion.img
        key={currentPhoto}
        initial={{ scaleZ: 50, opacity: 0 }}
        animate={{ scaleZ: 100, opacity: 100 }}
        exit={{ scaleZ: 50, opacity: 0 }}
        transition={{ duration: 1, ease: "linear" }}
        src={currentPhoto}
        alt=""
      />
      {modal && (
        <Modal title="Title">
        </Modal>
      )}
      <h1>
        Latest Products
        <Link to="/search" className="findmore">
          More{" "}
        </Link>
      </h1>
      <main>
        {isLoading ? (
          <SkeletonLoader width="80vw" />
        ) : (
          data?.products.map((i) => (
            <ProductCard
              handleClick={handleClick}
              key={i._id}
              productId={i._id}
              name={i.name}
              price={i.price}
              stock={i.stock}
              handler={addToCartHandler}
              photo={i.photo}
            />
          ))
        )}
      </main>
    </div>
  );
}
