import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { SkeletonLoader } from "../components/Loader";
import ProductCard from "../components/ProductCard";
import { useLatestProductsQuery } from "../redux/api/ProductApi";
import { addToCart } from "../redux/reducer/cartReducer";
import { CartItem } from "../types/types";

export default function Home() {
  const { data, isError, isLoading } = useLatestProductsQuery("");

  const dispatch = useDispatch();

  const addToCartHandler = (cartItem: CartItem) => {
    if (cartItem.stock < 1) return toast.error("Out of Stock!");
    dispatch(addToCart(cartItem));
    toast.success("Item added to Cart!")
  }; 

  if (isError) {
    toast.error("Can not fetched the Products ");
  }
  return (
    <div className="home">
      <section></section>

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
