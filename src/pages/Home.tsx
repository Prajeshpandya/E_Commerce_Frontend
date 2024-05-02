import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const addToCartHandler = () => {};

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
        <ProductCard
          productId="bada"
          name="MacBook"
          price={4545}
          stock={500}
          handler={addToCartHandler}
          photo="https://m.media-amazon.com/images/I/316ArzLeJ2L._SY445_SX342_QL70_FMwebp_.jpg"
        />
      </main>
    </div>
  );
}
