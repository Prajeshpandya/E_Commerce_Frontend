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
  stock: number;
};

export type OrderItem = Omit<CartItem, "stock"> & { _id: string };

export type Order = {
  orderItems: OrderItem[];
  shippingInfo: ShippingInfo;
  subTotal: number;
  tax: number;
  shippingCharges: number;
  discount: number;
  total: number;
  status: string;
  user: {
    name: string;
    _id: string;
  };
  _id: string;
};
