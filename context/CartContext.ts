import { createContext } from "react";

const CartContext = createContext({
  carts: [] as ICart[],
  setCarts: (carts: ICart[]) => {},
});

export default CartContext;
