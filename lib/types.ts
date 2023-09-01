interface CategoryGroup {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Category {
  id: string;
  name: string;
  categoryGroupId: string;
  createdAt: Date;
  updatedAt: Date;
}


export type { CategoryGroup, Category };