import { FaPlus } from "react-icons/fa";

type ProductProps = {
  productId: string;
  photo: string;
  name: string;
  price: number;
  stock: number;
  handler: () => void;
};

const server = "";
export default function ProductCard({
  productId,
  photo,
  name,
  price,
  stock,
  handler,
}: ProductProps) {
  return (
    <div className="product_card">
      <img src={photo} alt={name} />
      <p>{name}</p>
      <span>₹{price}</span>
      <div>
        <button onClick={()=>handler()}> 
          <FaPlus />
        </button>
      </div>
    </div>
  );
}
