//this type for user that get by database
export interface User {
  name: string;
  email: string;
  gender: string;
  role: string;
  photo: string;
  dob: string;
  _id: string;
}

export interface Product {
  name: string;
  category: string;
  stock: number;
  price: number;
  photo: string;
  _id: string;
}
