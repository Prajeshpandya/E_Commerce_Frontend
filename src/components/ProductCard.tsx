import { motion } from "framer-motion";
import { FaPlus } from "react-icons/fa";
import { server } from "../redux/store";
import { CartItem } from "../types/types";
import { showModal } from "../redux/reducer/modalReducer";
import { useDispatch } from "react-redux";

type ProductProps = {
  productId: string;
  photo: string;
  name: string;
  price: number;
  stock: number;
  handler: (cartItem: CartItem) => string | undefined;
  
  handleClick: (product: any) => void; // Accept the handleClick prop
};

export default function ProductCard({
  productId,
  photo,
  name,
  price,
  stock,
  handler,
  handleClick, // Destructure handleClick


}: ProductProps) {

  // const fullPhotoUrl = `${server}/${photo}`;
  // const navigate = useNavigate();

  const formattedName = name.length > 30 ? `${name.slice(0, 30)}...` : name;
  const dispatch = useDispatch();

 
  const handleCardClick = () => {
    handleClick({ productId, photo, name, price, stock });
  };

  return (
    //uploads\966fa9ef-87a9-4343-a774-a56ce65aa5dc.png

    <motion.div
      onClick={handleCardClick}
      className="product_card"
      initial={{ scaleZ: 50, opacity: 0 }}
      transition={{ duration: 1, ease: "linear" }}
      animate={{ scaleZ: 100, opacity: 100 }}
      exit={{ scaleZ: 50, opacity: 0 }}
    >
      <img src={`${server}/${photo}`} alt={name} />

      <p>{formattedName}</p>
      <span>₹{price}</span>
      <div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            return handler({
              productId,
              photo,
              name,
              price,
              stock,
              quantity: 1,
            });
          }}
        >
          <FaPlus />
        </button>
      </div>
    </motion.div>
  );
}
