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

interface ISubsubcategory {
  subsubcategory_id: string;
  subsubcategory_name: string;
  subcategory_id: string;
  created_at: Date;
  updatedAt: Date;
}
