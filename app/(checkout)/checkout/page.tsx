"use client";
import CartContext from "@/context/CartContext";
import { useContext } from "react";

export default function Page() {
  const { carts } = useContext(CartContext);
  
  return (
    <div>
      {carts.map((cart) => (
        <div key={cart.cartId}>
          <h1>{cart.product.productName}</h1>
          <h1>{cart.product.price}</h1>
        </div>
      ))}
    </div>
  );
}
