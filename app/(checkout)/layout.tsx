"use client";
import CartButton from "@/components/cart-button";
import Navbar from "@/components/ui/navbar";
import CartContext from "@/context/CartContext";
import { useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [carts, setCarts] = useState<ICart[]>([]);
  return (
    <>
      <Navbar>
        <div className="w-full flex justify-end mx-2">
          <CartButton />
        </div>
      </Navbar>
      <main>
        <CartContext.Provider value={{ carts, setCarts }}>
          <div className="p-4 mt-14">{children}</div>
        </CartContext.Provider>
      </main>
    </>
  );
}
