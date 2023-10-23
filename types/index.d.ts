enum Role {
  USER,
  ADMIN,
}

type PaymentType = "COD" | "MOMO" | "PAYPAL" | "PAYMENT_CARD";

interface IUser {
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
  parentCategory: ICategory;
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
  Review: IReview[];
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
  paymentType: PaymentType;
  accountInfo: string | IPaymentCard;
  createdAt: Date;
  updatedAt: Date;
  orderId: string;
}

type OrderTabType =
  | "unpaid"
  | "toship"
  | "shipping"
  | "completed"
  | "cancelled"
  | "returnlist"
  | "failed_delivery";

type OrderStatusType =
  | "Chờ xác nhận"
  | "Chờ lấy hàng"
  | "Đang giao"
  | "Đã giao"
  | "Đã hủy"
  | "Trả hàng/Hoàn tiền"
  | "Giao không thành công";

interface IOrderDetail {
  orderDetailId: string;
  orderId: string;
  productId: string;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
  product: IProduct;
}

interface IOrderStatus {
  orderStatusId: string;
  status: OrderTabType;
  createdAt: Date;
  updatedAt: Date;
  orderId: string;
}

interface IOrder {
  orderId: string;
  userId: string;
  addressId: string;
  totalAmount: number;
  orderStatus: IOrderStatus;
  createdAt: Date;
  updatedAt: Date;
  address: IAddress;
  user: User;
  orderDetails: IOrderDetail[];
  paymentMethods: IPaymentMethod[];
}

interface IReview {
  reviewId: string;
  userId: string;
  productId: string;
  rating: number;
  review: string;
  createdAt: Date;
  updatedAt: Date;
  product: IProduct;
  user: User;
  _count: {
    Usefulness: number;
  };
}

interface IConversation {
  conversationId: string;
  createdAt: Date;
  updatedAt: Date;
  user1Id: string;
  user2Id: string;
  user1: User;
  user2: User;
  messages: IMessage[];
}

interface IMessage {
  messageId: string;
  userId: string;
  content: string;
  conversationId: string;
  createdAt: Date;
  updatedAt: Date;
  user: IUser;
}

interface ISupplier {
  supplierId: string;
  supplierName: string;
  phoneNumber: string;
  email: string;
  address: string;
  otherInfo?: string;
  createdAt: Date;
  updatedAt: Date;
  products: IProduct[];
}
