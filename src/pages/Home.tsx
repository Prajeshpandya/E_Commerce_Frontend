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
        <ProductCard productId="bada" name="MacBook" price={4545} stock={500} handler={addToCartHandler} photo="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQU3IgUXh_PCs1EpqTegSgxDI2zbQtz6yh__Ba5DyZ5a-W0v02jasvmt1su9iVv8R-Q4sM&usqp=CAU" />
      </main>
    </div>
  );
}
