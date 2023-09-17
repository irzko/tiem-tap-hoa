interface ICategory {
  category_id: string;
  category_name: string;
  created_at: Date;
  updatedAt: Date;
}

interface ISubcategory {
  subcategory_id: string;
  subcategory_name: string;
  category_id: string;
  created_at: Date;
  updatedAt: Date;
}
