"use client";
import React from "react";
import Image from "next/image";
import { Card, CardBody, CardFooter } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function ProductCard({ product }: { product: IProduct }) {
  const router = useRouter();
  return (
    <Card
      key={product.productId}
      shadow="sm"
      isPressable
      onPress={() => router.push(`/detail/${product.productId}`)}
    >
      <CardBody className="overflow-visible p-0">
        {product.images.length > 0 && (
          <Image
            alt={product.productName}
            className="w-full object-cover h-[140px] shadow-sm rounded-lg"
            src={`http://localhost:1337/${product.images[0]}`}
            width={140}
            height={140}
          />
        )}
      </CardBody>
      <CardFooter className="text-small justify-between">
        <b>{product.productName}</b>
        <p className="text-default-500">{product.price}</p>
      </CardFooter>
    </Card>
  );
}
