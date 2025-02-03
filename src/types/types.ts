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
  photos: [{
    public_id: string,
    url: string,
    _id: string
  }];
  _id: string;
  description: string;
  ratings: number;
  numOfReviews: number;
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

// "_id": "66ac656d0b829611792ba7af",
// "comment": "Its nice Product",
// "rating": 4,
// "user": "fsO9flQQAZglJa0j8l53T2JEqB52",
// "product": "66ac65380b829611792ba7ab",
// "createdAt": "2024-08-02T04:49:49.541Z",
// "updatedAt": "2024-08-02T04:49:49.541Z",
// "__v": 0

export type Review = {
  _id: string;
  comment: string;
  rating: number;
  user: { _id: string; name: string };
  product: string;
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
  createdAt: Date;
  updatedAt: Date;
  _id: string;
};

type LatestTransaction = {
  _id: string;
  amount: number;
  discount: number;
  quantity: number[];
  status: string;
};

type CountAndChange = {
  user: number;
  revenue: number;
  product: number;
  order: number;
};

export type Stats = {
  changePercent: CountAndChange;
  count: CountAndChange;
  chart: {
    order: number[];
    revenue: number[];
  };
  categoryCount: Record<string, number>[];
  userRatio: {
    male: number;
    female: number;
  };
  latestTransaction: LatestTransaction[];
};

export type Pie = {
  orderFullfillmentRatio: {
    processing: number;
    shipping: number;
    delivered: number;
  };
  categoryStockCount: Record<string, number>[];
  stockAvailability: {
    inStock: number;
    outOfStock: number;
  };
  revenueDistribution: {
    netMargin: number;
    totalDiscount: number;
    productionCost: number;
    burnt: number;
    marketingCost: number;
  };
  adminCustomer: {
    admin: number;
    customer: number;
  };
  usersAgeGroup: {
    teen: number;
    adult: number;
    old: number;
  };
};

export type Bar = {
  product: number[];
  user: number[];
  order: number[];
};
export type Line = {
  product: number[];
  user: number[];
  discount: number[];
  revenue: number[];
};
