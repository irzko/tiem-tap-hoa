import { createContext } from "react";

const SubcategoryContext = createContext({
  subcategories: [] as ISubcategory[] | undefined,
  mutate: (key: string) => {},
});

export default SubcategoryContext;
