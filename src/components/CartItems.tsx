import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { server } from "../redux/store";
import { CartItem } from "../types/types";

type CartItemsprops = {
  cartItem: CartItem;
  incrementHandler: (cartItem: CartItem) => void;
  deccrementHandler: (cartItem: CartItem) => void;
  removeHandler: (id:string) => void;
};

export default function CartItems({ cartItem,incrementHandler,deccrementHandler,removeHandler }: CartItemsprops) {
  const { photo, productId, name, price, quantity } = cartItem;
  return (
    <div className="cart_item">
      <img src={`${server}/${photo}`} alt={name} />
      <article>
        <Link to={`/product/${productId}`}> {name}</Link>
        <span>₹{price}</span>
      </article>

      <div>
        <button onClick={()=>deccrementHandler(cartItem)}>-</button>
        <p>{quantity}</p>
        <button onClick={()=>incrementHandler(cartItem)}>+</button>
      </div>
      <button onClick={()=>removeHandler(productId)}>
        <FaTrash />
      </button>
    </div>
  );
}
