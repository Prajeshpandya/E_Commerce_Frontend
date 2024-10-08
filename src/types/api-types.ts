import {
  Bar,
  CartItem,
  Charts,
  Line,
  Order,
  Pie,
  Product,
  Review,
  ShippingInfo,
  Stats,
  User,
} from "./types";

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
export type AllUsersResponse = {
  success: boolean;
  users: User[];
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
export type GetReviewsResponse = {
  success: boolean;
  reviews: Review[];
};

export type StatsResponse = {
  success: boolean;
  stats: Stats;
};

export type PieResponse = {
  success: boolean;
  charts: Pie;
};
export type BarResponse = {
  success: boolean;
  charts: Bar;
};
export type LineResponse = {
  success: boolean;
  charts: Line;
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
export type NewReviewParameters = {
  comment: string;
  rating: number;
  productId: string;
  userId: string;
};
export type DeleteProductParameters = {
  userId: string;
  productId: string;
};
export type DeleteUserParameters = {
  adminId: string;
  userId: string;
};

export type NewOrderParameters = {
  shippingInfo: ShippingInfo;
  orderItems: CartItem[];
  user: string;
  subTotal: number;
  tax: number;
  shippingCharges: number;
  discount: number;
  total: number;
};
export type UpdateOrderParameters = {
  userId: string;
  orderId: string;
};
export type CreateCouponParameters = {
  coupon: string;
  amount: number;
};

export type MyOrdersResponse = {
  success: boolean;
  orders: Order[];
};
export type OrderDetailsResponse = {
  success: boolean;
  order: Order;
};
