import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from "react-redux";
import { useNewReviewMutation } from "../redux/api/ProductApi";
import { addToCart } from "../redux/reducer/cartReducer";
import { closeModal } from "../redux/reducer/modalReducer";
import { RootState, server } from "../redux/store";
import { GetReviewsResponse } from "../types/api-types";
import { CartItem, Product } from "../types/types";
import { responseToast } from "../utils/features";
import { MdOutlineStarPurple500 } from "react-icons/md";
import ZoomImage from "./ZoomImage";

export default function DetailModal({
  product,
  reviews,
}: {
  product: Product;
  reviews: GetReviewsResponse;
}) {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state: RootState) => state.cartReducer);
  const { user } = useSelector((state: RootState) => state.userReducer);
  const [selectedImage, setSelectedImage] = useState(product.photos[0]?.url);

  const [startRating, setStarRating] = useState(0);
  const [comment, setComment] = useState("");

  const [newReview] = useNewReviewMutation();

  const ratings = product.ratings || 0;
  const numOfReviews = product.numOfReviews;

  const firstExample = {
    size: 30,
    value: ratings,
    edit: false,
  };

  const getRatings = {
    size: 30,
    onChange: (newValue: number) => {
      setStarRating(newValue);
    },
    edit: true,
  };

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

  const submitHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const res = await newReview({
      comment,
      rating: startRating,
      productId: product._id,
      userId: user?._id!,
    });
    setComment(""); // Clear the input field
    setStarRating(0);

    responseToast(res, null, null);
    dispatch(closeModal());
  };

  // console.log(reviews);
  console.log("product", product);

  return (
    <div className="product">
      <div className="product__photo-container">
        <div className="product__photo-container">
          <ZoomImage
            src={selectedImage}
            alt={product.name}
            className="product__photo"
          />
        </div>

        <div className="product__thumbnails">
          {product.photos.map((photo, index) => (
            <img
              key={index}
              src={photo.url}
              alt={`Thumbnail ${index}`}
              className="product__thumbnail"
              onClick={() => setSelectedImage(photo.url)}
            />
          ))}
        </div>
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
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add your review"
            className="product__review-input"
          />

          <ReactStars {...getRatings} />

          <button className="product__review-submit" onClick={submitHandler}>
            Submit
          </button>
        </div>
        <div className="rating_container">
          {reviews?.reviews?.map((reviews) => (
            <div className="product__rating">
              <p>{reviews.user.name} : </p>
              <p>{reviews.comment}</p>
              <p style={{ alignItems: "center", display: "flex" }}>
                {reviews.rating}{" "}
                <MdOutlineStarPurple500 fill="#FFD700" size={19} />
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
