import { useState } from "react";
import ProductCard from "../components/ProductCard";
import {
  useAllCategoriesQuery,
  useSearchProductsQuery,
} from "../redux/api/ProductApi";
import { CustomError } from "../types/api-types";
import toast from "react-hot-toast";
import { SkeletonLoader } from "../components/Loader";
import { CartItem } from "../types/types";
import { addToCart } from "../redux/reducer/cartReducer";
import { useDispatch, useSelector } from "react-redux";
import { CartReducerInitialState } from "../types/reducer-type";

export default function Search() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [category, setCategory] = useState("");
  const [maxPrice, setMaxPrice] = useState(1000000);
  const [page, setPage] = useState(1);

  const {
    data: categoriesResponse,
    isLoading: loadingCategories,
    isError,
    error,
  } = useAllCategoriesQuery("");

  const {
    data: searchProductResponse,
    isLoading: productLoading,
    isError: searchIsProductError,
    error: searchProductError,
  } = useSearchProductsQuery({ search, sort, category, page, price: maxPrice });

  const isNextPage = page < 4;
  const isPreviousPage = page > 1;

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }
  if (searchIsProductError) {
    const err = searchProductError as CustomError;
    toast.error(err.data.message);
  }

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
            <option value=""> ALL</option>
            {!loadingCategories &&
              categoriesResponse?.categories.map((category) => (
                <option value={category} key={category}>
                  {category.toUpperCase()}
                </option>
              ))}
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

        {productLoading ? (
          <SkeletonLoader length={10} />
        ) : (
          <div className="search_product_list">
            {searchProductResponse?.products.map((i) => (
              <ProductCard
                key={i._id}
                productId={i._id}
                name={i.name}
                price={i.price}
                stock={i.stock}
                handler={addToCartHandler}
                photo={i.photo}
              />
            ))}
          </div>
        )}

        {searchProductResponse && searchProductResponse.totalPage > 1 && (
          <article>
            <button
              disabled={!isPreviousPage}
              onClick={() => setPage((prev) => prev - 1)}
            >
              Prev
            </button>
            <span>
              {page} of {searchProductResponse.totalPage}
            </span>
            <button
              onClick={() => setPage((prev) => prev + 1)}
              disabled={!isNextPage}
            >
              Next
            </button>
          </article>
        )}
      </main>
    </div>
  );
}
