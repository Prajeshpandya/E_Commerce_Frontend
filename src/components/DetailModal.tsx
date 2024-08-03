import ReactStars from "react-rating-stars-component";

export default function DetailModal() {
  const firstExample = {
    size: 30,
    value: 2.5,
    edit: false,
  };
  return (
    <div className="product">
      <div className="product__photo-container">
        <img src="./camera.jpeg" alt={"name"} className="product__photo" />
      </div>
      <div className="product__details">
        <h2 className="product__name">{"name"}</h2>
        <div className="product__ratings">
          <span className="product__stars">
            {" "}
            <ReactStars {...firstExample} />
          </span>
          <span className="product__reviews">({"numOfReviews"} reviews)</span>
        </div>
        <div className="product__info">
          <p className="product__price">${40}</p>
          <p className="product__stock">{"stock"} in stock</p>
        </div>
        <div className="product__coupons">
          <p>Discount coupons available</p>
        </div>
        <button className="product__add-to-cart">Add to Cart</button>
        <div className="product__description">
          <p>{"description"}</p>
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
