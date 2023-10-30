import { createContext } from "react";

const CategoryContext = createContext({
  categories: [] as ICategory[] | undefined,
});

export default CategoryContext;
