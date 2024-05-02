import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";

export default function Home() {

  const addToCartHandler = ()=>{

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
        <ProductCard productId="bada" name="MacBook" price={4545} stock={500} handler={addToCartHandler} photo="https://images.unsplash.com/photo-1569770218135-bea267ed7e84?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
      </main>
    </div>
  );
}
