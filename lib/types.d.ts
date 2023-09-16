interface ICategory {
  category_id: string;
  category_name: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ISubcategory {
  subcategory_id: string;
  subcategory_name: string;
  category_id: string;
  createdAt: Date;
  updatedAt: Date;
}
