import { ChangeEvent, FormEvent, useState } from "react";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { useSelector } from "react-redux";
import { UserReducerInitialState } from "../../../types/reducer-type";
import { useNewProductMutation } from "../../../redux/api/ProductApi";
import { responseToast } from "../../../utils/features";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useFileHandler } from "6pp";

const NewProduct = () => {
  const navigate = useNavigate();
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );
  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [price, setPrice] = useState<number>(1000);
  const [stock, setStock] = useState<number>(1);
  const [description, setDescription] = useState<string>("");

  const [newProduct] = useNewProductMutation();
  const photos = useFileHandler("multiple", 10, 5);

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !category || !price || !stock || !description)
      toast.error("Enter All Fields !");

    if (!photos.file || photos.file.length === 0) return;

    const formData = new FormData();

    formData.set("name", name);
    formData.set("description", description);
    formData.set("price", price.toString());
    formData.set("stock", stock.toString());
    formData.set("category", category);

    photos.file?.forEach((file) => {
      formData.append("photos", file);
    });

    const res = await newProduct({
      id: user?._id!,
      formData,
    });

    responseToast(res, navigate, "/admin/product");
  };

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="product-management">
        <article>
          <form onSubmit={submitHandler}>
            <h2>New Product</h2>
            <div>
              <label>Name</label>
              <input
                type="text"
                required
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label>Description</label>
              <input
                type="text"
                required
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div>
              <label>Price</label>
              <input
                type="number"
                placeholder="Price"
                required
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </div>
            <div>
              <label>Stock</label>
              <input
                type="number"
                placeholder="Stock"
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
              />
            </div>

            <div>
              <label>Category</label>
              <input
                type="text"
                placeholder="eg. laptop, camera etc"
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>

            <div>
              <label>Photo</label>
              <input
                type="file"
                multiple
                required
                onChange={photos.changeHandler}
              />
            </div>
            {photos.error && <p>{photos.error}</p>}
            {photos.preview &&
              photos.preview.map((img, i) => (
                <>
                  <img key={i} style={{display:"flex"}} src={img} alt="New Image" />
                </>
              ))}
            <button type="submit">Create</button>
          </form>
        </article>
      </main>
    </div>
  );
};

export default NewProduct;
