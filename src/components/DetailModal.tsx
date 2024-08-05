import ReactStars from "react-rating-stars-component";
import { RootState, server } from "../redux/store";
import { CartItem, Product } from "../types/types";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/reducer/cartReducer";
import { useNavigate } from "react-router-dom";

export default function DetailModal({ product }: Product) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state: RootState) => state.cartReducer);

  const ratings = product.ratings || 0;
  const numOfReviews = product.numOfReviews;
  console.log(numOfReviews);

  const firstExample = {
    size: 30,
    value: ratings,
    edit: false,
  };
  console.log(product);

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

  const SendProduct = {
    productId: product._id,
    photo: product.photo,
    name: product.name,
    price: product.price,
    stock: product.stock,
    quantity: 1,
  };

  return (
    <div className="product">
      <div className="product__photo-container">
        <img
          src={`${server}/${product.photo}`}
          alt={product.name}
          className="product__photo"
        />
      </div>
      <div className="product__details">
        <h2 className="product__name">{product.name}</h2>
        <div className="product__ratings">
          <span className="product__stars">
            <ReactStars {...firstExample} />
          </span>
          <span className="product__reviews">
            {`${numOfReviews} ${numOfReviews < 2 ? "Review" : "Reviews"}`}
          </span>
        </div>
        <div className="product__info">
          <p className="product__price">₹{product.price}.00</p>
          <p className="product__stock">{product.stock} in stock</p>
        </div>
        <div className="product__coupons">
          <p>Discount coupons available</p>
        </div>
        <button
          className="product__add-to-cart"
          onClick={() => addToCartHandler(SendProduct)}
        >
          Add to Cart
        </button>
        <div className="product__description">
          <p>Description: {product.description}</p>
        </div>
        <div className="product__review">
          <input
            type="text"
            placeholder="Add your review"
            className="product__review-input"
          />
          <button className="product__review-submit">Submit</button>
        </div>
      </div>
    </div>
  );
}
