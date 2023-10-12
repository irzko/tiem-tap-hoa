enum Role {
  USER,
  ADMIN,
}

enum PaymentType {
  COD,
  MOMO,
  PAYPAL,
  PAYMENT_CARD,
}

interface User {
  userId: string;
  email: string;
  fullName: string;
  password: string;
  phoneNumber: string | null;
  role: $Enums.Role;
  createdAt: Date;
  updatedAt: Date;
}
interface ICategory {
  categoryId: string;
  categoryName: string;
  parentCategoryId: string | null;
  createdAt: Date;
  updatedAt: Date;
  subCategories: ICategory[];
  _count: {
    subCategories: number;
  };
}

interface IProduct {
  productId: string;
  productName: string;
  price: number;
  stockQuantity: number;
  description: string;
  images: string[];
  categoryId: string;
  createdAt: Date;
  updatedAt: Date;
  category: ICategory;
}

interface ICart {
  cartId: string;
  userId: string;
  productId: string;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
  product: IProduct;
}

interface IAddress {
  addressId: string;
  userId: string;
  fullName: string;
  streetAddress: string;
  phoneNumber: string;
  cityId: string;
  districtId: string;
  wardId: string;
  city: ICity;
  district: IDistrict;
  ward: IWard;
  user: User;
  createdAt: Date;
  updatedAt: Date;
}

interface IWard {
  wardId: string;
  name: string;
  districtId: string;
}

interface IDistrict {
  districtId: string;
  name: string;
  cityId: string;
  wards?: IWard[];
}

interface ICity {
  cityId: string;
  name: string;
  districts?: IDistrict[];
}

interface IPaymentCard {
  cardNumber: string;
  cardHolderName: string;
  expirationDate: Date;
  cvv: string;
}

interface IPaymentMethod {
  paymentMethodId: string;
  paymentType: $Enums.PaymentType;
  accountInfo: string | IPaymentCard;
  userId: string;
  orderId: string;
  user: User;
}
