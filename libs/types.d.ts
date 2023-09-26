enum Role {
  USER,
  ADMIN,
}

interface User {
  userId: string;
  email: string;
  fullName: string;
  password: string;
  phoneNumber: string | null;
  role: $Enums.Role;
  created_at: Date;
  updated_at: Date;
}
interface ICategory {
  categoryId: string;
  categoryName: string;
  parentCategoryId: string | null;
  created_at?: Date;
  updatedAt?: Date;
  subCategories: ICategory[];
  _count?: {
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
  categoryId?: string;
  created_at?: Date;
  updated_at?: Date;
}
