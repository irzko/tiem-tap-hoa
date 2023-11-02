import Image from "next/image";
import { Card, CardBody, CardFooter } from "@nextui-org/react";
import Link from "next/link";

export default function ProductCard({ product }: { product: IProduct }) {
  return (
    <Card isPressable as={Link} href={`/detail/${product.productId}`}>
      <CardBody className="overflow-visible p-0">
        {product.images.length > 0 && (
          <div className="relative aspect-square">
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${product.images[0]}`}
              fill
              className="object-cover"
              sizes="200px"
              alt={product.productName}
            />
          </div>
        )}
      </CardBody>
      <CardFooter className="px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold"></p>
        <small className="text-default-500">
          {product.price.toLocaleString("vi-VN")}&nbsp;₫
        </small>
        <h4 className="font-bold text-large line-clamp-1">
          {product.productName}
        </h4>
      </CardFooter>
    </Card>
  );
}
