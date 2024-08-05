import ReactStars from "react-rating-stars-component";
import { server } from "../redux/store";
import { Product } from "../types/types";

export default function DetailModal({ product }: Product) {
  const ratings = product.ratings || 0;
  const numOfReviews = product.numOfReviews;
  console.log(numOfReviews);

  const firstExample = {
    size: 30,
    value: ratings,
    edit: false,
  };
  console.log(product);
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
            {" "}
            {`${numOfReviews} ${numOfReviews < 2 ? "Review" : "Reviews"} `}
          </span>
        </div>
        <div className="product__info">
          <p className="product__price">₹{product.price}</p>
          <p className="product__stock">{product.stock} in stock</p>
        </div>
        <div className="product__coupons">
          <p>Discount coupons available</p>
        </div>
        <button className="product__add-to-cart">Add to Cart</button>
        <div className="product__description">
          <p>{product.description}</p>
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
