import { FaPlus } from "react-icons/fa";
import { server } from "../redux/store";

type ProductProps = {
  productId: string;
  photo: string;
  name: string;
  price: number;
  stock: number;
  handler: () => void;
};

export default function ProductCard({
  productId,
  photo,
  name,
  price,
  stock,
  handler,
}: ProductProps) {
  const fullPhotoUrl = `${server}/${photo}`;
  return (
    //uploads\966fa9ef-87a9-4343-a774-a56ce65aa5dc.png

    <div className="product_card">
      <img src={`${server}/${photo}`} alt={name} />
     
      <p>{name}</p>
      <span>₹{price}</span>
      <div>
        <button onClick={() => handler()}>
          <FaPlus />
        </button>
      </div>
    </div>
  );
}
