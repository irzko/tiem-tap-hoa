import Image from "next/image";
import {
  Card,
  CardBody,
  CardFooter,
  Image as NextImage,
} from "@nextui-org/react";
import Link from "next/link";

export default function ProductCard({ product }: { product: IProduct }) {
  return (
    <Card isPressable as={Link} href={`/detail/${product.productId}`}>
      <CardBody className="overflow-visible p-0">
        {product.images.length > 0 && (
          <NextImage
            as={Image}
            className="object-cover rounded-lg"
            classNames={{
              wrapper: "!max-w-none w-full aspect-square",
            }}
            src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${product.images[0]}`}
            alt=""
            fill
            sizes="200px"
          />
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
