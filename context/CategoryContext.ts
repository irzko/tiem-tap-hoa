import { createContext } from "react";

const CategoryContext = createContext({
  categories: [] as ICategory[] | undefined,
  mutate: (key: string) => {},
});

export default CategoryContext;