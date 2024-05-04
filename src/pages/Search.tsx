import { useState } from "react";
import ProductCard from "../components/ProductCard";

export default function Search() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [category, setCategory] = useState("");
  const [maxPrice, setMaxPrice] = useState(1000000);
  const [page, setPage] = useState(1);

  const addToCartHandler = () => {};
  const isNextPage = page < 4;
  const isPreviousPage =  page > 1  ;

  return (
    <div className="product_search">
      <aside>
        <h2>Filters</h2>
        <div>
          <h4>Sort</h4>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="">None</option>
            <option value="asc">Price (Low To High)</option>
            <option value="dsc">Price (High To Low)</option>
          </select>
        </div>
        <div>
          <h4>Max Price : {maxPrice || ""}</h4>
          <input
            type="range"
            min={100}
            max={100000}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </div>
        <div>
          <h4>Category</h4>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">All</option>
            <option value="asc">Sample 1</option>
            <option value="dsc">Sample 2</option>
          </select>
        </div>
      </aside>
      <main>
        <h1>Products</h1>
        <input
          type="text"
          placeholder="Search By Name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="search_product_list">
          <ProductCard
            productId="bada"
            name="MacBook"
            price={4545}
            stock={500}
            handler={addToCartHandler}
            photo="https://m.media-amazon.com/images/I/316ArzLeJ2L._SY445_SX342_QL70_FMwebp_.jpg"
          />
        </div>
        <article>
          <button disabled={!isPreviousPage} onClick={()=>setPage(prev=>prev-1)}>Prev</button>
          <span>{page} of {4}</span>
          <button onClick={()=>setPage(prev =>prev+1)} disabled={!isNextPage}>Next</button>

        </article>
      </main>
    </div>
  );
}
