enum Role {
  USER,
  ADMIN,
}

interface User {
  user_id: string;
  email: string;
  full_name: string;
  password_hash: string;
  phone_number: string | null;
  role: $Enums.Role;
  created_at: Date;
  updated_at: Date;
}
interface ICategory {
  category_id: string;
  category_name: string;
  created_at: Date;
  updatedAt: Date;
  _count: {
    Subcategories: number;
  };
}

interface ISubcategory {
  subcategory_id: string;
  subcategory_name: string;
  category_id: string;
  created_at: Date;
  updatedAt: Date;
  _count: {
    Subsubcategories: number;
  };
}

interface ISubSubcategory {
  subsubcategory_id: string;
  subsubcategory_name: string;
  subcategory_id: string;
  created_at: Date;
  updatedAt: Date;
}
