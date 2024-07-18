import { Product, User } from "./types";

export type CustomError = {
  status: number;
  data: {
    message: string;
    success: boolean;
  };
};

export type MessageResponse = {
  success: boolean;
  message: string;
};

export type UserResponse = {
  success: boolean;
  user: User;
};

export type AllProductsResponse = {
  success: boolean;
  products: Product[];
};
export type CategoriesResponse = {
  success: boolean;
  categories: [];
};

export type SearchProductResponse = {
  success: boolean;
  products: Product[];
  totalPage: number;
};

export type SearchProductParameters = {
  search: string;
  sort: string;
  category: string;
  price: number;
  page: number;
};
export type NewProductParameters = {
  id: string;
  formData: FormData;
};
export type SingleProductResponse = {
  success: boolean;
  product: Product;
};
export type UpdateProductParameters = {
  userId: string;
  productId: string;
  formData: FormData;
};
export type DeleteProductParameters = {
  userId: string;
  productId: string;
};
