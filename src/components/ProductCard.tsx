import { motion } from "framer-motion";
import { FaPlus } from "react-icons/fa";
import { server } from "../redux/store";
import { CartItem } from "../types/types";

type ProductProps = {
  productId: string;
  photos: [] | string;
  name: string;
  price: number;
  stock: number;
  ratings: number;
  category: string;
  description: string;
  numOfReviews: number;
  handler: (cartItem: CartItem) => string | undefined;
  handleClick: (product: any) => void;
};

export default function ProductCard({
  productId,
  photos,
  name,
  price,
  stock,
  handler,
  handleClick,
  ratings,
  description,
  category,
  numOfReviews,
}: ProductProps) {
  const formattedName = name.length > 30 ? `${name.slice(0, 30)}...` : name;
  const _id = productId;

  const handleCardClick = () => {
    handleClick({
      _id,
      photos,
      name,
      category,
      price,
      stock,
      ratings,
      description,
      numOfReviews,
    });
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
      <img
        src={Array.isArray(photos) && photos.length > 0 ? photos[0].url : ""}
        alt={name}
      />

      <p>{formattedName}</p>
      <span>₹{price}</span>
      <div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            return handler({
              productId,
              photos,
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
