import { createContext } from "react";

const SubcategoryContext = createContext({
  subcategories: [] as ISubSubcategory[] | undefined,
  mutate: (key: string) => {},
});

export default SubcategoryContext;
