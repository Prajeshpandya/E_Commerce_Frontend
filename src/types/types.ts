//this type for user that get by database
export type User = {
  name: string;
  email: string;
  gender: string;
  role: string;
  photo: string;
  dob: string;
  _id: string;
};

export type Product = {
  name: string;
  category: string;
  stock: number;
  price: number;
  photo: string;
  _id: string;
};
export type ShippingInfo = {
  address: string;
  city: string;
  state: string;
  country: string;
  pinCode: string;
};
export type CartItem = {
  productId: string;
  photo: string;
  name: string;
  price: number;
  quantity: number;
  stock:number
};
